import type { MonthGoalsProps } from "./types";
import { months, palettes } from "./constants";
import { useMonthGoals } from "../../hooks/useMonthGoals";
import { GoalColumn } from "../../components/GoalColumn";

export function MonthGoals({ title = "Month Goals" }: MonthGoalsProps) {
  const { selectedMonth, entries, selectMonth, updateGoal } = useMonthGoals();
  const month = months[selectedMonth];
  const palette = palettes[selectedMonth];

  return (
    <section aria-label={title}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <span>{title}</span>
        <label>
          <span className="sr-only">Select month</span>
          <select
            className="cursor-pointer rounded-lg border border-border bg-surface px-3 py-2 text-ink"
            value={selectedMonth}
            onChange={(event) => selectMonth(Number(event.target.value))}
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
            <GoalColumn
              key={group}
              group={group}
              month={month}
              color={palette[2]}
              goals={entries[selectedMonth][group]}
              onChange={(index, changes) => updateGoal(group, index, changes)}
            />
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-stone-400">
          Write a goal, then check it off when it is done.
        </p>
      </div>
    </section>
  );
}
