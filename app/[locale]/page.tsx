import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('Common')

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="font-heading text-4xl font-bold">{t('appName')}</h1>
    </div>
  )
}
