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
  // 1) initialize with the incoming HTML
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    onUpdate: ({ editor }) => {
      // 3) report edits back up so the parent state stays in sync
      onContentChange(editor.getHTML())
    },
  })

  // 2) whenever the `content` prop changes, overwrite the editor
  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return <EditorContent editor={editor} />
}
