'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { getRendererExtensions } from '@/lib/tiptap/extensions'

/**
 * Read-only Tiptap renderer
 * Renders JSON content from the database with the same extensions as the editor
 * This ensures the output looks identical to what users see in the editor
 */
export default function TiptapRenderer({ content }) {
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
  })

  if (!editor) {
    return <div className="p-8 text-center text-gray-500">Loading content...</div>
  }

  return <EditorContent editor={editor} />
}
