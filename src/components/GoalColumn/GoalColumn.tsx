import type { GoalColumnProps } from "./types";
export function GoalColumn({
  group,
  month,
  color,
  goals,
  onChange,
}: GoalColumnProps) {
  return (
    <section aria-labelledby={`${group}-heading`}>
      <h2
        id={`${group}-heading`}
        className={`mx-auto mb-5 w-fit border-b-2 border-[#48443d] px-3 pb-1 font-["Segoe_Print","Bradley_Hand",cursive] text-3xl font-normal uppercase ${color}`}
      >
        {group}
      </h2>
      <ul className="space-y-4">
        {goals.map((goal, index) => (
          <li key={index} className="flex min-h-14 items-start gap-3">
            <input
              type="checkbox"
              className="mt-3 size-6 shrink-0 cursor-pointer rounded-none accent-[#806543]"
              aria-label={`Complete ${group} goal ${index + 1}${goal.text ? `: ${goal.text}` : ""}`}
              checked={goal.completed}
              disabled={!goal.text.trim()}
              onChange={(event) =>
                onChange(index, { completed: event.target.checked })
              }
            />
            <textarea
              rows={2}
              aria-label={`${month} ${group} goal ${index + 1}`}
              placeholder={`${group === "must" ? "I need to" : "I want to"}...`}
              className={`field-sizing-content min-h-20 w-full min-w-0 resize-none border-b border-stone-200/60 bg-transparent px-1 py-2 font-["Segoe_Print","Bradley_Hand",cursive] text-xl leading-relaxed placeholder:text-stone-300 focus:border-stone-400 ${goal.completed ? "text-stone-400 line-through" : ""}`}
              value={goal.text}
              onChange={(event) =>
                onChange(index, { text: event.target.value })
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
