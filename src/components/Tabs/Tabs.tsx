import { useRef } from 'react'
import { styles } from './styles'
import type { TabsProps } from './types'

export function Tabs({ items, activeTab, onChange }: TabsProps) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  return (
    <div role="tablist" aria-label="Goal views" className={styles.list}>
      {items.map((item, index) => (
        <button key={item.id}
          ref={(element) => { buttons.current[index] = element }}
          type="button" role="tab" id={`tab-${item.id}`}
          aria-controls={`panel-${item.id}`} aria-selected={activeTab === item.id}
          tabIndex={activeTab === item.id ? 0 : -1}
          className={`${styles.tab} ${activeTab === item.id ? '' : styles.inactiveTab}`}
          onClick={() => onChange(item.id)}
          onKeyDown={(event) => {
            let nextIndex: number
            switch (event.key) {
              case 'ArrowRight': nextIndex = (index + 1) % items.length; break
              case 'ArrowLeft': nextIndex = (index - 1 + items.length) % items.length; break
              case 'Home': nextIndex = 0; break
              case 'End': nextIndex = items.length - 1; break
              default: return
            }
            event.preventDefault()
            onChange(items[nextIndex].id)
            buttons.current[nextIndex]?.focus()
          }}
        >{item.label}</button>
      ))}
    </div>
  )
}

