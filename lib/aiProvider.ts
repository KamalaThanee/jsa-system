// AI Provider Service with Auto-Failover
// Supports: Gemini (Free) → OpenRouter → Anthropic

import { GoogleGenerativeAI } from '@google/generative-ai';

export type AIProvider = 'gemini' | 'openrouter' | 'anthropic';

interface AIResponse {
  text: string;
  provider: AIProvider;
  tokensUsed?: number;
}

interface AIError {
  provider: AIProvider;
  error: string;
  isRateLimitError: boolean;
}

const SYSTEM_PROMPT = `You are a Safety Officer expert specializing in Job Safety Analysis (JSA) for offshore accommodation work barges. Your role is to analyze work tasks and identify hazards using the Chevron Energy Wheel framework.

The Energy Wheel categories are:
1. Mechanical - pinch points, crushing, shearing, entanglement, struck by, cutting
2. Electrical - shock, electrocution, arc flash, burns
3. Thermal - burns, fire, heat/cold stress
4. Chemical - toxic exposure, corrosion, asphyxiation
5. Radiation - UV, ionizing/non-ionizing radiation, lasers
6. Biological - infections, contaminated materials, marine organisms
7. Gravitational - falls from height, falling objects, slips/trips
8. Pressure - pressure vessel failure, compressed gas, hydraulic failures
9. Motion - vessel motion, seasickness, man overboard, equipment shift
10. Sound - hearing loss, communication interference

Risk Assessment Matrix:
Severity (S): 1-Insignificant, 2-Minor, 3-Serious, 4-Extensive, 5-Fatality
Likelihood (L): A-Very Low (>10 years), B-Low (Annual), C-Medium (6 months), D-High (Monthly), E-Very High (Daily)

Risk Levels:
- LOW: S1 with any L, S2 with A-D, S3 with A-B
- MED: S2 with E, S3 with C-E, S4 with A-B
- HIGH: S4 with C-E, S5 with any L

You must respond ONLY with valid JSON. No markdown, no code blocks, no explanations.`;

// Check if error is rate limit
function isRateLimitError(error: any): boolean {
  const errorString = error.toString().toLowerCase();
  const message = error.message?.toLowerCase() || '';
  
  return (
    errorString.includes('rate limit') ||
    errorString.includes('quota') ||
    errorString.includes('429') ||
    errorString.includes('resource exhausted') ||
    message.includes('rate limit') ||
    message.includes('quota') ||
    message.includes('429')
  );
}

// Try Gemini API (Free)
async function tryGemini(prompt: string): Promise<AIResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4000,
      },
    });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I will analyze jobs and respond only with valid JSON.' }],
        },
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      text,
      provider: 'gemini',
      tokensUsed: response.usageMetadata?.totalTokenCount,
    };
  } catch (error: any) {
    throw {
      provider: 'gemini',
      error: error.message || 'Gemini API failed',
      isRateLimitError: isRateLimitError(error),
    } as AIError;
  }
}

// Try OpenRouter API
async function tryOpenRouter(prompt: string): Promise<AIResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not configured');
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'JSA System',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-exp:free', // Free model
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content || '';

    return {
      text,
      provider: 'openrouter',
      tokensUsed: data.usage?.total_tokens,
    };
  } catch (error: any) {
    throw {
      provider: 'openrouter',
      error: error.message || 'OpenRouter API failed',
      isRateLimitError: isRateLimitError(error),
    } as AIError;
  }
}

// Main function with auto-failover (Gemini → OpenRouter only)
export async function analyzeWithAI(prompt: string): Promise<AIResponse> {
  const providers: Array<() => Promise<AIResponse>> = [
    () => tryGemini(prompt),
    () => tryOpenRouter(prompt),
  ];

  const errors: AIError[] = [];

  // Try each provider in order
  for (const tryProvider of providers) {
    try {
      const response = await tryProvider();
      
      // Log success for monitoring
      console.log(`✅ AI Analysis successful via ${response.provider}`);
      if (errors.length > 0) {
        console.log(`⚠️ Previous failures:`, errors.map(e => `${e.provider}: ${e.error}`));
      }
      
      return response;
    } catch (error: any) {
      errors.push(error as AIError);
      
      // If it's a rate limit error, log and continue to next provider
      if (error.isRateLimitError) {
        console.log(`⏱️ Rate limit hit on ${error.provider}, trying next provider...`);
        continue;
      }
      
      // If it's a configuration error (no API key), skip to next
      if (error.error?.includes('not configured')) {
        console.log(`⚙️ ${error.provider} not configured, trying next provider...`);
        continue;
      }
      
      // For other errors, log but continue
      console.log(`❌ ${error.provider} failed: ${error.error}, trying next provider...`);
      continue;
    }
  }

  // All providers failed
  const errorMessages = errors.map(e => `${e.provider}: ${e.error}`).join('; ');
  throw new Error(`All AI providers failed. Errors: ${errorMessages}`);
}

// Get current provider status
export async function getProviderStatus(): Promise<{
  gemini: boolean;
  openrouter: boolean;
}> {
  return {
    gemini: !!process.env.GEMINI_API_KEY,
    openrouter: !!process.env.OPENROUTER_API_KEY,
  };
}
