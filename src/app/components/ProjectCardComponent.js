'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectCard({ title, description, techStack, imageUrl, liveUrl, githubUrl }) {
  return (
    <div className="bg-zinc-900 border border-green-500/30 rounded-lg overflow-hidden hover:border-green-500 transition-all">
      <div className="relative h-48 w-full bg-zinc-800">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title} 
            fill 
            className="object-cover" 
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-green-900/20 to-black">
            <span className="text-green-500 text-xl">{title}</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-green-400 mb-2 font-mono">{title}</h3>
        
        <p className="text-gray-300 mb-4 font-mono tracking-wide">{description}</p>
        
        {techStack && (
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2 font-mono">Tech Stack:</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-zinc-800 text-green-300 text-xs rounded-full border border-green-900/30 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-3 mt-4">
          {liveUrl && (
            <Link 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 bg-green-500 text-black rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </Link>
          )}
          
          {githubUrl && (
            <Link 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 bg-zinc-800 text-green-300 rounded-md text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              <Github size={16} />
              Source Code
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}