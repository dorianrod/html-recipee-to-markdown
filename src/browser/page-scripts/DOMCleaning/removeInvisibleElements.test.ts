/**
 * @jest-environment jsdom
 */

import { removeInvisibleElements } from './removeInvisibleElements.inject'

type Dimensions = {
  width: number
  height: number
}

type RecordOfDimensions = Record<string, Dimensions>

function createContainer(html: string, mockOffsets: RecordOfDimensions = {}) {
  // eslint-disable-next-line no-undef
  const container = document.createElement('div')
  Object.defineProperty(container, 'offsetWidth', { get: () => 1 })
  container.innerHTML = html

  Object.entries(mockOffsets).forEach(([id, { width, height }]) => {
    const el = container.querySelector(`#${id}`)
    if (el) {
      if (width !== undefined) {
        Object.defineProperty(el, 'offsetWidth', { get: () => width })
      }
      if (height !== undefined) {
        Object.defineProperty(el, 'offsetHeight', { get: () => height })
      }
    }
  })
  return container
}

describe('removeInvisibleElements', () => {
  test('removes elements with display: none', () => {
    const container = createContainer(
      '<span id="a" style="display:none">X</span><span id="b" style="display: inline-block; width: 1px;">Y</span>',
      { b: { width: 1, height: 1 } },
    )
    removeInvisibleElements(container)
    expect(container.querySelector('#a')).toBeNull()
    expect(container.querySelector('#b')).not.toBeNull()
  })

  test('removes elements with visibility: hidden', () => {
    const container = createContainer('<span id="a" style="visibility:hidden">X</span><span id="b">Y</span>', {
      b: { width: 1, height: 1 },
    })
    removeInvisibleElements(container)
    expect(container.querySelector('#a')).toBeNull()
    expect(container.querySelector('#b')).not.toBeNull()
  })

  test('removes elements with opacity: 0', () => {
    const container = createContainer('<span id="a" style="opacity:0">X</span><span id="b">Y</span>', {
      b: { width: 1, height: 1 },
    })
    removeInvisibleElements(container)
    expect(container.querySelector('#a')).toBeNull()
    expect(container.querySelector('#b')).not.toBeNull()
  })

  test('removes elements with zero dimensions', () => {
    const container = createContainer('<span id="a">X</span><span id="b">Y</span>', {
      a: { width: 0, height: 0 },
      b: { width: 1, height: 1 },
    })
    removeInvisibleElements(container)
    expect(container.querySelector('#a')).toBeNull()
    expect(container.querySelector('#b')).not.toBeNull()
  })
})
