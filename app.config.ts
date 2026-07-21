type TenantProfile = 'tenant-bionova-production' | 'development';

const EAS_PROJECT_ID = '24d21ca9-79bb-4cc1-8d76-39aad31cb190';
const PROJECT_SLUG = 'mim-rn-app';
const OWNER = 'mim-tecnologia';

const tenantConfigs = {
  'tenant-bionova-production': {
    name: 'Bionova Carregadores',
    scheme: 'mimbionova',
    package: 'com.mim.bionova',
    bundleIdentifier: 'com.mim.bionova',
    icon: './assets/images/bionova/icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/images/bionova/adaptive-icon.png',
      backgroundImage: './assets/images/bionova/adaptive-icon.png',
      monochromeImage: './assets/images/bionova/adaptive-icon.png',
      backgroundColor: '#0c0d3a',
    },
    splash: {
      image: './assets/images/bionova/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#0c0d3a',
    },
  },

  development: {
    name: 'MIM Dev',
    scheme: 'mimrnapp',
    package: 'com.anonymous.mimrnapp',
    bundleIdentifier: 'com.anonymous.mimrnapp',
    icon: './assets/images/mim/icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/images/mim/adaptive-icon.png',
      backgroundImage: './assets/images/mim/adaptive-icon.png',
      monochromeImage: './assets/images/mim/adaptive-icon.png',
      backgroundColor: '#0A4669',
    },
    splash: {
      image: './assets/images/mim/splash.png',
      backgroundColor: '#0A4669',
    },
  },
};

export default () => {
  const buildProfile = (process.env.EXPO_PUBLIC_APP_ENV || 'development') as TenantProfile;
  const tenantConfig = tenantConfigs[buildProfile] || tenantConfigs.development;

  return {
    expo: {
      name: tenantConfig.name,
      slug: PROJECT_SLUG,
      scheme: tenantConfig.scheme,
      icon: tenantConfig.icon,

      version: '1.0.0',
      orientation: 'portrait',
      userInterfaceStyle: 'automatic',
      newArchEnabled: true,

      ios: {
        supportsTablet: true,
        bundleIdentifier: tenantConfig.bundleIdentifier,
        infoPlist: {
          NSLocationWhenInUseUsageDescription:
            'Precisamos de sua localização para mostrar você no mapa.',
        },
        config: {
          googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        },
      },

      android: {
        package: tenantConfig.package,
        config: {
          googleMaps: {
            apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          },
        },
        adaptiveIcon: tenantConfig.adaptiveIcon,
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
        permissions: [
          'android.permission.ACCESS_COARSE_LOCATION',
          'android.permission.ACCESS_FINE_LOCATION',
        ],
      },

      web: {
        output: 'static',
        favicon: './assets/images/favicon.png',
      },

      plugins: [
        'expo-notifications',
        'expo-router',
        [
          'expo-splash-screen',
          {
            image: tenantConfig.splash.image,
            backgroundColor: tenantConfig.splash.backgroundColor,
            imageWidth: 200,
            resizeMode: 'contain',
            dark: {
              image: tenantConfig.splash.image,
              backgroundColor: tenantConfig.splash.backgroundColor,
            },
          },
        ],
        'expo-font',
        [
          'expo-location',
          {
            locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
          },
        ],
        'expo-web-browser',
      ],

      experiments: {
        typedRoutes: true,
        reactCompiler: true,
      },

      extra: {
        router: {},
        tenantId: process.env.EXPO_PUBLIC_TENANT_ID,
        roleId: process.env.EXPO_PUBLIC_ROLE_ID,
        apiUrl: process.env.EXPO_PUBLIC_API_URL,
        googleApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        eas: {
          projectId: EAS_PROJECT_ID,
        },
      },

      owner: OWNER,
      runtimeVersion: {
        policy: 'appVersion',
      },
      updates: {
        url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
      },
    },
  };
};
