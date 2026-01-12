'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/extension-bubble-menu'
import { useState, useCallback, useEffect, useRef } from 'react'
import { getEditorExtensions } from '@/lib/tiptap/extensions'
import { handleImageUpload } from '@/lib/utils/imageUpload'
import { useAuth } from '@/contexts/AuthContext'

export default function TiptapEditor({ value, onChange, title, excerpt }) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('editor')
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [imageCaption, setImageCaption] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [htmlCode, setHtmlCode] = useState('')
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [showYoutubeDialog, setShowYoutubeDialog] = useState(false)
  const [showHtmlDialog, setShowHtmlDialog] = useState(false)
  const [uploading, setUploading] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: getEditorExtensions('Start writing your content...'),
    content: value ? (typeof value === 'string' ? JSON.parse(value) : value) : '',
    onUpdate: ({ editor }) => {
      // Save as JSON, not HTML
      const json = editor.getJSON()
      onChange(JSON.stringify(json))
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg prose-gray max-w-none focus:outline-none min-h-[500px] p-8',
      },
    },
  })

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value) {
      try {
        const currentJSON = JSON.stringify(editor.getJSON())
        if (currentJSON !== value) {
          const json = typeof value === 'string' ? JSON.parse(value) : value
          editor.commands.setContent(json, false)
        }
      } catch (e) {
        console.error('Error parsing content:', e)
      }
    }
  }, [editor, value])

  const addImage = useCallback(() => {
    if (imageUrl && editor) {
      editor.chain().focus().setCustomImage({ 
        src: imageUrl,
        alt: imageAlt || '',
        caption: imageCaption || null
      }).run()
      setImageUrl('')
      setImageAlt('')
      setImageCaption('')
      setShowImageDialog(false)
    }
  }, [editor, imageUrl, imageAlt, imageCaption])

  const addYoutube = useCallback(() => {
    if (youtubeUrl && editor) {
      editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run()
      setYoutubeUrl('')
      setShowYoutubeDialog(false)
    }
  }, [editor, youtubeUrl])

  const addHtml = useCallback(() => {
    if (htmlCode && editor) {
      editor.chain().focus().insertContent({
        type: 'htmlBlock',
        content: [{ type: 'text', text: htmlCode }],
      }).run()
      setHtmlCode('')
      setShowHtmlDialog(false)
    }
  }, [editor, htmlCode])

  const handleImageUploadFromFile = useCallback(async (e) => {
    const file = e.target.files?.[0]
    if (file && editor) {
      try {
        setUploading(true)
        
        // Upload image (uses base64 in dev, Firebase Storage in production)
        const imageUrl = await handleImageUpload(file, {
          userId: user?.uid,
          useCloudStorage: process.env.NODE_ENV === 'production',
        })
        
        // Insert image into editor
        editor.chain().focus().setImage({ src: imageUrl }).run()
        
        setUploading(false)
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('Failed to upload image. Please try again.')
        setUploading(false)
      }
    }
  }, [editor, user])

  if (!editor) {
    return <div className="p-8 text-center text-gray-500">Loading editor...</div>
  }

  const getCharacterCount = () => {
    return editor.storage.characterCount?.characters() || editor.getText().length
  }

  const getWordCount = () => {
    return editor.storage.characterCount?.words() || editor.getText().split(/\s+/).filter(w => w).length
  }

  const renderMenuBar = () => (
    <div className="bg-gray-50 border-b border-gray-300 px-4 py-3 flex flex-wrap items-center gap-1">
      {/* Text Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors font-bold ${
          editor.isActive('bold') ? 'bg-gray-300' : ''
        }`}
        type="button"
        title="Bold (Ctrl+B)"
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors italic ${
          editor.isActive('italic') ? 'bg-gray-300' : ''
        }`}
        type="button"
        title="Italic (Ctrl+I)"
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors line-through ${
          editor.isActive('strike') ? 'bg-gray-300' : ''
        }`}
        type="button"
        title="Strikethrough"
      >
        S
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-2"></div>

      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors font-semibold ${
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''
        }`}
        type="button"
        title="Heading 2"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors font-semibold ${
          editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''
        }`}
        type="button"
        title="Heading 3"
      >
        H3
      </button>

      <div className="w-px h-6 bg-gray-300 mx-2"></div>

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('bulletList') ? 'bg-gray-300' : ''
        }`}
        type="button"
        title="Bullet List"
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('orderedList') ? 'bg-gray-300' : ''
        }`}
        type="button"
        title="Numbered List"
      >
        1. List
      </button>

      <div className="w-px h-6 bg-gray-300 mx-2"></div>

      {/* Blocks */}
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors font-mono text-xs ${
          editor.isActive('codeBlock') ? 'bg-gray-300' : ''
        }`}
        type="button"
        title="Code Block"
      >
        {'</>'}
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('blockquote') ? 'bg-gray-300' : ''
        }`}
        type="button"
        title="Quote"
      >
        &quot;&quot;
      </button>

      <div className="w-px h-6 bg-gray-300 mx-2"></div>

      {/* Media & Embeds */}
      <button
        onClick={() => setShowImageDialog(true)}
        className="px-3 py-2 rounded hover:bg-gray-200 transition-colors"
        type="button"
        title="Insert Image"
      >
        🖼️ Image
      </button>
      <button
        onClick={() => setShowYoutubeDialog(true)}
        className="px-3 py-2 rounded hover:bg-gray-200 transition-colors"
        type="button"
        title="Embed YouTube"
      >
        ▶️ YouTube
      </button>
      <button
        onClick={() => setShowHtmlDialog(true)}
        className="px-3 py-2 rounded hover:bg-gray-200 transition-colors"
        type="button"
        title="Insert HTML"
      >
        &lt;/&gt; HTML
      </button>

      <div className="w-px h-6 bg-gray-300 mx-2"></div>

      {/* Link */}
      <button
        onClick={() => {
          const url = window.prompt('Enter URL:')
          if (url) {
            editor.chain().focus().setLink({ href: url }).run()
          }
        }}
        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive('link') ? 'bg-gray-300' : ''
        }`}
        type="button"
        title="Add Link"
      >
        🔗 Link
      </button>

      <div className="w-px h-6 bg-gray-300 mx-2"></div>

      {/* Undo/Redo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="px-3 py-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
        type="button"
        title="Undo (Ctrl+Z)"
      >
        ↶
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="px-3 py-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
        type="button"
        title="Redo (Ctrl+Y)"
      >
        ↷
      </button>

      <div className="ml-auto">
        <label className={`px-3 py-2 rounded transition-colors inline-block ${
          uploading 
            ? 'opacity-50 cursor-not-allowed bg-gray-100' 
            : 'hover:bg-gray-200 cursor-pointer'
        }`}>
          {uploading ? '⏳ Uploading...' : '📤 Upload Image'}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUploadFromFile}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  )

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
      {renderMenuBar()}

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'editor'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-white'
                : 'text-gray-600 hover:text-gray-900 bg-gray-50'
            }`}
            type="button"
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'preview'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-white'
                : 'text-gray-600 hover:text-gray-900 bg-gray-50'
            }`}
            type="button"
          >
            Live Preview
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'json'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-white'
                : 'text-gray-600 hover:text-gray-900 bg-gray-50'
            }`}
            type="button"
          >
            JSON Data
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[600px] relative">
        {activeTab === 'editor' ? (
          <>
            {/* Bubble Menu for Text Selection */}
            {editor && (
              <BubbleMenu
                editor={editor}
                tippyOptions={{ duration: 100, placement: 'top' }}
                className="bg-gray-900 text-white rounded-lg shadow-xl px-2 py-2 flex items-center gap-1"
              >
                {/* Text Formatting */}
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`px-3 py-1.5 rounded hover:bg-gray-700 transition-colors font-bold text-sm ${
                    editor.isActive('bold') ? 'bg-gray-700' : ''
                  }`}
                  type="button"
                  title="Bold"
                >
                  B
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`px-3 py-1.5 rounded hover:bg-gray-700 transition-colors italic text-sm ${
                    editor.isActive('italic') ? 'bg-gray-700' : ''
                  }`}
                  type="button"
                  title="Italic"
                >
                  I
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={`px-3 py-1.5 rounded hover:bg-gray-700 transition-colors line-through text-sm ${
                    editor.isActive('strike') ? 'bg-gray-700' : ''
                  }`}
                  type="button"
                  title="Strikethrough"
                >
                  S
                </button>
                
                <div className="w-px h-6 bg-gray-600 mx-1"></div>
                
                {/* Headings */}
                <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`px-3 py-1.5 rounded hover:bg-gray-700 transition-colors font-semibold text-sm ${
                    editor.isActive('heading', { level: 2 }) ? 'bg-gray-700' : ''
                  }`}
                  type="button"
                  title="Heading 2"
                >
                  H2
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={`px-3 py-1.5 rounded hover:bg-gray-700 transition-colors font-semibold text-sm ${
                    editor.isActive('heading', { level: 3 }) ? 'bg-gray-700' : ''
                  }`}
                  type="button"
                  title="Heading 3"
                >
                  H3
                </button>
                
                <div className="w-px h-6 bg-gray-600 mx-1"></div>
                
                {/* Link and Code */}
                <button
                  onClick={() => {
                    const url = window.prompt('Enter URL:')
                    if (url) {
                      editor.chain().focus().setLink({ href: url }).run()
                    }
                  }}
                  className={`px-3 py-1.5 rounded hover:bg-gray-700 transition-colors text-sm ${
                    editor.isActive('link') ? 'bg-gray-700' : ''
                  }`}
                  type="button"
                  title="Add Link"
                >
                  🔗
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  className={`px-3 py-1.5 rounded hover:bg-gray-700 transition-colors font-mono text-xs ${
                    editor.isActive('code') ? 'bg-gray-700' : ''
                  }`}
                  type="button"
                  title="Inline Code"
                >
                  {'<>'}
                </button>
                
                <div className="w-px h-6 bg-gray-600 mx-1"></div>
                
                {/* Insert Options */}
                <button
                  onClick={() => {
                    setShowImageDialog(true)
                  }}
                  className="px-3 py-1.5 rounded hover:bg-gray-700 transition-colors text-sm"
                  type="button"
                  title="Insert Image"
                >
                  🖼️
                </button>
                <button
                  onClick={() => {
                    const url = window.prompt('Enter YouTube URL:')
                    if (url) {
                      editor.chain().focus().setYoutubeVideo({ src: url }).run()
                    }
                  }}
                  className="px-3 py-1.5 rounded hover:bg-gray-700 transition-colors text-sm"
                  type="button"
                  title="Insert YouTube Video"
                >
                  ▶️
                </button>
              </BubbleMenu>
            )}
            <EditorContent editor={editor} />
          </>
        ) : activeTab === 'preview' ? (
          <div className="p-8 max-w-4xl mx-auto">
            {title && (
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            )}
            {excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-primary-300 pl-4 italic">
                {excerpt}
              </p>
            )}
            <div 
              className="tiptap-content"
              dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
            />
          </div>
        ) : (
          <div className="p-8">
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto font-mono text-sm">
              {JSON.stringify(editor.getJSON(), null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-300 px-6 py-3 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span>{getCharacterCount()} characters</span>
          <span>•</span>
          <span>{getWordCount()} words</span>
        </div>
        <div className="text-xs text-gray-500">
          {activeTab === 'editor' ? 'Rich text editor' : activeTab === 'preview' ? 'Live preview' : 'JSON data (saved to DB)'}
        </div>
      </div>

      {/* Enhanced Image Dialog with Alt Text and Caption */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Insert Image</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text (for SEO & Accessibility)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Describe the image..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Helps search engines and screen readers understand your image
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption (optional)
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Add a caption for your image..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Displayed below the image
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end mt-6">
              <button
                onClick={() => {
                  setShowImageDialog(false)
                  setImageUrl('')
                  setImageAlt('')
                  setImageCaption('')
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={addImage}
                disabled={!imageUrl}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Dialog */}
      {showYoutubeDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Embed YouTube Video</h3>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Enter YouTube URL..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowYoutubeDialog(false)
                  setYoutubeUrl('')
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={addYoutube}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                type="button"
              >
                Embed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HTML Dialog */}
      {showHtmlDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Insert HTML Code</h3>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              placeholder="Paste your HTML code here..."
              className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowHtmlDialog(false)
                  setHtmlCode('')
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={addHtml}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                type="button"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
