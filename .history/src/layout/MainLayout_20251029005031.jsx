import React from "react";
import Sidebar from "../components/Sidebar";
import useActiveSection from "../hooks/useActiveSection";
import About from "../pages/About";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";

export default function MainLayout() {
  const sectionIds = ["about", "experience", "projects", "contact"];
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="page-container">
      <div className="layout">
        <aside className="sidebar">
          <Sidebar activeSection={activeSection} />
        </aside>

        <main className="content" id="content-scroll">
          <section
            id="about"
            className={activeSection === "about" ? "active-section" : ""}
          >
            <About />
          </section>
          <section
            id="experience"
            className={activeSection === "experience" ? "active-section" : ""}
          >
            <Experience />
          </section>
          <section
            id="projects"
            className={activeSection === "projects" ? "active-section" : ""}
          >
            <Projects />
          </section>
          <section
            id="contact"
            className={activeSection === "contact" ? "active-section" : ""}
          >
            <Contact />
          </section>
        </main>
      </div>
    </div>
  );
}
