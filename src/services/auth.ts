import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";

const allowedUids = new Set<string>(
  (
    import.meta.env.VITE_ALLOWED_USER_UIDS ??
    import.meta.env.VITE_ALLOWED_USER_UID ??
    ""
  )
    .split(",")
    .map((uid: string) => uid.trim())
    .filter(Boolean),
);
export const accessConfigured = allowedUids.size > 0;
export function isAllowedUser(user: User | null): boolean {
  return Boolean(user && allowedUids.has(user.uid));
}
export function subscribeToAuth(
  onChange: (user: User | null) => void,
  onError: () => void,
) {
  return onAuthStateChanged(auth, onChange, onError);
}
export async function login(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email.trim(), password);
}
export function logout() {
  return signOut(auth);
}
