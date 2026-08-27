"use client";
import { useEffect, useRef } from "react";

type Particle = {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number;
  phase: 0 | 1; // 0=incoming classical, 1=outgoing quantum-targeted
  size: number; alpha: number;
};

export default function HeroViz() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0, H = 0, raf = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    let nextSpawn = 0;
    let orbit = 0;

    const resize = () => {
      W = c.offsetWidth; H = c.offsetHeight;
      c.width = W * dpr; c.height = H * dpr;
      c.style.width = W + "px"; c.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = [];
    };

    const spawn = () => {
      const cy = H * 0.5;
      const lane = [0.3, 0.5, 0.7][Math.floor(Math.random() * 3)];
      const startY = H * lane + (Math.random() - 0.5) * 28;
      const speed = 1.1 + Math.random() * 0.7;
      particles.push({
        x: -8, y: startY,
        vx: speed, vy: (cy - startY) * 0.008,
        life: 0, maxLife: 90 + Math.random() * 60,
        phase: 0,
        size: 1.6 + Math.random() * 1.4,
        alpha: 0,
      });
    };

    const frame = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      orbit += 0.007;
      const pulse = 0.5 + 0.5 * Math.sin(now * 0.0014);
      const cx = W * 0.5, cy = H * 0.5;
      const baseR = 20 + pulse * 5;

      // Spawn
      if (now > nextSpawn && particles.length < 52) {
        spawn();
        nextSpawn = now + 55 + Math.random() * 95;
      }

      // Faint horizontal guide lines streaming from left
      for (let i = 0; i < 3; i++) {
        const ly = H * [0.3, 0.5, 0.7][i];
        const dashOffset = -(now * 0.04) % 20;
        ctx.save();
        ctx.setLineDash([6, 14]);
        ctx.lineDashOffset = dashOffset;
        ctx.strokeStyle = "rgba(240,236,230,0.045)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(0, ly);
        ctx.lineTo(cx - baseR * 1.6, ly);
        ctx.stroke();
        ctx.restore();
      }

      // Faint guide lines streaming to right (outgoing branches)
      const outAngles = [-0.4, 0, 0.4];
      for (const angle of outAngles) {
        const x2 = cx + Math.cos(angle) * (W * 0.48);
        const y2 = cy + Math.sin(angle) * (H * 0.44);
        const dashOffset = -(now * 0.04) % 20;
        ctx.save();
        ctx.setLineDash([6, 14]);
        ctx.lineDashOffset = -dashOffset;
        ctx.strokeStyle = "rgba(8,184,230,0.06)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * baseR * 1.8, cy + Math.sin(angle) * baseR * 1.8);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
      }

      // Gateway outer ambient glow
      const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 3.5);
      outerGlow.addColorStop(0, `rgba(8,184,230,${0.12 + pulse * 0.06})`);
      outerGlow.addColorStop(1, "rgba(8,184,230,0)");
      ctx.fillStyle = outerGlow;
      ctx.beginPath(); ctx.arc(cx, cy, baseR * 3.5, 0, Math.PI * 2); ctx.fill();

      // Outer rings
      ctx.strokeStyle = `rgba(8,184,230,${0.1 + pulse * 0.05})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.arc(cx, cy, baseR * 2.8, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = `rgba(8,184,230,${0.18 + pulse * 0.09})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, baseR * 1.9, 0, Math.PI * 2); ctx.stroke();

      // Rotating dashed orbital
      ctx.save();
      ctx.strokeStyle = "rgba(8,184,230,0.3)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 7]);
      ctx.beginPath();
      ctx.ellipse(cx, cy, baseR * 1.5, baseR * 0.5, orbit, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Electron dot on orbital
      const ex = cx + Math.cos(orbit * 2) * baseR * 1.5 * Math.cos(orbit);
      const ey = cy + Math.sin(orbit * 2) * baseR * 0.5;
      const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 5);
      eg.addColorStop(0, "rgba(8,184,230,0.9)");
      eg.addColorStop(1, "rgba(8,184,230,0)");
      ctx.fillStyle = eg;
      ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath(); ctx.arc(ex, ey, 1.5, 0, Math.PI * 2); ctx.fill();

      // Gateway core glow
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.6);
      core.addColorStop(0, "rgba(255,255,255,0.95)");
      core.addColorStop(0.25, `rgba(8,184,230,${0.7 + pulse * 0.2})`);
      core.addColorStop(0.7, `rgba(8,184,230,${0.2 + pulse * 0.1})`);
      core.addColorStop(1, "rgba(8,184,230,0)");
      ctx.fillStyle = core;
      ctx.beginPath(); ctx.arc(cx, cy, baseR * 1.6, 0, Math.PI * 2); ctx.fill();

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        const t = p.life / p.maxLife;
        p.alpha = Math.min(1, t * 6) * Math.min(1, (1 - t) * 5);

        // Convert on reaching gateway
        const dx = p.x - cx, dy = p.y - cy;
        if (p.phase === 0 && Math.sqrt(dx * dx + dy * dy) < baseR * 1.4) {
          p.phase = 1;
          const spread = (Math.random() - 0.5) * 0.75;
          const spd = 1.5 + Math.random() * 0.6;
          p.vx = Math.abs(Math.cos(spread)) * spd;
          p.vy = Math.sin(spread) * spd;
          p.maxLife = p.life + 55 + Math.random() * 45;
        }

        // Mouse push
        const mx = p.x - mouse.x, my = p.y - mouse.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 75 && md > 0) { p.vx += (mx / md) * 0.07; p.vy += (my / md) * 0.07; }

        const spd = Math.sqrt(p.vx ** 2 + p.vy ** 2);
        if (spd > 2.8) { p.vx *= 2.8 / spd; p.vy *= 2.8 / spd; }
        p.x += p.vx; p.y += p.vy;

        if (p.life >= p.maxLife || p.x > W + 12 || p.y < -12 || p.y > H + 12) {
          particles.splice(i, 1); continue;
        }

        const rgb = p.phase === 1 ? "8,184,230" : "240,236,230";
        const a = p.alpha;
        // Glow
        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        pg.addColorStop(0, `rgba(${rgb},${a * 0.55})`);
        pg.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2); ctx.fill();
        // Core
        ctx.fillStyle = `rgba(${rgb},${a})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const drawStatic = () => {
      const cx = W * 0.5, cy = H * 0.5;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      g.addColorStop(0, "rgba(255,255,255,0.8)");
      g.addColorStop(0.4, "rgba(8,184,230,0.5)");
      g.addColorStop(1, "rgba(8,184,230,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2); ctx.fill();
    };

    const onMouse = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onVis = () => {
      if (reduce) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    c.addEventListener("mousemove", onMouse);
    c.addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });
    document.addEventListener("visibilitychange", onVis);
    // Retry once after a paint in case CSS dimensions weren't ready at mount
    if (W === 0 || H === 0) {
      requestAnimationFrame(() => { resize(); if (!reduce) raf = requestAnimationFrame(frame); });
    } else {
      if (reduce) drawStatic(); else raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="hero-viz" aria-hidden="true" />;
}
