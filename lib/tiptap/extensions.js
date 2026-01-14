// Shared Tiptap extensions configuration
// Used by both the editor and the read-only renderer
// This ensures consistent rendering across edit and view modes

import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlock from '@tiptap/extension-code-block'
import { Node } from '@tiptap/core'
import Heading from '@tiptap/extension-heading'
import { CustomImage } from './custom-image'

// Custom HTML Block extension for embedding raw HTML
const HtmlBlock = Node.create({
  name: 'htmlBlock',
  group: 'block',
  content: 'text*',
  marks: '',
  code: true,
  defining: true,

  addAttributes() {
    return {
      class: {
        default: 'html-block',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div.html-block',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { class: 'html-block bg-gray-100 p-4 rounded font-mono text-sm' }, 0]
  },
})

/**
 * Get editor extensions with optional placeholder
 * @param {string} placeholder - Placeholder text for empty editor
 * @returns {Array} Tiptap extensions
 */
export const getEditorExtensions = (placeholder = 'Start writing your content...') => {
  return [
    StarterKit.configure({
      heading: false, // Disable default heading to use custom one
      codeBlock: false, // Disable to use custom CodeBlock
      link: false, // Disable to use custom Link
    }),
    Heading.configure({
      levels: [1, 2, 3, 4],
    }),
    CustomImage, // Use custom image with alt/caption support
    Image.configure({
      inline: true,
      allowBase64: true,
    }),
    Youtube.configure({
      width: 640,
      height: 360,
      controls: true,
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-primary-600 underline',
      },
    }),
    Placeholder.configure({
      placeholder,
    }),
    CodeBlock.configure({
      HTMLAttributes: {
        class: 'bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm',
      },
    }),
    HtmlBlock,
  ]
}

/**
 * Get renderer extensions (no placeholder needed for read-only view)
 * @returns {Array} Tiptap extensions
 */
export const getRendererExtensions = () => {
  return [
    StarterKit.configure({
      heading: false, // Disable default heading to use custom one
      codeBlock: false, // Disable to use custom CodeBlock
      link: false, // Disable to use custom Link
    }),
    Heading.configure({
      levels: [1, 2, 3, 4],
      HTMLAttributes: {
        class: 'heading-with-id',
      },
    }).extend({
      renderHTML({ node, HTMLAttributes }) {
        const level = this.options.levels.includes(node.attrs.level)
          ? node.attrs.level
          : this.options.levels[0]
        
        // Extract text content for ID generation
        const text = node.textContent
        const id = text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
        
        return [
          `h${level}`,
          { ...HTMLAttributes, id },
          0,
        ]
      },
    }),
    CustomImage, // Use custom image with alt/caption support
    Image.configure({
      inline: true,
      allowBase64: true,
    }),
    Youtube.configure({
      width: 640,
      height: 360,
      controls: true,
    }),
    Link.configure({
      openOnClick: true, // Allow clicking links in read mode
      HTMLAttributes: {
        class: 'text-primary-600 underline',
      },
    }),
    CodeBlock.configure({
      HTMLAttributes: {
        class: 'bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm',
      },
    }),
    HtmlBlock,
  ]
}
