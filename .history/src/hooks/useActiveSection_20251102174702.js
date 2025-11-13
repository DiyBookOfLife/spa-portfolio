import { useEffect, useState, useRef } from "react";

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const isManualScroll = useRef(false); // 🚀 track user click vs observer scroll

  useEffect(() => {
    const scrollContainer = document.getElementById("content-scroll");
    if (!scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return; // 👈 skip updates during manual scroll

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const currentId = visible[0].target.id;
          if (currentId !== activeSection) {
            setActiveSection(currentId);
          }
        }
      },
      {
        root: scrollContainer,
        threshold: 0.5,
        rootMargin: "0px 0px -30% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, activeSection]);

  // 👇 helper for your sidebar clicks
  const handleManualScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    isManualScroll.current = true;
    setActiveSection(id); // highlight immediately
    el.scrollIntoView({ behavior: "smooth" });

    // let the scroll settle before reactivating observer
    setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  };

  return { activeSection, handleManualScroll };
}
