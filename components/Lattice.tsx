"use client";

import { useEffect, useRef } from "react";

export default function Lattice() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf = 0;
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      c.width = W * dpr; c.height = H * dpr;
      c.style.width = W + "px"; c.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(64, Math.round((W * H) / 26000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
      }));
    };
    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach((n) => { ctx.fillStyle = "rgba(139,124,246,.4)"; ctx.beginPath(); ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2); ctx.fill(); });
    };
    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1; }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) { ctx.strokeStyle = "rgba(95,227,192," + (1 - d / 150) * 0.16 + ")"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
      for (const n of nodes) { ctx.fillStyle = "rgba(139,124,246,.5)"; ctx.beginPath(); ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2); ctx.fill(); }
      raf = requestAnimationFrame(frame);
    };
    const onResize = () => { resize(); if (reduce) drawStatic(); };
    const onVis = () => { if (reduce) return; if (document.hidden) cancelAnimationFrame(raf); else frame(); };

    resize();
    if (reduce) drawStatic(); else frame();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return <canvas ref={ref} className="lattice" aria-hidden="true" />;
}
