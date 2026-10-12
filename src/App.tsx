import { useEffect, useState } from "react";
import { ThemeSelector } from "./components/ThemeSelector";
import type { ColorTheme } from "./components/ThemeSelector/types";
import { Tabs } from "./components/Tabs";
import { MonthGoals } from "./screens/MonthGoals";
import { GoalTree } from "./screens/GoalTree";
import { styles } from "./styles";

const tabs = [
  { id: "month-goals", label: "Month" },
  { id: "goal-tree", label: "Tree" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("month-goals");
  const [theme, setTheme] = useState<ColorTheme>(() => {
    try {
      const saved = localStorage.getItem("goaltree-theme");
      return saved === "ocean" || saved === "autumn" || saved === "midnight"
        ? saved
        : "forest";
    } catch {
      return "forest";
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("goaltree-theme", theme);
    } catch {
      /* Theme still works without storage. */
    }
  }, [theme]);
  return (
    <div className={styles.app}>
      <ThemeSelector value={theme} onChange={setTheme} />
      <div className={styles.navigation}>
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
            className={styles.panel}
          >
            {tab.id === "month-goals" ? <MonthGoals /> : <GoalTree />}
          </div>
        ))}
      </main>
    </div>
  );
}
