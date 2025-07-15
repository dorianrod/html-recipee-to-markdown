import path from 'path'
import { addScriptsToPage } from '../browser/injectScripts'
import { extractMainContentAsMarkdown } from './extractMainContentAsMarkdown'
import { extractTitle } from './extractTitle'
import { extractThumbnail } from './extractThumbnail'
import { type Page } from 'playwright'
import { runOnPage } from './runOnPage'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const userAgents = [
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
]

export async function extractPageData(
  url: string,
): Promise<{ content: string; title: string | null; thumbnail: string | null }> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return await runOnPage(url, userAgents, async (page: Page) => {
    const isDev = process.env.NODE_ENV !== 'production'

    const scriptsDir = isDev
      ? path.resolve(__dirname, '../browser/page-scripts')
      : path.resolve(__dirname, 'page-scripts')

    await addScriptsToPage(page, scriptsDir)
    const content = await extractMainContentAsMarkdown(page)
    const title = await extractTitle(page)
    const thumbnail = await extractThumbnail(page)
    return {
      content,
      title,
      thumbnail,
    }
  })
}
