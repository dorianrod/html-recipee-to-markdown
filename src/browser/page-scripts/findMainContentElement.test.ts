/**
 * @jest-environment jsdom
 */

import { findMainContentElement } from './findMainContentElement.inject'

describe('findMainContentElement', () => {
  test.each([
    ['returns #content if present', '<div id="content">Main</div>', 'div'],
    ['returns <content> if present and #content missing', '<content>Main</content>', 'content'],
    ['returns <article> if present and others missing', '<article>Main</article>', 'article'],
    ['returns .post_content if present and others missing', '<div class="post_content">Main</div>', 'post_content'],
    ['returns .main-content if present and others missing', '<div class="main-content">Main</div>', 'main-content'],
    ['returns <main> if present and others missing', '<main>Main</main>', 'main'],
    ['returns body as fallback', '', 'BODY'],
  ])('%s', (_, html, expectedSelector) => {
    document.body.innerHTML = html
    const el = findMainContentElement()
    if (expectedSelector === 'BODY') {
      expect(el).toBe(document.body)
    } else if (expectedSelector.startsWith('post') || expectedSelector.startsWith('main-')) {
      expect(el.classList.contains(expectedSelector)).toBe(true)
    } else {
      expect(el.tagName.toLowerCase()).toBe(expectedSelector.toLowerCase())
    }
  })
})
