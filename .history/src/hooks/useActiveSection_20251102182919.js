import { useEffect, useState, useRef } from "react";

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const isManualScroll = useRef(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const scrollContainer = document.getElementById("content-scroll");
    if (!scrollContainer) return;
    if (window.innerWidth <= 700) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;

        const scrollTop = scrollContainer.scrollTop;
        const scrollingDown = scrollTop > lastScrollTop.current;
        lastScrollTop.current = scrollTop;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          // Choose section based on scroll direction
          const target = scrollingDown
            ? visible[visible.length - 1]
            : visible[0];

          const currentId = target.target.id;
          if (currentId !== activeSection) {
            setActiveSection(currentId);
          }
        }

        // Handle top and bottom edges
        if (scrollContainer.scrollTop === 0) {
          setActiveSection(sectionIds[0]);
        } else if (
          Math.ceil(scrollContainer.scrollTop + scrollContainer.clientHeight) >=
          scrollContainer.scrollHeight
        ) {
          setActiveSection(sectionIds[sectionIds.length - 1]);
        }
      },
      {
        root: scrollContainer,
        threshold: [0.1, 0.25, 0.5],
        rootMargin: "0px 0px -25% 0px",
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
    el.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      isManualScroll.current = false;
    }, 900);
  };

  return { activeSection, handleManualScroll };
}
