'use client'

import { MessageCircle, Repeat2, Heart, BarChart3, AlertTriangle, Check } from 'lucide-react'
import type { ThreadResult } from '../../types'

interface XTabProps {
  result: ThreadResult
  selectedCopyId: string
  onCopyChange: (id: string) => void
  editedTweets: Map<number, string>
  onTweetEdit: (index: number, text: string) => void
}

export function XTab({
  result,
  selectedCopyId,
  onCopyChange,
  editedTweets,
  onTweetEdit,
}: Readonly<XTabProps>) {
  const copyVar = result.tweets.copyVariations.find((c) => c.id === selectedCopyId) ?? result.tweets.copyVariations[0]
  const tweets = copyVar?.tweets ?? []
  const brandFooter = result.brandFooter

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* LEFT — Thread preview */}
      <div className="col-span-7 space-y-0">
        {tweets.map((tweet, i) => {
          const text = editedTweets.get(i) ?? tweet
          const charCount = text.length
          const isLast = i === tweets.length - 1
          const hasWarning = charCount > 280

          return (
            <div key={i} className="relative">
              {/* Thread connector */}
              {!isLast && <div className="absolute bottom-0 left-7 top-14 w-0.5 bg-outline-variant/15" />}

              {/* Tweet number */}
              <div className="absolute -left-1 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-surface-bright font-mono text-[10px] text-on-surface-variant">
                {i + 1}
              </div>

              <div className="rounded-lg border border-outline-variant/10 bg-surface-container p-4 ghost-border">
                {brandFooter && (
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-[10px] font-bold text-white">
                      {brandFooter.displayName.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-on-surface">{brandFooter.displayName}</span>
                    <span className="text-xs text-on-surface-variant">{brandFooter.handle}</span>
                    <span className="text-on-surface-variant">·</span>
                    <span className="text-xs text-on-surface-variant">agora</span>
                  </div>
                )}

                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onTweetEdit(i, e.currentTarget.textContent ?? '')}
                  className="mt-2 whitespace-pre-line border border-dashed border-transparent text-sm leading-relaxed text-on-surface outline-none transition-colors hover:border-outline-variant/20 focus:border-primary"
                >
                  {text}
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex gap-4">
                    <span className="text-xs text-on-surface-variant"><MessageCircle size={12} /></span>
                    <span className="text-xs text-on-surface-variant"><Repeat2 size={12} /></span>
                    <span className="text-xs text-on-surface-variant"><Heart size={12} /></span>
                    <span className="text-xs text-on-surface-variant"><BarChart3 size={12} /></span>
                  </div>
                  <span className={`rounded-md bg-surface-bright px-1.5 py-0.5 text-xs ${hasWarning ? 'text-error' : charCount > 250 ? 'text-amber-400' : 'text-on-surface-variant'}`}>
                    {charCount} / 280
                  </span>
                </div>

                {hasWarning && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-400">
                    <AlertTriangle size={10} />
                    <span>{charCount}/280</span>
                  </div>
                )}
              </div>

              {!isLast && <div className="h-3" />}
            </div>
          )
        })}
      </div>

      {/* RIGHT — Copy variations */}
      <div className="col-span-5 space-y-5">
        {result.tweets.copyVariations.length > 1 && (
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              Variação de Thread
            </p>
            <div className="grid grid-cols-1 gap-2">
              {result.tweets.copyVariations.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onCopyChange(c.id)}
                  className={`cursor-pointer rounded-xl p-3 text-left transition-all ${
                    selectedCopyId === c.id
                      ? 'border-2 border-primary bg-primary/5'
                      : 'border border-outline-variant/15 bg-surface-container-low hover:border-outline-variant/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${selectedCopyId === c.id ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      {c.name}
                    </span>
                    {selectedCopyId === c.id && <Check size={14} className="text-primary" />}
                  </div>
                  <p className="mt-1 text-[10px] text-on-surface-variant">{c.tweets.length} tweets</p>
                  <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-on-surface-variant">
                    "{c.tweets[0]?.split('\n')[0]}"
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
