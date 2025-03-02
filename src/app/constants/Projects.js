'use client';
import React from 'react';
import ProjectCard from '../components/ProjectCardComponent';

const projectsData = [
  {
    title: "Online Guitar Tab Player",
    description: "A web-based online guitar tab player with features like play/pause, tempo control, and loop sections. Supports importing Guitar Pro files.",
    techStack: [ "JavaScript", "HTML", "CSS" , "Alphatab"],
    imageUrl: "/gpt.png", 
    liveUrl: "https://onlineguitartab.sakshat-tech.me/", 
    githubUrl: "https://github.com/asakshat/onlineguitarpro" 
  },
  {
    title: "Dark Mayhem",
    description: "A web-based game made with PhaserJS, the gameplay loop is similar to Vampire Survivors, where you have to survive as long as possible against waves of enemies.",
    techStack: ["PhaserJS", "JavaScript", "HTML", "CSS"],
    imageUrl: "/dark-mayhem.png", 
    liveUrl: "https://darkmayhem.sakshat-tech.me/", 
    githubUrl: "https://github.com/asakshat/dark-mayhem" 
  },
  {
    title: "Event Booking Platform",
    description: "A fully-featured event booking system with user authentication, event management, ticket generation with QR codes, and a mobile app for ticket scanning and validation.",
    techStack: ["Golang", "PostgreSQL", "React, Docker"],
    imageUrl: '/event-booking.png',
    liveUrl: "https://event-booking-app-real.netlify.app", 
    githubUrl: "https://github.com/asakshat/go-event-booking" 
  },
  {
    title: "Dopeflix",
    description: "A movie streaming site using the TMDb API, where you can search for movies, view details, and watch trailers.",
    techStack: ["React"],
    imageUrl: "/dopeflix.png", 
    liveUrl: "https://dopebox-clone.web.app/", 
    githubUrl: "https://github.com/asakshat/movieflix" 
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#18181B] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-500 mb-8 border-b border-green-500 pb-4">My Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              imageUrl={project.imageUrl}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}