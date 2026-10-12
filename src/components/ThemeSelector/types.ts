export type ColorTheme = "forest" | "ocean" | "autumn" | "midnight";

export type ThemeSelectorProps = {
  value: ColorTheme;
  onChange: (theme: ColorTheme) => void;
};
