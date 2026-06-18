export const ENG_LOCALIZATION = {
  TABS: {
    HOME: "Home",
    BARBERS: "Barbers",
    APPOINTMENTS: "Appointments",
    SETTINGS: "Settings",
  },
  Authorization: {
    error: "You are logged in on another device.",
  },
  code: "en",
  HOME: {
    startBtn: "Get Started",
    reviews: "Reviews",
    contact: "Contact",
    aboutUs: "Visit us",
    bookingBtn: "Booking",
    bookingBtnDesc: "Book Your Spot",
    aboutUsBtn: "About Us",
    aboutUsBtnDesc: "Our Story",
    locationBtn: "Location",
    locationBtnDesc: "Where Am I?",
  },
  GOOGLE_BTN: {
    label: "Sign in with Google",
  },
  APPLE_BTN: {
    label: "Sign in with Apple",
  },
  BUTTONS: {
    ok: "OK",
    cancel: "Cancel",
  },
  COMPANY: {
    error: "Company data not available",
  },
  BARBERS: {
    title: "Choose barber",
    error: "Emmployers data not available",
    notFound: "No barbers available",
    network: "Something went wrong, please try again later",
  },
  PLACES: {
    title: "Choose location",
    error: "Locations data not available",
    close: "Close",
    network: "Something went wrong, please try again later",
    noFound: "Locations are not available",
  },
  DATE: {
    title: "Choose date",
    holidaySunday: "We don't work on Sundays",
    noAvailableDates: "No appointments for the chosen date",
    chooseDate: "Choose date",
    continue: "Continue",
    book: "Book",
    detailsReservation: "Enter details here..",
  },
  SALON: {
    title: "Salon Rules:",
    first:
      "1. Maximum delay allowed is 5 minutes. After that, the appointment is considered missed!",
    second:
      "2. Cancellations must be made at least 180 minutes before the appointment.",
    success: "Your appointment is successfully booked!",
    pendingTitle: `All set! Your request has been sent.`,
    pendingSubTitle: "Your barber will reply soon.",
  },
  SERVICES: {
    title: "Pricing & Services",
    errorFetch: "An unexpected error occurred while fetching services.",
    notAvailable: "Appointments cannot currently be scheduled at the selected location.",
  },
  DETAILS: {
    price: "Price",
    duration: "Duration",
    mark: "Reviews",
  },
  TIMES: {
    error:
      "Both employer and a service must be selected before fetching available slots.",
    errorFetch: "Slots data not available.",
  },

  APPOINTMENTS: {
    pending:"Pending",
    rejected:"Rejected",
    approved:"Approved",
    noLogin: "You're just a few clicks away from your appointments.",
    login: "Please login here",
    error: "You don't have any reservations",
    distinctReservation:
      "This time slot is already booked. Please choose another time.",
    errorDailyLimit: "You have reached a maximum number of bookings for today",
    errorWeeklyLimit:
      "You have reached a maximum number of bookings for this week",
    errorMonthlyLimit:
      "You have reached a maximum number of bookings for this month",
    errorYearlyLimit:
      "You have reached a maximum number of bookings for this year",
    errorId: "Reservation data not available.",
    title: "Reservations",
    postError: "Error while creating reservation.",

    cancelReservation: {
      cancelButton: "Cancel",
      cancelQuestion: "Are you sure you want to cancel this reservation?",
      yesButton: "Yes",
      noButton: "No",
      confirmMessage: "Reservation is cancelled successfully",
      errorMessage: "Reservation does not exist",
    },
    rateReservation: {
      descReservation: "Instructions",
      descRateReservation: "Comment",
      rateButton: "Rate",
      rateQuestion: "Are you sure you want to rate this reservation?",
      yesButton: "Yes",
      noButton: "No",
      rated: "Rated",
      rateUs: "Rate us",
      rateOurBarber: "Rate our barber",
      rateOurCut: "Rate your experience",
      rateExplanation: "Add a comment...",
      ratedInfo: "You rated this appointment",
      confirmMessage: "Reservation is rated successfully",
      errorMessage: "Reservation does not exist",
    },
    errorFetch: "Error while fetching reservations",
    errorFetchId: "Error while fetching information for current reservation",
    description: "Your description",
    placeholderDescription: "Enter your description...",
    errorFields: "Missing reservation details. Please check your selection.",
  },
  INITIAL: {
    error: "Error while fetching initial data",
  },
  SETTINGS: {
    clickHere: "Click here to Log in",
    changeLanguage: {
      capture: "Change language",
      filterCapture: "Search",
      label: {
        eng: "English",
        srb: "Serbian",
      },
    },
    LOGOUT: {
      title: "Logout",
      question: "Are you sure you want to log out?",
      leave: "Leave",
      cancel: "Cancel",
    },
    HELP: {
      title: "Help & Support",
      company: "Company:",
      support: "Email Support",
    },
    LEGAL: {
      title: "Legal & Policy",

      paragraph: `Our application allows users to easily book appointments with available service providers — however, appointments can only be scheduled by the service providers themselves, and users can reserve them. Users also have the option to cancel their appointments if needed.

For your convenience, the application sends push notifications as reminders for upcoming appointments, using the Firebase notification system.

Note: The application does not integrate with calendars and does not support appointment rescheduling, only cancellations.`,
      policyTitle: "Privacy Policy",
      policy: `Your privacy is our priority. The application collects and processes users’ personal data solely for the purpose of enabling appointment booking and cancellation, as well as sending push notifications via Firebase services. Data will not be shared with third parties without your consent.

All data is stored in accordance with relevant personal data protection laws. By using the application, you agree to the terms of this privacy policy.`,
      conditionTitle: `Terms of Use`,
      condition: `This application serves for viewing and canceling appointments set by service providers. Appointment scheduling is performed exclusively by the service providers, while users can reserve and cancel appointments through the application.

Users are responsible for the accuracy of the data entered when reserving and canceling appointments. The application is not responsible for any changes or cancellations made by the service providers.

We reserve the right to modify the terms of use at any time, and users will be notified of such changes in a timely manner.`,
      footerBottom: "All rights reserved ©",
    },
    ABOUTAPP: {
      title: "About Application",
      name: "App Name:",
      version: "Version:",
      dev: "Developed by:",
    },
    PROFILE: {
      email: "Your email",
      phoneNumber: "Your phone number",
      errorPhoneNumber: "Please enter a valid phone number.",
      name: "Your name",
      placeholderName: "Enter your name",
      loading: "Submitting...",
      btnText: "Submit",
      messageConfirm: "User updated successfully",
      notDataChanged: "Failed to update user data",
    },
    ERROR: {
      label: "Error while updating user data",
      imageError: "Upload failed",
    },
  },
  INTERNET: {
    error: "Please check your network connection.",
    title: "No Internet",
  },
  LOGIN: {
    noToken: "Something went wrong, please try again later",
    noLanguage: "Language code not available",
    title: "Let's get you Login!",
    description: "Enter your information below",
    or: "Or Login With",
    email: "Otp code is sent to your email successfully",
    errorEmail: "Error while sending email",
    isVerified:
      "Your account is not verified yet. Verification code will be sent to your email.",
    forgot: "Forgot password?",
    submitBtn: "Login",
    question: "Don't have an account?",
    CTA: "Register Now",
    error: "Please enter both email and password",
    success: "Login Successful!",
    errorToken: "Something went wrong, please try again later",
    missingToken: "Session expired. Please log in again.",
    notMatch: "Entered passwords do not match.",
    errorFields: "Incorrect email or password",
    errorPass: "Incorrect password",
    successVerified:
      "Account verification completed successfully. Please log in to continue.",
    expiredVerification: "Invalid or expired verification code.",
    alreadyVerify: "User already verified.",
  },
  CHANGE_PASS: {
    mainTitle: "Enter New Password",
    success: "Successfully updated password",
    error: "Error while updating password",
  },
  EMAIL: {
    label: "Email",
    placeholder: "Enter your email",
    errorValid: "Please enter a valid email address.",
    errorEmpty: "Please enter your email.",
    errorFound: "Entered email not found",
  },
  PASSWORD: {
    label: "Password",
    placeholder: "Enter your password",
    errorRegex:
      "Password has to start with letter and has to be at least 8 characters long, one uppercase letter, one number, and one special character.",
  },
  REGISTER: {
    title: "Register your account",
    emailError: "The provided email address is already in use.",
    description: "Enter your information below",

    submitBtn: "Register",
    question: "Already have an account?",
    CTA: "Login",
    error: "Please fill in all fields",
    success: "Registration successfull!",
    postError: "Error while registering user...",
    createUser:
      "User registered successfully! Now, please verify your account.",
  },
  CONFIRM_PASSWORD: {
    label: "Re-Enter password",
    placeholder: "Confirm your password",
  },
  NAME: {
    label: "Name",
    placeholder: "Enter your name",
  },
  PHONENUMBER: {
    label: "Phone number",
    placeholder: "Enter your phone number",
  },
  SERVER_RESPONSE: {
    notFound: "Something went wrong, please try again later",
    error: "Something Went Wrong, please try again later",
  },
  OK: {
    label: "OK",
  },
  OTP_CODE: {
    codeResend: "Resend code in",
    codeResendCapture: "Resend code",
    mainTitle: "Enter Verification Code",
    validCode: "Please fill in all 6 digits.",
    validError: "Entered code is not valid",
    validSuccess: "Entered code is valid",
    subtitlePrimary: "Verification code has been sent to",
    subtitleSecondary: "If you didn't find the email, check your SPAM mailbox.",
  },
  SUBMIT: {
    label: "Submit",
  },
  FORGOT_PASSWORD: {
    title: "Forgot Password",
    subtitle: "Please enter the email address associated with your account",
    submitBtn: "Send verification code",
  },
};
