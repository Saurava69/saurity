// Custom Image Extension with Alt Text, Caption, and Resize Support
import { Node, mergeAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

export const CustomImage = Node.create({
  name: 'customImage',
  
  group: 'block',
  
  content: 'inline*',
  
  draggable: true,
  
  selectable: true,
  
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
        parseHTML: element => element.getAttribute('width') || element.style.width?.replace('px', '') || null,
        renderHTML: attributes => {
          if (!attributes.width) {
            return {}
          }
          return {
            width: attributes.width,
            style: `width: ${attributes.width}px`,
          }
        },
      },
      height: {
        default: null,
        parseHTML: element => element.getAttribute('height') || element.style.height?.replace('px', '') || null,
        renderHTML: attributes => {
          if (!attributes.height) {
            return {}
          }
          return {
            height: attributes.height,
          }
        },
      },
      alignment: {
        default: 'center',
        parseHTML: element => {
          const parent = element.closest('figure')
          if (parent) {
            if (parent.style.float === 'left') return 'left'
            if (parent.style.float === 'right') return 'right'
          }
          return 'center'
        },
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
            width: img?.getAttribute('width') || img?.style?.width?.replace('px', ''),
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
          width: dom.getAttribute('width') || dom.style?.width?.replace('px', ''),
          height: dom.getAttribute('height'),
        }),
      },
    ]
  },
  
  renderHTML({ HTMLAttributes }) {
    const { src, alt, caption, title, width, height, alignment } = HTMLAttributes
    
    const imgStyle = width ? `width: ${width}px; max-width: 100%; height: auto;` : 'max-width: 100%; height: auto;'
    
    const figureClass = `image-with-caption my-6 ${
      alignment === 'left' ? 'mr-auto' : 
      alignment === 'right' ? 'ml-auto' : 
      'mx-auto'
    }`
    
    if (caption) {
      // Render as figure with caption
      return [
        'figure',
        { class: figureClass, style: width ? `width: ${width}px; max-width: 100%;` : '' },
        [
          'img',
          mergeAttributes({
            src,
            alt: alt || '',
            title,
            width,
            height,
            style: imgStyle,
            class: 'rounded-lg h-auto resizable-image',
            'data-resizable': 'true',
          }),
        ],
        ['figcaption', { class: 'text-sm text-gray-600 text-center mt-2 italic' }, caption],
      ]
    }
    
    // Render as simple image wrapped in figure for consistent styling
    return [
      'figure',
      { class: figureClass, style: width ? `width: ${width}px; max-width: 100%;` : '' },
      [
        'img',
        mergeAttributes({
          src,
          alt: alt || '',
          title,
          width,
          height,
          style: imgStyle,
          class: 'rounded-lg h-auto resizable-image',
          'data-resizable': 'true',
        }),
      ],
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
      updateImageAttributes: (options) => ({ commands, tr, state }) => {
        const { selection } = state
        const node = selection.node
        
        if (node && node.type.name === 'customImage') {
          return commands.updateAttributes(this.name, options)
        }
        return false
      },
      setImageSize: (width, height) => ({ commands, state }) => {
        return commands.updateAttributes('customImage', { width, height })
      },
      setImageAlignment: (alignment) => ({ commands }) => {
        return commands.updateAttributes('customImage', { alignment })
      },
    }
  },
  
  addNodeView() {
    return ({ node, editor, getPos }) => {
      // Create container
      const container = document.createElement('div')
      container.classList.add('image-resizer-container')
      container.style.cssText = `
        position: relative;
        display: inline-block;
        max-width: 100%;
        margin: 1.5rem auto;
        display: flex;
        flex-direction: column;
        align-items: ${node.attrs.alignment === 'left' ? 'flex-start' : node.attrs.alignment === 'right' ? 'flex-end' : 'center'};
      `
      
      // Create wrapper for image and resize handles
      const wrapper = document.createElement('div')
      wrapper.style.cssText = `
        position: relative;
        display: inline-block;
        max-width: 100%;
      `
      
      // Create figure
      const figure = document.createElement('figure')
      figure.classList.add('image-with-caption')
      figure.style.cssText = `
        margin: 0;
        ${node.attrs.width ? `width: ${node.attrs.width}px; max-width: 100%;` : ''}
      `
      
      // Create image
      const img = document.createElement('img')
      img.src = node.attrs.src
      img.alt = node.attrs.alt || ''
      img.title = node.attrs.title || ''
      img.classList.add('rounded-lg', 'resizable-image')
      img.style.cssText = `
        ${node.attrs.width ? `width: ${node.attrs.width}px;` : ''} 
        max-width: 100%; 
        height: auto;
        display: block;
      `
      img.setAttribute('data-resizable', 'true')
      
      figure.appendChild(img)
      
      // Create caption if exists
      if (node.attrs.caption) {
        const figcaption = document.createElement('figcaption')
        figcaption.classList.add('text-sm', 'text-gray-600', 'text-center', 'mt-2', 'italic')
        figcaption.textContent = node.attrs.caption
        figure.appendChild(figcaption)
      }
      
      wrapper.appendChild(figure)
      
      // Create resize handles (only visible when selected)
      const handles = ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w']
      const handleElements = {}
      
      handles.forEach(position => {
        const handle = document.createElement('div')
        handle.classList.add('resize-handle', `resize-handle-${position}`)
        handle.dataset.position = position
        
        const isCorner = ['nw', 'ne', 'sw', 'se'].includes(position)
        const baseStyles = `
          position: absolute;
          background: #3b82f6;
          border: 2px solid white;
          border-radius: ${isCorner ? '50%' : '2px'};
          width: ${isCorner ? '12px' : '8px'};
          height: ${isCorner ? '12px' : '8px'};
          cursor: ${position}-resize;
          z-index: 10;
          opacity: 0;
          transition: opacity 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `
        
        let positionStyles = ''
        switch (position) {
          case 'nw':
            positionStyles = 'top: -6px; left: -6px; cursor: nwse-resize;'
            break
          case 'ne':
            positionStyles = 'top: -6px; right: -6px; cursor: nesw-resize;'
            break
          case 'sw':
            positionStyles = 'bottom: -6px; left: -6px; cursor: nesw-resize;'
            break
          case 'se':
            positionStyles = 'bottom: -6px; right: -6px; cursor: nwse-resize;'
            break
          case 'n':
            positionStyles = 'top: -4px; left: 50%; transform: translateX(-50%); cursor: ns-resize;'
            break
          case 's':
            positionStyles = 'bottom: -4px; left: 50%; transform: translateX(-50%); cursor: ns-resize;'
            break
          case 'e':
            positionStyles = 'top: 50%; right: -4px; transform: translateY(-50%); cursor: ew-resize;'
            break
          case 'w':
            positionStyles = 'top: 50%; left: -4px; transform: translateY(-50%); cursor: ew-resize;'
            break
        }
        
        handle.style.cssText = baseStyles + positionStyles
        handleElements[position] = handle
        wrapper.appendChild(handle)
      })
      
      // Size display tooltip
      const sizeDisplay = document.createElement('div')
      sizeDisplay.style.cssText = `
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
        z-index: 20;
        margin-bottom: 8px;
      `
      wrapper.appendChild(sizeDisplay)
      
      container.appendChild(wrapper)
      
      // Show handles on hover/focus
      let isSelected = false
      let isResizing = false
      
      const showHandles = () => {
        Object.values(handleElements).forEach(h => {
          h.style.opacity = '1'
        })
        wrapper.style.outline = '2px solid #3b82f6'
        wrapper.style.outlineOffset = '4px'
      }
      
      const hideHandles = () => {
        if (!isSelected && !isResizing) {
          Object.values(handleElements).forEach(h => {
            h.style.opacity = '0'
          })
          wrapper.style.outline = 'none'
        }
      }
      
      wrapper.addEventListener('mouseenter', showHandles)
      wrapper.addEventListener('mouseleave', hideHandles)
      
      // Handle click to select
      wrapper.addEventListener('click', (e) => {
        e.stopPropagation()
        isSelected = true
        showHandles()
        
        // Dispatch custom event for editor to handle
        const customEvent = new CustomEvent('image-selected', {
          bubbles: true,
          detail: { node, getPos }
        })
        container.dispatchEvent(customEvent)
      })
      
      // Click outside to deselect
      document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
          isSelected = false
          hideHandles()
        }
      })
      
      // Resize functionality
      let startX, startY, startWidth, startHeight, activeHandle
      
      const onMouseDown = (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        isResizing = true
        activeHandle = e.target.dataset.position
        startX = e.clientX
        startY = e.clientY
        startWidth = img.offsetWidth
        startHeight = img.offsetHeight
        
        // Show size display
        sizeDisplay.textContent = `${Math.round(startWidth)} × ${Math.round(startHeight)}`
        sizeDisplay.style.opacity = '1'
        
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      }
      
      const onMouseMove = (e) => {
        if (!isResizing) return
        
        const deltaX = e.clientX - startX
        const deltaY = e.clientY - startY
        
        let newWidth = startWidth
        let newHeight = startHeight
        const aspectRatio = startWidth / startHeight
        
        // Calculate new dimensions based on handle position
        switch (activeHandle) {
          case 'se':
            newWidth = Math.max(100, startWidth + deltaX)
            newHeight = newWidth / aspectRatio
            break
          case 'sw':
            newWidth = Math.max(100, startWidth - deltaX)
            newHeight = newWidth / aspectRatio
            break
          case 'ne':
            newWidth = Math.max(100, startWidth + deltaX)
            newHeight = newWidth / aspectRatio
            break
          case 'nw':
            newWidth = Math.max(100, startWidth - deltaX)
            newHeight = newWidth / aspectRatio
            break
          case 'e':
            newWidth = Math.max(100, startWidth + deltaX)
            newHeight = newWidth / aspectRatio
            break
          case 'w':
            newWidth = Math.max(100, startWidth - deltaX)
            newHeight = newWidth / aspectRatio
            break
          case 's':
            newHeight = Math.max(50, startHeight + deltaY)
            newWidth = newHeight * aspectRatio
            break
          case 'n':
            newHeight = Math.max(50, startHeight - deltaY)
            newWidth = newHeight * aspectRatio
            break
        }
        
        // Apply new size
        img.style.width = `${newWidth}px`
        figure.style.width = `${newWidth}px`
        
        // Update size display
        sizeDisplay.textContent = `${Math.round(newWidth)} × ${Math.round(newHeight)}`
      }
      
      const onMouseUp = () => {
        if (!isResizing) return
        
        isResizing = false
        sizeDisplay.style.opacity = '0'
        
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
        
        // Update the node attributes in the editor
        const newWidth = Math.round(img.offsetWidth)
        const pos = getPos()
        
        if (typeof pos === 'number') {
          editor.chain().focus().command(({ tr }) => {
            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              width: newWidth,
            })
            return true
          }).run()
        }
        
        if (!isSelected) {
          hideHandles()
        }
      }
      
      // Add event listeners to handles
      Object.values(handleElements).forEach(handle => {
        handle.addEventListener('mousedown', onMouseDown)
      })
      
      return {
        dom: container,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'customImage') {
            return false
          }
          
          img.src = updatedNode.attrs.src
          img.alt = updatedNode.attrs.alt || ''
          if (updatedNode.attrs.width) {
            img.style.width = `${updatedNode.attrs.width}px`
            figure.style.width = `${updatedNode.attrs.width}px`
          }
          
          return true
        },
        destroy: () => {
          Object.values(handleElements).forEach(handle => {
            handle.removeEventListener('mousedown', onMouseDown)
          })
          document.removeEventListener('mousemove', onMouseMove)
          document.removeEventListener('mouseup', onMouseUp)
        },
      }
    }
  },
})