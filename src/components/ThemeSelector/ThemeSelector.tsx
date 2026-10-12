import type { ColorTheme, ThemeSelectorProps } from "./types";

const themes: { id: ColorTheme; label: string; color: string }[] = [
  { id: "forest", label: "Forest", color: "bg-[#235b43]" },
  { id: "ocean", label: "Ocean", color: "bg-[#246b91]" },
  { id: "autumn", label: "Autumn", color: "bg-[#975026]" },
  { id: "midnight", label: "Midnight", color: "bg-[#19232f]" },
];

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div
      className="fixed top-3 right-3 z-50 flex items-center rounded-full border border-border bg-surface p-1 shadow-sm sm:top-5 sm:right-5"
      role="group"
      aria-label="Color theme"
    >
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          className="flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-canvas sm:size-10 aria-pressed:ring-2 aria-pressed:ring-accent aria-pressed:ring-inset"
          aria-label={`${theme.label} theme`}
          aria-pressed={value === theme.id}
          title={`${theme.label} theme`}
          onClick={() => onChange(theme.id)}
        >
          <span
            aria-hidden="true"
            className={`size-6 rounded-full border border-white/30 shadow-sm ${theme.color}`}
          />
        </button>
      ))}
    </div>
  );
}
