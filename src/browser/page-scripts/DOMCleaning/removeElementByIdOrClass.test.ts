/**
 * @jest-environment jsdom
 */

import { removeElementByIdOrClass } from './removeElementByIdOrClass.inject'

describe('removeElementByIdOrClass', () => {
  test.each([
    [
      'Removes element with parent class containing search term',
      '<div><div class="newsletter-section"><p id="target">Content</p></div></div>',
      'newsletter',
      false, // Should be removed
    ],
    [
      'Removes element with parent id containing search term',
      '<div><div id="newsletter-block"><span id="target">Info</span></div></div>',
      'newsletter',
      false,
    ],
    [
      'Does not remove element if no parent matches',
      '<div><div class="main"><p id="target">Keep me</p></div></div>',
      'newsletter',
      true, // Should remain
    ],
    [
      'Removes deeply nested element with ancestor class containing search term',
      '<div class="newsletter"><div><span id="target">Deep</span></div></div>',
      'newsletter',
      false,
    ],
    [
      'Case insensitive match for class',
      '<div><div class="NewsLetter"><p id="target">Case</p></div></div>',
      'newsletter',
      false,
    ],
    [
      'Case insensitive match for id',
      '<div><div id="NewsLetter"><p id="target">Case</p></div></div>',
      'newsletter',
      false,
    ],
  ])('%s', (_, html, searchTerm, shouldRemain) => {
    const container = document.createElement('div')
    container.innerHTML = html
    removeElementByIdOrClass(container, searchTerm)
    const target = container.querySelector('#target')
    if (shouldRemain) {
      expect(target).not.toBeNull()
    } else {
      expect(target).toBeNull()
    }
  })
})
