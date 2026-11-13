import { useGlobalError } from "@/context/GlobalErrorContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Icon, Loader, MessageDialog } from "@/components/ui";

const GlobalErrorHandler = () => {
  const { error, hideError } = useGlobalError();
  const { logoutUnAuthorizedUser, logoutHandler } = useAuth();
  const [loading, setLoading] = useState(false);

  const logoutConfirm = async () => {
    setLoading("logout");

    setTimeout(async () => {
      try {
        // 2. Čekamo da se završi kompletan API poziv i brisanje storage-a
        await logoutUnAuthorizedUser();

      } catch {
      } finally {
        // 3. TEK OVDE gasimo loader (unutar finally bloka, što garantuje
        // da će se izvršiti čak i ako server baci grešku)
        setLoading(null);

        setTimeout(() => {
          logoutHandler();
        }, 100);
      }
    }, 1000);
    hideError();
  };
  if (!error) return null;

  if (loading === "logout") {
    return <Loader variant="overlay" visible={loading === "logout"} />;
  }

  return (
    <MessageDialog
      isOpen={!!error}
      title={error.title}
      buttonText="OK"
      icon={<Icon name={"close"} size={64} color="text" />}
      onClose={hideError}
      onConfirm={logoutConfirm}
    />
  );
};

export default GlobalErrorHandler;
