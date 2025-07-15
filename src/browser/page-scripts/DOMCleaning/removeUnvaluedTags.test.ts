/**
 * @jest-environment jsdom
 */

import { removeUnvaluedTags } from './removeUnvaluedTags.inject'

describe('removeUnvaluedTags', () => {
  test('removes script, style, and nav elements', () => {
    const container = document.createElement('div')
    container.innerHTML = '<script></script><style></style><nav></nav><p>Keep</p>'
    removeUnvaluedTags(container)
    expect(container.querySelector('script')).toBeNull()
    expect(container.querySelector('style')).toBeNull()
    expect(container.querySelector('nav')).toBeNull()
    expect(container.querySelector('p')).not.toBeNull()
  })

  test('removes elements by class and attribute selectors', () => {
    const container = document.createElement('div')
    container.innerHTML = '<div class="ad"></div><div class="promo"></div><div role="complementary"></div><p>Keep</p>'
    removeUnvaluedTags(container)
    expect(container.querySelector('.ad')).toBeNull()
    expect(container.querySelector('.promo')).toBeNull()
    expect(container.querySelector("[role='complementary']")).toBeNull()
    expect(container.querySelector('p')).not.toBeNull()
  })

  test('does not remove the main element itself', () => {
    const container = document.createElement('div')
    container.className = 'ad'
    removeUnvaluedTags(container)
    expect(container.className).toBe('ad')
  })
})
