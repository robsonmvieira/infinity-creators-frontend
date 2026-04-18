import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Infinity Creators',
  description: 'Plataforma de criação automática de conteúdo para redes sociais',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
