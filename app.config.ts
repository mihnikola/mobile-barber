import { ExpoConfig, ConfigContext } from "expo/config";

const APP_VERSION = '1.2.3';

/**
 * Brand (look) of this build: `BRAND=atelier npx expo start` / EAS env. Default gentleman.
 * The app reads it from `extra.brand` (theme/brands). Splash backgrounds = the brand's bg tokens.
 */
const BRAND = process.env.BRAND === "atelier" ? "atelier" : "gentleman";
const SPLASH_BG = {
    gentleman: { light: "#F5F4F1", dark: "#0F0F0F" },
    atelier: { light: "#FBF6F1", dark: "#1A1215" },
}[BRAND];

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "Barber App",
    slug: "fta-barber-mob-app",
    version: APP_VERSION,
    orientation: "portrait",
    icon: "./assets/images/adaptive-icon.png",
    userInterfaceStyle: "automatic",
    scheme: "myapp",
    ios: {
        entitlements: {
            "com.apple.developer.applesignin": ["Default", "Default"],
        },
        bundleIdentifier: "fta.barber.app",
        supportsTablet: true,
        googleServicesFile: process.env.GOOGLE_SERVICE_INFO_PLIST || "./firebase/GoogleService-Info.plist",
        infoPlist: {
            ITSAppUsesNonExemptEncryption: false,
        },
    },
    android: {
        package: "fta.barber.app",
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON || "./firebase/google-services.json",
    },
    plugins: [
        "@react-native-firebase/app",
        "@react-native-firebase/messaging",
        "expo-router",
        [
            "expo-splash-screen",
            {
                // splashScreen.png is fully transparent: the native splash is just the theme background,
                // the logo comes from the JS splash (app/index.tsx). Colors = DS bg (light / dark).
                "backgroundColor": SPLASH_BG.light,
                "image": "./assets/images/splashScreen.png",
                "dark": {
                    "image": "./assets/images/splashScreen.png",
                    "backgroundColor": SPLASH_BG.dark
                },
                "imageWidth": 200
            }
        ],
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
                    // Firebase Apple SDK is SPM-only. Static frameworks embed a copy of
                    // those packages in each RNFB pod and fail pod install with duplicate symbols.
                    useFrameworks: "dynamic",
                },
            },
        ],
        // Local Gradle tuning (heap + build cache), see PROJECT.md section 4.1
        "./plugins/withAndroidBuildSpeed",

    ],
    extra: {
        brand: BRAND,
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
    runtimeVersion: APP_VERSION
});