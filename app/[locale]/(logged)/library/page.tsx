'use client'

import { useState } from 'react'
import { Archive, Sparkles } from 'lucide-react'
import { ContentCard, BrandSelector } from '@modules/create-content/application/components'
import { useContentList, useDeleteContent } from '@modules/create-content/application/hooks/use-content-generation'
import { useBrandList } from '@modules/brand-dna/application/hooks/use-brand'
import { Link } from '@/src/i18n/navigation'
import type { ContentListResponse } from '@modules/create-content/application/types'

/* ── Sub-components ──────────────────────────────────── */

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-outline-variant/15 bg-surface-container py-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-container-low">
        <Archive size={28} className="text-on-surface-variant" />
      </div>
      <p className="mt-6 text-sm font-medium text-on-surface-variant">
        Nenhum conteúdo gerado ainda.
      </p>
      <p className="mt-1 text-xs text-on-surface-variant/60">
        Crie seu primeiro conteúdo e ele aparecerá aqui.
      </p>
      <Link
        href="/create"
        className="mt-6 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-[0.98]"
      >
        <Sparkles size={16} />
        Criar Conteúdo
      </Link>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────── */

function renderContent(
  isLoading: boolean,
  contentList: ContentListResponse | undefined,
  onDelete: (requestId: string) => void,
  deletingId: string | null,
) {
  if (isLoading) return <LoadingState />
  if (!contentList || contentList.items.length === 0) return <EmptyState />

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          {contentList.total} {contentList.total === 1 ? 'conteúdo' : 'conteúdos'}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contentList.items.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            onDelete={onDelete}
            isDeleting={deletingId === item.requestId}
          />
        ))}
      </div>
    </div>
  )
}

export default function LibraryPage() {
  const { data: brandList, isLoading: isBrandsLoading } = useBrandList()
  const [selectedBrandId, setSelectedBrandId] = useState<string | undefined>(undefined)

  const hasBrands = !!brandList && brandList.items.length > 0
  const activeBrandId = brandList?.items.find((b) => b.isActive)?.id ?? brandList?.items[0]?.id
  const brandId = selectedBrandId ?? activeBrandId

  const { data: contentList, isLoading: isContentLoading } = useContentList(
    hasBrands ? { brandId } : {},
  )

  const deleteMutation = useDeleteContent()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function handleDelete(requestId: string) {
    setDeletingId(requestId)
    deleteMutation.mutate(requestId, {
      onSettled: () => setDeletingId(null),
    })
  }

  const isLoading = isBrandsLoading || isContentLoading

  return (
    <div className="flex-1 overflow-y-auto p-6 pb-28 no-scrollbar lg:p-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-5xl font-bold tracking-tighter text-on-surface">
              Biblioteca
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-on-surface-variant">
              Todos os conteúdos gerados para suas marcas.
            </p>
          </div>
          {hasBrands && (
            <BrandSelector
              brands={brandList.items}
              selectedId={brandId}
              onSelect={setSelectedBrandId}
            />
          )}
        </div>

        {renderContent(isLoading, contentList, handleDelete, deletingId)}
      </div>
    </div>
  )
}
