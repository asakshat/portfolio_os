"use client";
import { useState, useEffect } from 'react';
import { Folder, FileText, Mail, User, Terminal } from 'lucide-react';
import { useTerminal } from './hooks/useTerminal';
import FolderItem from './components/FolderItem';
import TerminalControls from './components/TerminalControls';
import { getDirectoryContents } from './utils/fileSystem';
import { fileSystem } from './constants/fileSystemData';
import FileModal from './components/FileModal';

export default function Home() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  const {
    input,
    setInput,
    commandHistory,
    currentPath, 
    inputRef,
    terminalRef,
    handleSubmit,
    handleKeyDown,
    executeCommand,
    modalContent,
    setModalContent
  } = useTerminal();

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMaximized) setIsMaximized(false);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (isMinimized) setIsMinimized(false);
  };

  const handleClose = () => {
    setIsTerminalOpen(false);
  };

  const handleReopen = () => {
    setIsTerminalOpen(true);
    setIsMinimized(false);
    setIsMaximized(false);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory, terminalRef]);

  return (
    <main className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentPath !== '~' && (
            <FolderItem
              key=".."
              icon={<Folder size={24} />}
              title=".."
              href="#"
              description="Go back to parent directory"
              onClick={(e) => {
                e.preventDefault();
                executeCommand('cd ..');
              }}
            />
          )}
          {Object.entries(getDirectoryContents(currentPath) || fileSystem['~']).map(([name, info]) => {
          const icon = info.type === 'directory' ? <Folder size={24} /> :
                      name.endsWith('.sh') ? <Mail size={24} /> :
                      name === 'ABOUT.TXT' ? <User size={24} /> :
                      <FileText size={24} />;
          
          const description = info.type === 'directory' ? 
                            info.description || `Contains ${Object.keys(info.content || {}).length} items` :
                            info.description || info.content || '';
          
          return (
            <FolderItem
              key={name}
              icon={icon}
              title={name}
              href="#"
              description={description}
              onClick={(e, isDirectory, fileInfo) => {
                if (fileInfo?.component) {
                  setModalContent({ 
                    isOpen: true, 
                    content: fileInfo,
                    title: name 
                  });
                  return;
                }
                executeCommand(isDirectory ? `cd ${name}` : `open ${name}`);
              }}
            />
          );
        })}
      </div>

      {isTerminalOpen && (
        <div className={`transition-all duration-300 ease-in-out 
          ${isMinimized ? 'h-12' : isMaximized ? 'fixed inset-0 m-0 p-4' : 'relative'}
          ${!isMinimized && !isMaximized ? 'border border-green-500' : ''}
        `}>
          <TerminalControls
            handleClose={handleClose}
            handleMinimize={handleMinimize}
            handleMaximize={handleMaximize}
          />

          {!isMinimized && (
            <div className="p-4 font-mono text-sm bg-zinc-900"> {/* change the background-color of the terminal */}

              <div 
                ref={terminalRef} 
                className={`overflow-y-auto mb-4 ${isMaximized ? 'h-[calc(100vh-8rem)]' : 'h-64'}`}
              >
                {commandHistory.map((line, i) => (
                  line !== null && (
                    <div 
                      key={i} 
                      className="mb-1"
                      dangerouslySetInnerHTML={{ __html: line }} 
                    />
                  )
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-blue-500 mr-2"> {/* change the text-label color of the terminal */}
                  {currentPath === '~' ? '/home/sakshat' : currentPath.replace('~', '/home/sakshat')}$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-white"
                  autoComplete="off"
                />
              </form>
            </div>
          )}
        </div>
      )}

      {!isTerminalOpen && (
        <button
          onClick={handleReopen}
          className="fixed bottom-4 right-4 p-3 bg-zinc-900 border border-green-500 
                     hover:bg-green-500 hover:text-black rounded transition-colors"
        >
          <Terminal size={24} />
        </button>
      )}
       <FileModal 
        isOpen={modalContent.isOpen}
        content={modalContent.content}
        title={modalContent.title}
        onClose={() => setModalContent({ ...modalContent, isOpen: false })}
      />
    </main>
  );
}