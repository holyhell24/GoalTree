export type TabsProps = {
  items: { id: string; label: string }[]
  activeTab: string
  onChange: (id: string) => void
}
