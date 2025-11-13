import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import useActiveSection from "../hooks/useActiveSection"; // adjust the path if needed

export default function Sidebar({
  sectionIds,
  activeSection,
  handleManualScroll,
}) {
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
                // 🧭 replaced old scrollToSection with this
                onClick={() => handleManualScroll(id)}
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
          href="https://github.com/"
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
