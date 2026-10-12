import { useState } from "react";
import { ThemeSelector } from "./components/ThemeSelector";
import { useColorTheme } from "./hooks/useColorTheme";
import { Tabs } from "./components/Tabs";
import { MonthGoals } from "./screens/MonthGoals";
import { GoalTree } from "./screens/GoalTree";

const tabs = [
  { id: "month-goals", label: "Month" },
  { id: "goal-tree", label: "Tree" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("month-goals");
  const { theme, setTheme } = useColorTheme();
  return (
    <div className="mx-auto max-w-[960px] px-6 pt-24 pb-12">
      <ThemeSelector value={theme} onChange={setTheme} />
      <div className="fixed top-3 left-3 z-50 max-w-[calc(100vw-1.5rem)] sm:top-5 sm:left-5">
        <Tabs items={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
      <main>
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
      </main>
    </div>
  );
}
