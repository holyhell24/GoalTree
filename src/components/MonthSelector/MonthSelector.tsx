import { useEffect, useRef, type KeyboardEvent, type FocusEvent } from "react";
import type { MonthSelectorProps } from "./types";

export function MonthSelector({ months, value, onChange }: MonthSelectorProps) {
  const dropdown = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);

  function closeDropdown(restoreFocus = false) {
    if (!dropdown.current) return;
    dropdown.current.open = false;
    if (restoreFocus) trigger.current?.focus();
  }

  function selectMonth(index: number) {
    onChange(index);
    closeDropdown(true);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== "Escape" || !event.currentTarget.open) return;
    event.preventDefault();
    event.stopPropagation();
    closeDropdown(true);
  }

  function handleBlur(event: FocusEvent<HTMLDetailsElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) closeDropdown();
  }

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      const element = dropdown.current;
      if (!element?.open || !(event.target instanceof Node)) return;
      if (!element.contains(event.target)) element.open = false;
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);
  return (
    <details
      ref={dropdown}
      className="group relative z-20 min-w-32"
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <summary
        ref={trigger}
        aria-label={`Select month: ${months[value]}`}
        className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg border border-border bg-surface py-2 pr-4 pl-3 text-ink [&::-webkit-details-marker]:hidden"
      >
        {months[value]}
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          className="size-4 shrink-0 transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="absolute right-0 mt-2 max-h-72 min-w-32 overflow-y-auto rounded-lg border border-border bg-surface p-1 text-ink shadow-lg">
        {months.map((month, index) => (
          <button
            key={month}
            type="button"
            aria-pressed={value === index}
            className="block w-full cursor-pointer rounded-md px-3 py-2 text-left hover:bg-canvas aria-pressed:bg-accent aria-pressed:text-on-accent"
            onClick={() => selectMonth(index)}
          >
            {month}
          </button>
        ))}
      </div>
    </details>
  );
}
