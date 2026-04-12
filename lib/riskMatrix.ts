import { SeverityLevel, LikelihoodLevel, RiskLevel } from '@/types';

// Risk Matrix based on company standard
const RISK_MATRIX: Record<SeverityLevel, Record<LikelihoodLevel, RiskLevel>> = {
  1: { A: 'LOW', B: 'LOW', C: 'LOW', D: 'LOW', E: 'LOW' },
  2: { A: 'LOW', B: 'LOW', C: 'LOW', D: 'LOW', E: 'MED' },
  3: { A: 'LOW', B: 'LOW', C: 'MED', D: 'MED', E: 'MED' },
  4: { A: 'MED', B: 'MED', C: 'HIGH', D: 'HIGH', E: 'HIGH' },
  5: { A: 'HIGH', B: 'HIGH', C: 'HIGH', D: 'HIGH', E: 'HIGH' },
};

export const calculateRisk = (
  severity: SeverityLevel,
  likelihood: LikelihoodLevel
): RiskLevel => {
  return RISK_MATRIX[severity][likelihood];
};

export const getSeverityDescription = (level: SeverityLevel): string => {
  const descriptions: Record<SeverityLevel, string> = {
    1: 'Insignificant - Minor injury (onsite treatment)',
    2: 'Minor - First aid treatment required',
    3: 'Serious - Recordable injury',
    4: 'Extensive - Lost Time Injury (LTI)',
    5: 'Fatality',
  };
  return descriptions[level];
};

export const getLikelihoodDescription = (level: LikelihoodLevel): string => {
  const descriptions: Record<LikelihoodLevel, string> = {
    A: 'Very Low - Once in > 10 Years',
    B: 'Low - Annually',
    C: 'Medium - 6 Monthly',
    D: 'High - Monthly',
    E: 'Very High - Daily',
  };
  return descriptions[level];
};

export const getRiskColor = (risk: RiskLevel): string => {
  const colors: Record<RiskLevel, string> = {
    LOW: 'bg-green-100 text-green-800 border-green-300',
    MED: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    HIGH: 'bg-red-100 text-red-800 border-red-300',
  };
  return colors[risk];
};

export const getRiskGuidance = (risk: RiskLevel): string => {
  const guidance: Record<RiskLevel, string> = {
    LOW: 'Acceptable but Tool Box Talk to be conducted to see if risk can be further reduced. If working alone Personal Risk Assessment to be carried out before starting the work.',
    MED: 'Only proceed with express authorisation of Master or responsible manager after full JSA carried out with all parties involved. Wherever possible the risk should be further reduced prior to the task being carried out. Proceed with the utmost caution.',
    HIGH: 'Task must not proceed under normal circumstances.',
  };
  return guidance[risk];
};

// Severity levels for different impact categories
export interface SeverityImpact {
  people: string;
  asset: string;
  environment: string;
  business: string;
}

export const getSeverityImpacts = (level: SeverityLevel): SeverityImpact => {
  const impacts: Record<SeverityLevel, SeverityImpact> = {
    1: {
      people: 'Insignificant injury (onsite treatment)',
      asset: 'Insignificant damage < $1,000 USD',
      environment: 'Insignificant spill contained in drip tray, < 1 litre',
      business: 'No disruption to business, no negative media attention',
    },
    2: {
      people: 'Minor injury (1st aid treatment)',
      asset: 'Minor damage < $5,000 USD',
      environment: 'Minor spill contained on deck < 10 litres',
      business: 'Limited disruption (1 day), slight negative media exposure',
    },
    3: {
      people: 'Serious injury (recordable)',
      asset: 'Serious damage < $15,000 USD, vessel stability unimpaired',
      environment: 'Minor spill, sea pollution, < 10 litres',
      business: 'Short term disruption (3 days), local negative media exposure',
    },
    4: {
      people: 'Extensive injuries (LTI)',
      asset: 'Major damage < $50,000 USD, vessel stability impaired',
      environment: 'Significant spill, sea pollution, < 1000 litres',
      business: 'Medium disruption (1 week), area significant negative media focus',
    },
    5: {
      people: 'Fatality',
      asset: 'Extensive damage/sinking vessel total loss',
      environment: 'Major spill, sea pollution, > 1000 litres',
      business: 'Long term business disruption (> 1 week), major (global) media focus',
    },
  };
  return impacts[level];
};
