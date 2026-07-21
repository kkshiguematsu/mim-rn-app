import { ConfigType } from '@/types/config/config.type';
import { AppEnvironment, getTenantTheme, TENANT_LOGOS } from './tenant/tenant-assets';

const appEnv = process.env.EXPO_PUBLIC_APP_ENV;
const tenantId = process.env.EXPO_PUBLIC_TENANT_ID;
const googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const roleId = process.env.EXPO_PUBLIC_ROLE_ID;

if (!appEnv) {
  throw new Error('EXPO_PUBLIC_APP_ENV is not defined');
}

if (!tenantId) {
  throw new Error('EXPO_PUBLIC_TENANT_ID is not defined');
}

if (!roleId) {
  throw new Error('EXPO_PUBLIC_ROLE_ID is not defined');
}

if (!apiUrl) {
  throw new Error('EXPO_PUBLIC_API_URL is not defined');
}

if (!googleApiKey) {
  throw new Error('EXPO_PUBLIC_GOOGLE_API_KEY is not defined');
}

if (!appEnv) {
  throw new Error('EXPO_PUBLIC_APP_ENV is not defined');
}

const tenantLogo = TENANT_LOGOS[appEnv as AppEnvironment];
const tenantTheme = getTenantTheme(appEnv as AppEnvironment);

if (!tenantLogo) {
  throw new Error(
    `Logo not found for EXPO_PUBLIC_APP_ENV: ${appEnv}. Available environments: ${Object.keys(TENANT_LOGOS).join(', ')}`
  );
}

export const config: ConfigType = {
  googleApiKey,
  tenantLogo,
  tenantTheme,
  tenantId,
  roleId,
  apiUrl,
  appEnv,
};
