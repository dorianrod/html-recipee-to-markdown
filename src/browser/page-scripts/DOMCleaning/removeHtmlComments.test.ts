/**
 * @jest-environment jsdom
 */

import { removeHtmlComments } from './removeHtmlComments.inject'

describe('removeHtmlComments', () => {
  test('removes single comment node', () => {
    const container = document.createElement('div')
    container.innerHTML = 'Text<!--comment-->More text'
    removeHtmlComments(container)
    expect(container.innerHTML).toBe('TextMore text')
  })

  test('removes nested comment nodes', () => {
    const container = document.createElement('div')
    container.innerHTML = '<div><!--a--><span>Keep</span><!--b--></div><!--c-->'
    removeHtmlComments(container)
    expect(container.innerHTML).toBe('<div><span>Keep</span></div>')
  })

  test('does not remove text or element nodes', () => {
    const container = document.createElement('div')
    container.innerHTML = '<p>Text</p><!--comment--><span>More</span>'
    removeHtmlComments(container)
    expect(container.innerHTML).toBe('<p>Text</p><span>More</span>')
  })
})
