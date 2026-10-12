import { useEffect, useRef, useState } from "react";
import type { User } from "firebase/auth";
import {
  accessConfigured,
  isAllowedUser,
  logout as signOut,
  subscribeToAuth,
} from "../services/auth";

export function useAuth() {
  const [session, setSession] = useState<{
    user: User | null;
    loading: boolean;
  }>({ user: null, loading: true });
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  const pending = useRef(false);
  useEffect(
    () =>
      subscribeToAuth(
        (user) => {
          setSession({ user, loading: false });
          setError("");
        },
        () => {
          setSession({ user: null, loading: false });
          setError("Unable to check your session. Please reload the page.");
        },
      ),
    [],
  );
  async function logout() {
    if (pending.current) return;
    pending.current = true;
    setSigningOut(true);
    setError("");
    try {
      await signOut();
    } catch {
      setError("Could not sign out. Please try again.");
    } finally {
      pending.current = false;
      setSigningOut(false);
    }
  }
  return {
    ...session,
    error,
    logout,
    signingOut,
    configured: accessConfigured,
    authorized: isAllowedUser(session.user),
  };
}
