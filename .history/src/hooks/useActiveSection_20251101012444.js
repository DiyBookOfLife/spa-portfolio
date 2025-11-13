import { useEffect, useState } from "react";

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const scrollContainer = document.getElementById("content-scroll");
    if (!scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          setActiveSection(visible[0].target.id);
          return;
        }

        // handle bottom scroll edge
        const last = sectionIds[sectionIds.length - 1];
        const scrollBottom =
          scrollContainer.scrollTop + scrollContainer.clientHeight;
        const maxScroll = scrollContainer.scrollHeight - 2;
        if (scrollBottom >= maxScroll) setActiveSection(last);
      },
      {
        root: scrollContainer,
        threshold: 0.18,
        // 👇 All four values must include units: px or %
        rootMargin: "0px 0px -35% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
