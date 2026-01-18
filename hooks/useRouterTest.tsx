import { useCallback } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export function useDismissOnUnauthorizedFocus() {
  const router = useRouter();
  const { isToken } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (!isToken) {
        router.dismissAll();
      }
    }, [isToken, router]),
  );
  return { isToken };
}

export default function ProtectedScreen() {
  useDismissOnUnauthorizedFocus();
}
