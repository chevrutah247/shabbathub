'use client'

import { usePathname } from 'next/navigation'

const LABELS: Record<string, string> = {
  catalog: 'Catalog',
  about: 'About',
  contact: 'Contact',
  donate: 'Donate',
  login: 'Login',
  register: 'Register',
  profile: 'Profile',
  subscribe: 'Subscribe',
  leaders: 'Leaders',
  navigator: 'Navigator',
  marketplace: 'Marketplace',
  'add-publication': 'Add Publication',
  'add-pdf': 'Add PDF',
  'torah-groups': 'Torah Groups',
  'suggest-group': 'Suggest Group',
  'reset-password': 'Reset Password',
  publication: 'Publication',
  document: 'Document',
  uploader: 'Uploader',
  admin: 'Admin',
}

const BASE = 'https://www.shabbathub.com'

export default function BreadcrumbJsonLd() {
  const pathname = usePathname()
  if (!pathname || pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)
  const items = [
    { '@type': 'ListItem' as const, position: 1, name: 'Home', item: BASE },
  ]

  let path = ''
  segments.forEach((seg, i) => {
    path += `/${seg}`
    items.push({
      '@type': 'ListItem',
      position: i + 2,
      name: LABELS[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      item: `${BASE}${path}`,
    })
  })

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items,
        }),
      }}
    />
  )
}
