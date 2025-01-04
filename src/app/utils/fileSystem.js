import { fileSystem } from '../constants/fileSystemData';

export const resolvePath = (path, currentPath) => {
  if (path.startsWith('/home/sakshat')) {
    return path.replace('/home/sakshat', '~');
  }
  if (path.startsWith('~')) {
    return path;
  }

  let base = currentPath === '/home/sakshat' ? '~' : currentPath.replace('/home/sakshat', '~');
  let segments = base.split('/');

  path.split('/').forEach(segment => {
    if (segment === '..') {
      if (segments.length > 1) segments.pop();
    } else if (segment !== '.' && segment !== '') {
      segments.push(segment);
    }
  });

  return segments.join('/');
};

export const getDirectoryContents = (path) => {
  let normalizedPath = path === '/home/sakshat' ? '~' : path.replace('/home/sakshat', '~');
  let segments = normalizedPath.split('/').filter(Boolean);
  
  if (segments[0] !== '~') segments.unshift('~');
  
  let current = fileSystem['~'];
  for (let i = 1; i < segments.length; i++) {
    if (!current || !current[segments[i]] || current[segments[i]].type !== 'directory') {
      return null;
    }
    current = current[segments[i]].content;
  }
  return current;
};

export const getCompletions = (partial, currentPath) => {
  const dir = partial.includes('/') 
    ? resolvePath(partial.substring(0, partial.lastIndexOf('/')), currentPath) 
    : currentPath;
  
  const contents = getDirectoryContents(dir);
  if (!contents) return [];

  const prefix = partial.substring(partial.lastIndexOf('/') + 1);
  return Object.keys(contents).filter(name => 
    name.toLowerCase().startsWith(prefix.toLowerCase())
  );
};