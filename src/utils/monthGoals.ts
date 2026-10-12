import type { GoalGroup, MonthEntry, MonthlyGoal } from "../../types/goals";
export const MONTH_COUNT = 12;
export const GOAL_COUNT = 5;
export function goalId(month: number, group: GoalGroup, index: number) {
  return month + "-" + group + "-" + index;
}
export function parseGoalId(id: string) {
  const match = /^(0|[1-9]|10|11)-(must|want)-([0-4])$/.exec(id);
  return match
    ? {
        month: Number(match[1]),
        group: match[2] as GoalGroup,
        index: Number(match[3]),
      }
    : null;
}
export function createEmptyMonths(): MonthEntry[] {
  return Array.from({ length: MONTH_COUNT }, () => ({
    must: Array.from({ length: GOAL_COUNT }, () => ({
      text: "",
      completed: false,
    })),
    want: Array.from({ length: GOAL_COUNT }, () => ({
      text: "",
      completed: false,
    })),
  }));
}
export function replaceGoal(
  entries: MonthEntry[],
  month: number,
  group: GoalGroup,
  index: number,
  goal: MonthlyGoal,
): MonthEntry[] {
  return entries.map((entry, position) =>
    position !== month
      ? entry
      : {
          ...entry,
          [group]: entry[group].map((item, goalIndex) =>
            goalIndex === index ? goal : item,
          ),
        },
  );
}
