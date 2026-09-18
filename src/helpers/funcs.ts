import type { BadgeTone } from "../types/types";


export function initials(name: string) {
  return name
    .split(' ')
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export const badgeToneClasses: Record<BadgeTone, string> = {
  verified: 'bg-emerald-50 text-emerald-700',
  managed: 'bg-emerald-50 text-emerald-700',
  active: 'bg-emerald-50 text-emerald-700',
  expired: 'bg-gray-100 text-gray-500',
  realtime: 'bg-teal-100 text-teal-900',
};