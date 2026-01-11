'use client'

import TiptapRenderer from './TiptapRenderer'

/**
 * Article content component - Client component for Tiptap
 * Locked to 680px max width for optimal readability
 */
export default function ArticleContent({ content }) {
  return (
    <div className="container-custom py-8">
      <div className="max-w-[680px] mx-auto article-content">
        <TiptapRenderer content={content} />
      </div>
    </div>
  )
}
