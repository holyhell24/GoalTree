export type GoalGroup = "must" | "want";
export type MonthlyGoal = { text: string; completed: boolean };
export type MonthEntry = Record<GoalGroup, MonthlyGoal[]>;
export type SavedMonthGoals = { selectedMonth: number; entries: MonthEntry[] };
