import { useEffect, useState, useRef } from "react";

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const isManualScroll = useRef(false);

  useEffect(() => {
    const scrollContainer =
      window.innerWidth <= 700
        ? null
        : document.getElementById("content-scroll");

    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const topVisible = visible[0].target.id;
          if (activeSection !== topVisible) setActiveSection(topVisible);
        }

        // Always handle bottom edge (for Contact)
        const lastId = sectionIds[sectionIds.length - 1];
        const lastSection = document.getElementById(lastId);
        if (lastSection) {
          const rect = lastSection.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // If the bottom of the last section is within 120px of viewport bottom → mark Contact active
          if (rect.bottom <= viewportHeight + 120) {
            if (activeSection !== lastId) setActiveSection(lastId);
          }
        }
      },
      {
        root: scrollContainer || null,
        threshold: [0.1, 0.3, 0.45],
        // earlier trigger so Projects activates sooner
        rootMargin:
          window.innerWidth <= 700 ? "0px 0px -20% 0px" : "0px 0px -35% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, activeSection]);

  const handleManualScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    isManualScroll.current = true;
    setActiveSection(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  };

  return { activeSection, handleManualScroll };
}
