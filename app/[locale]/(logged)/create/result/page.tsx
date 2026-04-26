'use client'

import { useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Sparkles,
  RefreshCw,
  FileText,
  Edit2,
  Camera,
  AtSign,
  Hash,
  AlertTriangle,
  MessageSquare,
  X as XIcon,
  Plus,
} from 'lucide-react'
import { InstagramTab, SinglePostTab, ThreadsTab, XTab, SchedulingSection, BottomBar } from '@modules/create-content/application/components/result'
import { useTabTransition } from '@modules/shared'
import { useGeneratePoll } from '@modules/create-content/application/hooks/use-content-generation'
import type {
  Platform,
  PlatformResult,
  CarouselResult,
  SinglePostResult,
  PostResult,
  ThreadResult,
  GenerateResponse,
  FinalizeAction,
} from '@modules/create-content/application/types'

/* ── Mock data — novo formato slide-a-slide ────────── */

const UNSPLASH = {
  dev1: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1080&q=80',
  dev2: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1080&q=80',
  dev3: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=1080&q=80',
  cafe1: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1080&q=80',
  cafe2: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1080&q=80',
  cafe3: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1080&q=80',
  dark1: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=1080&q=80',
  dark2: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=1080&q=80',
  dark3: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=1080&q=80',
  posttar1: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1080&q=80',
  posttar2: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1080&q=80',
  posttar3: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1080&q=80',
}

function makeSlideImages(i: number) {
  const sets = [
    [UNSPLASH.dev1, UNSPLASH.cafe1, UNSPLASH.dark1],
    [UNSPLASH.dev2, UNSPLASH.cafe2, UNSPLASH.dark2],
    [UNSPLASH.dev3, UNSPLASH.cafe3, UNSPLASH.dark3],
    [UNSPLASH.posttar1, UNSPLASH.posttar2, UNSPLASH.posttar3],
  ]
  const s = sets[i % sets.length]
  return [
    { id: `dev-${i}`, label: 'Dev / Laptop', url: s[0] },
    { id: `cafe-${i}`, label: 'Café / Mesa', url: s[1] },
    { id: `dark-${i}`, label: 'Setup Escuro', url: s[2] },
  ]
}

