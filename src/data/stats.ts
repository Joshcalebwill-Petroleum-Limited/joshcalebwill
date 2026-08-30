export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

export const impactStats: StatItem[] = [
  {
    value: 15,
    suffix: "+",
    label: "Years of Excellence",
    description: "Delivering energy solutions across Africa",
  },
  {
    value: 200,
    suffix: "+",
    label: "Projects Delivered",
    description: "Engineering, logistics and field operations",
  },
  {
    value: 12,
    suffix: "+",
    label: "Countries & Regions",
    description: "Pan-African operational footprint",
  },
  {
    value: 98,
    suffix: "%",
    label: "Safety Performance",
    description: "Commitment to zero-harm operations",
  },
];
