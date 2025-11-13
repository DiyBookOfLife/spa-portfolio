import { useEffect, useState } from "react";

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const scrollContainer = document.getElementById("content-scroll");
    if (!scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = null;
        let maxRatio = 0;

        for (const entry of entries) {
          const ratio = entry.intersectionRatio;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = entry.target.id;
          }
        }

        if (mostVisible && mostVisible !== activeSection) {
          setActiveSection(mostVisible);
        }

        const scrollBottom =
          scrollContainer.scrollTop + scrollContainer.clientHeight;
        const maxScroll = scrollContainer.scrollHeight - 5;
        if (scrollBottom >= maxScroll) {
          const last = sectionIds[sectionIds.length - 1];
          if (last !== activeSection) {
            setActiveSection(last);
          }
        }
      },
      {
        root:
          scrollContainer &&
          scrollContainer.scrollHeight > scrollContainer.clientHeight
            ? scrollContainer
            : null,
        threshold: Array.from({ length: 20 }, (_, i) => i / 20),
        rootMargin: "-5% 0px -40% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    setTimeout(() => {
      const first = sectionIds.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight * 0.5;
      });
      if (first) {
        setActiveSection(first);
      }
    }, 100);

    return () => observer.disconnect();
  }, [sectionIds, activeSection]);

  return activeSection;
}
