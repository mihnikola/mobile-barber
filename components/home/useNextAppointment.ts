import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

import { availabilitiesApi } from "@/lib/api/services";
import type { ApiRecord } from "@/context/types";

/**
 * Next upcoming appointment for the home screen (design Ekran01c "Sledeći termin").
 * Reads the same list endpoint as the Appointments tab (approved first, then pending) and takes
 * the first item that is not in the past, in the order the backend returns it.
 * Uses its own state so it never touches the Appointments tab's list. Logged-out → null.
 */
export function useNextAppointment(isLoggedIn: boolean) {
  const [next, setNext] = useState<ApiRecord | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn) {
        setNext(null);
        return;
      }
      let cancelled = false;
      (async () => {
        try {
          for (const activeStatus of [0, 2]) {
            const response = await availabilitiesApi.list({ activeStatus });
            const items: ApiRecord[] = response?.status === 200 && Array.isArray(response.data) ? response.data : [];
            const upcoming = items.find((item) => !item?.past);
            if (upcoming) {
              if (!cancelled) setNext(upcoming);
              return;
            }
          }
          if (!cancelled) setNext(null);
        } catch {
          if (!cancelled) setNext(null); // home stays usable; the section is simply hidden
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [isLoggedIn]),
  );

  return next;
}
