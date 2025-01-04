import { getDirectoryContents, resolvePath } from './fileSystem';


export const createCommands = (setCurrentPath, router, setModalContent) => ({
  ls: (args, currentPath) => {
    const path = args.length > 0 ? resolvePath(args[0], currentPath) : currentPath;
    const contents = getDirectoryContents(path);
    
    if (!contents) return `<span class="text-red-500">Directory not found ${args}</span>`;
    
    
    return Object.entries(contents)
      .map(([name, info]) => {
        const color = info.type === 'directory' ? 'text-blue-400' : 
                     info.type === 'executable' ? 'text-green-400' : 'text-white';
        return `<span class="${color}">${name}</span>`;
      })
      .join('  ');
  },

  cd: (args, currentPath) => {
    if (!args.length) {
      setCurrentPath('~');
      return '';
    }

    const newPath = resolvePath(args[0], currentPath);
    const dir = getDirectoryContents(newPath);
    
    if (dir || newPath === '~') {
      setCurrentPath(newPath);
      return '';
    }
    return `<span class="text-red-500">Directory not found ${args}</span>`;
    },

  pwd: (_, currentPath) => {
    return `<span class="text-yellow-400">${currentPath === '~' ? '/home/sakshat' : currentPath.replace('~', '/home/sakshat')}</span>`; 
    },

  cat: (args, currentPath) => {
    if (!args.length) return 'Usage: cat <filename>';
    
    const path = resolvePath(args[0], currentPath);
    const dir = path.substring(0, path.lastIndexOf('/') || 0);
    const file = path.substring(path.lastIndexOf('/') + 1);
    
    const contents = getDirectoryContents(dir || '~');
    const actualFileName = Object.keys(contents).find(k => k.toLowerCase() === file.toLowerCase());
    
    if (!actualFileName || contents[actualFileName].type !== 'file') return '<span class="text-red-500">File not found</span>';
    
    setModalContent({ 
      title: actualFileName, 
      content: contents[actualFileName],
      isOpen: true,
      showCode: false
    });
    
    return `<span class="text-purple-500"> Opening ${actualFileName}...</span>`;
  },
  clear: () => {
    return '';
  },

  '!help': () => `
    Available commands:<br>
    ls &lt;dir&gt; - List directory contents<br>
    cd &lt;dir&gt; - Change the working directory<br>
    pwd - Print working directory<br>
    cat &lt;file&gt; - View file contents<br>
    clear - Clear terminal<br>
    exec &lt;file&gt; - Execute .sh file<br>
    !help - Show this help message<br>
    Make sure to try out TAB completion for commands and paths! <br>` ,


  exec: (args, currentPath) => {
    if (!args.length) return 'Usage: open <filename>';
    
    const path = resolvePath(args[0], currentPath);
    const dir = path.substring(0, path.lastIndexOf('/') || 0);
    const file = path.substring(path.lastIndexOf('/') + 1);
    
    const contents = getDirectoryContents(dir || '~');
    if (!contents || !contents[file]) return '<span class="text-red-500">Script not found not found. </span>';
    
    router.push(contents[file].route);
    return `<span class="text-purple-500">Executing ${file}...</span>`;
  },
});