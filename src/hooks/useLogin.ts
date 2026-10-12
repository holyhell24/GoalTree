import { useRef, useState, type FormEvent } from "react";
import { login } from "../services/auth";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setPending(true);
    setError("");
    try {
      await login(email, password);
      setPassword("");
    } catch {
      setError("Sign-in failed. Check your email and password, and try again.");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }
  return { email, setEmail, password, setPassword, pending, error, submit };
}