const MOCK_INSTAGRAM: CarouselResult = {
  platformId: 'instagram',
  format: 'carousel',
  formatSource: 'auto',
  styles: [
    { id: 'editorial-overlay', name: 'Editorial com Foto', layout: { type: 'overlay', hasSlideNumber: true } },
    { id: 'typography-gradient', name: 'Tipografia Pura', layout: { type: 'split', hasSlideNumber: false } },
    { id: 'bold-minimal', name: 'Bold Minimalista', layout: { type: 'full-text', hasSlideNumber: false } },
  ],
  slides: [
    {
      slideNumber: 1,
      imageOptions: makeSlideImages(0),
      copyVariations: [
        { id: 'direct', name: 'Direto', tag: 'Capa', title: 'Seu programa de afiliados não morreu pela comissão', text: 'Morreu porque, em 15 minutos, o afiliado percebeu que teria que explicar um produto que nem o founder conseguiu deixar óbvio ainda.' },
        { id: 'narrative', name: 'Narrativo', tag: 'Capa', title: 'Eu tava me escondendo atrás do código.', text: 'Adicionando feature que ninguém pediu. Refatorando o que já funcionava. Tudo pra não ter que lançar e se expor.' },
        { id: 'provocative', name: 'Provocativo', tag: 'Capa', title: 'Você não tem um programa de afiliados.', text: 'Você tem um PowerPoint que ninguém abriu desde que você mandou no grupo.' },
      ],
    },
    {
      slideNumber: 2,
      imageOptions: makeSlideImages(1),
      copyVariations: [
        { id: 'direct', name: 'Direto', tag: 'O Problema', title: 'Você reconhece isso?', text: '→ Há 3 meses "quase pronto"\n→ Cada feedback vira desculpa pra adiar\n→ Prefere codar do que postar\n→ Troca de stack pela 3ª vez' },
        { id: 'narrative', name: 'Narrativo', tag: 'O Problema', title: 'Auto-sabotagem disfarçada de produtividade.', text: 'Refatorando pela 3ª vez. Trocando de framework. Polindo UI que ninguém vai ver. Isso não é perfeccionismo.' },
        { id: 'provocative', name: 'Provocativo', tag: 'O Problema', title: 'Pare de codar. Sério.', text: 'Cada feature nova é mais uma semana sem se expor. Seu roadmap é uma lista de desculpas.' },
      ],
    },
    {
      slideNumber: 3,
      imageOptions: makeSlideImages(2),
      copyVariations: [
        { id: 'direct', name: 'Direto', tag: 'A raiz', title: 'Medo de mostrar que tá feio ainda.', text: 'Medo de alguém falar "isso já existe". Medo de lançar e ninguém ligar. O pior cenário é o silêncio — e silêncio você já tem não lançando.' },
        { id: 'narrative', name: 'Narrativo', tag: 'A raiz', title: 'Se você tá "quase pronto" há 3 meses...', text: '...não é o produto que tá incompleto. É você que tá evitando o momento de se expor.' },
        { id: 'provocative', name: 'Provocativo', tag: 'A raiz', title: 'O silêncio que você tem medo? Já é sua realidade.', text: 'Ninguém sabe que seu produto existe. Ninguém vai reclamar. Ninguém vai elogiar. Porque ninguém viu.' },
      ],
    },
    {
      slideNumber: 4,
      imageOptions: makeSlideImages(3),
      copyVariations: [
        { id: 'direct', name: 'Direto', tag: 'O que aconteceu', title: 'Lancei o Drillingo em beta com vergonha da UI.', text: 'Ninguém reclamou da UI. Reclamaram de coisas que eu nem tinha pensado. Meses de polish — totalmente inúteis.' },
        { id: 'narrative', name: 'Narrativo', tag: 'O que aconteceu', title: 'Sabe o que aconteceu quando eu finalmente lancei?', text: 'Ninguém mencionou a UI. Ninguém falou do design. Falaram de bugs que eu não sabia que existiam, de features que eu achava inúteis.' },
        { id: 'provocative', name: 'Provocativo', tag: 'O que aconteceu', title: 'O mercado não liga pro seu pixel perfect.', text: 'Liga pra resolver o problema dele. Ponto.' },
      ],
    },
    {
      slideNumber: 5,
      imageOptions: makeSlideImages(0),
      copyVariations: [
        { id: 'direct', name: 'Direto', tag: 'A saída', title: 'A cura não é "ter coragem".', text: 'É lançar pequeno e rápido o suficiente pra que o medo não tenha tempo de te parar. Deploy first. Polish later.' },
        { id: 'narrative', name: 'Narrativo', tag: 'A saída', title: 'Deploy first. Polish later.', text: 'Não existe momento perfeito. Existe o momento em que você decide parar de esperar.' },
        { id: 'provocative', name: 'Provocativo', tag: 'A saída', title: 'Deleta o roadmap. Lança hoje.', text: 'Cada item é mais uma semana de proteção. Seu produto não precisa de mais features. Precisa de mais pessoas usando.' },
      ],
    },
    {
      slideNumber: 6,
      imageOptions: makeSlideImages(1),
      copyVariations: [
        { id: 'direct', name: 'Direto', tag: 'CTA', title: 'Se você tá adiando o lançamento de algo, me conta nos comentários.', text: 'Quanto tempo já?' },
        { id: 'narrative', name: 'Narrativo', tag: 'CTA', title: 'E você? Tá adiando o quê?', text: 'Comenta aqui embaixo. Talvez só escrever já te faça perceber.' },
        { id: 'provocative', name: 'Provocativo', tag: 'CTA', title: 'Aposta: você não vai lançar essa semana.', text: 'Prova que eu tô errado. Link nos comentários.' },
      ],
    },
  ],
  caption: {
    copyVariations: [
      { id: 'direct', name: 'Direto', description: 'Frases curtas, vai ao ponto', text: 'Lancei o Drillingo em beta com vergonha da UI.\n\nNinguém reclamou da UI. Reclamaram de coisas que eu nem tinha pensado.\n\nMeses de polish — totalmente inúteis.\n\nO mercado não liga pro seu pixel perfect. Liga pra resolver o problema dele.\n\nDeploy first. Polish later.', hashtags: ['buildinpublic', 'saas', 'drillingo'] },
      { id: 'narrative', name: 'Narrativo', description: 'Conta a história pessoal', text: 'Eu tava me escondendo atrás do código.\n\nAdicionando feature que ninguém pediu. Refatorando o que já funcionava.\n\nTudo pra não ter que lançar e se expor.\n\nHoje decidi que chega. Deploy first. Polish later.', hashtags: ['buildinpublic', 'saas'] },
    ],
  },
  brandFooter: { avatarUrl: '', handle: '@robsonmaia', displayName: 'Robson | Infinity Creators' },
  review: { passed: true, flags: [] },
}

