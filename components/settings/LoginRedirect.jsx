import { makeStyles } from "@/theme";
import { AppText, Card, Icon } from "@/components/ui";

/** Logged-out prompt at the top of Profile: avatar tile + "sign in" call to action (one tappable card). */
const LoginRedirect = ({ onPress, title }) => {
  const styles = useStyles();
  return (
    <Card onPress={onPress} style={styles.card}>
      <Icon name="person" size="md" />
      <AppText variant="bodyStrong" style={styles.title}>
        {title}
      </AppText>
      <Icon name="chevronRight" size="sm" color="inkMuted" />
    </Card>
  );
};

const useStyles = makeStyles(() => ({
  card: { flexDirection: "row", alignItems: "center", gap: 12 },
  title: { flex: 1 },
}));

export default LoginRedirect;
