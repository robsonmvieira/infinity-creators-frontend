import { FileText, Megaphone, ChevronRight } from 'lucide-react'
import type { ReferencePost } from '../types'

const ICON_MAP = {
  article: FileText,
  campaign: Megaphone,
} as const

interface ReferencePostsProps {
  posts: ReferencePost[]
}

export function ReferencePosts({ posts }: Readonly<ReferencePostsProps>) {
  return (
    <div>
      <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
        Gold Standard References
      </p>

      <div className="space-y-3">
        {posts.map((post) => {
          const Icon = ICON_MAP[post.icon]
          return (
            <button
              key={post.id}
              type="button"
              className="flex w-full items-center rounded-lg border border-outline-variant/5 bg-surface-bright/30 p-4 text-left transition-colors hover:bg-surface-bright/50"
            >
              <Icon size={20} className="mr-3 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-on-surface">
                  {post.title}
                </p>
                <p className="text-[10px] text-on-surface-variant">
                  {post.source} &bull; {post.lastUpdated}
                </p>
              </div>
              <ChevronRight size={18} className="shrink-0 text-on-surface-variant" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
