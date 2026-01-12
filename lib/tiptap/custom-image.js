// Custom Image Extension with Alt Text and Caption Support
import { Node, mergeAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

export const CustomImage = Node.create({
  name: 'customImage',
  
  group: 'block',
  
  content: 'inline*',
  
  draggable: true,
  
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      caption: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    }
  },
  
  parseHTML() {
    return [
      {
        tag: 'figure.image-with-caption',
        getAttrs: (dom) => {
          const img = dom.querySelector('img')
          const caption = dom.querySelector('figcaption')
          
          return {
            src: img?.getAttribute('src'),
            alt: img?.getAttribute('alt'),
            caption: caption?.textContent || null,
            title: img?.getAttribute('title'),
            width: img?.getAttribute('width'),
            height: img?.getAttribute('height'),
          }
        },
      },
      {
        tag: 'img[src]',
        getAttrs: (dom) => ({
          src: dom.getAttribute('src'),
          alt: dom.getAttribute('alt'),
          title: dom.getAttribute('title'),
          width: dom.getAttribute('width'),
          height: dom.getAttribute('height'),
        }),
      },
    ]
  },
  
  renderHTML({ HTMLAttributes }) {
    const { src, alt, caption, title, width, height } = HTMLAttributes
    
    if (caption) {
      // Render as figure with caption
      return [
        'figure',
        { class: 'image-with-caption my-6' },
        [
          'img',
          mergeAttributes({
            src,
            alt: alt || '',
            title,
            width,
            height,
            class: 'rounded-lg w-full h-auto',
          }),
        ],
        ['figcaption', { class: 'text-sm text-gray-600 text-center mt-2 italic' }, caption],
      ]
    }
    
    // Render as simple image
    return [
      'img',
      mergeAttributes({
        src,
        alt: alt || '',
        title,
        width,
        height,
        class: 'rounded-lg my-6 w-full h-auto',
      }),
    ]
  },
  
  addCommands() {
    return {
      setCustomImage: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
      updateImageAttributes: (options) => ({ commands }) => {
        return commands.updateAttributes(this.name, options)
      },
    }
  },
  
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('imageClick'),
        props: {
          handleClick(view, pos, event) {
            const { schema } = view.state
            const $pos = view.state.doc.resolve(pos)
            const node = $pos.node()
            
            if (node && node.type === schema.nodes.customImage) {
              // Trigger custom event that the editor can listen to
              const customEvent = new CustomEvent('image-click', {
                detail: {
                  pos,
                  node: node.attrs,
                },
              })
              event.target.dispatchEvent(customEvent)
              return true
            }
            return false
          },
        },
      }),
    ]
  },
})
