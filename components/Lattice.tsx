"use client";
import { useEffect, useRef } from "react";

type Node = {
  x: number; y: number; vx: number; vy: number; ox: number; oy: number;
  r: number; glow: number;
  isQuantum: boolean; orbitAngle: number; orbitSpeed: number; orbitTilt: number;
  ringR: number; ringA: number;
};
type Pulse = { a: number; b: number; t: number; speed: number };

const CONNECT = 190;
const QUANTUM = 8;

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
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    const mouse = { x: -999, y: -999 };
    let nextPulse = 0;

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      c.width = W * dpr; c.height = H * dpr;
      c.style.width = W + "px"; c.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Cluster nodes in the right-center of the viewport
      const cx = W * 0.68, cy = H * 0.44;
      const spread = Math.min(W * 0.38, H * 0.52);
      const count = Math.min(90, Math.round((W * H) / 14000));
      nodes = Array.from({ length: count }, (_, i) => {
        const a = Math.random() * Math.PI * 2;
        const rr = spread * Math.pow(Math.random(), 0.55); // concentrate toward center
        const px = cx + Math.cos(a) * rr;
        const py = cy + Math.sin(a) * rr * 0.72; // slight vertical compression
        return {
          x: Math.max(0, Math.min(W, px)),
          y: Math.max(0, Math.min(H, py)),
          ox: px, oy: py, // origin for gentle spring
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          r: i < QUANTUM ? 2.4 : 1.0 + Math.random() * 0.9,
          glow: 0,
          isQuantum: i < QUANTUM,
          orbitAngle: Math.random() * Math.PI * 2,
          orbitSpeed: 0.005 + Math.random() * 0.006,
          orbitTilt: Math.random() * Math.PI,
          ringR: 0, ringA: 0,
        };
      });
      pulses = [];
      nextPulse = 0;
    };

    const activate = (i: number) => {
      nodes[i].glow = 1;
      nodes[i].ringR = 2; nodes[i].ringA = 0.6;
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT) {
          const delay = (d / CONNECT) * 500 + Math.random() * 200;
          setTimeout(() => pulses.push({ a: i, b: j, t: 0, speed: 0.007 + Math.random() * 0.005 }), delay);
        }
      }
    };

    const frame = (now: number) => {
      ctx.clearRect(0, 0, W, H);

      if (now > nextPulse && pulses.length < 30) {
        activate(Math.floor(Math.random() * nodes.length));
        nextPulse = now + 1600 + Math.random() * 2000;
      }

      // Ambient glow cloud — gives the cluster a foggy luminous presence
      const cx = W * 0.68, cy = H * 0.44;
      const fogR = Math.min(W, H) * 0.45;
      const fog = ctx.createRadialGradient(cx, cy, 0, cx, cy, fogR);
      fog.addColorStop(0, "rgba(240,236,230,0.045)");
      fog.addColorStop(0.5, "rgba(240,236,230,0.018)");
      fog.addColorStop(1, "rgba(240,236,230,0)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, W, H);

      // Update nodes
      for (const n of nodes) {
        // Gentle spring back toward origin (keeps cluster shape)
        n.vx += (n.ox - n.x) * 0.0005;
        n.vy += (n.oy - n.y) * 0.0005;
        // Mouse repulsion
        const mx = n.x - mouse.x, my = n.y - mouse.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 140 && md > 0) {
          const f = ((140 - md) / 140) * 0.06;
          n.vx += (mx / md) * f; n.vy += (my / md) * f;
        }
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd > 0.4) { n.vx *= 0.4 / spd; n.vy *= 0.4 / spd; }
        n.x += n.vx; n.y += n.vy;
        n.glow = Math.max(0, n.glow - 0.006);
        if (n.isQuantum) n.orbitAngle += n.orbitSpeed;
        if (n.ringR > 0) { n.ringR += 2.4; n.ringA = Math.max(0, n.ringA - 0.010); }
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            const base = (1 - d / CONNECT) * 0.18;
            const boost = (a.glow + b.glow) * 0.14;
            ctx.strokeStyle = `rgba(240,236,230,${Math.min(0.55, base + boost)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      // Advance + draw pulses
      pulses = pulses.filter(p => p.t <= 1);
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t >= 1) {
          nodes[p.b].glow = Math.min(1, nodes[p.b].glow + 0.7);
          nodes[p.b].ringR = 2; nodes[p.b].ringA = 0.4;
          continue;
        }
        const ax = nodes[p.a].x, ay = nodes[p.a].y;
        const bx = nodes[p.b].x, by = nodes[p.b].y;
        const px = ax + (bx - ax) * p.t, py = ay + (by - ay) * p.t;
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 6);
        pg.addColorStop(0, "rgba(255,255,255,0.95)");
        pg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(px, py, 1.6, 0, Math.PI * 2); ctx.fill();
      }

      // Draw nodes
      for (const n of nodes) {
        // Expanding ring
        if (n.ringA > 0) {
          ctx.strokeStyle = `rgba(240,236,230,${n.ringA})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.ringR, 0, Math.PI * 2); ctx.stroke();
        }
        // Quantum orbital
        if (n.isQuantum) {
          const orR = 16;
          ctx.strokeStyle = "rgba(240,236,230,0.22)";
          ctx.lineWidth = 0.6;
          ctx.setLineDash([3, 5]);
          ctx.beginPath();
          ctx.ellipse(n.x, n.y, orR, orR * 0.38, n.orbitTilt, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
          const ex = n.x + Math.cos(n.orbitAngle) * orR * Math.cos(n.orbitTilt) - Math.sin(n.orbitAngle) * orR * 0.38 * Math.sin(n.orbitTilt);
          const ey = n.y + Math.cos(n.orbitAngle) * orR * Math.sin(n.orbitTilt) + Math.sin(n.orbitAngle) * orR * 0.38 * Math.cos(n.orbitTilt);
          ctx.fillStyle = "rgba(240,236,230,0.6)";
          ctx.beginPath(); ctx.arc(ex, ey, 1.3, 0, Math.PI * 2); ctx.fill();
        }
        // Ambient node halo (always on, dim)
        const ambR = n.isQuantum ? 18 : 10;
        const ambA = (n.isQuantum ? 0.07 : 0.04) + n.glow * 0.22;
        const ag = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, ambR + n.glow * 16);
        ag.addColorStop(0, `rgba(255,255,255,${ambA + n.glow * 0.25})`);
        ag.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = ag;
        ctx.beginPath(); ctx.arc(n.x, n.y, ambR + n.glow * 16, 0, Math.PI * 2); ctx.fill();
        // Core dot
        ctx.fillStyle = `rgba(240,236,230,${0.55 + n.glow * 0.45})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + n.glow * 2, 0, Math.PI * 2); ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W * 0.68, cy = H * 0.44;
      const fog = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.4);
      fog.addColorStop(0, "rgba(240,236,230,0.04)");
      fog.addColorStop(1, "rgba(240,236,230,0)");
      ctx.fillStyle = fog; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            ctx.strokeStyle = `rgba(240,236,230,${(1 - d / CONNECT) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(240,236,230,0.5)";
        ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onVis = () => { if (reduce) return; if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(frame); };

    resize();
    if (reduce) drawStatic(); else raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="lattice" aria-hidden="true" />;
}

