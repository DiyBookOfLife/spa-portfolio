import { useEffect, useState, useRef } from "react";

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const isManualScroll = useRef(false);

  useEffect(() => {
    const scrollContainer =
      window.innerWidth <= 700
        ? null // mobile → use viewport
        : document.getElementById("content-scroll");

    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;

        // Filter visible sections and sort by position
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const current = visible[0].target.id;
          setActiveSection(current);
        } else {
          // Handle bottom edge (Contact)
          const lastSection = document.getElementById(
            sectionIds[sectionIds.length - 1]
          );
          if (lastSection) {
            const rect = lastSection.getBoundingClientRect();
            if (rect.bottom <= window.innerHeight + 50) {
              setActiveSection(sectionIds[sectionIds.length - 1]);
            }
          }
        }
      },
      {
        root: scrollContainer,
        threshold: [0.15, 0.25, 0.35],
        rootMargin:
          window.innerWidth <= 700 ? "0px 0px -15% 0px" : "0px 0px -25% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

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
