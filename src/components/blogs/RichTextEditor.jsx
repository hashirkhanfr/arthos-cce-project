'use client';

import { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { 
    Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, 
    Quote, Undo, Redo, Heading1, Heading2, Heading3, Link as LinkIcon, ImageIcon, Type
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function RichTextEditor({ content, onChange, placeholder = 'Start writing...' }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto my-4',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline hover:text-blue-800',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            Underline,
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[400px] p-6',
            },
        },
    });

    const fileInputRef = useRef(null);

    if (!editor) {
        return null;
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const toastId = toast.loading('Uploading image...');
            const reader = new FileReader();
            reader.onload = async (e) => {
                const base64 = e.target?.result;
                if (base64) {
                    try {
                        const res = await fetch('/api/upload', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ image: base64, folder: 'fes-blogs-content' })
                        });
                        const data = await res.json();
                        
                        if (data.success && data.url) {
                            editor.chain().focus().setImage({ src: data.url }).run();
                            toast.success('Image uploaded', { id: toastId });
                        } else {
                            toast.error('Failed to upload image: ' + (data.error || 'Unknown error'), { id: toastId });
                        }
                    } catch (err) {
                        console.error('Upload error:', err);
                        toast.error('Failed to upload image', { id: toastId });
                    }
                }
            };
            reader.readAsDataURL(file);
        }
        // Reset input so same file can be selected again
        event.target.value = '';
    };

    const addImage = () => {
        fileInputRef.current?.click();
    };

    const addLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    // Get current block type for indicator
    const getCurrentBlockType = () => {
        if (editor.isActive('heading', { level: 1 })) return 'Heading 1';
        if (editor.isActive('heading', { level: 2 })) return 'Heading 2';
        if (editor.isActive('heading', { level: 3 })) return 'Heading 3';
        if (editor.isActive('bulletList')) return 'Bullet List';
        if (editor.isActive('orderedList')) return 'Numbered List';
        if (editor.isActive('blockquote')) return 'Quote';
        if (editor.isActive('paragraph')) return 'Paragraph';
        return 'Paragraph';
    };

    const MenuButton = ({ onClick, active, disabled, children, title }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`p-2 rounded transition-all duration-150 ${
                active 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'hover:bg-gray-200 text-gray-700'
            } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            title={title}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col max-h-[600px]">
            {/* Hidden file input for image uploads */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
            />
            {/* Toolbar - Fixed at top */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                {/* Block type indicator */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-600 font-medium min-w-[120px]">
                    <Type className="w-4 h-4 text-gray-400" />
                    <span>{getCurrentBlockType()}</span>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                {/* Text formatting */}
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                    title="Bold (Ctrl+B)"
                >
                    <Bold className="w-4 h-4" />
                </MenuButton>
                
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                    title="Italic (Ctrl+I)"
                >
                    <Italic className="w-4 h-4" />
                </MenuButton>
                
                <MenuButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editor.isActive('underline')}
                    title="Underline (Ctrl+U)"
                >
                    <UnderlineIcon className="w-4 h-4" />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                {/* Block types */}
                <MenuButton
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    active={editor.isActive('paragraph') && !editor.isActive('bulletList') && !editor.isActive('orderedList')}
                    title="Paragraph"
                >
                    <span className="w-4 h-4 flex items-center justify-center font-bold text-sm">P</span>
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor.isActive('heading', { level: 1 })}
                    title="Heading 1"
                >
                    <Heading1 className="w-4 h-4" />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive('heading', { level: 2 })}
                    title="Heading 2"
                >
                    <Heading2 className="w-4 h-4" />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive('heading', { level: 3 })}
                    title="Heading 3"
                >
                    <Heading3 className="w-4 h-4" />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                {/* Lists */}
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                    title="Numbered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive('blockquote')}
                    title="Quote"
                >
                    <Quote className="w-4 h-4" />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                {/* Links & Images */}
                <MenuButton
                    onClick={addLink}
                    active={editor.isActive('link')}
                    title="Add Link"
                >
                    <LinkIcon className="w-4 h-4" />
                </MenuButton>

                <MenuButton
                    onClick={addImage}
                    title="Add Image"
                >
                    <ImageIcon className="w-4 h-4" />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                {/* Undo/Redo */}
                <MenuButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo (Ctrl+Z)"
                >
                    <Undo className="w-4 h-4" />
                </MenuButton>

                <MenuButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo (Ctrl+Y)"
                >
                    <Redo className="w-4 h-4" />
                </MenuButton>
            </div>

            {/* Editor Content with WYSIWYG Styling - Scrollable */}
            <div className="editor-content-wrapper overflow-y-auto flex-1">
                <EditorContent editor={editor} />
            </div>

            {/* WYSIWYG Styles - matching blog display */}
            <style jsx global>{`
                .editor-content-wrapper .ProseMirror {
                    font-size: 1.125rem;
                    line-height: 1.75;
                    color: #374151;
                }

                .editor-content-wrapper .ProseMirror h1 {
                    font-size: 2.25rem;
                    font-weight: 700;
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                    color: #111827;
                    line-height: 1.2;
                    font-family: var(--font-poppins), 'Poppins', system-ui, sans-serif;
                }

                .editor-content-wrapper .ProseMirror h2 {
                    font-size: 1.875rem;
                    font-weight: 700;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: #111827;
                    line-height: 1.3;
                    font-family: var(--font-poppins), 'Poppins', system-ui, sans-serif;
                }

                .editor-content-wrapper .ProseMirror h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 1.25rem;
                    margin-bottom: 0.5rem;
                    color: #1f2937;
                    line-height: 1.4;
                    font-family: var(--font-poppins), 'Poppins', system-ui, sans-serif;
                }

                .editor-content-wrapper .ProseMirror p {
                    margin-bottom: 1rem;
                }

                .editor-content-wrapper .ProseMirror strong {
                    font-weight: 700;
                    color: #111827;
                }

                .editor-content-wrapper .ProseMirror em {
                    font-style: italic;
                }

                .editor-content-wrapper .ProseMirror u {
                    text-decoration: underline;
                }

                .editor-content-wrapper .ProseMirror ul {
                    list-style-type: disc;
                    margin-left: 1.5rem;
                    margin-bottom: 1rem;
                }

                .editor-content-wrapper .ProseMirror ol {
                    list-style-type: decimal;
                    margin-left: 1.5rem;
                    margin-bottom: 1rem;
                }

                .editor-content-wrapper .ProseMirror li {
                    margin-bottom: 0.375rem;
                    padding-left: 0.25rem;
                }

                .editor-content-wrapper .ProseMirror li p {
                    margin-bottom: 0.25rem;
                }

                .editor-content-wrapper .ProseMirror img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.75rem;
                    margin: 1.5rem auto;
                    display: block;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .editor-content-wrapper .ProseMirror blockquote {
                    border-left: 4px solid #2563eb;
                    padding-left: 1.25rem;
                    margin: 1.25rem 0;
                    font-style: italic;
                    color: #4b5563;
                    background-color: #f8fafc;
                    padding: 1rem 1.25rem;
                    border-radius: 0 0.5rem 0.5rem 0;
                }

                .editor-content-wrapper .ProseMirror a {
                    color: #2563eb;
                    text-decoration: underline;
                    cursor: pointer;
                }

                .editor-content-wrapper .ProseMirror a:hover {
                    color: #1d4ed8;
                }

                .editor-content-wrapper .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #9ca3af;
                    pointer-events: none;
                    height: 0;
                }

                .editor-content-wrapper .ProseMirror:focus {
                    outline: none;
                }

                /* Selection styling */
                .editor-content-wrapper .ProseMirror ::selection {
                    background: #bfdbfe;
                }
            `}</style>
        </div>
    );
}