const MOCK_SINGLE_POST: SinglePostResult = {
  platformId: 'instagram',
  format: 'post',
  formatSource: 'auto',
  styles: [
    { id: 'code-hero', name: 'Code Hero', layout: { type: 'code-hero', hasSlideNumber: false } },
    { id: 'centered-blur', name: 'Blur Centralizado', layout: { type: 'centered-blur', hasSlideNumber: false } },
    { id: 'bold-solid', name: 'Bold Sólido', layout: { type: 'full-text', hasSlideNumber: false } },
  ],
  imageOptions: [
    { id: 'code-screen', label: 'Tela de Código', url: UNSPLASH.dev2 },
    { id: 'workspace', label: 'Workspace', url: UNSPLASH.dev1 },
    { id: 'dark-setup', label: 'Setup Escuro', url: UNSPLASH.dark1 },
  ],
  backgroundOptions: [
    { id: 'gradient-dark', label: 'Gradiente Escuro', css: 'radial-gradient(ellipse 60% 45% at 50% 40%, rgba(100,60,120,0.3) 0%, transparent 70%), linear-gradient(155deg, #2a1f30 0%, #120e18 100%)' },
    { id: 'gradient-warm', label: 'Gradiente Quente', css: 'radial-gradient(ellipse 80% 50% at 65% 35%, rgba(180,120,60,0.45) 0%, transparent 70%), linear-gradient(160deg, #3d2b1a 0%, #1a120a 100%)' },
    { id: 'solid-black', label: 'Preto Puro', css: '#000000' },
  ],
  colorOptions: [
    { id: 'white', label: 'Branco', hex: '#ffffff' },
    { id: 'navy', label: 'Navy', hex: '#1D2939' },
    { id: 'brand', label: 'Marca', hex: '#a3a6ff' },
    { id: 'warm', label: 'Quente', hex: '#FF6E05' },
  ],
  copyVariations: [
    {
      id: 'countdown',
      name: 'Contagem Regressiva',
      description: 'Urgência com número gigante',
      label: '🚀 acelere sua startup',
      title: '3 dias',
      subtitle: 'para o fim das inscrições',
      footerText: 'growthway.vc',
      caption: 'Estamos a três dias do fim das inscrições e cada vez mais perto de conhecer quem vai fazer parte do próximo batch.\n\nPara quem ainda não se inscreveu, ainda dá tempo. O tempo está acabando!',
      hashtags: ['startup', 'aceleradora', 'growthway'],
    },
    {
      id: 'statement',
      name: 'Declaração',
      description: 'Frase de impacto centralizada',
      title: 'Deploy first.',
      subtitle: 'Polish later.',
      caption: 'Lancei o Drillingo em beta com vergonha da UI.\n\nNinguém reclamou da UI. Reclamaram de coisas que eu nem tinha pensado.\n\nDeploy first. Polish later.',
      hashtags: ['buildinpublic', 'saas'],
    },
    {
      id: 'metric',
      name: 'Métrica',
      description: 'Número de destaque + contexto',
      label: 'Drillingo · Semana 1',
      title: '200',
      subtitle: 'gravações no primeiro dia. Zero marketing.',
      footerText: 'drillingo.com',
      caption: '200 gravações no primeiro dia do Pronunciation Lab. Sem marketing. Só o link dentro do app.\n\nO feature que mais pediram desde o beta.',
      hashtags: ['buildinpublic', 'saas', 'drillingo'],
    },
  ],
  brandFooter: { avatarUrl: '', handle: '@robsonmaia', displayName: 'Robson | Infinity Creators' },
  review: { passed: true, flags: [] },
}

