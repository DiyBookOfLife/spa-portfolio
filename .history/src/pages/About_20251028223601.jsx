import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>About</h2>
      <p className="about-paragraph">
        I’m a Front-End Software Engineer who builds interactive, accessible web
        applications that merge design and functionality. My expertise spans
        React, JavaScript, and TypeScript, and I specialize in crafting
        responsive interfaces that perform smoothly across devices.
      </p>
      <p className="about-paragraph">
        Before transitioning into software engineering, I spent over a decade at
        AT&T in technical support, where I developed sharp debugging instincts
        and a strong foundation in problem-solving. That experience taught me
        how to approach complex systems methodically — a skill I now apply to
        every feature I design and every bug I squash.
      </p>
      <p className="about-paragraph">
        I’m passionate about creating software that feels intuitive, runs
        efficiently, and solves real problems for real users. My recent projects
        range from AI-powered face recognition apps to full-stack weather
        dashboards and personal portfolio systems. I’m constantly improving my
        craft — exploring new frameworks, optimizing workflows, and writing
        cleaner, more scalable code.
      </p>
    </motion.section>
  );
}
