import type {
  MonthEntry,
  MonthlyGoal,
  SavedMonthGoals,
} from "../../types/goals";

const storageKey = "goaltree-month-goals-v1";

function isGoal(value: unknown): value is MonthlyGoal {
  return (
    typeof value === "object" &&
    value !== null &&
    "text" in value &&
    typeof value.text === "string" &&
    "completed" in value &&
    typeof value.completed === "boolean"
  );
}

function isMonth(value: unknown): value is MonthEntry {
  return (
    typeof value === "object" &&
    value !== null &&
    "must" in value &&
    Array.isArray(value.must) &&
    value.must.length === 5 &&
    value.must.every(isGoal) &&
    "want" in value &&
    Array.isArray(value.want) &&
    value.want.length === 5 &&
    value.want.every(isGoal)
  );
}

export function loadMonthGoals(): SavedMonthGoals {
  try {
    const raw = localStorage.getItem(storageKey);
    const saved = raw ? JSON.parse(raw) : null;
    if (
      saved &&
      Number.isInteger(saved.selectedMonth) &&
      saved.selectedMonth >= 0 &&
      saved.selectedMonth < 12 &&
      Array.isArray(saved.entries) &&
      saved.entries.length === 12 &&
      saved.entries.every(isMonth)
    ) {
      return { selectedMonth: saved.selectedMonth, entries: saved.entries };
    }
  } catch {
    /* Fall back to empty goals when storage is unavailable or invalid. */
  }
  return {
    selectedMonth: new Date().getMonth(),
    entries: Array.from({ length: 12 }, () => ({
      must: Array.from({ length: 5 }, () => ({ text: "", completed: false })),
      want: Array.from({ length: 5 }, () => ({ text: "", completed: false })),
    })),
  };
}

export function saveMonthGoals(data: SavedMonthGoals): boolean {
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
