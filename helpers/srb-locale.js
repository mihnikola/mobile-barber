export const SRB_LOCALIZATION = {
  TABS: {
    HOME: "Početna",
    BARBERS: "Zaposleni",
    APPOINTMENTS: "Rezervacije",
    SETTINGS: "Podešavanje",
  },
  BUTTONS: {
    ok: "U redu",
    cancel: "Odustani",
  },

  code: "sr",
  HOME: {
    startBtn: "Započni",
    aboutUs: "Posetite nas",
    reviews: "Recenzije",
    contact: "Kontakt",
    bookingBtn: "Rezerviši",
    bookingBtnDesc: "Rezerviši svoj termin",
    aboutUsBtn: "O nama",
    aboutUsBtnDesc: "Naša priča",
    locationBtn: "Lokacija",
    locationBtnDesc: "Gde se nalazimo?",
  },
  COMPANY: {
    error: "Greška prilikom uzimanja podataka o kompaniji...",
  },
  BARBERS: {
    title: "Odaberi frizera",
    error: "Greška prilikom uzimanja podataka o zaposlenima...",
  },
  PLACES: {
    title: "Odaberi lokaciju",
    error: "Greška prilikom preuzimanja lokacija...",
  },
  SERVICES: {
    title: "Cenovnik & Usluge",
    errorFetch: "Greška prilikom uzimanja podataka o servisima...",
  },
  DATE: {
    title: "Odaberi termin",
    holidaySunday: "Ne radimo nedeljom",
    noAvailableDates: "Ne postoji slobodni termini za taj datum",
    chooseDate: "Odaberite termin",
    continue: "Nastavi",
    book: "Rezerviši",
    detailsReservation: "Dodaj napomenu...",
  },
  SALON: {
    title: "Pravila salona:",
    first:
      "1. Maksimalno dozvoljeno kašnjenje je 5 minuta. Nakon toga, termin se smatra propuštenim!",
    second:
      "2. Otkazivanje se mora izvršiti najmanje 180 minuta pre zakazanog termina.",
    success: "Vaš termin je uspešno zakazan!",
  },
  TIMES: {
    error:
      "Radnik i usluga mora biti odabrana pre preuzimanja slobodne satnice.",
    errorFetch: "Greška prilikom preuzimanja slobodne satnice...",
  },
  DETAILS: {
    price: "Cena",
    duration: "Trajanje",
    mark: "Ocena",
  },
  APPOINTMENTS: {
    errorDailyLimit:"Ne možete napraviti više rezervacija za ovaj dan.",
    errorWeeklyLimit:"Ne možete napraviti više rezervacija za ovu nedelju.",
    errorMonthlyLimit:"Ne možete napraviti više rezervacija za ovaj mesec.",
    errorYearlyLimit:"Ne možete napraviti više rezervacija za ovu godinu.",
    errorId: "Id rezervacije nije pronađen.",
    title: "Rezervacije",
    postError: "Greška prilikom kreiranja rezervacije.",
    cancelReservation: {
      cancelButton: "Otkaži",
      cancelQuestion:
        "Da li ste sigurni da želite da otkažete ovu rezervaciju?",
      yesButton: "Da",
      noButton: "Ne",
      confirmMessage: "Rezervacija je uspešno otkazana",
      errorMessage: "Rezervacija ne postoji",
    },
    rateReservation: {
      rateButton: "Ocenite",
      rateQuestion: "Da li ste sigurni da želite da ocenite ovu rezervaciju?",
      yesButton: "Da",
      noButton: "Ne",
      rated: "Ocenjeno",
      rateUs: "Ocenite nas",
      ratedInfo: "Ocenili ste ovu rezervaciju",
      confirmMessage: "Rezervacija je uspešno ocenjena",
      errorMessage: "Rezervacija ne postoji",
    },
    errorFetch: "Greška prilikom preuzimanja rezervacija",
    errorFetchId: "Greška prilikom preuzimanja date rezervacije",
    description: "Vaš Opis:",
    placeholderDescription: "Unesite opis...",
    errorFields:
      "Nedostaju neophodni podaci za rezervaciju termina. Molim Vas ponovite ceo proces.",
  },
  INITIAL: {
    error: "Greška prilikom preuzimanja inicijalnih podataka",
  },
  SETTINGS: {
    clickHere: "Prijavite se ovde",
    changeLanguage: {
      capture: "Promeni jezik",
      filterCapture: "Pretrazi jezike",
      label: {
        eng: "Engleski",
        srb: "Srpski",
      },
    },
    LOGOUT: {
      title: "Odjava",
      question: "Da li ste sigurni da želite da se odjavite iz aplikacije?",
      leave: "Napusti",
      cancel: "Odustani",
    },
    HELP: {
      title: "Pomoć & Podrška",
      company: "Kompanija:",
      support: "Email Podrška",
    },
    LEGAL: {
      title: "Politika privatnosti i uslovi korišćenja",
      paragraph: `Naša aplikacija omogućava korisnicima da jednostavno zakazuju termine kod pružaoca usluga koje su im dostupne — međutim, termini mogu da budu zakazani samo od strane samih pružaoca usluga, a korisnici ih mogu rezervisati. Korisnici imaju mogućnost da otkažu svoje termine ukoliko je potrebno.

Za vašu udobnost, aplikacija šalje push notifikacije kao podsetnike za predstojeće termine, koristeći Firebase sistem za obaveštenja.

Napomena: Aplikacija nema integraciju sa kalendarima i ne podržava promenu termina, već samo njihovo otkazivanje.

`,
      policyTitle: "Politika privatnosti",
      policy: `Vaša privatnost nam je prioritet. Aplikacija prikuplja i obrađuje lične podatke korisnika isključivo u svrhu omogućavanja zakazivanja i otkazivanja termina, kao i slanja push notifikacija putem Firebase servisa. Podaci neće biti deljeni sa trećim stranama bez vaše saglasnosti.

Svi podaci se čuvaju u skladu sa relevantnim zakonima o zaštiti podataka o ličnosti. Korišćenjem aplikacije, slažete se sa uslovima ove politike privatnosti.`,

      conditionTitle: "Uslovi angažmana",
      condition: `Ova aplikacija služi za pregled i otkazivanje termina koje pružaoci usluga postavljaju. Zakazivanje termina vrši isključivo pružalac usluga, a korisnik može da rezerviše i otkaže termin putem aplikacije.

Korisnik je odgovoran za tačnost unetih podataka prilikom rezervacije i otkazivanja termina. Aplikacija ne snosi odgovornost za eventualne promene ili otkazivanja termina od strane pružaoca usluga.

Zadržavamo pravo na izmene uslova korišćenja, o čemu ćemo korisnike blagovremeno obavestiti.`,
      footerBottom: "Sva prava zadržava ©",
    },
    ABOUTAPP: {
      title: "O Aplikaciji",
      name: "Naziv Aplikacije:",
      version: "Verzija:",
      dev: "Razvio:",
    },
    PROFILE: {
      email: "Vaš email",
      phoneNumber: "Vaš broj telefona",
      errorPhoneNumber: "Unesite korektan format broja telefona.",
      name: "Vaše ime",
      placeholderName: "Unesite vaše ime",
      loading: "Šalje se...",
      btnText: "Pošalji",
      messageConfirm: "Korisnik je uspešno ažuriran",
    },
    ERROR: {
      label: "Greška prilikom menjanja korisnika",
      imageError: "Greška u toku postavljanja slike",
    },
  },
  LOGIN: {
    title: "Prijava",
    description: "Molimo Vas da unesete podatke",
    or: "ili popunite formu",
    forgot: "Zaboravljena lozinka?",
    submitBtn: "Prijavi se",
    question: "Nemate nalog?",
    CTA: "Registrujte se",
    error: "Niste uneli sva polja",
    missingToken: "Token ne postoji. Popunite formu za prijavu.",
    email: "Otp kod je uspešno poslat na Vaš email",
    errorEmail: "Greška prilikom slanja email-a",
    success: "Uspešna prijava!",
    errorToken: "Neuspešno čuvanje tokena:",
    notMatch: "Lozinke se ne podudaraju.",
    errorFields: "Email ili lozinka nisu tačni",
    isVerified:
      "Vaš nalog nije verifikovan. Verifikacioni kod će biti poslat na Vaš email.",
    errorPass: "Netačna lozinka",
    successVerified: "Vaš nalog je verifikovan!",
    expiredVerification: "Nevalidan ili istekao otp kod.",
    alreadyVerify: "Korisnik je već verifikovan.",
  },
  REGISTER: {
    title: "Registracija",
    emailError: "Email već postoji.",
    description: "Molimo Vas da unesete podatke",
    submitBtn: "Registruj se",
    question: "Već imate nalog?",
    CTA: "Prijavite se",
    error: "Niste uneli sva polja",
    success: "Uspešna registracija!",
    postError: "Greška prilikom kreiranja korisnika...",
    createUser: "Korisnik je uspešno kreiran! Verifikuj svoj nalog.",
  },
  CHANGE_PASS: {
    mainTitle: "Unesite novu lozinku",
    success: "Uspešno ažurirana lozinka",
    error: "Greška u toku promene lozinke",
  },
  EMAIL: {
    label: "Email",
    placeholder: "Unesite Vaš email",
    errorValid: "Unesite validnu email adresu.",
    errorEmpty: "Unesite email adresu.",
    errorFound: "Nije pronađena email adresa.",
  },
  PASSWORD: {
    label: "Lozinka",
    placeholder: "Unesite Vašu lozinku",
    errorRegex:
      "Lozinka mora da počne sa slovom i da ima najmanje 8 karaktera, koje čine jedno veliko slovo, broj, i specijalni znak.",
  },
  CONFIRM_PASSWORD: {
    label: "Potvrdite lozinku",
    placeholder: "Potvrdite Vašu lozinku",
  },
  NAME: {
    label: "Ime i prezime",
    placeholder: "Unesite Vaše ime i prezime",
  },
  PHONENUMBER: {
    label: "Broj telefona",
    placeholder: "Unesite Vaš broj telefona",
  },

  OTP_CODE: {
    codeResend: "Ponovno slanje koda za",
    codeResendCapture: "Ponovno slanje",
    mainTitle: "Unesi OTP kod",
    validCode: "Molim Vas unesite svih 6 cifara.",
    validError: "Vaš otp kod nije validan",
    validSuccess: "Vaš otp kod je validan",
    subtitlePrimary: "OTP kod je poslat na adresu",
    subtitleSecondary: "Ukoliko nema u inbox, proveri SPAM poštansko sanduče.",
  },
  SUBMIT: {
    label: "Pošalji",
  },
  OK: {
    label: "U redu",
  },
  FORGOT_PASSWORD: {
    title: "Zaboravljena Lozinka",
    subtitle: "Odaberite email za resetovanje Vaše lozinke",
    submitBtn: "Pošalji kod",
  },
  SERVER_RESPONSE: {
    notFound: "Neispravan endpoint",
    error: "Neočekivana greška. Pokušaj ponovo kasnije.",
  },
};
