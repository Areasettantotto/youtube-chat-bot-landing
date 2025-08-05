// navItems.js - definizione centralizzata dei menu per desktop e mobile
export function getNavItems(t, variant = 'desktop') {
  // variant: 'desktop' | 'mobile'
  const base = [
    { label: t('nav.home'), href: '#hero', icon: '🏠' },
    { label: t('nav.setup'), href: '#setup', icon: '🚀' },
    { label: t('nav.features'), href: '#features', icon: '🔧' },
    { label: t('nav.multilingual'), href: '#multilingual', icon: '🌍' },
    { label: t('nav.logging'), href: '#logging', icon: '📊' },
    { label: t('nav.faq'), href: '#troubleshooting', icon: '🔍' }
  ]
  if (variant === 'mobile') {
    return [
      ...base,
      { label: t('nav.contact'), href: '#footer', icon: '📧' },
      { label: t('nav.privacy'), href: '#policy', icon: '📋' }
    ]
  }
  // desktop: niente contact/privacy
  return base.map(({ icon, ...rest }) => rest)
}
