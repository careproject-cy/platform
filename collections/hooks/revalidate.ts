/**
 * Purges Next's route cache so CMS edits appear without a deploy.
 * The site is small, so a full purge beats tracking per-path invalidation.
 * No-ops outside a Next request context (e.g. the content import script).
 */
export async function revalidateSite(disabled?: unknown): Promise<void> {
  if (disabled) return
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Not running inside Next - nothing to revalidate.
  }
}
