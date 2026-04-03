import { ConfigType } from './types/config';

const tenantId = process.env.EXPO_PUBLIC_TENANT_ID;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const roleId = process.env.EXPO_PUBLIC_ROLE_ID;

if (!tenantId) {
  throw new Error('EXPO_PUBLIC_TENANT_ID is not defined');
}

if (!roleId) {
  throw new Error('EXPO_PUBLIC_ROLE_ID is not defined');
}

if (!apiUrl) {
  throw new Error('EXPO_PUBLIC_API_URL is not defined');
}

export const config: ConfigType = {
  tenantId,
  roleId,
  apiUrl,
};
