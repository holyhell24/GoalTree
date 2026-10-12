import { useState } from "react";
import type { GoalGroup, MonthEntry, MonthGoalsProps } from "./types";

// Complete class names keep every monthly palette available to Tailwind.
const palettes = [
  ["text-[#3d7099]", "text-[#8aaec4]", "text-[#a5adb6]"],
  ["text-[#527fa6]", "text-[#a5adb6]", "text-[#729bb8]"],
  ["text-[#74885a]", "text-[#b29b46]", "text-[#648879]"],
  ["text-[#b988a3]", "text-[#7b966c]", "text-[#b9a158]"],
  ["text-[#64834c]", "text-[#b99045]", "text-[#aa728b]"],
  ["text-[#3286a0]", "text-[#4c8a58]", "text-[#669eaa]"],
  ["text-[#267ba6]", "text-[#3b875c]", "text-[#62a594]"],
  ["text-[#397f96]", "text-[#58864b]", "text-[#4c9b86]"],
  ["text-[#795237]", "text-[#bd762e]", "text-[#b39329]"],
  ["text-[#a65e28]", "text-[#75472f]", "text-[#b08b23]"],
  ["text-[#6c4935]", "text-[#ad6d32]", "text-[#a88a35]"],
  ["text-[#426f98]", "text-[#a5adb6]", "text-[#7c9fb9]"],
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function createMonth(): MonthEntry {
  return {
    must: Array.from({ length: 5 }, () => ({ text: "", completed: false })),
    want: Array.from({ length: 5 }, () => ({ text: "", completed: false })),
  };
}

export function MonthGoals({ title = "Month Goals" }: MonthGoalsProps) {
  const [selectedMonth, setSelectedMonth] = useState(() =>
    new Date().getMonth(),
  );
  const [entries, setEntries] = useState(() => months.map(createMonth));
  const month = months[selectedMonth];
  const palette = palettes[selectedMonth];

  function updateGoal(
    group: GoalGroup,
    index: number,
    text?: string,
    completed?: boolean,
  ) {
    setEntries((previous) =>
      previous.map((entry, monthIndex) =>
        monthIndex !== selectedMonth
          ? entry
          : {
              ...entry,
              [group]: entry[group].map((goal, goalIndex) =>
                goalIndex !== index
                  ? goal
                  : {
                      text: text ?? goal.text,
                      completed:
                        text === "" ? false : (completed ?? goal.completed),
                    },
              ),
            },
      ),
    );
  }

  return (
    <section aria-label={title}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <span>{title}</span>
        <label>
          <span className="sr-only">Select month</span>
          <select
            className="cursor-pointer rounded-lg border border-border bg-surface px-3 py-2 text-ink"
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(Number(event.target.value))}
          >
            {months.map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="relative overflow-hidden rounded-sm border border-[#e5dfd2] bg-[#fffdf7] px-5 py-10 text-[#48443d] scheme-light shadow-[0_8px_32px_#58452c0d] sm:px-12 sm:py-12">
        <h1
          className={
            'text-center font-["Segoe_Print","Bradley_Hand",cursive] text-[clamp(2rem,7vw,5rem)] leading-tight font-normal tracking-[0.03em]'
          }
          aria-label={month}
        >
          <span aria-hidden="true">
            {Array.from(month.toUpperCase()).map((letter, index) => (
              <span key={index} className={palette[index % palette.length]}>
                {letter}
              </span>
            ))}
          </span>
        </h1>
        <div
          className={
            'mt-3 flex items-center justify-center gap-3 font-["Segoe_Print","Bradley_Hand",cursive] text-xl uppercase sm:text-2xl'
          }
        >
          <span
            aria-hidden="true"
            className={`size-2 shrink-0 rounded-full bg-current ${palette[0]}`}
          />
          <p>5 must</p>
          <span
            aria-hidden="true"
            className={`size-2 shrink-0 rounded-full bg-current ${palette[1]}`}
          />
          <p>5 want</p>
          <span
            aria-hidden="true"
            className={`size-2 shrink-0 rounded-full bg-current ${palette[2]}`}
          />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12">
          {(["must", "want"] as const).map((group) => (
            <section key={group} aria-labelledby={`${group}-heading`}>
              <h2
                id={`${group}-heading`}
                className={`mx-auto mb-5 w-fit border-b-2 border-[#48443d] px-3 pb-1 font-["Segoe_Print","Bradley_Hand",cursive] text-3xl font-normal uppercase ${palette[2]}`}
              >
                {group}
              </h2>
              <ul className="space-y-4">
                {entries[selectedMonth][group].map((goal, index) => (
                  <li key={index} className="flex min-h-14 items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-3 size-6 shrink-0 cursor-pointer rounded-none accent-[#806543]"
                      aria-label={`Complete ${group} goal ${index + 1}${goal.text ? `: ${goal.text}` : ""}`}
                      checked={goal.completed}
                      disabled={!goal.text.trim()}
                      onChange={(event) =>
                        updateGoal(
                          group,
                          index,
                          undefined,
                          event.target.checked,
                        )
                      }
                    />
                    <textarea
                      rows={2}
                      aria-label={`${month} ${group} goal ${index + 1}`}
                      placeholder={`${group === "must" ? "I need to" : "I want to"}...`}
                      className={`field-sizing-content min-h-20 w-full min-w-0 resize-none border-b border-stone-200/60 bg-transparent px-1 py-2 font-["Segoe_Print","Bradley_Hand",cursive] text-xl leading-relaxed placeholder:text-stone-300 focus:border-stone-400 ${goal.completed ? "text-stone-400 line-through" : ""}`}
                      value={goal.text}
                      onChange={(event) =>
                        updateGoal(group, index, event.target.value)
                      }
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-stone-400">
          Write a goal, then check it off when it is done.
        </p>
      </div>
    </section>
  );
}
