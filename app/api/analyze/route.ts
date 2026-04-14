import { NextResponse } from 'next/server';
import { analyzeWithAI, getProviderStatus } from '@/lib/aiProvider';

export const runtime = 'edge';

// Clean and extract JSON from AI response
function extractJSON(text: string): any {
  // Remove markdown code blocks
  let cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');
  
  // Try to find JSON object
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    cleaned = jsonMatch[0];
  }
  
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // If parsing fails, try to fix common issues
    cleaned = cleaned
      .replace(/,\s*}/g, '}')  // Remove trailing commas
      .replace(/,\s*]/g, ']')  // Remove trailing commas in arrays
      .replace(/(\w+):/g, '"$1":')  // Quote unquoted keys
      .replace(/'/g, '"');  // Replace single quotes with double quotes
    
    return JSON.parse(cleaned);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobDescription, vesselType, workLocation } = body;

    if (!jobDescription) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    // Check providers
    const status = await getProviderStatus();
    if (!status.gemini && !status.openrouter) {
      return NextResponse.json(
        { error: 'No AI provider configured' },
        { status: 500 }
      );
    }

    const userPrompt = `Analyze this offshore work task and create a JSA:

Job Description: ${jobDescription}
Vessel Type: ${vesselType || 'Accommodation Work Barge'}
Work Location: ${workLocation || 'Offshore'}

Break down into 4-8 steps. For each step identify hazards, assess risks, recommend controls.

Respond with ONLY this JSON structure (no markdown, no explanations):
{
  "jobSteps": [
    {
      "stepNumber": 1,
      "description": "Step description",
      "hazards": [
        {
          "category": "Mechanical",
          "hazard": "Specific hazard",
          "description": "Brief explanation"
        }
      ],
      "initialSeverity": 3,
      "initialLikelihood": "C",
      "controlMeasures": ["Control 1", "Control 2"],
      "residualSeverity": 2,
      "residualLikelihood": "B",
      "responsibility": "Who is responsible"
    }
  ]
}`;

    // Get AI response
    const aiResponse = await analyzeWithAI(userPrompt);

    // Try to parse JSON with better error handling
    let analysisData;
    try {
      analysisData = extractJSON(aiResponse.text);
    } catch (parseError: any) {
      console.error('JSON Parse Error:', parseError);
      console.error('AI Response:', aiResponse.text.substring(0, 500));
      
      // Return the error with partial response for debugging
      return NextResponse.json(
        { 
          error: 'AI response was not valid JSON',
          details: parseError.message,
          provider: aiResponse.provider,
          model: aiResponse.model,
          preview: aiResponse.text.substring(0, 200) + '...'
        },
        { status: 500 }
      );
    }

    // Validate structure
    if (!analysisData.jobSteps || !Array.isArray(analysisData.jobSteps)) {
      return NextResponse.json(
        { 
          error: 'Invalid response structure - missing jobSteps array',
          provider: aiResponse.provider,
          model: aiResponse.model
        },
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json({
      ...analysisData,
      _meta: {
        provider: aiResponse.provider,
        model: aiResponse.model,
        tokensUsed: aiResponse.tokensUsed,
        cost: aiResponse.cost,
      },
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to analyze job',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
