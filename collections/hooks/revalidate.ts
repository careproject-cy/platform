import { domain, indexNowKey } from '../../app/data/consts'

export type RefreshScope = 'dogs' | 'posts' | 'all'

const origin = `https://${domain}`

// routes: what a change can show up on; listings: index pages to resubmit with the changed URL.
const scopes = {
  dogs: { routes: ['/(frontend)/dogs/[location]/[file]', '/(frontend)/adopted/[page]', '/dogs'], prefixes: ['/dogs', '/adopted'], listings: ['/', '/dogs'] },
  posts: { routes: ['/(frontend)/blog/[id]', '/blog'], prefixes: ['/blog'], listings: ['/', '/blog'] },
}

// Purges only what a change can affect; in production re-renders it and submits it to IndexNow.
export async function refreshSite(scope: RefreshScope, changedPaths: string[], disabled?: unknown): Promise<void> {
  if (disabled) return
  try {
    const { revalidatePath } = await import('next/cache')
    if (scope === 'all') {
      revalidatePath('/', 'layout')
    } else {
      for (const route of scopes[scope].routes) revalidatePath(route, route.includes('[') ? 'page' : undefined)
      for (const path of ['/', '/sitemap.xml', '/llms.txt']) revalidatePath(path)
    }
    if (process.env.VERCEL_ENV !== 'production') return
    const { after } = await import('next/server')
    after(() => warmAndSubmit(scope, changedPaths))
  } catch {
    // Not running inside a Next request (e.g. the content import script) - nothing to refresh.
  }
}

async function warmAndSubmit(scope: RefreshScope, changedPaths: string[]): Promise<void> {
  const sitemap = await fetch(`${origin}/sitemap.xml`).then((r) => r.text()).catch(() => '')
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1])
    .filter((url) => scope === 'all' || url === origin || scopes[scope].prefixes.some((p) => url.startsWith(origin + p)))
  urls.push(`${origin}/llms.txt`)
  for (let i = 0; i < urls.length; i += 4) {
    await Promise.all(urls.slice(i, i + 4).map((url) => fetch(url).catch(() => undefined)))
  }

  if (scope === 'all' || !changedPaths.length) return
  const urlList = [...new Set([...changedPaths, ...scopes[scope].listings])].map((path) => origin + path)
  await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: domain, key: indexNowKey, urlList }),
  }).catch(() => undefined)
}
