/**
 * Every expo-router path in one place (Phase 4.1). Values are the exact strings the app used before.
 */
export const routes = {
  root: "/",
  tabs: "/(tabs)/",
  /** relative group name (used by the onboarding finish) */
  tabsGroup: "(tabs)",
  auth: {
    login: "/(z_auth)/",
    /** relative form, as used by the login screen's "register" link */
    register: "(z_auth)/register",
    otpCode: "/(z_auth)/otpCode",
    forgotPassword: "/(z_auth)/forgotPass",
    changePassword: "/(z_auth)/changePassword",
  },
  home: {
    root: "/(tabs)/(01_home)/",
    whoWeAre: "/(tabs)/(01_home)/whoWeAre",
  },
  booking: {
    /** relative tab name (home → booking tab) */
    tab: "(02_barbers)",
    services: "/(tabs)/(02_barbers)/services",
    moreServices: "/(tabs)/(02_barbers)/moreServices",
    employees: "/(tabs)/(02_barbers)/employers",
    calendar: "/(tabs)/(02_barbers)/calendar",
    reservation: "/(tabs)/(02_barbers)/reservation",
    success: "/(tabs)/(02_barbers)/reservationSuccess",
  },
  appointments: {
    root: "/(tabs)/(03_calendar)/",
    details: "/(reservation_notification)/",
  },
  settings: {
    root: "/(tabs)/(04_settings)/",
    userProfile: "/(tabs)/(04_settings)/userprofile",
    privacyPolicy: "/(tabs)/(04_settings)/privacypolicy",
    languageSupport: "/(tabs)/(04_settings)/languageSupport",
    helpSupport: "/(tabs)/(04_settings)/helpSupport",
    aboutApplication: "/(tabs)/(04_settings)/aboutapplication",
    theme: "/(tabs)/(04_settings)/theme",
  },
} as const;
