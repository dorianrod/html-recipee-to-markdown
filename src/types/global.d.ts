export {}

declare global {
  interface Window {
    findMainContentElement: () => Element
    removeUnvaluedTags: (element: Element) => void
    removeElementByIdOrClass: (element: Element, idOrClass: string) => void
    removeHtmlComments: (element: Elementll) => void
    removeLinkListContainers: (element: Element) => void
    removeInvisibleElements: (element: Element) => void
    serializeDomTreeToMarkdown: (element: Element) => string
  }
}
