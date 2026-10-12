export type MonthGoalsProps = { title?: string };
export type GoalGroup = "must" | "want";
export type MonthlyGoal = { text: string; completed: boolean };
export type MonthEntry = Record<GoalGroup, MonthlyGoal[]>;
