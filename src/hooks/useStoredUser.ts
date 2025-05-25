import { useEffect, useState } from "react";
import type { SanitisedUser } from "../types/user";
import { getStoredUser } from "../utils/localStorage";

export const useStoredUser = (): SanitisedUser | null => {
  const [user, setUser] = useState<SanitisedUser | null>(null);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      try {
        setUser(stored);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  return user;
};
