import { useEffect, useState } from "react";
import { loadMonthGoals, saveMonthGoals } from "../services/monthGoalsStorage";
import type { GoalGroup, MonthlyGoal } from "../../types/goals";

export function useMonthGoals() {
  const [data, setData] = useState(loadMonthGoals);
  useEffect(() => {
    saveMonthGoals(data);
  }, [data]);

  function selectMonth(selectedMonth: number) {
    setData((previous) => ({ ...previous, selectedMonth }));
  }

  function updateGoal(
    group: GoalGroup,
    index: number,
    changes: Partial<MonthlyGoal>,
  ) {
    setData((previous) => ({
      ...previous,
      entries: previous.entries.map((entry, monthIndex) =>
        monthIndex !== previous.selectedMonth
          ? entry
          : {
              ...entry,
              [group]: entry[group].map((goal, goalIndex) =>
                goalIndex !== index
                  ? goal
                  : {
                      ...goal,
                      ...changes,
                      completed:
                        changes.text === ""
                          ? false
                          : (changes.completed ?? goal.completed),
                    },
              ),
            },
      ),
    }));
  }

  return { ...data, selectMonth, updateGoal };
}
