import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  type FirestoreError,
} from "firebase/firestore";
import { createEmptyMonths, goalId, parseGoalId } from "../utils/monthGoals";
import { db } from "./firebase";
import type { GoalGroup, MonthEntry, MonthlyGoal } from "../../types/goals";

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

export function watchGoals(
  uid: string,
  year: number,
  onData: (entries: MonthEntry[]) => void,
  onError: (error: FirestoreError) => void,
) {
  return onSnapshot(
    collection(db, "users", uid, "years", String(year), "goals"),
    (snapshot) => {
      const entries = createEmptyMonths();
      for (const item of snapshot.docs) {
        const position = parseGoalId(item.id);
        const goal = item.data();
        if (!position || !isGoal(goal)) continue;
        entries[position.month][position.group][position.index] = {
          text: goal.text,
          completed: goal.completed,
        };
      }
      onData(entries);
    },
    onError,
  );
}
export function saveGoal(
  uid: string,
  year: number,
  month: number,
  group: GoalGroup,
  index: number,
  goal: MonthlyGoal,
) {
  return setDoc(
    doc(
      db,
      "users",
      uid,
      "years",
      String(year),
      "goals",
      goalId(month, group, index),
    ),
    goal,
  );
}
