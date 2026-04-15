import { NextResponse } from 'next/server';
import { analyzeWithAI, getProviderStatus } from '@/lib/aiProvider';

export const runtime = 'edge';

function aggressiveJsonClean(text: string): string {
  // Remove all markdown
  let cleaned = text
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .replace(/^[^{]*/, '')  // Remove everything before first {
    .replace(/[^}]*$/, '')  // Remove everything after last }
    .trim();
  
  // Find the JSON object
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) {
    cleaned = match[0];
  }
  
  return cleaned;
}

function parseAIResponse(text: string): any {
  // Try 1: Direct parse
  try {
    return JSON.parse(text);
  } catch (e1) {
    console.log('Try 1 failed, cleaning...');
  }
  
  // Try 2: Clean and parse
  try {
    const cleaned = aggressiveJsonClean(text);
    return JSON.parse(cleaned);
  } catch (e2) {
    console.log('Try 2 failed, fixing syntax...');
  }
  
  // Try 3: Fix common JSON errors
  try {
    let fixed = aggressiveJsonClean(text)
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']')
      .replace(/(\w+):/g, '"$1":')
      .replace(/'/g, '"')
      .replace(/\n/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/\t/g, ' ')
      .replace(/\s+/g, ' ');
    return JSON.parse(fixed);
  } catch (e3) {
    console.error('All parsing attempts failed');
    console.error('Original text:', text.substring(0, 500));
    throw new Error('Could not parse AI response as JSON after 3 attempts');
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobDescription, vesselType, workLocation } = body;

    if (!jobDescription) {
      return NextResponse.json({ error: 'Job description required' }, { status: 400 });
    }

    const status = await getProviderStatus();
    if (!status.gemini && !status.openrouter) {
      return NextResponse.json({ error: 'No AI provider configured' }, { status: 500 });
    }

    const userPrompt = `Job: ${jobDescription}
Vessel: ${vesselType || 'Work Barge'}
Location: ${workLocation || 'Offshore'}

Create JSA with 4-8 steps. Output ONLY valid JSON with this structure (no text before or after):
{"jobSteps":[{"stepNumber":1,"description":"text","hazards":[{"category":"Mechanical","hazard":"text","description":"text"}],"initialSeverity":3,"initialLikelihood":"C","controlMeasures":["text"],"residualSeverity":2,"residualLikelihood":"B","responsibility":"text"}]}`;

    console.log('Calling AI...');
    const aiResponse = await analyzeWithAI(userPrompt);
    console.log(`AI Response from ${aiResponse.model}:`, aiResponse.text.substring(0, 200));

    let analysisData;
    try {
      analysisData = parseAIResponse(aiResponse.text);
    } catch (parseError: any) {
      console.error('Parse error:', parseError.message);
      
      return NextResponse.json({
        error: 'AI response was not valid JSON',
        provider: aiResponse.provider,
        model: aiResponse.model,
        preview: aiResponse.text.substring(0, 300),
        parseError: parseError.message,
      }, { status: 500 });
    }

    if (!analysisData.jobSteps || !Array.isArray(analysisData.jobSteps)) {
      console.error('Invalid structure:', analysisData);
      return NextResponse.json({
        error: 'Response missing jobSteps array',
        provider: aiResponse.provider,
        model: aiResponse.model,
        received: analysisData,
      }, { status: 500 });
    }

    return NextResponse.json({
      ...analysisData,
      _meta: {
        provider: aiResponse.provider,
        model: aiResponse.model,
        tokensUsed: aiResponse.tokensUsed,
        cost: aiResponse.cost || 0,
      },
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json({
      error: error.message || 'Failed to analyze',
      stack: error.stack?.substring(0, 500),
    }, { status: 500 });
  }
}
