// JSA System Types
export type SeverityLevel = 1 | 2 | 3 | 4 | 5;
export type LikelihoodLevel = 'A' | 'B' | 'C' | 'D' | 'E';
export type RiskLevel = 'LOW' | 'MED' | 'HIGH';

export interface RiskAssessment {
  severity: SeverityLevel;
  likelihood: LikelihoodLevel;
  riskLevel: RiskLevel;
}

export interface JobStep {
  no: number;
  description: string;
  potentialHazards: string[];
  initialRisk: RiskAssessment;
  controlMeasures: string[];
  responsibility: string;
  residualRisk: RiskAssessment;
}

export interface JSAData {
  vesselCode: string;
  vesselName: string;
  client: string;
  vesselLocation: string;
  jobDescription: string;
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
  date: string;
  windSpeed: string;
  currentDirection: string;
  visibility: string;
  jsaNumber: string;
  frequency: string;
  ppe: string;
  onboardLocation: string;
  generalNotes: string;
  jobSteps: JobStep[];
  assessors: string;
  dateAssessed: string;
  reviewedByPerson: string;
  dateReviewed: string;
  masterSignature: string;
}

// Chevron Energy Wheel Categories
export type EnergyCategory =
  | 'Mechanical'
  | 'Electrical'
  | 'Thermal'
  | 'Chemical'
  | 'Radiation'
  | 'Biological'
  | 'Gravitational'
  | 'Pressure'
  | 'Motion'
  | 'Sound';

export interface HazardIdentification {
  category: EnergyCategory;
  hazards: string[];
  description: string;
}

// AI Analysis Request/Response
export interface AIAnalysisRequest {
  jobDescription: string;
  vesselType: string;
  workLocation: string;
}

export interface AIAnalysisResponse {
  jobSteps: Array<{
    stepNumber: number;
    description: string;
    hazards: Array<{
      category: EnergyCategory;
      hazard: string;
      description: string;
    }>;
    initialSeverity: SeverityLevel;
    initialLikelihood: LikelihoodLevel;
    controlMeasures: string[];
    residualSeverity: SeverityLevel;
    residualLikelihood: LikelihoodLevel;
    responsibility: string;
  }>;
}
