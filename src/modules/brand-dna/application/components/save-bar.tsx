'use client'

import { CloudCheck, Loader2 } from 'lucide-react'

interface SaveBarProps {
  brandName: string
  hasChanges: boolean
  isSaving: boolean
  onSave: () => void
  onDiscard: () => void
}

function getStatusLabel(isSaving: boolean, hasChanges: boolean): string {
  if (isSaving) return 'Salvando...'
  if (hasChanges) return 'Alterações não salvas'
  return 'Salvo'
}

export function SaveBar({ brandName, hasChanges, isSaving, onSave, onDiscard }: Readonly<SaveBarProps>) {
  return (
    <div className="mx-auto mt-12 w-full max-w-4xl">
      <div className="flex items-center justify-between rounded-2xl border border-outline-variant/20 bg-surface-container/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-bright">
            {isSaving ? (
              <Loader2 size={20} className="animate-spin text-primary" />
            ) : (
              <CloudCheck size={20} className="text-primary" />
            )}
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface">
              {getStatusLabel(isSaving, hasChanges)}
            </p>
            <p className="text-[10px] text-on-surface-variant">
              {brandName || 'Brand DNA'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onDiscard}
            disabled={!hasChanges || isSaving}
            className="rounded-xl px-6 py-2.5 text-sm font-bold text-on-surface transition-colors hover:bg-surface-bright disabled:opacity-40 disabled:hover:bg-transparent"
          >
            Descartar
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!hasChanges || isSaving}
            className="brand-gradient rounded-xl px-8 py-2.5 text-sm font-bold text-on-surface shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-40 disabled:active:scale-100"
          >
            {isSaving ? 'Salvando...' : 'Publicar Alterações'}
          </button>
        </div>
      </div>
    </div>
  )
}
