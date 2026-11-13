import { View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import SharedReservationData from "@/components/booking/SharedReservationData";
import AppointmentsStatuses from "@/components/reservation/AppointmentsStatuses";
import { useAppointment } from "@/context/AppointmentContext";
import HeaderReservationTime from "@/components/reservation/HeaderReservationTime";
import { makeStyles } from "@/theme";
import { AppText, BackButton, StepHeader } from "@/components/ui";

/**
 * Screen header (design system `ds-appbar` + `ds-h1`, Phase 5.6).
 * The old full-width cover photo is gone (DS: no dark photos over the screen); the header is
 * back button + display title. Variants kept: `hidden` (no back), `reservation` / `reservationData`
 * (booking summary / appointment time), `status` (title + status tabs).
 * `image` / `nextBtn` / `skip` / `routerHandler` are accepted for existing callers.
 */
const BOOKING_STEPS = 4;

function HeaderCoverImageContainer({
  title,
  image: _image,
  hidden = false,
  reservation = null,
  reservationData = null,
  status = false,
  step,
  nextBtn: _nextBtn,
  skip: _skip,
  routerHandler: _routerHandler,
}: {
  title?: string;
  image?: unknown;
  hidden?: boolean;
  reservation?: unknown;
  reservationData?: unknown;
  status?: boolean;
  /** Booking flow step 1–4 (Usluge → Frizer → Datum i vreme → Pregled): DS StepHeader with progress bar. */
  step?: number;
  nextBtn?: unknown;
  skip?: unknown;
  routerHandler?: unknown;
}) {
  const styles = useStyles();
  const { active, handleStatus } = useAppointment();
  const { localization } = useLocalization();

  if (step) {
    const stepLabel = localization.BOOKING.step.replace("{step}", String(step)).replace("{total}", String(BOOKING_STEPS));
    return (
      <View style={styles.header}>
        <StepHeader
          step={step}
          total={BOOKING_STEPS}
          stepLabel={stepLabel}
          title={(reservation ? localization.BOOKING.review : title) ?? ""}
          hideBack={hidden}
        />
        {reservation ? (
          <View style={styles.stepSummary}>
            <SharedReservationData reservation={reservation} hideBack />
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.header}>
      {!reservation && !status && !reservationData && (
        <>
          {!hidden && (
            <BackButton style={styles.back} />
          )}
          {title ? (
            <AppText variant="displayLg" style={styles.title}>
              {title}
            </AppText>
          ) : null}
        </>
      )}
      {reservation ? <SharedReservationData reservation={reservation} /> : null}
      {reservationData ? <HeaderReservationTime data={reservationData} /> : null}

      {status && (
        <View style={styles.status}>
          <AppText variant="displayLg" style={styles.title}>
            {title}
          </AppText>
          <AppointmentsStatuses handleStatus={handleStatus} active={active} />
        </View>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  header: { backgroundColor: colors.bg, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
  back: { alignSelf: "flex-start", marginBottom: 12 },
  title: { fontSize: 30, lineHeight: 33 },
  status: { gap: 16 },
  stepSummary: { marginTop: 20 },
}));

export default HeaderCoverImageContainer;
