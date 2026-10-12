import { useRef } from "react";
import type { TabsProps } from "./types";

export function Tabs({ items, activeTab, onChange }: TabsProps) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div
      role="tablist"
      aria-label="Goal views"
      className="flex gap-1 rounded-full border border-border bg-surface p-1 shadow-sm"
    >
      {items.map((item, index) => (
        <button
          key={item.id}
          ref={(element) => {
            buttons.current[index] = element;
          }}
          type="button"
          role="tab"
          id={`tab-${item.id}`}
          aria-controls={`panel-${item.id}`}
          aria-selected={activeTab === item.id}
          tabIndex={activeTab === item.id ? 0 : -1}
          className={`cursor-pointer rounded-full border-0 px-3 py-2 text-sm font-semibold sm:px-4 aria-selected:bg-accent aria-selected:text-on-accent ${activeTab === item.id ? "" : "bg-transparent text-muted hover:bg-surface"}`}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
