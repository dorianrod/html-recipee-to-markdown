/*
 * Removes comment nodes from an element and its children.
 * Useful for cleaning unnecessary comments from the HTML DOM.
 * @param {Element} node - The element from which to remove comments.
 */
export function removeHtmlComments(node: Node) {
  for (let i = node.childNodes.length - 1; i >= 0; i--) {
    const child = node.childNodes[i]
    if (!child) continue

    if (child.nodeType === Node.COMMENT_NODE) {
      node.removeChild(child)
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      removeHtmlComments(child)
    }
  }
}

window.removeHtmlComments = removeHtmlComments
