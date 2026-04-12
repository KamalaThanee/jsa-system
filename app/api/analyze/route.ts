import { NextResponse } from 'next/server';
import { analyzeWithAI, getProviderStatus } from '@/lib/aiProvider';

export const runtime = 'edge';

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

    // Check if at least one AI provider is configured
    const status = await getProviderStatus();
    if (!status.gemini && !status.openrouter) {
      return NextResponse.json(
        { error: 'No AI provider configured. Please set GEMINI_API_KEY or OPENROUTER_API_KEY' },
        { status: 500 }
      );
    }

    const userPrompt = `Analyze this offshore work task and create a detailed JSA:

Job Description: ${jobDescription}
Vessel Type: ${vesselType || 'Accommodation Work Barge'}
Work Location: ${workLocation || 'Offshore'}

Break down the job into 4-8 sequential steps. For each step:
1. Identify ALL applicable hazards from Energy Wheel categories
2. Assess Initial Risk (before controls) - be realistic about offshore risks
3. Recommend specific, practical control measures
4. Assess Residual Risk (after controls)
5. Assign responsibility

Respond ONLY with this JSON structure (no markdown, no code blocks):
{
  "jobSteps": [
    {
      "stepNumber": 1,
      "description": "Clear, specific step description",
      "hazards": [
        {
          "category": "Mechanical",
          "hazard": "Specific hazard from Energy Wheel",
          "description": "Brief explanation of the hazard"
        }
      ],
      "initialSeverity": 3,
      "initialLikelihood": "C",
      "controlMeasures": [
        "Specific control measure 1",
        "Specific control measure 2"
      ],
      "residualSeverity": 2,
      "residualLikelihood": "B",
      "responsibility": "Who is responsible (e.g., Crane Operator, Safety Officer, Work Supervisor)"
    }
  ]
}`;

    // Use AI provider service with auto-failover
    const aiResponse = await analyzeWithAI(userPrompt);

    // Parse the JSON response
    let analysisData;
    try {
      // Remove any markdown code blocks if present
      let jsonText = aiResponse.text.trim();
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      analysisData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse.text);
      throw new Error('Invalid JSON response from AI');
    }

    // Add metadata about which provider was used
    return NextResponse.json({
      ...analysisData,
      _meta: {
        provider: aiResponse.provider,
        tokensUsed: aiResponse.tokensUsed,
      },
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze job' },
      { status: 500 }
    );
  }
}
