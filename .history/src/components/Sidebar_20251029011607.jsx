import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Sidebar({ activeSection }) {
  const sectionIds = ["about", "experience", "projects", "contact"];

  function scrollToSection(id) {
    const container = document.getElementById("content-scroll");
    const target = document.getElementById(id);
    if (!container || !target) return;

    container.scrollTo({
      top: target.offsetTop - 16, // matches your scroll-padding-top
      behavior: "smooth",
    });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Toni Thomas</h1>
        <h3>Software Engineer</h3>
        <p>Building modern, accessible web experiences.</p>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {sectionIds.map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollToSection(id)}
                className={activeSection === id ? "active" : ""}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-socials">
        <a
          href="https://github.com/DiyBookOfLife"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <FaGithub size={22} />
        </a>
        <a
          href="https://www.linkedin.com/in/tonithomas2025/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={22} />
        </a>
      </div>
    </aside>
  );
}
