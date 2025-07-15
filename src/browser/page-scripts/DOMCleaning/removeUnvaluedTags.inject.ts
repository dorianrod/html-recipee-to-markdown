/*
 * Removes elements that do not contribute meaningful content to the page.
 * This includes script tags, iframes, noscript tags, navigation bars, headers, footers, and style tags.
 * @param {Element} mainElement - The main element of the page from which to remove unvalued tags.
 */
export function removeUnvaluedTags(mainElement: Element) {
  const selectors = [
    'script',
    'iframe',
    'noscript',
    'nav',
    'header',
    'side',
    'footer',
    'style',
    '.ad',
    '.advertisement',
    '.promo',
    '.sponsored',
    '.sidebar',
    '.widget',
    '.popup',
    '.modal',
    "[role='complementary']",
    "[role='navigation']",
    "[aria-label='navigation']",
    "[aria-label='complementary']",
  ]

  mainElement.querySelectorAll(selectors.join(',')).forEach((el) => {
    // Avoid removing the main element itself
    if (el !== mainElement) el.remove()
  })
}

window.removeUnvaluedTags = removeUnvaluedTags
