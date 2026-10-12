import { useState } from 'react'
import { palettes, styles } from './styles'
import type { GoalGroup, MonthEntry, MonthGoalsProps } from './types'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function createMonth(): MonthEntry {
  return {
    must: Array.from({ length: 5 }, () => ({ text: '', completed: false })),
    want: Array.from({ length: 5 }, () => ({ text: '', completed: false })),
  }
}

export function MonthGoals({ title = 'Month Goals' }: MonthGoalsProps) {
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().getMonth())
  const [entries, setEntries] = useState(() => months.map(createMonth))
  const month = months[selectedMonth]
  const palette = palettes[selectedMonth]

  function updateGoal(group: GoalGroup, index: number, text?: string, completed?: boolean) {
    setEntries((previous) => previous.map((entry, monthIndex) => (
      monthIndex !== selectedMonth ? entry : {
        ...entry,
        [group]: entry[group].map((goal, goalIndex) => goalIndex !== index ? goal : {
          text: text ?? goal.text,
          completed: text === '' ? false : completed ?? goal.completed,
        }),
      }
    )))
  }

  return (
    <section aria-label={title}>
      <div className={styles.toolbar}>
        <span>{title}</span>
        <label>
          <span className="sr-only">Select month</span>
          <select className={styles.select} value={selectedMonth}
            onChange={(event) => setSelectedMonth(Number(event.target.value))}>
            {months.map((name, index) => <option key={name} value={index}>{name}</option>)}
          </select>
        </label>
      </div>
      <div className={styles.paper}>
        <h1 className={styles.title} aria-label={month}>
          <span aria-hidden="true">
            {Array.from(month.toUpperCase()).map((letter, index) => (
              <span key={index} className={palette[index % palette.length]}>{letter}</span>
            ))}
          </span>
        </h1>
        <div className={styles.legend}>
          {(['must', 'want'] as const).map((group, index) => (
            <p key={group} className={styles.legendLine}>
              <span aria-hidden="true" className={`${styles.dot} ${palette[index + 1]}`} />
              5 {group}
              <span aria-hidden="true" className={`${styles.dot} ${palette[2 - index]}`} />
            </p>
          ))}
        </div>
        <div className={styles.groups}>
          {(['must', 'want'] as const).map((group) => (
            <section key={group} aria-labelledby={`${group}-heading`}>
              <h2 id={`${group}-heading`} className={`${styles.groupTitle} ${palette[2]}`}>{group}</h2>
              <ul className={styles.list}>
                {entries[selectedMonth][group].map((goal, index) => (
                  <li key={index} className={styles.row}>
                    <input type="checkbox" className={styles.checkbox}
                      aria-label={`Complete ${group} goal ${index + 1}${goal.text ? `: ${goal.text}` : ''}`}
                      checked={goal.completed} disabled={!goal.text.trim()}
                      onChange={(event) => updateGoal(group, index, undefined, event.target.checked)} />
                    <textarea rows={2}
                      aria-label={`${month} ${group} goal ${index + 1}`}
                      placeholder={`${group === 'must' ? 'I need to' : 'I want to'}...`}
                      className={`${styles.input} ${goal.completed ? styles.completed : ''}`}
                      value={goal.text} onChange={(event) => updateGoal(group, index, event.target.value)} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className={styles.hint}>Write a goal, then check it off when it is done.</p>
      </div>
    </section>
  )
}
