import { useMemo, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Button } from "flowbite-react";

export default function EditorForSummary({ placeholder, onClose, theme }) {
    const [content, setContent] = useState("");
    const editor = useRef(null);

    const onSubmit = () => {
        // localStorage.setItem()
        onClose(false); // Close the popup on submit
    };

    const config = useMemo(() => ({
        readonly: false, 
        placeholder: placeholder || 'Start formatting your story...',
        style: {
            backgroundColor: theme === 'dark' ? 'var(--editor-bg-dark)' : 'var(--editor-bg-light)',
            color: theme === 'dark' ? 'var(--editor-text-dark)' : 'var(--editor-text-light)',
        },
    }), [placeholder, theme]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {/* Popup container */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-7xl mx-4 sm:mx-auto overflow-hidden">
                <div className="flex justify-between">
                    <button 
                        onClick={() => onClose(false)}
                        className="order-1 text-red-400 hover:text-red-600 dark:hover:text-gray-300"
                        >
                        ✕
                    </button>

                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Add Brief Summary
                    </p>
                </div>

                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={() => {}}
                    className="rounded-md border dark:border-gray-700 dark:bg-gray-800"
                />

                <div className="flex justify-end mt-4">
                    <Button onClick={onSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    );
}
