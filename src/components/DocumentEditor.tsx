// DocumentEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useEffect } from 'react'

interface Props {
  content: string
  onContentChange: (html: string) => void
}

export default function DocumentEditor({ content, onContentChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <EditorContent
      key={content.slice(0, 20)} // key helps re-render when new letter arrives
      editor={editor}
      className="p-4"
    />
  )
}
