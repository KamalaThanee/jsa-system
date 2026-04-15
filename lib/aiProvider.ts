// 6-Tier AI: Gemma 31B → Gemini 2.5 Flash → Nemotron 120B → Gemini 2.5 Flash Lite → Minimax M2.5 → DeepSeek V3.2

import { GoogleGenerativeAI } from '@google/generative-ai';

export type AIProvider = 'gemma-31b' | 'gemini-2.5' | 'nemotron-120b' | 'gemini-lite' | 'minimax' | 'deepseek-v3';

interface AIResponse {
  text: string;
  provider: AIProvider;
  model: string;
  tokensUsed?: number;
  cost?: number;
}

interface AIError {
  provider: AIProvider;
  error: string;
  isRateLimitError: boolean;
}

const SYSTEM_PROMPT = `You are a Safety Officer expert for offshore JSA analysis.

Respond ONLY with valid JSON. No markdown, no explanations, no code blocks.

Format:
{
  "jobSteps": [
    {
      "stepNumber": 1,
      "description": "Step description",
      "hazards": [{"category": "Mechanical", "hazard": "Specific hazard", "description": "Brief explanation"}],
      "initialSeverity": 3,
      "initialLikelihood": "C",
      "controlMeasures": ["Control 1", "Control 2"],
      "residualSeverity": 2,
      "residualLikelihood": "B",
      "responsibility": "Role"
    }
  ]
}

Energy Wheel: Mechanical, Electrical, Thermal, Chemical, Radiation, Biological, Gravitational, Pressure, Motion, Sound
Severity: 1-5, Likelihood: A-E`;

function isRateLimitError(error: any): boolean {
  const errorString = error.toString().toLowerCase();
  const message = error.message?.toLowerCase() || '';
  return errorString.includes('rate limit') || errorString.includes('quota') || errorString.includes('429') || message.includes('rate limit') || message.includes('quota') || message.includes('429');
}

function cleanJsonResponse(text: string): string {
  let cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  const firstBrace = cleaned.indexOf('{');
  if (firstBrace > 0) cleaned = cleaned.substring(firstBrace);
  const lastBrace = cleaned.lastIndexOf('}');
  if (lastBrace > 0 && lastBrace < cleaned.length - 1) cleaned = cleaned.substring(0, lastBrace + 1);
  return cleaned.trim();
}

// Tier 1: Gemma 4 31B (OpenRouter)
async function tryGemma31B(prompt: string): Promise<AIResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not configured');

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
        model: 'google/gemma-4-31b-it:free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Error ${response.status}`);
    }

    const data = await response.json();
    return {
      text: cleanJsonResponse(data.choices[0]?.message?.content || ''),
      provider: 'gemma-31b',
      model: 'gemma-4-31b',
      tokensUsed: data.usage?.total_tokens,
      cost: 0,
    };
  } catch (error: any) {
    throw { provider: 'gemma-31b', error: error.message || 'Gemma 31B failed', isRateLimitError: isRateLimitError(error) } as AIError;
  }
}

// Tier 2: Gemini 2.5 Flash (Google)
async function tryGemini25Flash(prompt: string): Promise<AIResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: { temperature: 0.7, maxOutputTokens: 4000 },
    });

    const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
    const response = await result.response;

    return {
      text: cleanJsonResponse(response.text()),
      provider: 'gemini-2.5',
      model: 'gemini-2.5-flash',
      tokensUsed: response.usageMetadata?.totalTokenCount,
      cost: 0,
    };
  } catch (error: any) {
    throw { provider: 'gemini-2.5', error: error.message || 'Gemini 2.5 failed', isRateLimitError: isRateLimitError(error) } as AIError;
  }
}

// Tier 3: Nemotron 120B (OpenRouter)
async function tryNemotron120B(prompt: string): Promise<AIResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not configured');

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
        model: 'nvidia/nemotron-3-super-120b-a12b:free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Error ${response.status}`);
    }

    const data = await response.json();
    return {
      text: cleanJsonResponse(data.choices[0]?.message?.content || ''),
      provider: 'nemotron-120b',
      model: 'nemotron-120b',
      tokensUsed: data.usage?.total_tokens,
      cost: 0,
    };
  } catch (error: any) {
    throw { provider: 'nemotron-120b', error: error.message || 'Nemotron failed', isRateLimitError: isRateLimitError(error) } as AIError;
  }
}

