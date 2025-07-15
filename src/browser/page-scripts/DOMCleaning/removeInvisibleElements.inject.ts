/*
 * Removes all elements that are not visible in the DOM.
 * This function traverses the DOM tree and removes elements that are not visible,
 * such as those with display: none, visibility: hidden, opacity: 0, or zero dimensions.
 * It also checks the visibility of parent elements to ensure that an element is not visible
 * if any of its ancestors are not visible.
 * @param {Element} node - The root element from which to start removing invisible elements
 */
export function removeInvisibleElements(node: Node) {
  if (!(node instanceof Element)) return

  const children = [...node.children]
  for (const child of children) {
    removeInvisibleElements(child)
    if (!isElementVisible(child)) {
      child.remove()
    }
  }
}

function isElementVisible(node: Node) {
  if (!node || node.nodeType !== Node.ELEMENT_NODE) return false

  const element = node as Element
  const style = window.getComputedStyle(element)
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false
  }

  if (element instanceof HTMLElement && element.offsetWidth === 0 && element.offsetHeight === 0) return false

  if (element.parentElement) {
    return isElementVisible(element.parentElement)
  }

  return true
}

window.removeInvisibleElements = removeInvisibleElements
