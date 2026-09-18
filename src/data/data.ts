import type { VitalStat } from "../types/types";
import { FlaskIcon, HeartIcon, ShieldIcon } from "../assets/svgs";

export const vitalStats: VitalStat[] = [
  {
    id: 'vitals',
    icon: HeartIcon,
    label: 'Vitals',
    sublabel: 'Latest measurement',
    badge: { text: 'Verified', tone: 'verified' },
    value: '120/80',
    unit: 'mmHg',
    detail: 'Blood Pressure • Heart Rate: 72 bpm',
    meta: 'Recorded 2 hours ago',
    linkText: 'History',
  },
  {
    id: 'conditions',
    icon: ShieldIcon,
    label: 'Active Conditions',
    sublabel: 'Managed diagnoses',
    badge: { text: 'Managed', tone: 'managed' },
    value: 'Type 2 Diabetes',
    detail: 'Stable regimen • Diet & Metformin 500mg',
    meta: 'Diagnosed Jan 2021',
    linkText: 'Details',
  },
  {
    id: 'labs',
    icon: FlaskIcon,
    label: 'Lab Results',
    sublabel: 'Pathology report',
    badge: { text: 'Doctor Verified', tone: 'verified' },
    value: 'HbA1c 6.8%',
    detail: 'Target achieved (< 7.0%) • Panel #9821',
    meta: 'Yesterday, 09:30 AM',
    linkText: 'View PDF',
    metaTone: 'success',
  },
];