import { useLogin } from "../../hooks/useLogin";
import type { LoginProps } from "./types";

export function Login({ configured }: LoginProps) {
  const { email, setEmail, password, setPassword, pending, error, submit } =
    useLogin();
  return (
    <section className="mx-auto mt-12 max-w-sm rounded-2xl border border-border bg-surface p-6">
      <h1 className="text-2xl font-bold">Sign in to GoalTree</h1>
      {!configured && (
        <p role="status" className="mt-3 text-sm text-muted">
          Account access must be configured before goals can be opened.
        </p>
      )}
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block">
          Email
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-canvas px-3 py-2"
          />
        </label>
        <label className="block">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-canvas px-3 py-2"
          />
        </label>
        {error && (
          <p role="alert" className="text-sm text-muted">
            {error}
          </p>
        )}
        <button
          disabled={pending}
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-accent px-4 py-2 font-semibold text-on-accent disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </section>
  );
}
