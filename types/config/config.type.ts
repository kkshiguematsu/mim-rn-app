import { ImageSourcePropType } from 'react-native';

export interface ConfigType {
  appEnv: string;
  googleApiKey: string;
  tenantLogo: ImageSourcePropType;
  tenantId: string;
  roleId: string;
  apiUrl: string;
  tenantTheme: any;
}
