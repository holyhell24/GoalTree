import { useState } from "react";
import { ThemeSelector } from "./components/ThemeSelector";
import { useColorTheme } from "./hooks/useColorTheme";
import { Tabs } from "./components/Tabs";
import { MonthGoals } from "./screens/MonthGoals";
import { GoalTree } from "./screens/GoalTree";
import { Login } from "./screens/Login";
import { AccessDenied } from "./screens/AccessDenied";
import { useAuth } from "./hooks/useAuth";

const tabs = [
  { id: "month-goals", label: "Month" },
  { id: "goal-tree", label: "Tree" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("month-goals");
  const { theme, setTheme } = useColorTheme();
  const { user, loading, error, logout, signingOut, configured, authorized } =
    useAuth();
  return (
    <div className="mx-auto max-w-[960px] px-6 pt-24 pb-12">
      <ThemeSelector value={theme} onChange={setTheme} />
      {authorized && (
        <div className="fixed top-3 left-3 z-50 max-w-[calc(100vw-1.5rem)] sm:top-5 sm:left-5">
          <Tabs items={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      )}
      <main>
        {error && (
          <p role="alert" className="mb-4 text-muted">
            {error}
          </p>
        )}
        {loading ? (
          <p role="status">Checking your session…</p>
        ) : !user ? (
          <Login configured={configured} />
        ) : !authorized ? (
          <AccessDenied
            configured={configured}
            pending={signingOut}
            onSignOut={logout}
          />
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-end gap-3 text-sm text-muted">
              <span>{user.email}</span>
              <button
                onClick={logout}
                disabled={signingOut}
                className="cursor-pointer rounded-lg border border-border bg-surface px-3 py-2 text-ink"
              >
                {signingOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                id={`panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
                tabIndex={0}
                hidden={activeTab !== tab.id}
                className="mt-7"
              >
                {tab.id === "month-goals" ? <MonthGoals /> : <GoalTree />}
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
