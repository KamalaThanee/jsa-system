import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  WidthType,
  BorderStyle,
  ShadingType,
  VerticalAlign,
} from 'docx';
import { JSAData, JobStep } from '@/types';

const PAGE_WIDTH = 9360; // US Letter with 1" margins in DXA

export async function generateJSADocument(data: JSAData): Promise<Buffer> {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 12240, // 8.5 inches
              height: 15840, // 11 inches
            },
            margin: {
              top: 1440, // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          // Title
          new Paragraph({
            text: 'JOB SAFETY ANALYSIS (JSA)',
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: 'JOB SAFETY ANALYSIS (JSA)',
                bold: true,
                size: 32,
              }),
            ],
          }),

          // Header Information Table
          createHeaderTable(data),

          new Paragraph({ text: '', spacing: { after: 200 } }),

          // Risk Matrix Table
          createRiskMatrixTable(),

          new Paragraph({ text: '', spacing: { after: 200 } }),

          // Job Steps Table
          createJobStepsTable(data.jobSteps || []),

          new Paragraph({ text: '', spacing: { after: 200 } }),

          // Remarks
          new Paragraph({
            text: 'Remark:',
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: 'Remark:',
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            text: data.generalNotes || '',
            spacing: { after: 300 },
          }),

          // Signatures
          createSignatureSection(data),
        ],
      },
    ],
  });

  return await Packer.toBuffer(doc);
}

function createHeaderTable(data: JSAData): Table {
  const border = { style: BorderStyle.SINGLE, size: 1, color: '000000' };
  const cellWidth = PAGE_WIDTH / 4;

  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    rows: [
      new TableRow({
        children: [
          createCell('Vessel Code:', data.vesselCode || '', cellWidth),
          createCell('Prepared By:', data.preparedBy || '', cellWidth),
          createCell('Wind Speed and Direction:', data.windSpeed || '', cellWidth),
          createCell('Frequency:', data.frequency || '', cellWidth),
        ],
      }),
      new TableRow({
        children: [
          createCell('Vessel Name:', data.vesselName || '', cellWidth),
          createCell('Reviewed By:', data.reviewedBy || '', cellWidth),
          createCell('Current Direction and Speed:', data.currentDirection || '', cellWidth),
          createCell('PPE:', data.ppe || '', cellWidth),
        ],
      }),
      new TableRow({
        children: [
          createCell('Client:', data.client || '', cellWidth),
          createCell('Approved By:', data.approvedBy || '', cellWidth),
          createCell('Visibility (in NM):', data.visibility || '', cellWidth),
          createCell('', '', cellWidth),
        ],
      }),
      new TableRow({
        children: [
          createCell('Vessel Location:', data.vesselLocation || '', cellWidth),
          createCell('Date:', data.date || '', cellWidth),
          createCell('Generic JSA No:', data.jsaNumber || '', cellWidth),
          createCell('Onboard Location:', data.onboardLocation || '', cellWidth),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 4,
            width: { size: PAGE_WIDTH, type: WidthType.DXA },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Job Description: ', bold: true }),
                  new TextRun(data.jobDescription || ''),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function createCell(label: string, value: string, width: number): TableCell {
  const border = { style: BorderStyle.SINGLE, size: 1, color: '000000' };
  
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: {
      top: border,
      bottom: border,
      left: border,
      right: border,
    },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: label, bold: true }),
          new TextRun({ text: ' ' + value }),
        ],
      }),
    ],
  });
}

