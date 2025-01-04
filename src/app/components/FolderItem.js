import Link from "next/link";
import { getDirectoryContents } from "../utils/fileSystem";
import { fileSystem } from "../constants/fileSystemData";
export default function FolderItem({ icon, title, href, description, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    const isDirectory = title.endsWith('/') || getDirectoryContents(`~/${title}`);
    
    const fileInfo = fileSystem['~'][title];
    if (fileInfo?.component) {
      onClick(e, isDirectory, fileInfo);
      return;
    }
    
    onClick(e, isDirectory);
  };

  return (
    <Link 
      href={href}
      onClick={handleClick}
      className="border border-green-500 p-4 hover:bg-green-500 hover:text-black transition-colors group"
    >
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="opacity-80">{description}</p>
        </div>
      </div>
    </Link>
  );
}