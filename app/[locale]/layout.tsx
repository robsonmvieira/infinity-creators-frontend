import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter, Manrope } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { notFound } from 'next/navigation'
import { routing } from '@/src/i18n/routing'
import { QueryProvider, UserPreferencesEffect } from '@modules/shared'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'] })

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              <UserPreferencesEffect />
              {children}
            </QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
