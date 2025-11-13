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
        I’m a Front-End Software Engineer dedicated to building modern,
        accessible web experiences that combine design and functionality. My
        core focus is on JavaScript and React — crafting responsive, intuitive
        interfaces that feel seamless and user-centered across all devices.
      </p>
      <p className="about-paragraph">
        Before transitioning into Software Engineering, I spent over a decade at
        AT&T in Technical Support, where I developed strong debugging instincts
        and a systematic, detail-oriented approach to problem-solving.
      </p>
      <p className="about-paragraph">
        Outside of my full-time role, I design and build websites for small
        businesses and individuals, helping them create a strong digital
        presence that aligns with their brand and goals. I’m passionate about
        writing clean, efficient code and delivering polished, reliable
        solutions that feel both purposeful and visually engaging.
      </p>
    </motion.section>
  );
}
