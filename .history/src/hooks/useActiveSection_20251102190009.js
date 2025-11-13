import { useEffect, useState, useRef } from "react";

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const isManualScroll = useRef(false);
  const lastScrollTop = useRef(0);
  const observerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = document.getElementById("content-scroll");
    if (!scrollContainer) return;

    // Clean up any previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const isMobile = window.innerWidth <= 700;

    if (isMobile) {
      // --- MOBILE FALLBACK: "sticky highlight" only while in About
      const handleScroll = () => {
        const scrollPos = window.scrollY;
        const sections = sectionIds.map((id) => document.getElementById(id));

        let current = sectionIds[0];
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          if (section && scrollPos + 300 >= section.offsetTop) {
            current = sectionIds[i];
          }
        }
        setActiveSection(current);
      };

      setActiveSection(sectionIds[0]);
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }

    // --- DESKTOP BEHAVIOR: Intersection Observer
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
          const target = scrollingDown
            ? visible[visible.length - 1]
            : visible[0];
          const currentId = target.target.id;
          if (currentId !== activeSection) {
            setActiveSection(currentId);
          }
        }

        // Edge cases
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
        threshold: [0.15, 0.35, 0.5],
        rootMargin: "0px 0px -30% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [sectionIds, activeSection]);

  // --- Manual scroll for sidebar button clicks
  const handleManualScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    isManualScroll.current = true;
    setActiveSection(id);
    el.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  };

  return { activeSection, handleManualScroll };
}
