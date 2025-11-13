import React from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ title, description, tech, link }) {
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
        <a href={link} target="_blank" rel="noreferrer">
          View Project ↗
        </a>
      </div>
    </motion.div>
  );
}