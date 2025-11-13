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
      <p className="about-paragraph">
        I’m a <strong>Front-End Software Engineer</strong> dedicated to building{" "}
        <strong>modern, accessible web experiences</strong> that combine design
        and functionality. My core focus is on <strong>JavaScript</strong> and{" "}
        <strong>React</strong> — crafting responsive, intuitive interfaces that
        feel seamless and user-centered across all devices.
      </p>
      <p className="about-paragraph">
        Before transitioning into Software Engineering, I spent over a decade at
        AT&T in Technical Support, where I developed strong{" "}
        <em>debugging instincts</em> and a systematic, detail-oriented approach
        to problem-solving.
      </p>
      <p className="about-paragraph">
        Outside of my full-time role, I{" "}
        <strong>design and build websites</strong> for small businesses and
        individuals, helping them create a strong digital presence that aligns
        with their brand and goals. I’m passionate about writing{" "}
        <em>clean, efficient code</em> and delivering{" "}
        <strong>polished, reliable solutions</strong> that feel both purposeful
        and visually engaging.
      </p>
    </motion.section>
  );
}
