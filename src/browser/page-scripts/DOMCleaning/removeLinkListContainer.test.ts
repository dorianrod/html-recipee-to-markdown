/**
 * @jest-environment jsdom
 */

import { removeLinkListContainers } from './removeLinkListContainer.inject'

describe('removeLinkListContainers', () => {
  test('removes container with many direct links', () => {
    const container = document.createElement('div')
    container.innerHTML = '<div id="links"> <a>1</a> <a>2</a> <a>3</a> </div>'
    removeLinkListContainers(container)
    expect(container.querySelector('#links')).toBeNull()
  })

  test('removes container with high link-to-text ratio', () => {
    const container = document.createElement('div')
    container.innerHTML = '<div id="links"> <a>Link1</a> <a>Link2</a> <a>Link3</a> Text</div>'
    removeLinkListContainers(container)
    expect(container.querySelector('#links')).toBeNull()
  })

  test('does not remove container with few links and much text', () => {
    const container = document.createElement('div')
    container.innerHTML = '<div id="main"> <a>Link</a> Lots of text here</div>'
    removeLinkListContainers(container)
    expect(container.querySelector('#main')).not.toBeNull()
  })
})
