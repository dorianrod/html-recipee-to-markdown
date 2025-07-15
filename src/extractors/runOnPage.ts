import { chromium, type Page } from 'playwright'
import { consola } from 'consola'

/**
 * Attempts to load a page using different user-agents until successful.
 *
 * @param {string} url - The URL to load.
 * @param {string[]} userAgents - List of user-agent strings to try.
 * @param {function} pageTaskCallback - Callback to execute on the loaded page.
 * @returns {Promise<*>} - The result of the callback if successful.
 * @throws {Error} If no user-agent allows access to the page.
 */
export async function runOnPage(url: string, userAgents: string[], pageTaskCallback: (page: Page) => unknown) {
  const browser = await chromium.launch({ headless: true })

  for (const agent of userAgents) {
    const context = await browser.newContext({
      userAgent: agent,
    })

    const page = await context.newPage()

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle' })

      if (response?.status() === 403) {
        consola.warn(`[WARN] Access denied (HTTP 403) with user-agent: "${agent}"`)
        await context.close()
        continue
      }

      consola.log(`[INFO] Successfully loaded page with user-agent: "${agent}"`)
      const result = await pageTaskCallback(page) // Ex: cleanPageContent, extract, etc.
      await context.close()
      await browser.close()
      return result
    } catch (err) {
      consola.error(`[ERROR] Failed with user-agent: "${agent}". Reason:`, err)
      await context.close()
    }
  }

  await browser.close()
  throw new Error('[ERROR] No user-agent allowed access to the page.')
}
