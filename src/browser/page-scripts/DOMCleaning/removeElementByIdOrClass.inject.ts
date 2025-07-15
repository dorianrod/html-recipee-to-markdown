// Removes elements whose parent has a class or ID containing a search term (e.g., "newsletter").
// This function traverses the DOM tree and removes elements that match the criteria.
// Useful for cleaning up elements that are not relevant to the main content.
// @param {Element} container - The element in which to search for elements to remove.
// @param {string} searchTerm - The term to search for in class or ID attributes.
export function removeElementByIdOrClass(container: Element, searchTerm: string) {
  const allElements = container.querySelectorAll('*')

  allElements.forEach((element) => {
    let currentElement: Element | null = element

    // Traverse up the DOM tree to check parents
    while (currentElement && currentElement !== container) {
      const hasNewsletterClass =
        currentElement.className &&
        typeof currentElement.className === 'string' &&
        currentElement.className.toLowerCase().includes(searchTerm)

      const hasNewsletterId =
        currentElement.id &&
        typeof currentElement.id === 'string' &&
        currentElement.id.toLowerCase().includes(searchTerm)

      if (hasNewsletterClass || hasNewsletterId) {
        element.remove()
        break
      }
      currentElement = currentElement?.parentElement
    }
  })
}

window.removeElementByIdOrClass = removeElementByIdOrClass
