import { useEffect, useRef, useState } from "react";

/**
 * Robust, container/viewport-aware active-section detector.
 * Picks the section with the largest visible height in the view.
 * Works for:
 *  - Desktop: root = #content-scroll (overflow container)
 *  - Mobile:  root = viewport (window)
 * Also respects manual clicks (temporary lockout).
 */
export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const isManualScroll = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    if (!sectionIds.length) return;

    // Root: container on desktop, viewport on mobile
    const isMobile = window.innerWidth <= 700;
    const rootEl = isMobile ? null : document.getElementById("content-scroll");
    const scrollTarget = rootEl ?? window;

    // Cache section elements
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    // Guard: nothing to track
    if (!sections.length) return;

    // Top padding compensation to match your CSS scroll-padding-top: 16px
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

    // Visible height of a section within the current viewport
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

      // Choose the section with the greatest visible pixels
      let bestId = sectionIds[0];
      let bestVis = -1;

      for (let i = 0; i < sections.length; i++) {
        const vis = visiblePixels(sections[i]);
        if (vis > bestVis) {
          bestVis = vis;
          bestId = sectionIds[i];
        }
      }

      // Force bottom section when near the end (handles Contact reliably)
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

    // rAF-throttled scroll handler
    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        computeActive();
      });
    };

    // Recompute on resize/zoom/content changes
    const onResize = onScroll;

    // Also observe layout shifts (fonts/images/cards expanding)
    const ro = new ResizeObserver(onResize);
    sections.forEach((el) => ro.observe(el));
    if (rootEl) ro.observe(rootEl);

    // Attach listeners
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Initial compute
    computeActive();

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      scrollTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds, activeSection]);

  // Sidebar click support (desktop)
  const handleManualScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    isManualScroll.current = true;
    setActiveSection(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Re-enable auto detection after scroll settles
    setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  };

  return { activeSection, handleManualScroll };
}