const MOCK_THREADS: PostResult = {
  platformId: 'threads',
  format: 'post',
  formatSource: 'auto',
  imageOptions: [
    { id: 'threads-dev', label: 'Dev / Laptop', url: UNSPLASH.dev1 },
    { id: 'threads-cafe', label: 'Café / Mesa', url: UNSPLASH.cafe1 },
    { id: 'threads-dark', label: 'Setup Escuro', url: UNSPLASH.dark1 },
  ],
  copyVariations: [
    { id: 'direct', name: 'Direto', description: 'Frases curtas, vai ao ponto', text: 'Lancei o Drillingo em beta com vergonha da UI.\n\nNinguém reclamou da UI. Reclamaram de coisas que eu nem tinha pensado.\n\nMeses de polish — totalmente inúteis.\n\nDeploy first. Polish later.' },
    { id: 'narrative', name: 'Narrativo', description: 'Conta a história pessoal', text: 'Eu tava me escondendo atrás do código. Adicionando feature que ninguém pediu.\n\nQuando finalmente lancei, ninguém falou da UI. Falaram de bugs que eu nem sabia que existiam.\n\nÀs vezes a feature mais simples é a que mais impacta.' },
  ],
  brandFooter: { avatarUrl: '', handle: '@robsonmaia', displayName: 'Robson Maia' },
  review: { passed: true, flags: [] },
}

const MOCK_X: ThreadResult = {
  platformId: 'x',
  format: 'thread',
  formatSource: 'auto',
  tweets: {
    copyVariations: [
      {
        id: 'direct', name: 'Direto',
        tweets: [
          'Lancei o Drillingo em beta com vergonha da UI.\n\nSabe o que aconteceu? Thread:',
          'Ninguém reclamou da UI.\n\nReclamaram de coisas que eu nem tinha pensado. Meses de polish — totalmente inúteis.',
          'O mercado não liga pro seu pixel perfect.\n\nLiga pra resolver o problema dele.',
          'A cura não é "ter coragem".\n\nÉ lançar pequeno e rápido o suficiente pra que o medo não tenha tempo de te parar.',
          'Deploy first. Polish later.\n\nSe você tá adiando o lançamento de algo, me conta. Quanto tempo já?',
        ],
      },
      {
        id: 'narrative', name: 'Narrativo',
        tweets: [
          'Eu tava me escondendo atrás do código.\n\nAdicionando feature que ninguém pediu. Refatorando o que já funcionava. Thread sobre medo de lançar:',
          'Auto-sabotagem disfarçada de produtividade.\n\nTrocando de framework pela 3ª vez. Polindo UI que ninguém vai ver.',
          'Medo de mostrar que tá feio. Medo de alguém falar "isso já existe".\n\nO pior cenário é o silêncio — e silêncio você já tem não lançando.',
          'Quando finalmente lancei:\n\nNinguém mencionou a UI. Falaram de bugs que eu não sabia que existiam.',
          'Deploy first. Polish later.\n\nNão existe momento perfeito. Existe o momento em que você decide parar de esperar.',
          'E você? Tá adiando o quê?\n\ndrillingo.com',
        ],
      },
    ],
  },
  brandFooter: { avatarUrl: '', handle: '@robsonmaia', displayName: 'Robson Maia' },
  review: { passed: true, flags: [] },
}

const MOCK_RESPONSE: GenerateResponse = {
  requestId: '550e8400-e29b-41d4-a716-446655440000',
  status: 'completed',
  brandDnaVersion: '2026-04-21T14:30:00Z',
  brandDnaWarning: null,
  results: [MOCK_INSTAGRAM, MOCK_THREADS, MOCK_X] as PlatformResult[],
  meta: { totalTokens: 2847, writeModel: 'claude-sonnet-4-20260514', routeModel: 'gemini-2.0-flash', reviewModel: 'gemini-2.0-flash', latencyMs: 6420, category: 'feature-launch', categorySource: 'user' },
}

/* ── Platform tabs ─────────────────────────────────── */

const TAB_CONFIG: { id: Platform; label: string; icon: typeof Camera }[] = [
  { id: 'instagram', label: 'Instagram', icon: Camera },
  { id: 'threads', label: 'Threads', icon: AtSign },
  { id: 'x', label: 'X / Twitter', icon: Hash },
]

/* ── Page ──────────────────────────────────────────── */

