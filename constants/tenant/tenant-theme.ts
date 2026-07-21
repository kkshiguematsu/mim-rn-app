import { vars } from 'nativewind';
import { baseColorsDark, baseColorsLight } from '../theme';

const mimColorsLight = {
  '--color-primary-50': '248 250 252',
  '--color-primary-100': '237 244 248',
  '--color-primary-200': '219 232 240',
  '--color-primary-300': '179 217 239',
  '--color-primary-400': '107 181 225',
  '--color-primary-500': '20 143 214',
  '--color-primary-600': '16 112 168',
  '--color-primary-700': '18 85 124',
  '--color-primary-800': '13 61 89',
  '--color-primary-900': '9 40 58',
  '--color-primary-950': '5 24 36',

  '--color-secondary-0': '230 249 251',
  '--color-secondary-50': '204 243 246',
  '--color-secondary-100': '153 230 236',
  '--color-secondary-200': '102 215 225',
  '--color-secondary-300': '51 190 210',
  '--color-secondary-400': '15 150 180',
  '--color-secondary-500': '0 126 141',
  '--color-secondary-600': '0 100 112',
  '--color-secondary-700': '0 80 90',
  '--color-secondary-800': '0 60 68',
  '--color-secondary-900': '0 40 45',
  '--color-secondary-950': '0 25 28',
};

const mimColorsDark = {
  '--color-primary-0': '210 235 245',
  '--color-primary-50': '185 225 238',
  '--color-primary-100': '160 210 230',
  '--color-primary-200': '120 190 215',
  '--color-primary-300': '80 165 195',
  '--color-primary-400': '35 130 165',
  '--color-primary-500': '10 70 105',
  '--color-primary-600': '8 55 85',
  '--color-primary-700': '6 45 70',
  '--color-primary-800': '5 35 55',
  '--color-primary-900': '4 28 45',
  '--color-primary-950': '3 22 35',

  '--color-secondary-0': '200 235 240',
  '--color-secondary-50': '170 225 230',
  '--color-secondary-100': '135 210 220',
  '--color-secondary-200': '95 190 200',
  '--color-secondary-300': '60 160 170',
  '--color-secondary-400': '25 125 140',
  '--color-secondary-500': '0 126 141',
  '--color-secondary-600': '0 105 118',
  '--color-secondary-700': '0 85 95',
  '--color-secondary-800': '0 65 73',
  '--color-secondary-900': '0 45 50',
  '--color-secondary-950': '0 30 33',
};

// Tenant Bionova - apenas as cores primary/secondary
const bionovaColorsLight = {
  '--color-primary-50': '240 241 250',
  '--color-primary-100': '220 222 245',
  '--color-primary-200': '185 189 235',
  '--color-primary-300': '145 151 220',
  '--color-primary-400': '103 111 198',
  '--color-primary-500': '67 74 170',
  '--color-primary-600': '38 44 120',
  '--color-primary-700': '12 13 58', // #0c0d3a
  '--color-primary-800': '9 10 44',
  '--color-primary-900': '6 7 31',
  '--color-primary-950': '3 4 18',

  '--color-secondary-50': '254 249 231',
  '--color-secondary-100': '254 243 199',
  '--color-secondary-200': '253 234 163',
  '--color-secondary-300': '252 223 115',
  '--color-secondary-400': '252 211 62',
  '--color-secondary-500': '251 205 28',
  '--color-secondary-600': '251 199 10',
  '--color-secondary-700': '211 158 8',
  '--color-secondary-800': '168 123 10',
  '--color-secondary-900': '139 102 12',
  '--color-secondary-950': '81 56 6',
};

const bionovaColorsDark = {
  '--color-primary-0': '5 46 22',
  '--color-primary-50': '20 83 45',
  '--color-primary-100': '22 101 52',
  '--color-primary-200': '21 128 61',
  '--color-primary-300': '22 163 74',
  '--color-primary-400': '34 197 94',
  '--color-primary-500': '74 222 128',
  '--color-primary-600': '134 239 172',
  '--color-primary-700': '187 247 208',
  '--color-primary-800': '220 252 231',
  '--color-primary-900': '240 253 244',
  '--color-primary-950': '247 254 250',

  '--color-secondary-0': '81 56 6',
  '--color-secondary-50': '139 102 12',
  '--color-secondary-100': '168 123 10',
  '--color-secondary-200': '211 158 8',
  '--color-secondary-300': '251 199 10',
  '--color-secondary-400': '251 205 28',
  '--color-secondary-500': '252 211 62',
  '--color-secondary-600': '252 223 115',
  '--color-secondary-700': '253 234 163',
  '--color-secondary-800': '254 243 199',
  '--color-secondary-900': '254 249 231',
  '--color-secondary-950': '255 253 245',
};

export const TENANT_THEMES = {
  development: {
    light: vars({
      ...mimColorsLight,
      ...baseColorsLight,
    }),
    dark: vars({
      ...mimColorsDark,
      ...baseColorsDark,
    }),
  },
  'tenant-bionova-production': {
    light: vars({
      ...bionovaColorsLight,
      ...baseColorsLight,
    }),
    dark: vars({
      ...bionovaColorsDark,
      ...baseColorsDark,
    }),
  },
} as const;

export type AppEnvironment = keyof typeof TENANT_THEMES;
