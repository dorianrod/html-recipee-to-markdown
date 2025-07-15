/*
 * Removes containers that are primarily lists of links, such as navigation menus or link lists.
 * This helps to clean up the main content by removing elements that do not contribute to the main content.
 * @param {Element} container - The element in which to search for link list containers.
 */
export function removeLinkListContainers(container: Element) {
  const allElements = container.querySelectorAll('*')

  allElements.forEach((element) => {
    // Ignorer les éléments déjà identifiés comme navigation
    if (element.tagName === 'NAV' || element.tagName === 'UL' || element.tagName === 'OL') {
      return
    }

    // Count the number of direct links and total links
    // and calculate the text content ratio to determine if it's a link list container.
    const directLinks = element.querySelectorAll(':scope > a')
    const allLinks = element.querySelectorAll('a')
    const allText = element.textContent?.trim() ?? ''

    /// Conditions to identify a link list container:
    // 1. At least 3 direct links OR more than 5 total links
    // 2. High link-to-text ratio (more than 50% of the content
    //    consists of links)
    // 3. Short total text (less than 200 characters) with many links

    const hasMultipleLinks = directLinks.length >= 3 || allLinks.length > 5
    const linkTextLength = Array.from(allLinks).reduce((sum, link) => sum + (link?.textContent ?? '').length, 0)
    const linkRatio = allText.length > 0 ? linkTextLength / allText.length : 0

    const isLinkHeavy = linkRatio > 0.5 // Plus de 50% du contenu sont des liens
    const isShortWithManyLinks = allText.length < 200 && allLinks.length >= 3

    if (hasMultipleLinks && (isLinkHeavy || isShortWithManyLinks)) {
      element.remove()
    }
  })
}

window.removeLinkListContainers = removeLinkListContainers
