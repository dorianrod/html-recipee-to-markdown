/**
 * @jest-environment jsdom
 */

import { serializeDomTreeToMarkdown } from './serializeDomTreeToMarkdown.inject'

describe('serializeDomTreeToMarkdown', () => {
  test.each([
    ['Simple text in <p>', '<p>Hello world</p>', 'Hello world'],
    ['Text with nested inline', '<p>Hello <strong>bold</strong> world</p>', 'Hello bold world'],
    ['Text with link', '<p>Visit <a href="#">OpenAI</a></p>', 'Visit OpenAI'],
    ['Two separate blocks', '<div><p>First</p><p>Second</p></div>', 'First\nSecond'],
    ['List with items', '<ul><li>One</li><li>Two</li></ul>', '- One\n- Two'],
    ['Block containing a list', '<div><p>Items:</p><ul><li>A</li><li>B</li></ul></div>', 'Items:\n- A\n- B'],
    ['Nested block in block', '<section>Intro <div>inside</div> Outro</section>', 'Intro\ninside\nOutro'],
    ['div with single p', '<div><p>Unique</p></div>', 'Unique'],
    ['ul with single li', '<ul><li>Unique item</li></ul>', '- Unique item'],
    ['p with nested div', '<p>Hello <div>block</div> again</p>', 'Hello\nblock\nagain'],
    ['H1 title markdown', '<h1>Introduction</h1>', '## Introduction'],
    ['H2 title markdown', '<h2>Subsection</h2>', '### Subsection'],
    [
      'List in a block with intro',
      '<section><h2>List</h2><ul><li>One</li><li>Two</li></ul></section>',
      '### List\n- One\n- Two',
    ],
    ['Title followed by paragraph', '<div><h3>Topic</h3><p>Explanation</p></div>', '#### Topic\nExplanation'],
  ])('%s', (_, html, expected) => {
    const container = document.createElement('div')
    container.innerHTML = html
    const result = serializeDomTreeToMarkdown(container)
    expect(result).toEqual(expected)
  })
})
