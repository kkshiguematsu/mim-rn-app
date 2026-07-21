import { TENANT_THEMES } from './tenant-theme';

export const TENANT_LOGOS = {
  development: require('@/assets/images/mim/icon.png'),
  'tenant-bionova-production': require('@/assets/images/bionova/icon.png'),
} as const;

export type AppEnvironment = keyof typeof TENANT_LOGOS;

export const getTenantTheme = (appEnv: AppEnvironment) => {
  const theme = TENANT_THEMES[appEnv];

  if (!theme) {
    throw new Error(
      `Theme not found for APP_ENV: ${appEnv}. Available environments: ${Object.keys(TENANT_THEMES).join(', ')}`
    );
  }

  return theme;
};
