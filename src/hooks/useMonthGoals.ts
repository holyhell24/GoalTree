import { useState } from "react";
import { createEmptyMonths, replaceGoal } from "../utils/monthGoals";
import type { GoalGroup, MonthlyGoal } from "../../types/goals";

export function useMonthGoals() {
  const [selectedMonth, selectMonth] = useState(() => new Date().getMonth());
  const [entries, setEntries] = useState(createEmptyMonths);
  function updateGoal(
    group: GoalGroup,
    index: number,
    changes: Partial<MonthlyGoal>,
  ) {
    setEntries((previous) => {
      const goal = { ...previous[selectedMonth][group][index], ...changes };
      if (changes.text === "") goal.completed = false;
      return replaceGoal(previous, selectedMonth, group, index, goal);
    });
  }
  return { selectedMonth, selectMonth, entries, updateGoal };
}
