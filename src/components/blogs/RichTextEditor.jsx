'use client';

import { useRef, useEffect } from 'react';
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
import './editor.css';

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

    // Sync editor content when prop changes (for edit mode fetching)
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

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
        </div>
    );
}
