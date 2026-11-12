import { ExpoConfig, ConfigContext } from "expo/config";

const APP_VERSION = '1.2.3';

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
                "backgroundColor": "#000000",
                "image": "./assets/images/splashScreen.png",
                "dark": {
                    "image": "./assets/images/splashScreen.png",
                    "backgroundColor": "#000000"
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