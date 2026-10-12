import type { GoalTreeProps } from "./types";

export function GoalTree({ title = "Goal Tree" }: GoalTreeProps) {
  return (
    <section>
      <h1 className="mb-2 text-[32px] font-bold tracking-[-1px]">{title}</h1>
      <p className="text-muted">
        Give each area of your life its own room to grow.
      </p>
      <div className="mt-7 rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
        <h2 className="mb-3 text-xl font-bold">Your tree starts here</h2>
        <p className="text-muted">
          Categories and their goal leaves will appear here.
        </p>
      </div>
    </section>
  );
}
