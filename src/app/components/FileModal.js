"use client";
import { useEffect } from 'react';  
import { X } from 'lucide-react';

export default function FileModal({ isOpen, content, title, onClose }) {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]); 

  if (!isOpen) return null;

  const Component = content?.component;
  const displayContent = typeof content === 'string' ? content : content?.content;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-green-500 rounded-lg w-full max-w-6xl max-h-[90vh] mx-4">
        <div className="flex items-center justify-between border-b border-green-500 p-4">
          <h2 className="text-xl text-green-500">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-green-500 hover:text-black rounded transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-4rem)]">
          {Component ? <Component /> : displayContent}
        </div>
      </div>
    </div>
  );
}