export function getNavItems(t, variant = 'desktop') {
  const items = [
    { label: t('nav.home'), href: '#hero', icon: '🏠' },
    { label: t('nav.setup'), href: '#setup', icon: '🚀' },
    { label: t('nav.features'), href: '#features', icon: '🔧' },
    { label: t('nav.multilingual'), href: '#multilingual', icon: '🌍' },
    { label: t('nav.logging'), href: '#logging', icon: '📊' },
    { label: t('nav.faq'), href: '#troubleshooting', icon: '🔍' },
    { label: t('nav.contact'), href: '#footer', icon: '📧' }
  ];

  // Per desktop si rimuove la proprietà icon
  if (variant === 'desktop') {
    return items.map(({ icon, ...rest }) => rest);
  }
  // Per mobile si restituisce tutto (con icone)
  return items;
}
