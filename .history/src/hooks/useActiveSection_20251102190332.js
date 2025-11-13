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

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const topVisible = visible[0].target.id;
          setActiveSection(topVisible);
        }
      },
      {
        root: scrollContainer, // container or viewport
        threshold: window.innerWidth <= 700 ? 0.3 : 0.5,
        rootMargin:
          window.innerWidth <= 700 ? "0px 0px -40% 0px" : "0px 0px -30% 0px",
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
