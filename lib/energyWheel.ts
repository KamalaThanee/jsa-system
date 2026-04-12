import { EnergyCategory } from '@/types';

export interface EnergyWheelItem {
  category: EnergyCategory;
  color: string;
  icon: string;
  hazards: string[];
  examples: string[];
}

export const ENERGY_WHEEL: EnergyWheelItem[] = [
  {
    category: 'Mechanical',
    color: '#4A90E2',
    icon: '⚙️',
    hazards: [
      'Pinch points',
      'Crushing',
      'Shearing',
      'Entanglement',
      'Struck by objects',
      'Cutting/sharp edges',
      'Rotating equipment',
      'Material handling',
    ],
    examples: [
      'Crane operations',
      'Winches and hoists',
      'Hand tools',
      'Moving machinery',
      'Lifting equipment',
    ],
  },
  {
    category: 'Electrical',
    color: '#F5A623',
    icon: '⚡',
    hazards: [
      'Electrocution',
      'Electric shock',
      'Arc flash',
      'Burns',
      'Fire from electrical fault',
      'Static electricity',
      'Exposed conductors',
    ],
    examples: [
      'Power tools',
      'Electrical panels',
      'Welding equipment',
      'Portable generators',
      'Lighting systems',
    ],
  },
  {
    category: 'Thermal',
    color: '#E74C3C',
    icon: '🔥',
    hazards: [
      'Burns',
      'Fire',
      'Heat exhaustion',
      'Heat stroke',
      'Cold stress',
      'Hypothermia',
      'Hot surfaces',
      'Steam release',
    ],
    examples: [
      'Hot work (welding, cutting)',
      'Engines',
      'Exhaust systems',
      'Steam lines',
      'Galley equipment',
    ],
  },
  {
    category: 'Chemical',
    color: '#9B59B6',
    icon: '🧪',
    hazards: [
      'Toxic exposure',
      'Corrosion',
      'Asphyxiation',
      'Poisoning',
      'Skin/eye irritation',
      'Inhalation hazards',
      'Chemical burns',
      'Reactive materials',
    ],
    examples: [
      'Cleaning chemicals',
      'Paints and coatings',
      'Fuels and lubricants',
      'Hydraulic fluids',
      'Refrigerants',
    ],
  },
  {
    category: 'Radiation',
    color: '#16A085',
    icon: '☢️',
    hazards: [
      'UV exposure',
      'Ionizing radiation',
      'Non-ionizing radiation',
      'Laser exposure',
      'Microwave exposure',
      'Sunburn',
      'Eye damage',
    ],
    examples: [
      'Welding arc',
      'Sun exposure',
      'Radio equipment',
      'Radar systems',
      'X-ray equipment (if applicable)',
    ],
  },
  {
    category: 'Biological',
    color: '#27AE60',
    icon: '🦠',
    hazards: [
      'Bacterial infection',
      'Viral infection',
      'Fungal infection',
      'Parasites',
      'Contaminated water',
      'Food poisoning',
      'Marine organisms',
      'Bloodborne pathogens',
    ],
    examples: [
      'Wastewater exposure',
      'Food handling',
      'First aid situations',
      'Marine life contact',
      'Contaminated surfaces',
    ],
  },
  {
    category: 'Gravitational',
    color: '#34495E',
    icon: '⬇️',
    hazards: [
      'Falls from height',
      'Falling objects',
      'Slips and trips',
      'Working at height',
      'Unguarded edges',
      'Inadequate access',
      'Dropped objects',
    ],
    examples: [
      'Working on deck',
      'Ladder access',
      'Scaffolding',
      'Overhead work',
      'Helicopter operations',
    ],
  },
  {
    category: 'Pressure',
    color: '#E67E22',
    icon: '💨',
    hazards: [
      'Pressure vessel failure',
      'Compressed gas release',
      'Hydraulic line failure',
      'Over-pressurization',
      'Vacuum collapse',
      'Stored energy release',
      'Flying debris',
    ],
    examples: [
      'Hydraulic systems',
      'Pneumatic tools',
      'Gas cylinders',
      'Air compressors',
      'Pressure testing',
    ],
  },
  {
    category: 'Motion',
    color: '#3498DB',
    icon: '🔄',
    hazards: [
      'Vessel motion',
      'Seasickness',
      'Loss of balance',
      'Man overboard',
      'Equipment shift',
      'Unsecured loads',
      'Dynamic positioning failure',
    ],
    examples: [
      'Rough weather operations',
      'Cargo securing',
      'Personnel transfer',
      'Lifting operations in swell',
      'Working on moving vessel',
    ],
  },
  {
    category: 'Sound',
    color: '#8E44AD',
    icon: '🔊',
    hazards: [
      'Hearing loss',
      'Tinnitus',
      'Communication interference',
      'Stress/fatigue',
      'Inability to hear alarms',
      'Noise-induced vibration',
    ],
    examples: [
      'Machinery spaces',
      'Pneumatic tools',
      'Engines running',
      'Drilling operations',
      'Helicopter operations',
    ],
  },
];

export const getEnergyCategory = (category: EnergyCategory): EnergyWheelItem | undefined => {
  return ENERGY_WHEEL.find((item) => item.category === category);
};

export const getAllHazards = (): string[] => {
  return ENERGY_WHEEL.flatMap((item) => item.hazards);
};
