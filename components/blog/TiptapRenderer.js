'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { getRendererExtensions } from '@/lib/tiptap/extensions'
import { useState } from 'react'

/**
 * Read-only Tiptap renderer
 * Renders JSON content from the database with the same extensions as the editor
 * This ensures the output looks identical to what users see in the editor
 * Properly handles SSR to prevent hydration mismatches
 */
export default function TiptapRenderer({ content }) {
  const [isMounted, setIsMounted] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    editable: false, // Read-only mode
    extensions: getRendererExtensions(),
    content: content ? (typeof content === 'string' ? JSON.parse(content) : content) : '',
    editorProps: {
      attributes: {
        class: 'tiptap-renderer focus:outline-none',
      },
    },
    onCreate: () => {
      // Set mounted after editor is created to prevent hydration issues
      setIsMounted(true)
    },
  }, [content])

  // Don't render editor content until it's fully initialized
  if (!isMounted || !editor) {
    return null
  }

  return <EditorContent editor={editor} />
}
