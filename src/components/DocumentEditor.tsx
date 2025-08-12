// DocumentEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import UnderlineExt from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Undo2, Redo2, Heading1, Heading2, Heading3, Pilcrow } from 'lucide-react'

interface Props {
  content: string
  onContentChange: (html: string) => void
}

export default function DocumentEditor({ content, onContentChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExt,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
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
    <div className="flex h-full flex-col bg-card text-card-foreground">
      {/* Editor toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/50 px-2 py-1">
        <Button variant={editor?.isActive('paragraph') ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().setParagraph().run()} aria-label="Paragraph"><Pilcrow className="h-4 w-4" /></Button>
        <Button variant={editor?.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} aria-label="Heading 1"><Heading1 className="h-4 w-4" /></Button>
        <Button variant={editor?.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} aria-label="Heading 2"><Heading2 className="h-4 w-4" /></Button>
        <Button variant={editor?.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} aria-label="Heading 3"><Heading3 className="h-4 w-4" /></Button>
        <div className="mx-1 h-5 w-px bg-border" />
        <Button variant={editor?.isActive('bold') ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().toggleBold().run()} aria-label="Bold"><Bold className="h-4 w-4" /></Button>
        <Button variant={editor?.isActive('italic') ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().toggleItalic().run()} aria-label="Italic"><Italic className="h-4 w-4" /></Button>
        <Button variant={editor?.isActive('underline') ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().toggleUnderline().run()} aria-label="Underline"><UnderlineIcon className="h-4 w-4" /></Button>
        <Button variant={editor?.isActive('strike') ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().toggleStrike().run()} aria-label="Strikethrough"><Strikethrough className="h-4 w-4" /></Button>
        <div className="mx-1 h-5 w-px bg-border" />
        <Button variant={editor?.isActive('bulletList') ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().toggleBulletList().run()} aria-label="Bullet list"><List className="h-4 w-4" /></Button>
        <Button variant={editor?.isActive('orderedList') ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().toggleOrderedList().run()} aria-label="Ordered list"><ListOrdered className="h-4 w-4" /></Button>
        <div className="mx-1 h-5 w-px bg-border" />
        <Button variant={editor?.isActive({ textAlign: 'left' }) ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().setTextAlign('left').run()} aria-label="Align left"><AlignLeft className="h-4 w-4" /></Button>
        <Button variant={editor?.isActive({ textAlign: 'center' }) ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().setTextAlign('center').run()} aria-label="Align center"><AlignCenter className="h-4 w-4" /></Button>
        <Button variant={editor?.isActive({ textAlign: 'right' }) ? 'secondary' : 'ghost'} size="sm" onClick={() => editor?.chain().focus().setTextAlign('right').run()} aria-label="Align right"><AlignRight className="h-4 w-4" /></Button>
        <div className="mx-1 h-5 w-px bg-border" />
        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().undo().run()} aria-label="Undo"><Undo2 className="h-4 w-4" /></Button>
        <Button variant="ghost" size="sm" onClick={() => editor?.chain().focus().redo().run()} aria-label="Redo"><Redo2 className="h-4 w-4" /></Button>
      </div>

      {/* Editor */}
      <EditorContent
        key={content.slice(0, 20)}
        editor={editor}
        className="flex-1 overflow-auto p-4 outline-none"
      />
    </div>
  )
}
