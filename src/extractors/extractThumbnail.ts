import { type Page } from 'playwright'

/**
 * Retrieves the page thumbnail from meta tags.
 * @param {import('playwright').Page} page - The Playwright page instance.
 * @returns {Promise<string|null>} - The extracted thumbnail URL, or null if not found.
 */
export async function extractThumbnail(page: Page) {
  return await page.evaluate(() => {
    const metaOgImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null
    if (metaOgImage && metaOgImage.content) return metaOgImage.content
    const metaImage = document.querySelector('meta[name="image"]') as HTMLMetaElement | null
    if (metaImage && metaImage.content) return metaImage.content
    return null
  })
}
