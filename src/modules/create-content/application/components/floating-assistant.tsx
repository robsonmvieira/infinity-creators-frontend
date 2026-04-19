export function FloatingAssistant() {
  return (
    <div className="fixed bottom-8 right-8 z-100">
      <button
        type="button"
        aria-label="System assistant"
        className="glass ghost-border group flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all hover:border-primary/50"
      >
        <div className="h-3 w-3 rounded-full bg-tertiary pulse-orb transition-transform group-hover:scale-125" />
        <div className="ghost-border absolute -top-12 right-0 whitespace-nowrap rounded-lg bg-surface-bright px-3 py-1 text-[10px] font-bold uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100">
          System Active
        </div>
      </button>
    </div>
  )
}
