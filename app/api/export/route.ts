import { NextResponse } from 'next/server';
import { generateJSADocument } from '@/lib/docxGenerator';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const jsaData = await request.json();

    // Generate the document using docx library
    const buffer = await generateJSADocument(jsaData);

    // Convert Buffer to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(buffer);

    // Return the file
    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="JSA_${jsaData.jsaNumber || 'export'}_${Date.now()}.docx"`,
      },
    });
  } catch (error: any) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to export document' },
      { status: 500 }
    );
  }
}
