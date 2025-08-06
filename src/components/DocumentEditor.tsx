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
    content,                  // initial load
    onUpdate: ({ editor }) => {
      // bubble edits back to parent
      onContentChange(editor.getHTML())
    },
  })

  // when parent’s content prop changes, overwrite the editor state
  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return <EditorContent editor={editor} />
}
