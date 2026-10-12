import type { GoalGroup, MonthlyGoal } from "../../../types/goals";
export type GoalColumnProps = {
  group: GoalGroup;
  month: string;
  color: string;
  goals: MonthlyGoal[];
  onChange: (index: number, changes: Partial<MonthlyGoal>) => void;
};
