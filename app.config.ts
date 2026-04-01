import { ConfigType } from './types/config';

const tenantId = process.env.EXPO_PUBLIC_TENANT_ID;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!tenantId) {
  throw new Error('EXPO_PUBLIC_TENANT_ID is not defined');
}

if (!apiUrl) {
  throw new Error('EXPO_PUBLIC_API_URL is not defined');
}

export const config: ConfigType = {
  tenantId,
  apiUrl,
};
