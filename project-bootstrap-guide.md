# Project Bootstrap Guide

> Guia completo para iniciar um novo projeto com a mesma arquitetura e padr&otilde;es do Drillingo Frontend.
> Escrito com base na experi&ecirc;ncia real de desenvolvimento desse projeto.

---

## Sum&aacute;rio

1. [Stack Tecnol&oacute;gica](#1-stack-tecnol&oacute;gica)
2. [Arquitetura: Clean Architecture + DDD](#2-arquitetura-clean-architecture--ddd)
3. [Estrutura de Diret&oacute;rios](#3-estrutura-de-diret&oacute;rios)
4. [Setup Inicial do Projeto](#4-setup-inicial-do-projeto)
5. [Infraestrutura Compartilhada (Shared Module)](#5-infraestrutura-compartilhada-shared-module)
6. [Blueprint: Como Criar um M&oacute;dulo](#6-blueprint-como-criar-um-m&oacute;dulo)
7. [Internacionaliza&ccedil;&atilde;o (i18n)](#7-internacionaliza&ccedil;&atilde;o-i18n)
8. [Sistema de Autentica&ccedil;&atilde;o e Seguran&ccedil;a](#8-sistema-de-autentica&ccedil;&atilde;o-e-seguran&ccedil;a)
9. [UI, Styling e Design System](#9-ui-styling-e-design-system)
10. [Gerenciamento de Estado](#10-gerenciamento-de-estado)
11. [Padr&otilde;es e Conven&ccedil;&otilde;es](#11-padr&otilde;es-e-conven&ccedil;&otilde;es)
12. [Li&ccedil;&otilde;es Aprendidas e Decis&otilde;es Arquiteturais](#12-li&ccedil;&otilde;es-aprendidas-e-decis&otilde;es-arquiteturais)

---

## 1. Stack Tecnol&oacute;gica

### Core

| Tecnologia | Vers&atilde;o | Prop&oacute;sito |
|---|---|---|
| **Next.js** | 16.x | Framework React com App Router |
| **React** | 19.x | UI Library |
| **TypeScript** | 5.x | Tipagem est&aacute;tica |

### Data & State

| Tecnologia | Vers&atilde;o | Prop&oacute;sito |
|---|---|---|
| **TanStack React Query** | 5.x | Estado servidor (fetching, caching, mutations) |
| **Zustand** | 5.x | Estado cliente (UI, prefer&ecirc;ncias) |
| **Ky** | 1.x | HTTP client leve (wrapper para fetch) |
| **Inversify** | 8.x | IoC Container / Inje&ccedil;&atilde;o de Depend&ecirc;ncia |

### UI & Styling

| Tecnologia | Vers&atilde;o | Prop&oacute;sito |
|---|---|---|
| **Tailwind CSS** | 4.x | Utility-first CSS |
| **shadcn/ui** (base-nova style) | 4.x | Componentes UI sobre Base UI primitives |
| **Base UI** (@base-ui/react) | 1.x | Componentes headless primitivos |
| **CVA** (class-variance-authority) | 0.7.x | Variantes de componentes |
| **Lucide React** | 0.5x | Iconografia |
| **GSAP** | 3.x | Anima&ccedil;&otilde;es avan&ccedil;adas + ScrollTrigger |
| **next-themes** | 0.4.x | Tema claro/escuro |

### Valida&ccedil;&atilde;o & Seguran&ccedil;a

| Tecnologia | Vers&atilde;o | Prop&oacute;sito |
|---|---|---|
| **Zod** | 4.x | Valida&ccedil;&atilde;o de schemas em runtime |
| **Upstash Redis** | 1.x | Rate limiting (serverless) |
| **Upstash Ratelimit** | 2.x | Rate limiting |

### Analytics & Observabilidade

| Tecnologia | Vers&atilde;o | Prop&oacute;sito |
|---|---|---|
| **PostHog** (JS + Node) | 1.x / 5.x | Analytics, eventos, identifica&ccedil;&atilde;o |

### i18n

| Tecnologia | Vers&atilde;o | Prop&oacute;sito |
|---|---|---|
| **next-intl** | 4.x | Internacionaliza&ccedil;&atilde;o completa |

### Testes

| Tecnologia | Vers&atilde;o | Prop&oacute;sito |
|---|---|---|
| **Playwright** | 1.x | Testes E2E |

---

## 2. Arquitetura: Clean Architecture + DDD

### Vis&atilde;o Geral

O projeto segue **Clean Architecture com Domain-Driven Design (DDD)** por m&oacute;dulo. Cada m&oacute;dulo de dom&iacute;nio &eacute; autocontido com tr&ecirc;s camadas:

```
domain/       &larr; Regras de neg&oacute;cio puras (zero depend&ecirc;ncias externas)
application/  &larr; Casos de uso, hooks React, componentes
infra/        &larr; Implementa&ccedil;&otilde;es concretas (HTTP, storage, DI)
```

### Fluxo de Depend&ecirc;ncias

```
Componentes &rarr; Hooks &rarr; Container (DI) &rarr; Use Cases &rarr; Repository &rarr; HTTP Client
     |
     v
React Query (cache/estado)
```

**Regra de ouro**: depend&ecirc;ncias fluem de fora para dentro. A camada de dom&iacute;nio nunca importa nada externo.

### Por que essa arquitetura?

1. **Testabilidade**: Use cases testados com mock de repository; componentes com mock de hooks
2. **Substituibilidade**: trocar Ky por Axios? S&oacute; muda a infra
3. **Escalabilidade**: novos m&oacute;dulos seguem o mesmo padr&atilde;o sem acoplamento
4. **Manuten&ccedil;&atilde;o**: cada camada tem responsabilidade clara

---

## 3. Estrutura de Diret&oacute;rios

```
project-root/
&boxur;&boxh;&boxh; app/                          # Next.js App Router
&boxv;   &boxur;&boxh;&boxh; [locale]/                 # Rotas por locale
&boxv;   &boxv;   &boxur;&boxh;&boxh; (auth)/               # Grupo: p&aacute;ginas de autentica&ccedil;&atilde;o
&boxv;   &boxv;   &boxur;&boxh;&boxh; (logged)/             # Grupo: &aacute;rea autenticada (sidebar + navbar)
&boxv;   &boxv;   &boxur;&boxh;&boxh; (onboarding)/         # Grupo: fluxo de onboarding
&boxv;   &boxv;   &boxur;&boxh;&boxh; (study)/              # Grupo: modo estudo (fullscreen)
&boxv;   &boxv;   &boxur;&boxh;&boxh; layout.tsx            # Root locale layout (providers)
&boxv;   &boxv;   &boxdr;&boxh;&boxh; page.tsx              # Landing page
&boxv;   &boxdr;&boxh;&boxh; api/
&boxv;       &boxdr;&boxh;&boxh; [...path]/            # API proxy catch-all
&boxur;&boxh;&boxh; src/
&boxv;   &boxur;&boxh;&boxh; modules/                  # M&oacute;dulos DDD
&boxv;   &boxv;   &boxur;&boxh;&boxh; shared/               # Infraestrutura compartilhada
&boxv;   &boxv;   &boxur;&boxh;&boxh; auth/                 # M&oacute;dulo de autentica&ccedil;&atilde;o
&boxv;   &boxv;   &boxur;&boxh;&boxh; users/                # Perfil e prefer&ecirc;ncias
&boxv;   &boxv;   &boxur;&boxh;&boxh; plans/                # Planos de assinatura
&boxv;   &boxv;   &boxur;&boxh;&boxh; decks/                # Baralhos
&boxv;   &boxv;   &boxur;&boxh;&boxh; cards/                # Cart&otilde;es (flashcards)
&boxv;   &boxv;   &boxur;&boxh;&boxh; study/                # Sess&otilde;es de estudo e revis&atilde;o
&boxv;   &boxv;   &boxur;&boxh;&boxh; analytics/            # Dashboard e estat&iacute;sticas
&boxv;   &boxv;   &boxur;&boxh;&boxh; feedback/             # Sistema de feedback do usu&aacute;rio
&boxv;   &boxv;   &boxdr;&boxh;&boxh; ...                   # Outros m&oacute;dulos
&boxv;   &boxur;&boxh;&boxh; i18n/                     # Configura&ccedil;&atilde;o de internacionaliza&ccedil;&atilde;o
&boxv;   &boxur;&boxh;&boxh; messages/                 # Arquivos de tradu&ccedil;&atilde;o
&boxv;   &boxdr;&boxh;&boxh; lib/                      # Utilit&aacute;rios globais
&boxur;&boxh;&boxh; components/
&boxv;   &boxur;&boxh;&boxh; ui/                       # shadcn/ui components
&boxv;   &boxdr;&boxh;&boxh; sections/                 # Se&ccedil;&otilde;es da landing page
&boxur;&boxh;&boxh; lib/                          # Utilit&aacute;rios (cn, security, gsap)
&boxdr;&boxh;&boxh; docs/                         # Documenta&ccedil;&atilde;o do projeto
```

### Anatomia de um M&oacute;dulo DDD

```
src/modules/{module-name}/
&boxur;&boxh;&boxh; domain/
&boxv;   &boxur;&boxh;&boxh; entities/         # Classes imut&aacute;veis com getters
&boxv;   &boxur;&boxh;&boxh; repositories/     # Interfaces (contratos)
&boxv;   &boxur;&boxh;&boxh; use-cases/        # Interfaces dos use cases
&boxv;   &boxur;&boxh;&boxh; types/            # Tipos e par&acirc;metros de dom&iacute;nio
&boxv;   &boxdr;&boxh;&boxh; index.ts          # Barrel exports
&boxur;&boxh;&boxh; application/
&boxv;   &boxur;&boxh;&boxh; use-cases/        # Implementa&ccedil;&otilde;es dos use cases
&boxv;   &boxur;&boxh;&boxh; hooks/            # Hooks React (React Query wrappers)
&boxv;   &boxur;&boxh;&boxh; components/       # Componentes de UI do m&oacute;dulo
&boxv;   &boxdr;&boxh;&boxh; index.ts
&boxur;&boxh;&boxh; infra/
&boxv;   &boxur;&boxh;&boxh; repositories/     # Implementa&ccedil;&otilde;es HTTP dos repos
&boxv;   &boxur;&boxh;&boxh; schemas/          # Schemas Zod para respostas da API
&boxv;   &boxdr;&boxh;&boxh; index.ts
&boxdr;&boxh;&boxh; index.ts                   # Exports p&uacute;blicos do m&oacute;dulo
```

---

## 4. Setup Inicial do Projeto

### 4.1 Criar o projeto Next.js

```bash
npx create-next-app@latest my-project --typescript --tailwind --app --src-dir
```

### 4.2 Instalar depend&ecirc;ncias core

```bash
# Data & State
npm install @tanstack/react-query zustand ky inversify reflect-metadata

# UI & Styling
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
npm install next-themes
npm install gsap @gsap/react
npm install sonner

# Validation
npm install zod

# i18n
npm install next-intl

# Analytics (opcional)
npm install posthog-js posthog-node

# Rate limiting (prod)
npm install @upstash/ratelimit @upstash/redis
```

### 4.3 Instalar shadcn/ui

```bash
npx shadcn@latest init
```

Configurar `components.json`:
```json
{
  "style": "base-nova",
  "rsc": true,
  "tailwind": {
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "hooks": "@/hooks"
  }
}
```

### 4.4 Configurar path aliases

Em `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@modules/*": ["./src/modules/*"]
    }
  }
}
```

### 4.5 Configurar GSAP

Criar `lib/gsap.ts`:
```typescript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export { gsap, ScrollTrigger }
```

### 4.6 Configurar utilit&aacute;rios

Criar `lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Criar `lib/security.ts`:
```typescript
export function isSafeImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:'
  } catch {
    return false
  }
}
```

---

## 5. Infraestrutura Compartilhada (Shared Module)

O m&oacute;dulo `shared` &eacute; o cora&ccedil;&atilde;o da infraestrutura. Deve ser criado **antes** de qualquer m&oacute;dulo de dom&iacute;nio.

### 5.1 HTTP Client

O HttpClient abstrai a comunica&ccedil;&atilde;o HTTP usando Ky:

```typescript
// src/modules/shared/infra/http/http-client.ts

import ky from 'ky'

export interface HttpClient {
  get<T>(url: string, options?: { searchParams?: Record<string, string> }): Promise<T>
  post<T>(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<T>
  postNoContent(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<void>
  put<T>(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<T>
  patch<T>(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<T>
  delete<T>(url: string, options?: { searchParams?: Record<string, string> }): Promise<T>
  deleteNoContent(url: string, options?: { searchParams?: Record<string, string> }): Promise<void>
  upload<T>(url: string, formData: FormData, options?: { searchParams?: Record<string, string> }): Promise<T>
  uploadNoContent(url: string, formData: FormData, options?: { searchParams?: Record<string, string> }): Promise<void>
}

const STATE_CHANGING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

function getCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = /(?:^|;\s*)csrf_token=([^;]*)/.exec(document.cookie)
  return match?.[1]
}

export class KyHttpClient implements HttpClient {
  private readonly api = ky.create({
    prefixUrl: '/api',
    timeout: 30_000,
    retry: { limit: 2, methods: ['get', 'put', 'head', 'delete', 'options'] },
    hooks: {
      beforeRequest: [
        (request) => {
          if (STATE_CHANGING_METHODS.has(request.method)) {
            const token = getCsrfToken()
            if (token) request.headers.set('x-csrf-token', token)
          }
        },
      ],
    },
  })

  async get<T>(url: string, options?: { searchParams?: Record<string, string> }): Promise<T> {
    return this.api.get(url, { searchParams: options?.searchParams }).json<T>()
  }

  async post<T>(url: string, body?: unknown, options?: { searchParams?: Record<string, string> }): Promise<T> {
    return this.api.post(url, { json: body, searchParams: options?.searchParams }).json<T>()
  }

  async postNoContent(url: string, body?: unknown): Promise<void> {
    await this.api.post(url, { json: body })
  }

  // ... demais m&eacute;todos seguem o mesmo padr&atilde;o
}
```

**Pontos-chave**:
- `prefixUrl: '/api'` &mdash; todas as chamadas passam pelo API proxy do Next.js
- CSRF token &eacute; injetado automaticamente em m&eacute;todos state-changing
- Retry autom&aacute;tico em m&eacute;todos idempotentes (GET, PUT, DELETE)
- Timeout de 30 segundos

### 5.2 Inje&ccedil;&atilde;o de Depend&ecirc;ncia (Inversify)

#### TYPES &mdash; S&iacute;mbolos para binding

```typescript
// src/modules/shared/infra/container/types.ts

export const TYPES = {
  // Infra
  HttpClient: Symbol.for('HttpClient'),

  // Repositories
  AuthRepository: Symbol.for('AuthRepository'),
  UserRepository: Symbol.for('UserRepository'),
  PlanRepository: Symbol.for('PlanRepository'),
  // ... adicionar conforme novos m&oacute;dulos

  // Use Cases
  RegisterUseCase: Symbol.for('RegisterUseCase'),
  LoginUseCase: Symbol.for('LoginUseCase'),
  GetProfileUseCase: Symbol.for('GetProfileUseCase'),
  // ... adicionar conforme novos use cases
}
```

#### Container &mdash; Bindings

```typescript
// src/modules/shared/infra/container/container.ts

import { Container } from 'inversify'
import { TYPES } from './types'
import { KyHttpClient, type HttpClient } from '../http/http-client'

const container = new Container()

// --- HttpClient (singleton) ---
container
  .bind<HttpClient>(TYPES.HttpClient)
  .toDynamicValue(() => new KyHttpClient())
  .inSingletonScope()

// --- Repositories ---
container
  .bind<IAuthRepository>(TYPES.AuthRepository)
  .toDynamicValue(() => {
    const httpClient = container.get<HttpClient>(TYPES.HttpClient)
    return new AuthRepository(httpClient)
  })
  .inSingletonScope()

// --- Use Cases ---
container
  .bind<IRegisterUseCase>(TYPES.RegisterUseCase)
  .toDynamicValue(() => {
    const repo = container.get<IAuthRepository>(TYPES.AuthRepository)
    return new RegisterUseCase(repo)
  })
  .inSingletonScope()

export { container }
```

**Padr&atilde;o obrigat&oacute;rio**:
- Todos os bindings usam `toDynamicValue()` (sem decorators do Inversify)
- Tudo &eacute; singleton (`.inSingletonScope()`)
- Reposit&oacute;rios recebem `HttpClient`; use cases recebem reposit&oacute;rios

### 5.3 React Query Setup

```typescript
// src/modules/shared/infra/query/query-client.ts

import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,     // 5 minutos
      gcTime: 30 * 60 * 1000,       // 30 minutos garbage collection
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
})
```

```typescript
// src/modules/shared/infra/query/query-provider.tsx

'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './query-client'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

### 5.4 Zustand Stores

```typescript
// src/modules/shared/application/stores/user-preferences.store.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserPreferencesState {
  displayName: string | null
  density: 'comfortable' | 'standard' | 'compact'
  textScale: number        // 0.8 - 1.3
  reduceMotion: boolean | null  // null = seguir OS
  nativeLanguage: string | null // rehydrated do backend, n&atilde;o persistido

  setDisplayName(name: string | null): void
  setDensity(d: 'comfortable' | 'standard' | 'compact'): void
  setTextScale(s: number): void
  setReduceMotion(r: boolean | null): void
  setNativeLanguage(lang: string | null): void
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      displayName: null,
      density: 'standard',
      textScale: 1,
      reduceMotion: null,
      nativeLanguage: null,

      setDisplayName: (name) => set({ displayName: name }),
      setDensity: (d) => set({ density: d }),
      setTextScale: (s) => set({ textScale: Math.max(0.8, Math.min(1.3, s)) }),
      setReduceMotion: (r) => set({ reduceMotion: r }),
      setNativeLanguage: (lang) => set({ nativeLanguage: lang }),
    }),
    {
      name: 'user-preferences',
      partialize: (state) => ({
        displayName: state.displayName,
        density: state.density,
        textScale: state.textScale,
        reduceMotion: state.reduceMotion,
        // nativeLanguage NAO &eacute; persistido &mdash; vem do backend
      }),
    },
  ),
)
```

### 5.5 Exports do Shared

```typescript
// src/modules/shared/index.ts

export { container, TYPES, queryClient, QueryProvider } from './infra'
export type { HttpClient } from './infra'
```

---

## 6. Blueprint: Como Criar um M&oacute;dulo

Siga este roteiro para cada novo m&oacute;dulo de dom&iacute;nio. Exemplo: m&oacute;dulo `products`.

### Passo 1: Domain Layer

#### 1a. Entity (classe imut&aacute;vel)

```typescript
// src/modules/products/domain/entities/product.entity.ts

interface ProductProps {
  id: string
  name: string
  price: number
  description: string | null
  isActive: boolean
  createdAt: string
}

export class Product {
  private readonly id: string
  private readonly name: string
  private readonly price: number
  private readonly description: string | null
  private readonly isActive: boolean
  private readonly createdAt: string

  constructor(props: ProductProps) {
    this.id = props.id
    this.name = props.name
    this.price = props.price
    this.description = props.description
    this.isActive = props.isActive
    this.createdAt = props.createdAt
  }

  getId(): string { return this.id }
  getName(): string { return this.name }
  getPrice(): number { return this.price }
  getDescription(): string | null { return this.description }
  getIsActive(): boolean { return this.isActive }
  getCreatedAt(): string { return this.createdAt }
}
```

**Regras para entities**:
- Campos `private readonly` + getters
- Construtor recebe um objeto tipado (Props interface)
- Sem m&eacute;todos que modificam estado (imut&aacute;vel)
- Nomes de arquivo: kebab-case (`product.entity.ts`)
- M&eacute;todos auxiliares OK (ex: `isForked()`, `getAccuracy()`, `isAdmin()`)

#### 1b. Repository Interface

```typescript
// src/modules/products/domain/repositories/product.repository.ts

import type { Product } from '../entities/product.entity'
import type { CreateProductParams, UpdateProductParams } from '../types'

export interface IProductRepository {
  list(): Promise<Product[]>
  getById(id: string): Promise<Product>
  create(params: CreateProductParams): Promise<Product>
  update(id: string, params: UpdateProductParams): Promise<Product>
  delete(id: string): Promise<void>
}
```

#### 1c. Types (par&acirc;metros)

```typescript
// src/modules/products/domain/types/index.ts

export interface CreateProductParams {
  name: string
  price: number
  description?: string
}

export interface UpdateProductParams {
  name?: string
  price?: number
  description?: string
}
```

#### 1d. Use Case Interfaces

```typescript
// src/modules/products/domain/use-cases/list-products.use-case.ts

import type { Product } from '../entities/product.entity'

export interface IListProductsUseCase {
  execute(): Promise<Product[]>
}
```

```typescript
// src/modules/products/domain/use-cases/create-product.use-case.ts

import type { Product } from '../entities/product.entity'
import type { CreateProductParams } from '../types'

export interface ICreateProductUseCase {
  execute(params: CreateProductParams): Promise<Product>
}
```

### Passo 2: Infrastructure Layer

#### 2a. Zod Schema (valida&ccedil;&atilde;o da resposta da API)

```typescript
// src/modules/products/infra/schemas/product.schemas.ts

import { z } from 'zod'

export const productApiResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
})

export type ProductApiResponse = z.infer<typeof productApiResponseSchema>
```

**Conven&ccedil;&atilde;o**: o schema espelha a API (snake_case). A convers&atilde;o para camelCase acontece no mapper.

#### 2b. Repository Implementation

```typescript
// src/modules/products/infra/repositories/product.repository.ts

import type { HttpClient } from '@modules/shared'
import type { IProductRepository } from '../../domain/repositories/product.repository'
import type { CreateProductParams, UpdateProductParams } from '../../domain/types'
import { Product } from '../../domain/entities/product.entity'
import { productApiResponseSchema, type ProductApiResponse } from '../schemas/product.schemas'

function toProduct(raw: ProductApiResponse): Product {
  return new Product({
    id: raw.id,
    name: raw.name,
    price: raw.price,
    description: raw.description,
    isActive: raw.is_active,        // snake_case &rarr; camelCase
    createdAt: raw.created_at,
  })
}

export class ProductRepository implements IProductRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async list(): Promise<Product[]> {
    const raw = await this.httpClient.get('products')
    const response = z.array(productApiResponseSchema).parse(raw)
    return response.map(toProduct)
  }

  async getById(id: string): Promise<Product> {
    const raw = await this.httpClient.get(`products/${id}`)
    const response = productApiResponseSchema.parse(raw)
    return toProduct(response)
  }

  async create(params: CreateProductParams): Promise<Product> {
    const raw = await this.httpClient.post('products', {
      name: params.name,
      price: params.price,
      ...(params.description !== undefined && { description: params.description }),
    })
    const response = productApiResponseSchema.parse(raw)
    return toProduct(response)
  }

  async update(id: string, params: UpdateProductParams): Promise<Product> {
    const body: Record<string, unknown> = {}
    if (params.name !== undefined) body.name = params.name
    if (params.price !== undefined) body.price = params.price
    if (params.description !== undefined) body.description = params.description

    const raw = await this.httpClient.put(`products/${id}`, body)
    const response = productApiResponseSchema.parse(raw)
    return toProduct(response)
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.deleteNoContent(`products/${id}`)
  }
}
```

**Padr&otilde;es cr&iacute;ticos**:
- Fun&ccedil;&atilde;o `toXxx()` &eacute; o mapper: snake_case (API) &rarr; camelCase (entity)
- Zod `.parse()` em TODA resposta da API (valida&ccedil;&atilde;o runtime)
- Campos opcionais constru&iacute;dos condicionalmente no body
- `deleteNoContent` para endpoints que retornam 204

### Passo 3: Application Layer

#### 3a. Use Case Implementation (thin wrapper)

```typescript
// src/modules/products/application/use-cases/list-products/index.ts

import type { IListProductsUseCase } from '../../../domain/use-cases/list-products.use-case'
import type { IProductRepository } from '../../../domain/repositories/product.repository'
import type { Product } from '../../../domain/entities/product.entity'

export class ListProductsUseCase implements IListProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.list()
  }
}
```

**Nota**: use cases s&atilde;o thin wrappers que delegam ao repository. Quando houver l&oacute;gica de orquestra&ccedil;&atilde;o (ex: submeter feedback + upload screenshot), ela fica aqui.

#### 3b. React Hooks

**Query hook** (leitura):

```typescript
// src/modules/products/application/hooks/useListProducts.ts

'use client'

import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@modules/shared'
import type { IListProductsUseCase } from '../../domain/use-cases/list-products.use-case'

// Resolver fora do hook (module scope) &mdash; singleton
const listProductsUseCase = container.get<IListProductsUseCase>(TYPES.ListProductsUseCase)

export const PRODUCTS_QUERY_KEY = ['products'] as const

export function useListProducts() {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: () => listProductsUseCase.execute(),
  })
}
```

**Mutation hook** (escrita):

```typescript
// src/modules/products/application/hooks/useCreateProduct.ts

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@modules/shared'
import type { ICreateProductUseCase } from '../../domain/use-cases/create-product.use-case'
import type { CreateProductParams } from '../../domain/types'
import { PRODUCTS_QUERY_KEY } from './useListProducts'

const createProductUseCase = container.get<ICreateProductUseCase>(TYPES.CreateProductUseCase)

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateProductParams) => createProductUseCase.execute(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY })
    },
  })
}
```

**Padr&otilde;es cr&iacute;ticos para hooks**:
- `'use client'` obrigat&oacute;rio (Next.js App Router)
- Use case resolvido via `container.get()` no **module scope** (fora do hook)
- Query keys exportados como `const` para reuso
- Mutations invalidam queries relacionadas no `onSuccess`

### Passo 4: Container Bindings

Adicionar em `src/modules/shared/infra/container/container.ts`:

```typescript
// --- Products ---
import type { IProductRepository } from '@modules/products/domain/repositories/product.repository'
import { ProductRepository } from '@modules/products/infra/repositories/product.repository'
import type { IListProductsUseCase } from '@modules/products/domain/use-cases/list-products.use-case'
import { ListProductsUseCase } from '@modules/products/application/use-cases/list-products'
import type { ICreateProductUseCase } from '@modules/products/domain/use-cases/create-product.use-case'
import { CreateProductUseCase } from '@modules/products/application/use-cases/create-product'

container
  .bind<IProductRepository>(TYPES.ProductRepository)
  .toDynamicValue(() => {
    const httpClient = container.get<HttpClient>(TYPES.HttpClient)
    return new ProductRepository(httpClient)
  })
  .inSingletonScope()

container
  .bind<IListProductsUseCase>(TYPES.ListProductsUseCase)
  .toDynamicValue(() => {
    const repo = container.get<IProductRepository>(TYPES.ProductRepository)
    return new ListProductsUseCase(repo)
  })
  .inSingletonScope()

container
  .bind<ICreateProductUseCase>(TYPES.CreateProductUseCase)
  .toDynamicValue(() => {
    const repo = container.get<IProductRepository>(TYPES.ProductRepository)
    return new CreateProductUseCase(repo)
  })
  .inSingletonScope()
```

E em `types.ts`:
```typescript
ProductRepository: Symbol.for('ProductRepository'),
ListProductsUseCase: Symbol.for('ListProductsUseCase'),
CreateProductUseCase: Symbol.for('CreateProductUseCase'),
```

### Passo 5: Barrel Exports

```typescript
// src/modules/products/domain/index.ts
export { Product } from './entities/product.entity'
export type { IProductRepository } from './repositories/product.repository'
export type { IListProductsUseCase } from './use-cases/list-products.use-case'
export type { ICreateProductUseCase } from './use-cases/create-product.use-case'
export type { CreateProductParams, UpdateProductParams } from './types'

// src/modules/products/application/index.ts
export { useListProducts, PRODUCTS_QUERY_KEY } from './hooks/useListProducts'
export { useCreateProduct } from './hooks/useCreateProduct'

// src/modules/products/index.ts
export * from './domain'
export * from './application'
```

---

## 7. Internacionaliza&ccedil;&atilde;o (i18n)

### 7.1 Configura&ccedil;&atilde;o

```typescript
// src/i18n/routing.ts

import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pt-BR', 'en', 'es', 'fr'],
  defaultLocale: 'pt-BR',
  localePrefix: 'as-needed',  // pt-BR n&atilde;o aparece na URL
})
```

```typescript
// src/i18n/request.ts

import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  // Importa e mescla namespaces
  const [common, auth, dashboard /* ...outros */] = await Promise.all([
    import(`@/src/messages/${locale}/common.json`),
    import(`@/src/messages/${locale}/auth.json`),
    import(`@/src/messages/${locale}/dashboard.json`),
    // ... adicionar conforme necess&aacute;rio
  ])

  return {
    locale,
    messages: {
      ...common.default,
      ...auth.default,
      ...dashboard.default,
    },
  }
})
```

```typescript
// src/i18n/navigation.ts

import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
```

### 7.2 Estrutura de mensagens

```
src/messages/
&boxur;&boxh;&boxh; pt-BR/
&boxv;   &boxur;&boxh;&boxh; common.json       # Nav, bot&otilde;es, labels compartilhados
&boxv;   &boxur;&boxh;&boxh; auth.json          # Login, registro, esqueci senha
&boxv;   &boxur;&boxh;&boxh; dashboard.json     # Dashboard
&boxv;   &boxdr;&boxh;&boxh; ...
&boxur;&boxh;&boxh; en/
&boxv;   &boxdr;&boxh;&boxh; ...   (mesma estrutura)
&boxur;&boxh;&boxh; es/
&boxdr;&boxh;&boxh; fr/
```

### 7.3 Tipagem das tradu&ccedil;&otilde;es

```typescript
// global.d.ts

import type commonMessages from './src/messages/pt-BR/common.json'
import type authMessages from './src/messages/pt-BR/auth.json'
// ... importar todos

type Messages = typeof commonMessages &
  typeof authMessages &
  // ...
  typeof dashboardMessages

declare global {
  interface IntlMessages extends Messages {}
}
```

### 7.4 Uso nos componentes

```typescript
// Server Component
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Dashboard' })
  return { title: t('title') }
}

// Client Component
'use client'
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('Dashboard')
  return <h1>{t('title')}</h1>
}
```

### 7.5 Plugin Next.js

```typescript
// next.config.ts

import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig = { /* ... */ }
export default withNextIntl(nextConfig)
```

---

## 8. Sistema de Autentica&ccedil;&atilde;o e Seguran&ccedil;a

### 8.1 API Proxy (Next.js Route Handler)

Toda comunica&ccedil;&atilde;o com o backend passa por um proxy em `app/api/[...path]/route.ts`. Isso permite:

- **Token management**: cookies httpOnly (n&atilde;o acess&iacute;veis por JS)
- **Token refresh autom&aacute;tico**: intercepta 401, faz refresh, re-executa
- **CSRF protection**: valida&ccedil;&atilde;o de token header vs cookie
- **Rate limiting**: por endpoint via Upstash Redis
- **Path sanitization**: previne path traversal
- **Origin validation**: whitelist de origens permitidas
- **Response size limiting**: max 10MB
- **SSE passthrough**: streams n&atilde;o s&atilde;o bufferizados

#### Token Refresh com Lock (previne race condition)

```typescript
let refreshPromise: Promise<boolean> | null = null

async function tryRefreshTokenWithLock(cookieStore): Promise<boolean> {
  if (refreshPromise !== null) return refreshPromise  // Reusar promise existente

  refreshPromise = tryRefreshToken(cookieStore).finally(() => {
    refreshPromise = null  // Limpar lock
  })

  return refreshPromise
}
```

**Como funciona**: se 3 requests recebem 401 ao mesmo tempo, apenas 1 refresh &eacute; executado. Os outros esperam o resultado.

#### Cookies de Token

```typescript
// Access token: httpOnly, secure, strict sameSite, 1 hora
// Refresh token: httpOnly, secure, strict sameSite, 14 dias
```

### 8.2 CSRF Protection

Sistema de duas partes:

1. **Middleware** (`proxy.ts`): gera `csrf_token` como cookie n&atilde;o-httpOnly (leg&iacute;vel por JS)
2. **HttpClient**: l&ecirc; o cookie e envia como header `x-csrf-token`
3. **API Proxy**: compara header com cookie &mdash; devem ser iguais

### 8.3 CSP (Content Security Policy)

```typescript
function buildCspHeader(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' https://your-s3-bucket.amazonaws.com data: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://us.i.posthog.com",
    "object-src 'none'",
    "frame-ancestors 'none'",
  ].join("; ")
}
```

Nonce &eacute; gerado por request e propagado via header `x-nonce`.

### 8.4 Rate Limiting

```typescript
const RATE_LIMIT_CONFIG = {
  'auth/login':           { limit: 5,  windowMs: 15 * 60 * 1000 },  // 5/15min
  'auth/register':        { limit: 3,  windowMs: 60 * 60 * 1000 },  // 3/hora
  'auth/forgot-password': { limit: 3,  windowMs: 60 * 60 * 1000 },  // 3/hora
  'auth/reset-password':  { limit: 5,  windowMs: 15 * 60 * 1000 },  // 5/15min
}
// Global fallback: 60 req/min
```

- **Produ&ccedil;&atilde;o**: Upstash Redis (sliding window)
- **Dev**: in-memory store (n&atilde;o persiste entre restarts)

### 8.5 Security Headers

```typescript
// next.config.ts headers()
[
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]
```

P&aacute;ginas de auth recebem `Cache-Control: no-store, no-cache, must-revalidate`.

### 8.6 Security Logger

Eventos de seguran&ccedil;a s&atilde;o logados como JSON estruturado:

```typescript
type SecurityEventType =
  | 'CSRF_VIOLATION'            // critical
  | 'ORIGIN_VIOLATION'          // high
  | 'PATH_TRAVERSAL_BLOCKED'   // critical
  | 'RATE_LIMIT_EXCEEDED'      // medium
  | 'TOKEN_REFRESH_FAILURE'    // medium
  | 'JWT_MALFORMED'            // high
  // ...
```

### 8.7 Middleware de Prote&ccedil;&atilde;o de Rotas

```typescript
// proxy.ts (Next.js middleware)

const PROTECTED_PATHS = ['/dashboard', '/add-phrase', '/settings', '/statistics']

// Rotas protegidas sem token &rarr; redirect para /login
// Rotas de auth com token v&aacute;lido &rarr; redirect para /dashboard
// Token expirado &rarr; limpa cookie + redirect para /login
```

### 8.8 Guards (Client-Side)

Tr&ecirc;s n&iacute;veis de guarda nos layouts:

1. **EmailVerificationGuard**: verifica se email foi confirmado; se n&atilde;o, mostra modal
2. **OnboardingGuard**: verifica se onboarding foi completado; se n&atilde;o, redireciona
3. **RoleGuard**: verifica se usu&aacute;rio tem role necess&aacute;ria (admin)

```
Rota autenticada &rarr; EmailVerificationGuard &rarr; OnboardingGuard &rarr; Conte&uacute;do
Rota admin &rarr; RoleGuard &rarr; Conte&uacute;do
```

---

## 9. UI, Styling e Design System

### 9.1 Tailwind CSS v4

```css
/* app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* ... */
  --font-sans: var(--font-inter);
  --font-heading: var(--font-manrope);
  --radius-lg: calc(var(--radius) * 1);
  /* ... */
}
```

### 9.2 Sistema de Cores (Light + Dark)

```css
:root {
  --background: oklch(0.97 0.01 270);
  --foreground: oklch(0.15 0.04 270);
  --primary: oklch(0.53 0.26 293);      /* #7c3aed - roxo */
  --secondary: oklch(0.49 0.11 200);    /* teal */
  /* ...completo com surface colors Material Design 3 */
}

.dark {
  --background: oklch(0.08 0.02 270);
  --foreground: oklch(0.98 0 0);
  --primary: oklch(0.53 0.26 293);      /* mesmo roxo */
  /* ... */
}
```

### 9.3 Fontes

```typescript
// app/[locale]/layout.tsx

import { Inter, Manrope } from 'next/font/google'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'] })

// Aplicadas via className no <html>
```

- **Inter** (`font-sans`): corpo de texto
- **Manrope** (`font-heading`): t&iacute;tulos

### 9.4 Componentes shadcn/ui

Estilo **base-nova** usando `@base-ui/react` como primitivos (n&atilde;o Radix UI):

- `button` &mdash; CVA com variantes: default, outline, secondary, ghost, destructive, link
- `input` &mdash; Base UI input com estados inv&aacute;lidos
- `dialog` &mdash; Modal com backdrop blur
- `select` &mdash; Dropdown com scroll e posicionamento
- `sheet` &mdash; Painel lateral (top/right/bottom/left)
- `tabs` &mdash; Abas com variantes line/default
- `dropdown-menu` &mdash; Menu com submenus, checkboxes, radio items
- `card` &mdash; Container com slots (Header, Title, Content, Footer)
- `badge`, `table`, `skeleton`, `chart`

### 9.5 Custom CSS Utilities

```css
.gradient-text    { /* Gradient text com background-clip */ }
.gradient-bg      { /* Background gradient roxo &rarr; cyan */ }
.glass-card       { /* Backdrop blur glass morphism */ }
.hero-glow        { /* Radial gradient roxo */ }
.shimmer-text     { /* Anima&ccedil;&atilde;o shimmer com keyframes */ }
.ghost-border     { /* Borda semi-transparente */ }
.dot-grid         { /* Pattern de pontos */ }
.no-scrollbar     { /* Esconde scrollbars */ }
```

### 9.6 Sistema de Densidade (User Preference)

```css
:root[data-density="comfortable"] .density-aware {
  --density-y: 1.25rem;
  --density-x: 1.5rem;
}
:root[data-density="compact"] .density-aware {
  --density-y: 0.625rem;
  --density-x: 0.75rem;
}
```

Controlado via Zustand store + `UserPreferencesEffect` (componente renderless que sincroniza store &rarr; atributos `data-*` no `<html>`).

### 9.7 Reduced Motion

```css
:root[data-reduce-motion="true"] * {
  animation-duration: 0.001ms !important;
  transition-duration: 0.001ms !important;
}
```

Respeita `prefers-reduced-motion` do OS por padr&atilde;o; usu&aacute;rio pode overridar.

### 9.8 Anima&ccedil;&otilde;es (GSAP)

Componentes de anima&ccedil;&atilde;o reutiliz&aacute;veis:

- `RevealOnScroll` &mdash; Fade in + translate ao scrollar (dire&ccedil;&atilde;o, dist&acirc;ncia, delay configur&aacute;veis)
- `HeroReveal` &mdash; Anima&ccedil;&atilde;o de entrada do hero section
- `StaggerOnScroll` &mdash; Anima&ccedil;&atilde;o stagger dos filhos ao scrollar

Todos respeitam `data-reduce-motion`.

---

## 10. Gerenciamento de Estado

### Estrat&eacute;gia Dual

| Tipo de Estado | Ferramenta | Uso |
|---|---|---|
| **Server state** | React Query | Dados da API: fetching, cache, invalidation, mutations |
| **Client state** | Zustand | UI: prefer&ecirc;ncias, sidebar, modais, steps de wizard |

### React Query &mdash; Padr&otilde;es Estabelecidos

```typescript
// Query (leitura)
export const QUERY_KEY = ['resource', 'subkey'] as const

export function useResource() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => useCase.execute(),
  })
}

// Mutation (escrita) com invalidation
export function useCreateResource() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params) => useCase.execute(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

// Mutation com update otimista
export function useUpdateResource() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params) => useCase.execute(params),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEY, data)  // update direto
    },
  })
}
```

### Zustand &mdash; Padr&otilde;es Estabelecidos

```typescript
// Store b&aacute;sico (sem persist)
export const useSidebarStore = create<SidebarState>()((set) => ({
  open: false,
  toggle: () => set((s) => ({ open: !s.open })),
  close: () => set({ open: false }),
}))

// Store com persist (localStorage)
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({ /* ... */ }),
    {
      name: 'storage-key',
      partialize: (state) => ({ /* campos para persistir */ }),
    },
  ),
)
```

---

## 11. Padr&otilde;es e Conven&ccedil;&otilde;es

### 11.1 Nomenclatura

| Item | Conven&ccedil;&atilde;o | Exemplo |
|---|---|---|
| Arquivos de entidade | kebab-case + `.entity.ts` | `user-profile.entity.ts` |
| Arquivos de schema | kebab-case + `.schemas.ts` | `user.schemas.ts` |
| Use cases (interface) | `IXxxUseCase` | `IGetProfileUseCase` |
| Use cases (impl) | `XxxUseCase` em pasta `xxx/index.ts` | `get-profile/index.ts` |
| Hooks | `useXxx.ts` | `useGetProfile.ts` |
| Reposit&oacute;rios (interface) | `IXxxRepository` | `IProductRepository` |
| TYPES symbols | `Symbol.for('PascalCase')` | `Symbol.for('ProductRepository')` |
| API fields | snake_case | `full_name`, `created_at` |
| Entity fields | camelCase | `fullName`, `createdAt` |

### 11.2 Conven&ccedil;&otilde;es de Commits

- **Nunca** commitar direto em main, develop, homolog, stage
- Branches sem&acirc;nticas: `feat/xxx`, `fix/xxx`, `refactor/xxx`
- Conventional Commits em ingl&ecirc;s: `feat:`, `fix:`, `test:`, `refactor:`, `docs:`, `chore:`

### 11.3 Tratamento de Erros

```typescript
// Nos componentes (hooks mutation):
try {
  await mutation.mutateAsync(params)
  router.push('/next-page')
} catch (error) {
  if (error instanceof HTTPError) {
    if (error.response.status === 401) { /* cred. inv&aacute;lidas */ }
    if (error.response.status === 403) { /* sem permiss&atilde;o / plan limit */ }
    if (error.response.status === 409) { /* conflito (email j&aacute; existe) */ }
    if (error.response.status === 429) { /* rate limited */ }
  }
  // Parsing de erros de valida&ccedil;&atilde;o (Pydantic)
  const validationErrors = await parseValidationError(error)
}
```

### 11.4 Formul&aacute;rios

O projeto usa **useState puro** (sem react-hook-form):

```typescript
const [field, setField] = useState('')
const isFormValid = field.trim().length > 0 && otherChecks

<button disabled={!isFormValid || mutation.isPending}>
  {mutation.isPending ? t('submitting') : t('submit')}
</button>
```

### 11.5 Analytics (PostHog)

Cada a&ccedil;&atilde;o importante &eacute; rastreada:

```typescript
import posthog from 'posthog-js'

// Identifica&ccedil;&atilde;o
posthog.identify(email, { email, name })

// Eventos
posthog.capture('user_signed_up', { method: 'email', native_language })
posthog.capture('feedback_submitted', { category, severity, route })

// Erros
posthog.captureException(error)
```

### 11.6 Pagina&ccedil;&atilde;o

```typescript
interface PaginatedResult<T> {
  items: T[]
  total: number
  skip: number
  limit: number
  hasMore: boolean
}
```

---

## 12. Li&ccedil;&otilde;es Aprendidas e Decis&otilde;es Arquiteturais

### 12.1 Inversify sem Decorators

Decidimos usar `toDynamicValue()` em vez de decorators (`@injectable()`, `@inject()`) porque:
- Decorators exigem `reflect-metadata` e configura&ccedil;&atilde;o experimental do TS
- `toDynamicValue()` &eacute; mais simples e expl&iacute;cito
- Todo binding em um &uacute;nico arquivo centralizado (f&aacute;cil de auditar)

### 12.2 HTTP via Ky (n&atilde;o Axios)

Ky foi escolhido por:
- Baseado em fetch nativo (melhor para edge runtime)
- Retry e timeout built-in
- Hooks (`beforeRequest`) para CSRF injection
- ~2KB (vs ~30KB do Axios)
- API fluent (.json(), .text(), etc.)

### 12.3 Tokens em httpOnly Cookies (n&atilde;o localStorage)

- **Antes**: tokens em localStorage, HttpClient injetava `Authorization` header
- **Depois**: tokens em cookies httpOnly via API proxy
- **Motivo**: XSS n&atilde;o consegue ler cookies httpOnly; mais seguro para tokens

### 12.4 API Proxy no Next.js (n&atilde;o chamadas diretas)

O client NUNCA chama o backend diretamente. Tudo passa pelo proxy `/api/[...path]`:
- Esconde a URL do backend do client-side
- Permite token management server-side
- CSRF validation centralizada
- Rate limiting antes de chegar ao backend
- SSE streams passam sem buffering

### 12.5 Zod em TODA resposta da API

Toda resposta &eacute; validada com `schema.parse(raw)` antes de virar entity. Isso:
- Detecta breaking changes da API imediatamente
- Garante type safety real (n&atilde;o s&oacute; em compile time)
- Facilita debugging quando a API muda sem aviso

### 12.6 Use Cases como Thin Wrappers

A maioria dos use cases apenas delega ao repository. Parece over-engineering, mas:
- Quando surge l&oacute;gica de orquestra&ccedil;&atilde;o (ex: submit + upload screenshot), o lugar j&aacute; existe
- Hooks n&atilde;o importam reposit&oacute;rios diretamente (invers&atilde;o de depend&ecirc;ncia mantida)
- Testabilidade: mock do use case &eacute; mais limpo que mock do repo no hook

### 12.7 Entities Imut&aacute;veis

Entities usam `private readonly` + getters (sem setters). Para "atualizar", cria-se uma nova inst&acirc;ncia:

```typescript
withCardAdded(): WritingConversation {
  return new WritingConversation({
    ...this,
    cardsAddedCount: this.cardsAddedCount + 1,
  })
}
```

### 12.8 Guards Encadeados nos Layouts

Em vez de verificar auth/onboarding/email em cada p&aacute;gina, os guards ficam nos layouts do Next.js:

```
(auth)/layout.tsx        &rarr; Redireciona para /dashboard se logado
(logged)/layout.tsx      &rarr; EmailVerificationGuard + OnboardingGuard
(onboarding)/layout.tsx  &rarr; EmailVerificationGuard
admin/layout.tsx         &rarr; RoleGuard
```

### 12.9 Refresh Token com Lock (Race Condition)

Sem o lock, 5 requests simult&acirc;neos recebendo 401 fariam 5 refreshes. Com o lock, apenas 1 refresh &eacute; executado; os outros reutilizam a mesma Promise.

### 12.10 SSE (Server-Sent Events) para Streaming

O Writing Lab usa SSE para respostas em tempo real do AI tutor. Padr&atilde;o:
- Client faz fetch com `Accept: text/event-stream`
- API proxy detecta `content-type: text/event-stream` e faz passthrough (sem timeout, sem buffering)
- Client l&ecirc; o stream via `ReadableStream` / `EventSource`
- Eventos tipados: `text_delta`, `corrections`, `challenge`, `vocabulary`, `message_complete`

### 12.11 Feedback Module como Refer&ecirc;ncia de Orquestra&ccedil;&atilde;o

O m&oacute;dulo de feedback &eacute; o melhor exemplo de use case com l&oacute;gica:
1. Captura screenshot (dom-to-image, din&acirc;mico para evitar SSR)
2. Submete feedback (recebe ticket_code)
3. Se screenshot habilitado: converte base64 &rarr; Blob &rarr; upload separado
4. Tudo orquestrado no use case, n&atilde;o no componente

### 12.12 UserPreferencesEffect (Renderless Component)

Para sincronizar estado do Zustand com atributos do `<html>`, usamos um componente "renderless" (retorna `null`):

```typescript
export function UserPreferencesEffect() {
  const density = useUserPreferencesStore((s) => s.density)
  const textScale = useUserPreferencesStore((s) => s.textScale)

  useEffect(() => {
    document.documentElement.setAttribute('data-density', density)
    document.documentElement.style.fontSize = `${textScale * 100}%`
  }, [density, textScale])

  return null
}
```

Isso permite que CSS variables (`data-density`) e estilos inline reajam a mudan&ccedil;as de prefer&ecirc;ncia sem prop drilling.

### 12.13 Error Boundaries para Plan Limits

Quando a API retorna 403 com payload `plan_limit_exceeded`:
1. `PlanLimitError` &eacute; parseado no catch do hook/componente
2. `UpgradeModal` &eacute; mostrado com compara&ccedil;&atilde;o de planos
3. 7 variantes pr&eacute;-configuradas com &iacute;cones, cores, perks

### 12.14 Dual-Quota (Subscriptions)

O sistema de limites suporta:
- **Monthly quota**: renova todo m&ecirc;s (ex: cards gerados/m&ecirc;s)
- **Lifetime quota**: nunca renova (ex: total de decks)
- `UsageMetric.getEffectiveQuota()` retorna o mais restritivo

### 12.15 Scope Frontend-Only

**Nunca** proponha mudan&ccedil;as no backend. O frontend trabalha dentro do contrato da API existente. Se a API n&atilde;o suporta algo, documente a limita&ccedil;&atilde;o.

### 12.16 Reusar Componentes para Create/Edit

N&atilde;o crie componentes separados para cria&ccedil;&atilde;o e edi&ccedil;&atilde;o. Adapte o formul&aacute;rio de cria&ccedil;&atilde;o para suportar ambos os modos (via props ou estado).

### 12.17 sr-only em Scroll Containers

Nunca use `<input type="radio/checkbox" className="sr-only">` dentro de containers com scroll. O foco no input inv&iacute;svel causa scroll jump. Use `<div role="radio">` + `onClick` + `onKeyDown`.

### 12.18 Card no Board ANTES do C&oacute;digo

Sempre crie o issue no GitHub **antes** de come&ccedil;ar a implementa&ccedil;&atilde;o. Isso garante rastreabilidade e permite discuss&atilde;o antes do c&oacute;digo.

---

## Checklist para Novo Projeto

- [ ] Criar projeto Next.js com App Router + TypeScript
- [ ] Instalar e configurar todas as depend&ecirc;ncias (se&ccedil;&atilde;o 4)
- [ ] Configurar shadcn/ui com estilo base-nova
- [ ] Configurar path aliases (`@/*`, `@modules/*`)
- [ ] Criar `lib/utils.ts` (cn), `lib/security.ts`, `lib/gsap.ts`
- [ ] Criar m&oacute;dulo `shared/` completo:
  - [ ] HttpClient (Ky + CSRF)
  - [ ] Container Inversify (TYPES + bindings)
  - [ ] QueryClient + QueryProvider
  - [ ] Zustand stores (preferences, sidebar)
  - [ ] UserPreferencesEffect
  - [ ] ThemeProvider (next-themes)
- [ ] Configurar i18n (next-intl):
  - [ ] routing.ts, request.ts, navigation.ts
  - [ ] Criar mensagens para cada locale
  - [ ] global.d.ts para tipagem
  - [ ] Plugin em next.config.ts
- [ ] Criar layout base:
  - [ ] Root layout com providers
  - [ ] Auth layout (redirect se logado)
  - [ ] Logged layout (sidebar + guards)
- [ ] Implementar API proxy:
  - [ ] Catch-all route handler
  - [ ] Token management (cookies httpOnly)
  - [ ] CSRF protection
  - [ ] Rate limiting
  - [ ] Security headers
  - [ ] Security logger
- [ ] Implementar middleware:
  - [ ] Prote&ccedil;&atilde;o de rotas
  - [ ] CSP com nonce
  - [ ] CSRF cookie generation
- [ ] Configurar globals.css:
  - [ ] Tailwind v4 imports
  - [ ] CSS variables (light + dark)
  - [ ] Custom utilities
  - [ ] Density system
  - [ ] Reduced motion
- [ ] Criar m&oacute;dulo `auth/`:
  - [ ] Entities (AuthUser, AuthTokens)
  - [ ] Repository + Use Cases
  - [ ] Hooks + Components
  - [ ] P&aacute;ginas (login, register, forgot, reset, verify)
- [ ] Criar m&oacute;dulo `users/`:
  - [ ] Entity (UserProfile)
  - [ ] CRUD hooks
  - [ ] Guards (EmailVerification, Onboarding)
- [ ] Criar primeiro m&oacute;dulo de dom&iacute;nio seguindo o blueprint (se&ccedil;&atilde;o 6)
- [ ] Configurar analytics (PostHog)
- [ ] Configurar `CLAUDE.md` e `AGENTS.md` para o projeto
- [ ] Configurar regras de commit em `.claude/rules.md`

---

## Refer&ecirc;ncias

- [architecture-reference.md](./architecture-reference.md) &mdash; Documento original de refer&ecirc;ncia arquitetural
- [pre-issue.md](./pre-issue.md) &mdash; Workflow de planejamento antes de implementar
- [e2e-business-rules.md](./e2e-business-rules.md) &mdash; Regras de neg&oacute;cio completas
- [e2e-test-scenarios.md](./e2e-test-scenarios.md) &mdash; 73 cen&aacute;rios de teste E2E
