import { useEffect, useRef, useState } from "react";
import { saveGoal, watchGoals } from "../services/monthGoalsStorage";
import { createEmptyMonths, goalId, replaceGoal } from "../utils/monthGoals";
import type { GoalGroup, MonthlyGoal } from "../../types/goals";

type PendingGoal = {
  month: number;
  group: GoalGroup;
  index: number;
  goal: MonthlyGoal;
};
export function useMonthGoals(uid: string) {
  const [year] = useState(() => new Date().getFullYear());
  const [selectedMonth, selectMonth] = useState(() => new Date().getMonth());
  const [entries, setEntries] = useState(createEmptyMonths);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const pending = useRef(new Map<string, PendingGoal>());
  const current = useRef(entries);
  useEffect(
    () =>
      watchGoals(
        uid,
        year,
        (remote) => {
          for (const item of pending.current.values())
            remote[item.month][item.group][item.index] = item.goal;
          current.current = remote;
          setEntries(remote);
          setLoading(false);
          setLoaded(true);
          setLoadError("");
        },
        (failure) => {
          setLoading(false);
          setLoadError(
            failure.code === "permission-denied"
              ? "Firestore denied access. Publish the project's firestore.rules in Firebase Console, then reload this page."
              : `Unable to load goals (${failure.code}). Check your connection and Firebase database configuration.`,
          );
        },
      ),
    [uid, year],
  );

  function updateGoal(
    group: GoalGroup,
    index: number,
    changes: Partial<MonthlyGoal>,
  ) {
    const previous = current.current;
    const goal = { ...previous[selectedMonth][group][index], ...changes };
    if (changes.text === "") goal.completed = false;
    const next = replaceGoal(previous, selectedMonth, group, index, goal);
    current.current = next;
    setEntries(next);
    const key = goalId(selectedMonth, group, index);
    const change = { month: selectedMonth, group, index, goal };
    pending.current.set(key, change);
    setSaving(true);
    setSaveError("");
    void saveGoal(uid, year, selectedMonth, group, index, goal)
      .then(() => {
        if (pending.current.get(key) === change) pending.current.delete(key);
        setSaving(pending.current.size > 0);
      })
      .catch(() => {
        if (pending.current.get(key) !== change) return;
        setSaving(false);
        setSaveError(
          "Goals could not be saved. Keep this page open and edit the goal again to retry.",
        );
      });
  }
  return {
    selectedMonth,
    entries,
    selectMonth,
    updateGoal,
    loading,
    saving,
    loaded,
    error: loadError || saveError,
  };
}
