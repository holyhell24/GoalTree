import { styles } from './styles'
import type { ColorTheme, ThemeSelectorProps } from './types'

const themes: { id: ColorTheme; label: string }[] = [
  { id: 'forest', label: 'Forest' },
  { id: 'ocean', label: 'Ocean' },
  { id: 'autumn', label: 'Autumn' },
  { id: 'midnight', label: 'Midnight' },
]

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className={styles.picker} role="group" aria-label="Color theme">
      {themes.map((theme) => (
        <button key={theme.id} type="button"
          className={styles.button} aria-label={`${theme.label} theme`}
          aria-pressed={value === theme.id} title={`${theme.label} theme`}
          onClick={() => onChange(theme.id)}>
          <span aria-hidden="true" className={`${styles.swatch} ${styles.colors[theme.id]}`} />
        </button>
      ))}
    </div>
  )
}
