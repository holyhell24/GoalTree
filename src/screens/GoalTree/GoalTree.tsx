import { styles } from './styles'
import type { GoalTreeProps } from './types'

export function GoalTree({ title = 'Goal Tree' }: GoalTreeProps) {
  return (
    <section>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>Give each area of your life its own room to grow.</p>
      <div className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>Your tree starts here</h2>
        <p className={styles.description}>Categories and their goal leaves will appear here.</p>
      </div>
    </section>
  )
}

