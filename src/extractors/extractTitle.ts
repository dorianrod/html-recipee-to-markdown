import { type Page } from 'playwright'

/**
 * Retrieves the page title from meta tags or the <title> element.
 * @param {import('playwright').Page} page - The Playwright page instance.
 * @returns {Promise<string|null>} - The extracted title, or null if not found.
 */
export async function extractTitle(page: Page) {
  return await page.evaluate(() => {
    const metaOgTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null
    if (metaOgTitle && metaOgTitle.content) return metaOgTitle.content
    const metaTitle = document.querySelector('meta[name="title"]') as HTMLMetaElement | null
    if (metaTitle && metaTitle.content) return metaTitle.content
    if (document.title) return document.title
    return null
  })
}
