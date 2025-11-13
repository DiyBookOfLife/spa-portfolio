import { useEffect, useRef, useState } from "react";

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const isManualScroll = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    if (!sectionIds.length) return;

    const isMobile = window.innerWidth <= 700;
    const rootEl = isMobile ? null : document.getElementById("content-scroll");
    const scrollTarget = rootEl ?? window;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const TOP_PAD = 16;

    const getViewport = () => {
      if (rootEl) {
        const rect = rootEl.getBoundingClientRect();
        return {
          top: rect.top + TOP_PAD,
          bottom: rect.bottom,
          height: rect.height,
        };
      }
      return {
        top: 0 + TOP_PAD,
        bottom: window.innerHeight,
        height: window.innerHeight,
      };
    };

    const visiblePixels = (el) => {
      const r = el.getBoundingClientRect();
      const vp = getViewport();
      const top = Math.max(r.top, vp.top);
      const bottom = Math.min(r.bottom, vp.bottom);
      const h = Math.max(0, bottom - top);
      return h;
    };

    const computeActive = () => {
      if (isManualScroll.current) return;

      let bestId = sectionIds[0];
      let bestVis = -1;

      for (let i = 0; i < sections.length; i++) {
        const vis = visiblePixels(sections[i]);
        if (vis > bestVis) {
          bestVis = vis;
          bestId = sectionIds[i];
        }
      }

      const totalScroll =
        (rootEl ? rootEl.scrollTop : window.scrollY) +
        (rootEl ? rootEl.clientHeight : window.innerHeight);
      const maxScroll = rootEl
        ? rootEl.scrollHeight
        : document.documentElement.scrollHeight;

      if (maxScroll - totalScroll < 40) {
        bestId = sectionIds[sectionIds.length - 1];
      }

      if (bestId && bestId !== activeSection) {
        setActiveSection(bestId);
      }
    };

    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        computeActive();
      });
    };

    const onResize = onScroll;

    const ro = new ResizeObserver(onResize);
    sections.forEach((el) => ro.observe(el));
    if (rootEl) ro.observe(rootEl);

    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    computeActive();

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      scrollTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
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
