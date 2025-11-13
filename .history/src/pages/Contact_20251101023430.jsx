import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <p className="contact-text">
        I’m currently open to new opportunities where I can contribute to
        front-end or full-stack projects, continue learning, and grow as a
        software engineer. If you’d like to collaborate or discuss a role, feel
        free to reach out.
      </p>
      <a
        className="contact-button"
        href="mailto:tsthomas205@gmail.com"
        target="_blank"
        rel="noreferrer"
      >
        Let’s Connect
      </a>
    </motion.section>
  );
}
