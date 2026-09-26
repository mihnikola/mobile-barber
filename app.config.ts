import { ExpoConfig, ConfigContext } from "expo/config";

const APP_VERSION = "1.1.5";
const BRAND_BACKGROUND_COLOR = "#6e412a"; // Unificirana boja pozadine salona

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "BookHair",
  slug: "fta-barber-mob-app",
  version: APP_VERSION,
  orientation: "portrait",
  icon: "./assets/images/logoFrizer.png",
  // 1. ZAKLJUČAVANJE LIGHT MODA (Sprečava OS da ubacuje crnu temu)
  userInterfaceStyle: "light",
  backgroundColor: BRAND_BACKGROUND_COLOR,
  splash: {
    image: "./assets/images/logoFrizer.png",
    resizeMode: "contain",
    backgroundColor: BRAND_BACKGROUND_COLOR,
  },
  scheme: "myapp",
  ios: {
    userInterfaceStyle: "light",
    backgroundColor: BRAND_BACKGROUND_COLOR,
    entitlements: {
      "com.apple.developer.applesignin": ["Default", "Default"],
    },
    bundleIdentifier: "fta.barber.app",
    supportsTablet: true,
    googleServicesFile:
      process.env.GOOGLE_SERVICE_INFO_PLIST ||
      "./firebase/GoogleService-Info.plist",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    userInterfaceStyle: "light",
    backgroundColor: BRAND_BACKGROUND_COLOR, // Natativni Android background pri preusmeravanjima
    package: "fta.barber.app",
    googleServicesFile:
      process.env.GOOGLE_SERVICES_JSON || "./firebase/google-services.json",
  },
  plugins: [
    "@react-native-firebase/app",
    "@react-native-firebase/messaging",
    "expo-router",
    [
      "@react-native-google-signin/google-signin",
      {
        iosUrlScheme:
          "com.googleusercontent.apps.284831110803-u696dssmapohte49619rhmsdlselgmfg",
      },
    ],
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
          podfileProperties: {
            "use_modular_headers!": true,
          },
          buildReactNativeFromSource: true,
        },
      },
    ],
  ],
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "941cbfd2-53f9-4a71-b399-0133e55dcfa0",
    },
  },
  owner: "fusion-tech-agency",
  updates: {
    url: "https://u.expo.dev/941cbfd2-53f9-4a71-b399-0133e55dcfa0",
  },
  runtimeVersion: APP_VERSION,
});
