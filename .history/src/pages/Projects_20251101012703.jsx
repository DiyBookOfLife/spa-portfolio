import React from "react";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const projectData = [
    {
      title: "The Chef’s Kiss (AI Recipe App)",
      description:
        "An interactive React + Vite web app that generates recipes from ingredients using an AI API.",
      tech: ["React", "Vite", "AI API", "CSS"],
      link: "https://the-chefs-kiss.vercel.app/",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern personal portfolio built with React + Vite showcasing professional projects and skills.",
      tech: ["React", "Vite", "React Router"],
      link: "https://diybookoflife.github.io/react-portfolio/",
    },
    {
      title: "Weather Journal App",
      description:
        "Full-stack Node.js + Express project that retrieves live weather data from an external API.",
      tech: ["Node", "Express", "OpenWeatherMap API"],
      link: "https://diybookoflife.github.io/weather-journal-app/",
    },
    {
      title: "Face Recognition Scanner",
      description:
        "AI-powered React + TypeScript application that performs real-time face detection using webcam or uploaded images via face-api.js.",
      tech: ["React", "TypeScript", "face-api.js", "Redux Toolkit"],
      link: "https://webcam-face-recognition-wine.vercel.app/",
    },
  ];

  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projectData.map((proj, i) => (
          <ProjectCard key={i} {...proj} />
        ))}
      </div>
    </section>
  );
}
