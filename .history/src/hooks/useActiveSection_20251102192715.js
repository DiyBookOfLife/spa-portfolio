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

        // Sort visible sections by top position
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const topVisible = visible[0].target.id;
          if (activeSection !== topVisible) setActiveSection(topVisible);
        } else {
          // Handle "bottom of page" case for Contact
          const lastId = sectionIds[sectionIds.length - 1];
          const lastSection = document.getElementById(lastId);
          if (lastSection) {
            const rect = lastSection.getBoundingClientRect();
            const bottomEdge =
              scrollContainer?.scrollHeight ??
              document.documentElement.scrollHeight;
            const scrolled =
              (scrollContainer?.scrollTop ?? window.scrollY) +
              (scrollContainer?.clientHeight ?? window.innerHeight);

            // If scrolled within 50px of the bottom → Contact is active
            if (bottomEdge - scrolled < 50) {
              setActiveSection(lastId);
            }
          }
        }
      },
      {
        root: scrollContainer || null,
        threshold: [0.2, 0.35, 0.5],
        rootMargin: "0px 0px -35% 0px",
      }
    );

    // Observe each section
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
