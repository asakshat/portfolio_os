'use client';
import { useState, useRef } from 'react';
import { getCompletions } from '../utils/fileSystem';
import { createCommands } from '../utils/commands';
import { useRouter } from 'next/navigation';

export const useTerminal = () => {
  const [modalContent, setModalContent] = useState({ isOpen: false, content: '', title: '' });
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState(['Welcome to Portfolio OS v1.0.0. Type "!help" for a list of commands.']);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputHistory, setInputHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState('~');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const router = useRouter();

  const commands = createCommands(setCurrentPath, router, setModalContent);

  const handleTabCompletion = () => {
    const words = input.split(' ');
    const lastWord = words[words.length - 1];

    // command completion
    if (words.length === 1) {
      const matches = Object.keys(commands).filter(cmd => 
        cmd.toLowerCase().startsWith(lastWord.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      }
      return;
    }

    // path completion
    if (['cd', 'ls', 'cat', 'open'].includes(words[0])) {
      const completions = getCompletions(lastWord, currentPath);
      if (completions.length === 1) {
        words[words.length - 1] = lastWord.includes('/') 
          ? lastWord.substring(0, lastWord.lastIndexOf('/') + 1) + completions[0]
          : completions[0];
        setInput(words.join(' '));
      }
    }
  };

  const executeCommand = (cmd) => {
    const [command, ...args] = cmd.trim().split(' ');
    const handler = commands[command];
    if (!handler) return `<span class="text-red-500">Command not found: ${command} </span>`;
    
    if (command === 'clear') {
      setCommandHistory(['Welcome to Portfolio OS v1.0.0. Type "!help" for a list of commands.']);
      return '';
    }
    return handler(args, currentPath);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const result = executeCommand(input);
    const displayPath = currentPath === '~' ? '/home/sakshat' : currentPath.replace('~', '/home/sakshat');
    if (result !== '') {
      setCommandHistory(prev => [...prev, `${displayPath}$ ${input}`, result]);
    }
    setInputHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < inputHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(inputHistory[inputHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(inputHistory[inputHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return {
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
  };
};