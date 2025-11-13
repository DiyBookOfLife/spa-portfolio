import React from "react";
import Sidebar from "../components/Sidebar";
import useActiveSection from "../hooks/useActiveSection";
import About from "../pages/About";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";

export default function MainLayout() {
  const sectionIds = ["about", "experience", "projects", "contact"];
  const { activeSection, handleManualScroll } = useActiveSection(sectionIds);

  return (
    <div className="page-container">
      <div className="layout">
        <aside className="sidebar">
          <Sidebar
            activeSection={activeSection}
            sectionIds={sectionIds}
            handleManualScroll={handleManualScroll}
          />
        </aside>

        <main className="content" id="content-scroll">
          {sectionIds.map((id) => (
            <section
              key={id}
              id={id}
              className={activeSection === id ? "active-section" : ""}
            >
              {id === "about" && <About />}
              {id === "experience" && <Experience />}
              {id === "projects" && <Projects />}
              {id === "contact" && <Contact />}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