// Tier 4: Gemini 2.5 Flash Lite (Google)
async function tryGemini25Lite(prompt: string): Promise<AIResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash-lite',
      generationConfig: { temperature: 0.7, maxOutputTokens: 4000 },
    });

    const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
    const response = await result.response;

    return {
      text: cleanJsonResponse(response.text()),
      provider: 'gemini-lite',
      model: 'gemini-2.5-flash-lite',
      tokensUsed: response.usageMetadata?.totalTokenCount,
      cost: 0,
    };
  } catch (error: any) {
    throw { provider: 'gemini-lite', error: error.message || 'Gemini Lite failed', isRateLimitError: isRateLimitError(error) } as AIError;
  }
}

// Tier 5: Minimax M2.5 (OpenRouter)
async function tryMinimax(prompt: string): Promise<AIResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not configured');

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
        model: 'minimax/minimax-m2.5:free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Error ${response.status}`);
    }

    const data = await response.json();
    return {
      text: cleanJsonResponse(data.choices[0]?.message?.content || ''),
      provider: 'minimax',
      model: 'minimax-m2.5',
      tokensUsed: data.usage?.total_tokens,
      cost: 0,
    };
  } catch (error: any) {
    throw { provider: 'minimax', error: error.message || 'Minimax failed', isRateLimitError: isRateLimitError(error) } as AIError;
  }
}

// Tier 6: DeepSeek V3.2 (OpenRouter - Paid)
async function tryDeepSeekV3(prompt: string): Promise<AIResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not configured');

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
        model: 'deepseek/deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Error ${response.status}`);
    }

    const data = await response.json();
    const tokensUsed = data.usage?.total_tokens || 0;
    const cost = (tokensUsed / 1000000) * 0.27;

    return {
      text: cleanJsonResponse(data.choices[0]?.message?.content || ''),
      provider: 'deepseek-v3',
      model: 'deepseek-v3.2',
      tokensUsed,
      cost,
    };
  } catch (error: any) {
    throw { provider: 'deepseek-v3', error: error.message || 'DeepSeek failed', isRateLimitError: isRateLimitError(error) } as AIError;
  }
}

// Main with 6-tier rotation
export async function analyzeWithAI(prompt: string): Promise<AIResponse> {
  const providers: Array<() => Promise<AIResponse>> = [
    () => tryGemma31B(prompt),
    () => tryGemini25Flash(prompt),
    () => tryNemotron120B(prompt),
    () => tryGemini25Lite(prompt),
    () => tryMinimax(prompt),
    () => tryDeepSeekV3(prompt),
  ];

  const errors: AIError[] = [];

  for (const tryProvider of providers) {
    try {
      const response = await tryProvider();
      const costInfo = response.cost && response.cost > 0 ? ` ($${response.cost.toFixed(4)})` : ' (FREE ✅)';
      console.log(`✅ ${response.model}${costInfo}`);
      if (errors.length > 0) {
        console.log(`⚠️ Skipped: ${errors.map(e => e.provider).join(', ')}`);
      }
      return response;
    } catch (error: any) {
      errors.push(error as AIError);
      if (error.isRateLimitError) {
        console.log(`⏱️ Quota: ${error.provider}`);
        continue;
      }
      if (error.error?.includes('not configured')) {
        console.log(`⚙️ Not configured: ${error.provider}`);
        continue;
      }
      console.log(`❌ ${error.provider}: ${error.error}`);
      continue;
    }
  }

  throw new Error(`All providers failed: ${errors.map(e => `${e.provider}: ${e.error}`).join('; ')}`);
}

export async function getProviderStatus(): Promise<{ gemini: boolean; openrouter: boolean }> {
  return {
    gemini: !!process.env.GEMINI_API_KEY,
    openrouter: !!process.env.OPENROUTER_API_KEY,
  };
}
