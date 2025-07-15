import { type Page } from 'playwright'

/**
 * Extracts the main content of the page and converts it to structured markdown.
 * Functions called here are attached to window when the page is loaded via Playwright.
 * @param {import('playwright').Page} page - The Playwright page instance.
 * @returns {Promise<string>} - The main content as a markdown string.
 */
export async function extractMainContentAsMarkdown(page: Page) {
  return await page.evaluate(() => {
    const element = window.findMainContentElement()
    // remove unvalued tags (e.g., script, iframe, noscript, nav, ...)
    window.removeUnvaluedTags(element)
    // remove comments
    window.removeElementByIdOrClass(element, 'comment')
    // remove newsletter elements
    window.removeElementByIdOrClass(element, 'newsletter')
    // remove comments not visible to the user
    window.removeHtmlComments(element)
    // remove list of links containers (e.g., navigation menus, link lists)
    window.removeLinkListContainers(element)
    // remove elements that are not visible to the user (e.g., display: none, visibility: hidden)
    window.removeInvisibleElements(element)
    // convert the cleaned DOM tree to a structured markdown format
    return window.serializeDomTreeToMarkdown(element)
  })
}
