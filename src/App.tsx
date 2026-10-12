import { useState } from 'react'
import { Tabs } from './components/Tabs'
import { MonthGoals } from './screens/MonthGoals'
import { GoalTree } from './screens/GoalTree'
import { styles } from './styles'

const tabs = [
  { id: 'month-goals', label: 'Month Goals' },
  { id: 'goal-tree', label: 'Goal Tree' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('month-goals')
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <span className={styles.brand}>GoalTree</span>
        <p className={styles.tagline}>Make room for what matters.</p>
      </header>
      <main>
        <Tabs items={tabs} activeTab={activeTab} onChange={setActiveTab} />
        {tabs.map((tab) => (
          <div key={tab.id} id={`panel-${tab.id}`} role="tabpanel"
            aria-labelledby={`tab-${tab.id}`} tabIndex={0}
            hidden={activeTab !== tab.id} className={styles.panel}>
            {tab.id === 'month-goals' ? <MonthGoals /> : <GoalTree />}
          </div>
        ))}
      </main>
    </div>
  )
}

