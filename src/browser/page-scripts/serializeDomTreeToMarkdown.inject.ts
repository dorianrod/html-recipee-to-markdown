// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function serializeDomTreeToMarkdown(node: Node) {
  const serialized = serializeDomTree(node, blockAwareSerializer)
  const lines = flattenToLines(serialized)
  return lines.join('\n')
}

function flattenToLines(value) {
  if (Array.isArray(value)) {
    return value.flatMap(flattenToLines).filter((x) => typeof x === 'string' && x.trim() !== '')
  }
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed ? [trimmed] : []
  }
  return []
}

function flattenAndJoin(arr: Array<unknown>) {
  return arr
    .flat(Infinity)
    .filter((x) => typeof x === 'string' && x.trim() !== '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function blockAwareSerializer(node: Node, children: Node[], _level: number) {
  const BLOCK_TAGS = new Set([
    'div',
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'section',
    'article',
    'header',
    'footer',
    'main',
    'nav',
    'aside',
    'fieldset',
    'figcaption',
    'figure',
    'address',
    'content',
  ])

  if (node.nodeType === Node.TEXT_NODE) {
    const text = (node?.textContent ?? '').replace(/\u00A0/g, ' ').trim()
    return text ? text : null
  }

  if (node instanceof Element) {
    const tag = node.tagName.toLowerCase() ?? ''

    if (/^h[1-6]$/.test(tag)) {
      const level = parseInt(tag.charAt(1))
      const hashes = '#'.repeat(level + 1)
      const flat = flattenAndJoin(children)
      return flat ? `${hashes} ${flat}` : null
    }

    if (tag === 'li') {
      const flat = flattenAndJoin(children)
      return flat ? `- ${flat}` : null
    }

    if (tag === 'ul' || tag === 'ol') {
      return children.filter((c) => c !== null)
    }

    if (BLOCK_TAGS.has(tag)) {
      const blockContent = []
      let buffer: string[] = []

      for (const child of children) {
        if (Array.isArray(child)) {
          if (buffer.length > 0) {
            blockContent.push(buffer.join(' ').trim())
            buffer = []
          }
          blockContent.push(child)
        } else if (typeof child === 'string') {
          buffer.push(child)
        }
      }

      if (buffer.length > 0) {
        blockContent.push(buffer.join(' ').trim())
      }

      return blockContent.length > 0 ? blockContent : null
    }
  }

  return flattenAndJoin(children) || null
}

function serializeDomTree(
  node: Node,
  serializerFn: (node: Node, children: Node[], level: number) => Node,
  level: number = 0,
) {
  if (!node || !(node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE)) {
    return null
  }

  const childrenSerialized: Node[] = []
  for (const child of node.childNodes) {
    const result = serializeDomTree(child, serializerFn, level + 1)
    if (result !== null && result !== undefined) {
      childrenSerialized.push(result)
    }
  }

  return serializerFn(node, childrenSerialized, level)
}

window.serializeDomTreeToMarkdown = serializeDomTreeToMarkdown