function createRiskMatrixTable(): Table {
  const border = { style: BorderStyle.SINGLE, size: 1, color: '000000' };
  const headerShading = { fill: 'D9D9D9', type: ShadingType.CLEAR };

  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    rows: [
      // Header row
      new TableRow({
        children: [
          new TableCell({
            width: { size: 800, type: WidthType.DXA },
            shading: headerShading,
            children: [new Paragraph({ text: 'S', alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            width: { size: 1500, type: WidthType.DXA },
            shading: headerShading,
            children: [new Paragraph({ text: 'People', alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            width: { size: 800, type: WidthType.DXA },
            shading: headerShading,
            children: [new Paragraph({ text: 'A', alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            width: { size: 800, type: WidthType.DXA },
            shading: headerShading,
            children: [new Paragraph({ text: 'B', alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            width: { size: 800, type: WidthType.DXA },
            shading: headerShading,
            children: [new Paragraph({ text: 'C', alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            width: { size: 800, type: WidthType.DXA },
            shading: headerShading,
            children: [new Paragraph({ text: 'D', alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            width: { size: 800, type: WidthType.DXA },
            shading: headerShading,
            children: [new Paragraph({ text: 'E', alignment: AlignmentType.CENTER })],
          }),
        ],
      }),
      // Matrix rows - simplified version
      ...createRiskMatrixRows(),
    ],
  });
}

function createRiskMatrixRows(): TableRow[] {
  const severityLevels = [
    { level: '1', desc: 'Insignificant', risks: ['LOW', 'LOW', 'LOW', 'LOW', 'LOW'] },
    { level: '2', desc: 'Minor', risks: ['LOW', 'LOW', 'LOW', 'LOW', 'MED'] },
    { level: '3', desc: 'Serious', risks: ['LOW', 'LOW', 'MED', 'MED', 'MED'] },
    { level: '4', desc: 'Extensive', risks: ['MED', 'MED', 'HIGH', 'HIGH', 'HIGH'] },
    { level: '5', desc: 'Fatality', risks: ['HIGH', 'HIGH', 'HIGH', 'HIGH', 'HIGH'] },
  ];

  return severityLevels.map((severity) => {
    const border = { style: BorderStyle.SINGLE, size: 1, color: '000000' };

    return new TableRow({
      children: [
        new TableCell({
          width: { size: 800, type: WidthType.DXA },
          children: [
            new Paragraph({ text: severity.level, alignment: AlignmentType.CENTER }),
          ],
        }),
        new TableCell({
          width: { size: 1500, type: WidthType.DXA },
          children: [new Paragraph({ text: severity.desc })],
        }),
        ...severity.risks.map((risk) => {
          const color =
            risk === 'LOW' ? 'C6E0B4' : risk === 'MED' ? 'FFD966' : 'F4B084';
          return new TableCell({
            width: { size: 800, type: WidthType.DXA },
            shading: { fill: color, type: ShadingType.CLEAR },
            children: [
              new Paragraph({ text: risk, alignment: AlignmentType.CENTER }),
            ],
          });
        }),
      ],
    });
  });
}

function createJobStepsTable(jobSteps: JobStep[]): Table {
  const border = { style: BorderStyle.SINGLE, size: 1, color: '000000' };
  const headerShading = { fill: 'D9D9D9', type: ShadingType.CLEAR };

  const colWidths = [500, 1500, 1500, 500, 500, 800, 1800, 1000, 500, 500, 760];

  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    rows: [
      // Header Row
      new TableRow({
        children: [
          createHeaderCell('No', colWidths[0]),
          createHeaderCell('Description of Job Steps', colWidths[1]),
          createHeaderCell('Potential Hazards', colWidths[2]),
          createHeaderCell('IR S', colWidths[3]),
          createHeaderCell('IR L', colWidths[4]),
          createHeaderCell('Initial Risk', colWidths[5]),
          createHeaderCell('Control Measures / Mitigation', colWidths[6]),
          createHeaderCell('Responsibility', colWidths[7]),
          createHeaderCell('RR S', colWidths[8]),
          createHeaderCell('RR L', colWidths[9]),
          createHeaderCell('Residual Risk', colWidths[10]),
        ],
      }),
      // Data Rows
      ...jobSteps.map((step) => createJobStepRow(step, colWidths)),
    ],
  });
}

function createHeaderCell(text: string, width: number): TableCell {
  const border = { style: BorderStyle.SINGLE, size: 1, color: '000000' };
  const headerShading = { fill: 'D9D9D9', type: ShadingType.CLEAR };

  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: headerShading,
    borders: { top: border, bottom: border, left: border, right: border },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        text: text,
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: text, bold: true, size: 18 })],
      }),
    ],
  });
}

function createJobStepRow(step: JobStep, colWidths: number[]): TableRow {
  const border = { style: BorderStyle.SINGLE, size: 1, color: '000000' };

  return new TableRow({
    children: [
      createDataCell(step.no.toString(), colWidths[0]),
      createDataCell(step.description, colWidths[1]),
      createDataCell(step.potentialHazards.join('\n'), colWidths[2]),
      createDataCell(step.initialRisk.severity.toString(), colWidths[3]),
      createDataCell(step.initialRisk.likelihood, colWidths[4]),
      createDataCell(step.initialRisk.riskLevel, colWidths[5]),
      createDataCell(step.controlMeasures.join('\n'), colWidths[6]),
      createDataCell(step.responsibility, colWidths[7]),
      createDataCell(step.residualRisk.severity.toString(), colWidths[8]),
      createDataCell(step.residualRisk.likelihood, colWidths[9]),
      createDataCell(step.residualRisk.riskLevel, colWidths[10]),
    ],
  });
}

function createDataCell(text: string, width: number): TableCell {
  const border = { style: BorderStyle.SINGLE, size: 1, color: '000000' };

  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: { top: border, bottom: border, left: border, right: border },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ text: text })],
  });
}

function createSignatureSection(data: JSAData): Table {
  const border = { style: BorderStyle.SINGLE, size: 1, color: '000000' };
  const cellWidth = PAGE_WIDTH / 3;

  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    rows: [
      new TableRow({
        children: [
          createCell('Assessors:', data.assessors || '', cellWidth),
          createCell('Signature:', '', cellWidth),
          createCell("Master's Signature:", '', cellWidth),
        ],
      }),
      new TableRow({
        children: [
          createCell('Date Assessed:', data.dateAssessed || '', cellWidth),
          createCell('Reviewed by:', data.reviewedByPerson || '', cellWidth),
          createCell('Date Reviewed:', data.dateReviewed || '', cellWidth),
        ],
      }),
    ],
  });
}
