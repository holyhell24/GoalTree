export const styles = {
  toolbar: 'mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-500',
  select: 'cursor-pointer rounded-lg border border-stone-300 bg-transparent px-3 py-2 text-stone-700',
  paper: 'relative overflow-hidden rounded-sm border border-[#e5dfd2] bg-[#fffdf7] px-5 py-10 text-[#48443d] shadow-[0_8px_32px_#58452c0d] sm:px-12 sm:py-12',
  title: 'text-center font-["Segoe_Print","Bradley_Hand",cursive] text-[clamp(2rem,7vw,5rem)] leading-tight font-normal tracking-[0.03em]',
  legend: 'mt-3 flex flex-col items-center gap-1 font-["Segoe_Print","Bradley_Hand",cursive] text-xl uppercase sm:text-2xl',
  legendLine: 'flex items-center gap-3',
  dot: 'h-2 w-2 rounded-full bg-current',
  groups: 'mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12',
  groupTitle: 'mx-auto mb-5 w-fit border-b-2 border-[#48443d] px-3 pb-1 font-["Segoe_Print","Bradley_Hand",cursive] text-3xl font-normal uppercase',
  list: 'space-y-4',
  row: 'flex min-h-14 items-start gap-3',
  checkbox: 'mt-3 size-6 shrink-0 cursor-pointer rounded-none accent-[#806543]',
  input: 'w-full resize-none border-b border-stone-200/60 bg-transparent px-1 py-2 font-["Segoe_Print","Bradley_Hand",cursive] text-xl leading-relaxed placeholder:text-stone-300 focus:border-stone-400',
  completed: 'text-stone-400 line-through',
  hint: 'mt-10 text-center text-xs text-stone-400',
}

// Complete class names keep every monthly palette available to Tailwind.
export const palettes = [
  ['text-[#3d7099]', 'text-[#8aaec4]', 'text-[#a5adb6]'],
  ['text-[#527fa6]', 'text-[#a5adb6]', 'text-[#729bb8]'],
  ['text-[#74885a]', 'text-[#b29b46]', 'text-[#648879]'],
  ['text-[#b988a3]', 'text-[#7b966c]', 'text-[#b9a158]'],
  ['text-[#64834c]', 'text-[#b99045]', 'text-[#aa728b]'],
  ['text-[#3286a0]', 'text-[#4c8a58]', 'text-[#669eaa]'],
  ['text-[#267ba6]', 'text-[#3b875c]', 'text-[#62a594]'],
  ['text-[#397f96]', 'text-[#58864b]', 'text-[#4c9b86]'],
  ['text-[#795237]', 'text-[#bd762e]', 'text-[#b39329]'],
  ['text-[#a65e28]', 'text-[#75472f]', 'text-[#b08b23]'],
  ['text-[#6c4935]', 'text-[#ad6d32]', 'text-[#a88a35]'],
  ['text-[#426f98]', 'text-[#a5adb6]', 'text-[#7c9fb9]'],
]
