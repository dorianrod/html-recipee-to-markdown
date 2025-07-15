/**
 * Retrieves the main content element of the page.
 * Ignores elements not relevant to the main content, such as ads, sidebars, headers, etc.
 * @returns {Element} - The main content element.
 */
export function findMainContentElement() {
  return (
    document.querySelector('#content') || // id="content"
    document.querySelector('content') || // balise <content>
    document.querySelector('article') || // balise <article>
    document.querySelector('.post_content') || // class post_content (wordpress)
    document.querySelector('.main-content') || // class main-content
    document.querySelector('main') || // balise <main>
    document.body // fallback body
  )
}

window.findMainContentElement = findMainContentElement
