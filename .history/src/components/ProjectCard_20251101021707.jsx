import React from "react";
import { motion } from "framer-motion";
import chefsKiss from "../assets/chefsKiss.png";
import faceRec from "../assets/faceRec.png";
import landingPage from "../assets/landingPage.png";
import MPA from "../assets/MPA.png";
import weather from "../assets/weather.png";

export default function ProjectCard({ title, description, tech, link, image }) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="project-inner">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="tech-list">
          {tech.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
        {image && (
          <img
            src={image}
            alt={`${title} screenshot`}
            className="project-screenshot"
          />
        )}
        <a href={link} target="_blank" rel="noreferrer">
          View Project ↗
        </a>
      </div>
    </motion.div>
  );
}
