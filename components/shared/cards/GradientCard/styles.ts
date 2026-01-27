import { tva } from '@gluestack-ui/utils/nativewind-utils';

const setHexOpacity = (hex: string, opacity: number): string => {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${alpha}`;
};

export const GRADIENT_COLORS = {
  blue: ['#06b6d4', '#3b82f6'],
  sky: ['#0ea5e9', '#6366f1'],
  ocean: ['#3b82f6', '#2563eb'],
  green: ['#10b981', '#14b8a6'],
  emerald: ['#34d399', '#22c55e'],
  teal: ['#14b8a6', '#06b6d4'],
  purple: ['#a855f7', '#c084fc'],
  violet: ['#8b5cf6', '#a78bfa'],
  fuchsia: ['#d946ef', '#e879f9'],
  pink: ['#ec4899', '#f472b6'],
  rose: ['#f43f5e', '#fb7185'],
  amber: ['#fbbf24', '#f97316'],
  orange: ['#fb923c', '#f97316'],
  yellow: ['#facc15', '#fbbf24'],
  red: ['#ef4444', '#dc2626'],
  slate: ['#64748b', '#475569'],
  gray: ['#6b7280', '#4b5563'],
  sunset: ['#fb923c', '#ec4899'],
  oceanic: ['#06b6d4', '#10b981'],
  neon: ['#22d3ee', '#a855f7'],
  fire: ['#ef4444', '#f97316'],
  nature: ['#34d399', '#facc15'],
} as const;

export const gradientVariants = tva({
  base: 'rounded-2xl border p-6',
  variants: {
    variant: {
      blue: 'border-blue-500/20 dark:border-blue-500/30',
      sky: 'border-sky-500/20 dark:border-sky-500/30',
      ocean: 'border-blue-600/20 dark:border-blue-600/30',
      green: 'border-emerald-500/20 dark:border-emerald-500/30',
      emerald: 'border-emerald-400/20 dark:border-emerald-400/30',
      teal: 'border-teal-500/20 dark:border-teal-500/30',
      purple: 'border-purple-500/20 dark:border-purple-500/30',
      violet: 'border-violet-500/20 dark:border-violet-500/30',
      fuchsia: 'border-fuchsia-500/20 dark:border-fuchsia-500/30',
      pink: 'border-pink-500/20 dark:border-pink-500/30',
      rose: 'border-rose-500/20 dark:border-rose-500/30',
      amber: 'border-amber-500/20 dark:border-amber-500/30',
      orange: 'border-orange-500/20 dark:border-orange-500/30',
      yellow: 'border-yellow-500/20 dark:border-yellow-500/30',
      red: 'border-red-500/20 dark:border-red-500/30',
      slate: 'border-slate-500/20 dark:border-slate-500/30',
      gray: 'border-gray-500/20 dark:border-gray-500/30',
      sunset: 'border-orange-500/20 dark:border-orange-500/30',
      oceanic: 'border-cyan-500/20 dark:border-cyan-500/30',
      neon: 'border-cyan-400/20 dark:border-cyan-400/30',
      fire: 'border-red-500/20 dark:border-red-500/30',
      nature: 'border-emerald-400/20 dark:border-emerald-400/30',
    },
  },
  defaultVariants: {
    variant: 'blue',
  },
});

export type GradientVariant = keyof typeof GRADIENT_COLORS;

export const getGradientColorsWithOpacity = (
  variant: GradientVariant = 'blue',
  isDark: boolean = false
): string[] => {
  const colors = GRADIENT_COLORS[variant];
  const opacity = isDark ? 0.3 : 0.8;

  return colors.map((hex) => setHexOpacity(hex, opacity));
};

export const getGradientColors = (variant: GradientVariant = 'blue'): string[] => {
  const colors = GRADIENT_COLORS[variant];
  return colors.map((hex) => hex);
};

export const getGradientColorsCustom = (
  variant: GradientVariant = 'blue',
  lightOpacity: number = 0.3,
  darkOpacity: number = 0.1,
  isDark: boolean = false
): string[] => {
  const colors = GRADIENT_COLORS[variant];
  const opacity = isDark ? darkOpacity : lightOpacity;

  return colors.map((hex) => setHexOpacity(hex, opacity));
};
