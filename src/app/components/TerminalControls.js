'use client';
import { Minus, Square, X } from 'lucide-react';

export default function TerminalControls({ 
  handleClose, 
  handleMinimize, 
  handleMaximize 
}) {
  return (
    <div className="flex flex-row-reverse  items-center justify-between bg-zinc-900 border-b border-green-500 p-2">
      <div className="flex items-center space-x-2">
       
        <button 
          onClick={handleMinimize}
          className="p-1 hover:bg-yellow-500 hover:text-black rounded transition-colors"
        >
          <Minus size={16} />
        </button>
        <button 
          onClick={handleMaximize}
          className="p-1 hover:bg-green-500 hover:text-black rounded transition-colors"
        >
          <Square size={16} />
        </button>
        <button 
          onClick={handleClose}
          className="p-1 hover:bg-red-500 hover:text-black rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <span className="text-green-500 text-sm">Terminal</span>
      <div className="w-20"></div>
    </div>
  );
}