export default function CreateResultPage() {
  const searchParams = useSearchParams()
  const requestId = searchParams.get('requestId')
  const { data: pollData, isLoading } = useGeneratePoll(requestId)

  const results = pollData?.results ?? MOCK_RESPONSE.results
  const isReady = pollData?.status === 'COMPLETED' && pollData.results !== null

  const [activeTab, setActiveTab] = useState<Platform>('instagram')
  const [igFormat, setIgFormat] = useState<'carousel' | 'post'>('carousel')

  // Instagram carousel — per-slide selections
  const [slideSelections, setSlideSelections] = useState<Map<number, { imageId: string; copyId: string; editedTitle?: string; editedText?: string }>>(() => {
    const map = new Map<number, { imageId: string; copyId: string }>()
    const ig = results.find((r) => r.platformId === 'instagram' && r.format === 'carousel') as CarouselResult | undefined
    ig?.slides.forEach((s) => {
      map.set(s.slideNumber, { imageId: s.imageOptions[0]?.id ?? '', copyId: s.copyVariations[0]?.id ?? '' })
    })
    return map
  })
  const [captionCopyId, setCaptionCopyId] = useState('direct')
  const [editedCaption, setEditedCaption] = useState<string | null>(null)
  const [captionHashtags, setCaptionHashtags] = useState<string[]>(['buildinpublic', 'saas', 'drillingo'])

  // Instagram single post
  const [spStyleId, setSpStyleId] = useState('code-hero')
  const [spImageId, setSpImageId] = useState('code-screen')
  const [spColorId, setSpColorId] = useState('white')
  const [spCopyId, setSpCopyId] = useState('countdown')
  const [spEditedTitle, setSpEditedTitle] = useState<string | null>(null)
  const [spEditedSubtitle, setSpEditedSubtitle] = useState<string | null>(null)
  const [spEditedCaption, setSpEditedCaption] = useState<string | null>(null)

  // Threads state
  const [threadsCopyId, setThreadsCopyId] = useState('direct')
  const [threadsImageId, setThreadsImageId] = useState('threads-dev')
  const [threadsEditedText, setThreadsEditedText] = useState<string | null>(null)

  // X state
  const [xCopyId, setXCopyId] = useState('direct')
  const [xEditedTweets, setXEditedTweets] = useState<Map<number, string>>(new Map())

  // Scheduling
  const [action, setAction] = useState<FinalizeAction>('schedule')
  const [scheduleDate, setScheduleDate] = useState('2026-04-22')
  const [scheduleTime, setScheduleTime] = useState('09:00')

  const activeResult = results.find((r) => r.platformId === activeTab)
  const tabContentRef = useTabTransition(activeTab)

  /* ── Handlers ────────────────────────────────────── */

  const handleSlideSelection = useCallback((slideNumber: number, patch: Partial<{ imageId: string; copyId: string; editedTitle: string; editedText: string }>) => {
    setSlideSelections((prev) => {
      const map = new Map(prev)
      const current = map.get(slideNumber) ?? { imageId: '', copyId: '' }
      map.set(slideNumber, { ...current, ...patch })
      return map
    })
  }, [])

  // Instagram — detect format
  const igResult = results.find((r) => r.platformId === 'instagram')
  const igIsCarousel = igResult?.format === 'carousel'
  const igCarousel = igIsCarousel ? (igResult as CarouselResult) : null
  // Instagram carousel caption
  const captionCopy = igCarousel?.caption.copyVariations.find((c) => c.id === captionCopyId) ?? igCarousel?.caption.copyVariations[0]
  const caption = editedCaption ?? captionCopy?.text ?? ''
  const captionCharCount = caption.length

  // Warnings
  const warnings = activeResult ? ('review' in activeResult ? activeResult.review.flags : []) : []

  if (isLoading || (requestId && !isReady && pollData?.status !== 'FAILED')) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-on-surface-variant">
          {pollData?.status === 'PROCESSING' ? 'Gerando conteúdo...' : 'Carregando resultado...'}
        </p>
      </div>
    )
  }

  if (pollData?.status === 'FAILED') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <AlertTriangle size={32} className="text-error" />
        <p className="text-sm text-error">{pollData.errorMessage || 'Erro ao gerar conteúdo.'}</p>
      </div>
    )
  }

  return (
    <div className="flex-1 px-6 pb-8 pt-8 md:px-8">
      {/* Collapsed input summary */}
      <div className="rounded-xl border border-outline-variant/10 bg-surface-container p-3 ghost-border">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <FileText size={16} className="shrink-0 text-on-surface-variant" />
            <p className="max-w-xl truncate text-sm text-on-surface-variant">
              Hoje lancei a feature de pronunciation lab no Drillingo — o user grava a voz, a IA compara com nativo...
            </p>
          </div>
          <button type="button" className="flex cursor-pointer items-center gap-1.5 text-xs text-on-surface-variant transition-colors hover:text-on-surface">
            <Edit2 size={14} />
            Editar input
          </button>
        </div>
      </div>

      {/* Generation header */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-on-surface">Conteúdo Gerado</h3>
          <span className="rounded-md border border-emerald-400/20 bg-emerald-400/15 px-2 py-0.5 text-xs font-medium text-emerald-400">
            {results.length} plataformas
          </span>
        </div>
        <button type="button" className="flex cursor-pointer items-center gap-2 text-xs text-on-surface-variant transition-colors hover:text-on-surface">
          <RefreshCw size={14} />
          Regenerar tudo
        </button>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/10 p-2">
          <AlertTriangle size={14} className="text-amber-400" />
          <span className="text-xs text-amber-400">{warnings[0].detail}</span>
        </div>
      )}

      {/* Platform tabs */}
      <div className="mt-4 flex items-center gap-6 border-b border-outline-variant/15">
        {results.map((r) => {
          const cfg = TAB_CONFIG.find((t) => t.id === r.platformId)
          if (!cfg) return null
          const Icon = cfg.icon
          const isActive = activeTab === r.platformId
          return (
            <button
              key={r.platformId}
              type="button"
              onClick={() => setActiveTab(r.platformId)}
              className={`flex cursor-pointer items-center gap-2 px-1 pb-3 text-sm font-medium transition-colors ${isActive ? 'border-b-2 border-primary text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              <Icon size={14} />
              {cfg.label}
            </button>
          )
        })}
      </div>

      {/* Tab content — FULL WIDTH */}
      <div ref={tabContentRef} className="mt-6">
        {/* ── Instagram format toggle (mock/test only) ── */}
        {activeTab === 'instagram' && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Formato:</span>
            <button
              type="button"
              onClick={() => setIgFormat('carousel')}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${igFormat === 'carousel' ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'}`}
            >
              Carrossel
            </button>
            <button
              type="button"
              onClick={() => setIgFormat('post')}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${igFormat === 'post' ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'}`}
            >
              Post Único
            </button>
          </div>
        )}

        {/* ── Instagram Carousel ── */}
        {activeTab === 'instagram' && igFormat === 'carousel' && igCarousel && (
          <div className="space-y-8">
            <InstagramTab
              result={igCarousel}
              slideSelections={slideSelections}
              onSlideSelection={handleSlideSelection}
            />

            {/* Caption below carousel */}
            <div className="space-y-4">
              {igCarousel.caption.copyVariations.length > 1 && (
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Caption</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                    {igCarousel.caption.copyVariations.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => { setCaptionCopyId(c.id); setEditedCaption(null) }}
                        className={`cursor-pointer rounded-xl p-3 text-left transition-all ${captionCopyId === c.id ? 'border-2 border-primary bg-primary/5' : 'border border-outline-variant/15 bg-surface-container-low hover:border-outline-variant/30'}`}
                      >
                        <span className={`text-xs font-semibold ${captionCopyId === c.id ? 'text-on-surface' : 'text-on-surface-variant'}`}>{c.name}</span>
                        <p className="mt-0.5 text-[10px] text-on-surface-variant">{c.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-xl bg-surface-container p-4 ghost-border">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                  <MessageSquare size={14} />
                  Texto da Caption
                  {editedCaption && <span className="text-[9px] text-amber-400">editado</span>}
                </div>
                <textarea
                  value={caption}
                  onChange={(e) => setEditedCaption(e.target.value)}
                  className="min-h-[160px] w-full resize-y rounded-lg border border-outline-variant/10 bg-surface-container-low p-3 text-sm leading-relaxed text-on-surface no-scrollbar focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className={`mt-1 text-right text-[10px] ${captionCharCount > 1760 ? (captionCharCount > 2200 ? 'text-error' : 'text-amber-400') : 'text-on-surface-variant'}`}>
                  {captionCharCount} / 2200
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {captionHashtags.map((tag, i) => (
                  <span key={`${tag}-${i}`} className="group flex items-center gap-1 rounded-full bg-surface-bright px-2.5 py-0.5 text-xs text-on-surface-variant">
                    #{tag}
                    <button type="button" onClick={() => setCaptionHashtags((h) => h.filter((_, j) => j !== i))} className="cursor-pointer opacity-0 transition-opacity group-hover:opacity-100" aria-label={`Remover #${tag}`}>
                      <XIcon size={10} className="hover:text-error" />
                    </button>
                  </span>
                ))}
                <button type="button" className="flex cursor-pointer items-center gap-1 text-xs text-on-surface-variant transition-colors hover:text-primary">
                  <Plus size={12} /> Sugerir mais
                </button>
              </div>
            </div>

            {/* Scheduling — full width */}
            <SchedulingSection
              action={action}
              onActionChange={setAction}
              scheduleDate={scheduleDate}
              onScheduleDateChange={setScheduleDate}
              scheduleTime={scheduleTime}
              onScheduleTimeChange={setScheduleTime}
              platformLabel="Instagram"
              onSubmit={() => {}}
              disabled={false}
            />
          </div>
        )}

        {/* ── Instagram Single Post ── */}
        {activeTab === 'instagram' && igFormat === 'post' && (
          <div className="space-y-8">
            <SinglePostTab
              result={MOCK_SINGLE_POST}
              selectedStyleId={spStyleId}
              onStyleChange={setSpStyleId}
              selectedImageId={spImageId}
              onImageChange={setSpImageId}
              selectedColorId={spColorId}
              onColorChange={setSpColorId}
              selectedCopyId={spCopyId}
              onCopyChange={(id) => { setSpCopyId(id); setSpEditedTitle(null); setSpEditedSubtitle(null); setSpEditedCaption(null) }}
              editedTitle={spEditedTitle}
              editedSubtitle={spEditedSubtitle}
              editedCaption={spEditedCaption}
              onEditTitle={setSpEditedTitle}
              onEditSubtitle={setSpEditedSubtitle}
              onEditCaption={setSpEditedCaption}
            />

            <div className="mx-auto max-w-2xl">
              <SchedulingSection
                action={action}
                onActionChange={setAction}
                scheduleDate={scheduleDate}
                onScheduleDateChange={setScheduleDate}
                scheduleTime={scheduleTime}
                onScheduleTimeChange={setScheduleTime}
                platformLabel="Instagram"
                onSubmit={() => {}}
                disabled={false}
              />
            </div>
          </div>
        )}

        {/* ── Threads ── */}
        {activeTab === 'threads' && (
          <div className="space-y-8">
            <ThreadsTab
              result={MOCK_THREADS}
              selectedCopyId={threadsCopyId}
              onCopyChange={(id) => { setThreadsCopyId(id); setThreadsEditedText(null) }}
              selectedImageId={threadsImageId}
              onImageChange={setThreadsImageId}
              editedText={threadsEditedText}
              onTextEdit={setThreadsEditedText}
            />
            <div className="mx-auto max-w-2xl">
              <SchedulingSection
                action={action}
                onActionChange={setAction}
                scheduleDate={scheduleDate}
                onScheduleDateChange={setScheduleDate}
                scheduleTime={scheduleTime}
                onScheduleTimeChange={setScheduleTime}
                platformLabel="Threads"
                onSubmit={() => {}}
                disabled={false}
              />
            </div>
          </div>
        )}

        {/* ── X ── */}
        {activeTab === 'x' && (
          <div className="space-y-8">
            <XTab
              result={MOCK_X}
              selectedCopyId={xCopyId}
              onCopyChange={(id) => { setXCopyId(id); setXEditedTweets(new Map()) }}
              editedTweets={xEditedTweets}
              onTweetEdit={(i, text) => setXEditedTweets((prev) => { const m = new Map(prev); m.set(i, text); return m })}
            />
            <div className="mx-auto max-w-xl">
              <SchedulingSection
                action={action}
                onActionChange={setAction}
                scheduleDate={scheduleDate}
                onScheduleDateChange={setScheduleDate}
                scheduleTime={scheduleTime}
                onScheduleTimeChange={setScheduleTime}
                platformLabel="X"
                onSubmit={() => {}}
                disabled={false}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <BottomBar results={results} onScheduleAll={() => {}} />
    </div>
  )
}
