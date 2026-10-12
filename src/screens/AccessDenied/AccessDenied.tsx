import type { AccessDeniedProps } from "./types";
export function AccessDenied({
  configured,
  pending,
  onSignOut,
}: AccessDeniedProps) {
  return (
    <section className="mx-auto mt-12 max-w-sm rounded-2xl border border-border bg-surface p-6">
      <h1 className="text-xl font-semibold">
        {configured ? "Access denied" : "Account setup required"}
      </h1>
      <p className="mt-2 text-muted">
        {configured
          ? "This account is not allowed to use GoalTree."
          : "Set VITE_ALLOWED_USER_UIDS in .env.local to your allowed Firebase account UIDs and restart the app."}
      </p>
      <button
        onClick={onSignOut}
        disabled={pending}
        className="mt-4 cursor-pointer rounded-lg bg-accent px-4 py-2 text-on-accent"
      >
        {pending ? "Signing out..." : "Sign out"}
      </button>
    </section>
  );
}
