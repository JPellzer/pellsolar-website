import { useEffect, useRef } from "react";
import { Link } from "wouter";

const DARK_IMG = "/manus-storage/house-lights-off_9abbe8c2.png";
const LIT_IMG = "/manus-storage/house-lights-on_522fe704.png";

export default function SolarDemo() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Inject the original CSS
    const style = document.createElement("style");
    style.id = "solar-demo-styles";
    style.textContent = `
      :root {
        --solar: #F4A623;
        --battery: #44D7B6;
        --ev: #6C8EEF;
        --home: #FF7849;
        --peak-red: #EF4444;
        --offpeak-green: #22C55E;
        --bg: #060A12;
        --card: #0E1528;
        --card-b: rgba(255,255,255,0.05);
        --text: #E2E8F0;
        --dim: #94A3B8;
        --white: #F8FAFC;
      }
      #ps-solar-demo-page {
        background: var(--bg);
        color: var(--text);
        font-family: 'Inter', sans-serif;
        min-height: 100vh;
        padding: 0;
      }
      .hiw-hero {
        background: linear-gradient(135deg, #0a0f1e 0%, #0d1a2e 50%, #0a1520 100%);
        padding: 48px 24px 36px;
        text-align: center;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .hiw-hero-inner { max-width: 760px; margin: 0 auto; }
      .hiw-badge {
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(244,166,35,0.1); border: 1px solid rgba(244,166,35,0.25);
        border-radius: 20px; padding: 5px 14px; font-size: 0.72rem; font-weight: 600;
        letter-spacing: 0.08em; color: var(--solar); margin-bottom: 18px;
      }
      .hiw-badge-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: var(--solar); box-shadow: 0 0 8px var(--solar);
        animation: pulse-dot 2s ease-in-out infinite;
      }
      @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
      .hiw-hero h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800; line-height: 1.15; margin-bottom: 14px; color: #fff; }
      .hiw-hero h1 span { color: var(--solar); }
      .hiw-hero-p { color: var(--dim); font-size: 1rem; line-height: 1.65; max-width: 600px; margin: 0 auto 20px; }
      .hiw-hero-tags { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
      .hiw-tag {
        display: flex; align-items: center; gap: 5px; padding: 6px 14px;
        background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px; font-size: 0.78rem; color: var(--text);
      }
      .sol-demo-section { padding: 32px 24px 48px; }
      .sol-demo-section .wrap { max-width: 900px; margin: 0 auto; }
      .scene {
        position: relative; width: 100%; border-radius: 16px; overflow: hidden;
        border: 1px solid var(--card-b); background: #050505; margin-bottom: 14px;
      }
      .scene img { width: 100%; display: block; }
      .scene img.dark { position: relative; z-index: 1; transition: filter 1.5s ease; }
      .scene img.lit { position: absolute; top: 0; left: 0; z-index: 2; opacity: 0; transition: opacity 1.5s ease; }
      .scene img.lit.on { opacity: 1; }
      .sky-ov {
        position: absolute; top: 0; left: 0; width: 100%; height: 50%;
        pointer-events: none; z-index: 3; transition: all 1.5s; opacity: 0;
      }
      .sky-ov.sky-day { opacity: 1; background: linear-gradient(180deg, rgba(150,210,255,0.7) 0%, rgba(220,240,255,0.4) 40%, rgba(255,248,220,0.15) 70%, transparent 100%); }
      .sky-ov.sky-eve { opacity: 1; background: linear-gradient(180deg, rgba(255,140,50,0.15) 0%, rgba(200,100,60,0.08) 40%, transparent 100%); }
      .sky-ov.sky-night { opacity: 1; background: linear-gradient(180deg, rgba(10,10,30,0.4) 0%, rgba(10,10,30,0.15) 50%, transparent 100%); }
      .sky-ov.sky-blackout { opacity: 1; background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 100%); }
      .sun {
        position: absolute; top: 0%; right: 11%; width: 100px; height: 100px;
        z-index: 4; pointer-events: none; opacity: 0; transition: opacity 1.2s;
      }
      .sun.vis { opacity: 1; }
      .sun-inner {
        width: 100%; height: 100%; border-radius: 50%;
        background: radial-gradient(circle, #FFFDE7 0%, #FFD54F 25%, #F4A623 55%, rgba(244,166,35,0) 100%);
        animation: sunb 4s ease-in-out infinite;
      }
      .sun::after {
        content: ''; position: absolute; inset: -80px; border-radius: 50%;
        background: radial-gradient(circle, rgba(255,250,200,0.45) 0%, rgba(255,230,120,0.2) 40%, transparent 65%);
      }
      @keyframes sunb { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
      .moon {
        position: absolute; top: 4%; left: 14%; width: 36px; height: 36px;
        z-index: 4; pointer-events: none; opacity: 0; transition: opacity 1.2s;
      }
      .moon.vis { opacity: 1; }
      .moon-c {
        width: 100%; height: 100%; border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, #EAEAEA 0%, #C8C8C8 50%, #999 100%);
        box-shadow: 0 0 25px rgba(200,215,240,0.3);
      }
      .moon-sh {
        position: absolute; top: -2px; right: -1px; width: 28px; height: 28px;
        border-radius: 50%; background: rgba(6,10,18,0.88);
      }
      .stars {
        position: absolute; top: 0; left: 0; width: 100%; height: 45%;
        z-index: 3; pointer-events: none; opacity: 0; transition: opacity 1.2s;
      }
      .stars.vis { opacity: 1; }
      .st {
        position: absolute; width: 1.5px; height: 1.5px; background: #fff;
        border-radius: 50%; animation: tw 3s ease-in-out infinite;
      }
      @keyframes tw { 0%,100%{opacity:0.1} 50%{opacity:0.6} }
      .tbadge {
        position: absolute; top: 12px; left: 12px; z-index: 15;
        padding: 6px 14px; border-radius: 8px; background: rgba(0,0,0,0.82);
        backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1);
        font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 500;
        display: flex; align-items: center; gap: 8px; opacity: 0; transition: opacity 0.5s;
      }
      .tbadge.on { opacity: 1; }
      .tbd { width: 7px; height: 7px; border-radius: 50%; }
      .tbd-off { background: var(--offpeak-green); box-shadow: 0 0 6px var(--offpeak-green); }
      .tbd-pk { background: var(--peak-red); box-shadow: 0 0 6px var(--peak-red); }
      .tbd-all { background: var(--ev); box-shadow: 0 0 6px var(--ev); }
      .tbd-em { background: #EF4444; box-shadow: 0 0 6px #EF4444; animation: pulse-em 1s ease-in-out infinite; }
      @keyframes pulse-em { 0%,100%{opacity:1} 50%{opacity:0.4} }
      .evp {
        position: absolute; top: 58%; left: 78%; width: 2.5%; height: 3%;
        border-radius: 50%; background: radial-gradient(circle, rgba(108,142,239,0.8) 0%, transparent 80%);
        box-shadow: 0 0 14px var(--ev); pointer-events: none; opacity: 0;
        transition: opacity 0.7s; z-index: 5;
      }
      .evp.on { opacity: 1; }
      .msg-ov {
        position: absolute; bottom: 3%; left: 50%; transform: translateX(-50%); z-index: 12;
        padding: 14px 24px; border-radius: 12px; background: rgba(0,0,0,0.85);
        backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.12);
        max-width: 88%; width: auto; text-align: center;
        opacity: 0; transition: opacity 0.6s; pointer-events: none;
      }
      .msg-ov.on { opacity: 1; }
      .msg-ov .mt {
        font-size: 0.9rem; font-weight: 700; color: #fff; margin-bottom: 5px;
        display: flex; align-items: center; justify-content: center; gap: 8px;
      }
      .msg-ov .mt .md { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
      .msg-ov .mb { font-size: 0.78rem; color: #CBD5E1; line-height: 1.6; }
      .msg-ov .mb strong { color: #fff; font-weight: 600; }
      .prog-bar {
        position: absolute; bottom: 0; left: 0; width: 100%; height: 3px;
        z-index: 13; background: rgba(255,255,255,0.05);
      }
      .prog-fill { height: 100%; width: 0%; transition: width linear; border-radius: 0 2px 2px 0; }
      .fx { position: absolute; inset: 0; z-index: 8; pointer-events: none; }
      .ctrl-row {
        display: flex; align-items: center; justify-content: center;
        gap: 12px; margin-bottom: 10px; flex-wrap: wrap;
      }
      .play-btn {
        padding: 8px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12);
        background: var(--card); color: var(--white); font-family: 'Inter', sans-serif;
        font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.3s;
        display: flex; align-items: center; gap: 6px;
      }
      .play-btn:hover { border-color: rgba(255,255,255,0.25); transform: translateY(-1px); }
      .play-btn.playing { border-color: var(--solar); background: rgba(244,166,35,0.12); color: var(--solar); }
      .step-dots { display: flex; gap: 8px; align-items: center; }
      .sd {
        width: 10px; height: 10px; border-radius: 50%;
        background: rgba(255,255,255,0.12); transition: all 0.4s; cursor: pointer;
      }
      .sd-s { background: var(--solar); box-shadow: 0 0 8px var(--solar); }
      .sd-e { background: var(--ev); box-shadow: 0 0 8px var(--ev); }
      .sd-b { background: var(--battery); box-shadow: 0 0 8px var(--battery); }
      .sd-h { background: var(--home); box-shadow: 0 0 8px var(--home); }
      .ctrls {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 14px;
      }
      @media(max-width:750px) { .ctrls { grid-template-columns: repeat(2, 1fr); } }
      @media(max-width:420px) { .ctrls { grid-template-columns: 1fr; } }
      .cbtn {
        display: flex; align-items: center; gap: 12px; padding: 14px 16px;
        background: var(--card); border: 1.5px solid var(--card-b); border-radius: 12px;
        cursor: pointer; transition: all 0.3s; font-family: 'Inter', sans-serif;
        color: var(--text); text-align: left;
      }
      .cbtn:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-1px); }
      .ci {
        width: 42px; height: 42px; border-radius: 50%; display: flex;
        align-items: center; justify-content: center; font-size: 1.1rem;
        flex-shrink: 0; transition: all 0.3s;
      }
      .ci-s { background: rgba(244,166,35,0.1); }
      .ci-b { background: rgba(68,215,182,0.1); }
      .ci-e { background: rgba(108,142,239,0.1); }
      .ci-h { background: rgba(255,120,73,0.1); }
      .cbt { display: flex; flex-direction: column; gap: 1px; }
      .ct { font-size: 0.82rem; font-weight: 600; }
      .cs2 { font-size: 0.63rem; color: var(--dim); }
      .cbtn.a-solar { border-color: var(--solar); background: linear-gradient(135deg, rgba(244,166,35,0.1), transparent); box-shadow: 0 4px 20px rgba(244,166,35,0.12); }
      .cbtn.a-solar .ci { background: rgba(244,166,35,0.25); box-shadow: 0 0 12px rgba(244,166,35,0.25); }
      .cbtn.a-battery { border-color: var(--battery); background: linear-gradient(135deg, rgba(68,215,182,0.1), transparent); box-shadow: 0 4px 20px rgba(68,215,182,0.12); }
      .cbtn.a-battery .ci { background: rgba(68,215,182,0.25); box-shadow: 0 0 12px rgba(68,215,182,0.25); }
      .cbtn.a-ev { border-color: var(--ev); background: linear-gradient(135deg, rgba(108,142,239,0.1), transparent); box-shadow: 0 4px 20px rgba(108,142,239,0.12); }
      .cbtn.a-ev .ci { background: rgba(108,142,239,0.25); box-shadow: 0 0 12px rgba(108,142,239,0.25); }
      .cbtn.a-home { border-color: var(--home); background: linear-gradient(135deg, rgba(255,120,73,0.1), transparent); box-shadow: 0 4px 20px rgba(255,120,73,0.12); }
      .cbtn.a-home .ci { background: rgba(255,120,73,0.25); box-shadow: 0 0 12px rgba(255,120,73,0.25); }
      .info {
        background: var(--card); border: 1px solid var(--card-b); border-radius: 14px;
        padding: 24px 32px; min-height: 100px; overflow: hidden;
        word-wrap: break-word; overflow-wrap: break-word; max-width: 100%; box-sizing: border-box;
      }
      .info-empty {
        display: flex; align-items: center; justify-content: center;
        min-height: 80px; color: var(--dim); font-size: 0.9rem; gap: 8px;
      }
      .info-empty .arr { animation: bob 1.5s ease-in-out infinite; }
      @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
      .ititle { font-size: 1.15rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
      .ititle .id { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
      .id-s { background: var(--solar); box-shadow: 0 0 8px var(--solar); }
      .id-b { background: var(--battery); box-shadow: 0 0 8px var(--battery); }
      .id-e { background: var(--ev); box-shadow: 0 0 8px var(--ev); }
      .id-h { background: var(--home); box-shadow: 0 0 8px var(--home); }
      .itime {
        font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; font-weight: 500;
        padding: 5px 12px; border-radius: 6px; display: inline-block; margin-bottom: 12px;
      }
      .itime-off { background: rgba(34,197,94,0.12); color: var(--offpeak-green); border: 1px solid rgba(34,197,94,0.2); }
      .itime-pk { background: rgba(239,68,68,0.12); color: var(--peak-red); border: 1px solid rgba(239,68,68,0.2); }
      .itime-all { background: rgba(108,142,239,0.12); color: var(--ev); border: 1px solid rgba(108,142,239,0.2); }
      .itime-em { background: rgba(239,68,68,0.12); color: var(--peak-red); border: 1px solid rgba(239,68,68,0.3); }
      .info p { color: #CBD5E1; font-size: 0.95rem; line-height: 1.75; margin-bottom: 8px; }
      .info p strong { color: #fff; font-weight: 700; }
      .stats { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
      .pill {
        display: flex; align-items: center; gap: 5px; padding: 8px 14px;
        background: rgba(255,255,255,0.04); border-radius: 8px;
        font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;
        border: 1px solid rgba(255,255,255,0.04);
      }
      .pill .v { font-weight: 600; color: #fff; }
      .pill .l { color: #CBD5E1; }
      .foot { text-align: center; margin-top: 20px; font-size: 0.7rem; color: var(--dim); }
      .foot a { color: var(--solar); text-decoration: none; }
      .hiw-cta {
        background: linear-gradient(135deg, #0d1a2e 0%, #0a1520 100%);
        padding: 60px 24px; text-align: center;
        border-top: 1px solid rgba(255,255,255,0.06);
      }
      .hiw-cta h2 { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 800; color: #fff; margin-bottom: 12px; }
      .hiw-cta-sub { color: var(--dim); font-size: 1rem; margin-bottom: 28px; max-width: 500px; margin-left: auto; margin-right: auto; }
      .hiw-cta-btn {
        display: inline-block; padding: 16px 36px; background: var(--solar);
        color: #1a1a2e; font-weight: 800; font-size: 1rem; border-radius: 30px;
        text-decoration: none; transition: all 0.3s; letter-spacing: 0.03em;
      }
      .hiw-cta-btn:hover { background: #ffe06a; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(244,166,35,0.4); }
      .solar-demo-back {
        display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px;
        background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
        border-radius: 8px; color: var(--text); font-size: 0.82rem; font-weight: 500;
        text-decoration: none; transition: all 0.2s; margin: 20px 24px 0;
      }
      .solar-demo-back:hover { background: rgba(255,255,255,0.08); }
    `;
    document.head.appendChild(style);

    // Initialize stars
    const starsEl = document.getElementById("starsEl");
    if (starsEl && starsEl.children.length === 0) {
      for (let i = 0; i < 40; i++) {
        const d = document.createElement("div");
        d.className = "st";
        d.style.left = Math.random() * 100 + "%";
        d.style.top = Math.random() * 100 + "%";
        d.style.animationDelay = Math.random() * 4 + "s";
        const sz = 1 + Math.random() * 1.5;
        d.style.width = sz + "px";
        d.style.height = sz + "px";
        starsEl.appendChild(d);
      }
    }

    // Canvas setup
    const cvs = document.getElementById("fx") as HTMLCanvasElement;
    if (!cvs) return;
    const ctx = cvs.getContext("2d")!;
    let W = 0, H = 0;

    function rsz() {
      const r = cvs.parentElement!.getBoundingClientRect();
      if (r.width === 0) return;
      cvs.width = r.width;
      cvs.height = r.height;
      W = cvs.width;
      H = cvs.height;
    }
    // Run immediately and also after images load
    rsz();
    window.addEventListener("resize", rsz);
    // Re-run after images load in case they affect layout
    const darkImg = document.getElementById("darkImg") as HTMLImageElement;
    if (darkImg) {
      if (darkImg.complete) { rsz(); } 
      else { darkImg.addEventListener("load", rsz); }
    }
    // Fallback: re-run after a short delay to catch any layout shifts
    const rszTimer = setTimeout(() => rsz(), 300);

    const C = {
      s: [244, 166, 35] as [number, number, number],
      b: [68, 215, 182] as [number, number, number],
      h: [255, 120, 73] as [number, number, number],
      e: [108, 142, 239] as [number, number, number],
    };

    function rga(c: [number, number, number], a: number) {
      return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    }

    const SUN = { x: 0.84, y: 0.04 };
    const PANELS = { x: 0.548, y: 0.299 };
    const EPANEL = { x: 0.359, y: 0.555 };
    const PW = { x: 0.433, y: 0.555 };
    const WC = { x: 0.515, y: 0.555 };
    const CAR = { x: 0.799, y: 0.596 };
    const HOME = { x: 0.249, y: 0.452 };

    type Point = { x: number; y: number };
    type Dot = { t: number; sp: number };
    type PathEntry = { pts: Point[]; col: [number, number, number]; dots: Dot[] };

    function drawPath(points: Point[], color: [number, number, number], dots: Dot[]) {
      if (points.length < 2) return;
      const segs: { sx: number; sy: number; ex: number; ey: number; len: number }[] = [];
      let totalLen = 0;
      for (let i = 1; i < points.length; i++) {
        const dx = (points[i].x - points[i - 1].x) * W;
        const dy = (points[i].y - points[i - 1].y) * H;
        const len = Math.sqrt(dx * dx + dy * dy);
        segs.push({ sx: points[i - 1].x, sy: points[i - 1].y, ex: points[i].x, ey: points[i].y, len });
        totalLen += len;
      }
      // Glow
      ctx.beginPath();
      ctx.moveTo(points[0].x * W, points[0].y * H);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x * W, points[i].y * H);
      ctx.strokeStyle = rga(color, 0.10);
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      // Mid line
      ctx.beginPath();
      ctx.moveTo(points[0].x * W, points[0].y * H);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x * W, points[i].y * H);
      ctx.strokeStyle = rga(color, 0.4);
      ctx.lineWidth = 3;
      ctx.stroke();
      // Core line
      ctx.beginPath();
      ctx.moveTo(points[0].x * W, points[0].y * H);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x * W, points[i].y * H);
      ctx.strokeStyle = rga(color, 0.7);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // Dots
      dots.forEach((d) => {
        d.t += d.sp;
        if (d.t > 1) d.t -= 1;
        const dist = d.t * totalLen;
        let accum = 0, x = 0, y = 0;
        for (let i = 0; i < segs.length; i++) {
          if (accum + segs[i].len >= dist) {
            const f = (dist - accum) / segs[i].len;
            x = (segs[i].sx + f * (segs[i].ex - segs[i].sx)) * W;
            y = (segs[i].sy + f * (segs[i].ey - segs[i].sy)) * H;
            break;
          }
          accum += segs[i].len;
        }
        const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
        g.addColorStop(0, rga(color, 0.5));
        g.addColorStop(0.4, rga(color, 0.12));
        g.addColorStop(1, rga(color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rga(color, 0.85);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.92)";
        ctx.beginPath();
        ctx.arc(x, y, 2.8, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    let activePaths: PathEntry[] = [];

    function addPath(pts: Point[], col: [number, number, number], n: number, sp: number) {
      const dots: Dot[] = [];
      for (let i = 0; i < n; i++) dots.push({ t: i / n, sp: sp || 0.004 });
      activePaths.push({ pts, col, dots });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      activePaths.forEach((p) => drawPath(p.pts, p.col, p.dots));
      requestAnimationFrame(draw);
    }
    draw();

    const MODES = ["solar", "ev", "battery", "home"];
    const STEP_DUR = 10000;

    const STAGES: Record<string, any> = {
      solar: {
        btn: "a-solar", sun: 1, moon: 0, stars: 0, lit: 1, evp: 0,
        sky: "sky-day", darkFilter: "brightness(5.5) contrast(1.05) saturate(1.4)",
        badge: '<span class="tbd tbd-off"></span>OFF-PEAK · 7:00 AM – 4:00 PM',
        progColor: "var(--solar)",
        overlay: {
          title: "☀️ Solar Panels — Free Electricity All Day",
          body: "Your panels generate free power from sunrise to sunset. Excess energy is <strong>stored in your Powerwall</strong> so you're covered when rates spike at 4pm. We build your system <strong>25% bigger than your usage</strong> to make sure you're fully covered under NEM 3.0.",
          color: "var(--solar)",
        },
        paths: [
          { pts: [SUN, PANELS], col: C.s, n: 4, sp: 0.005 },
          { pts: [PANELS, { x: PW.x, y: PANELS.y }, PW], col: C.s, n: 3, sp: 0.005 },
          { pts: [PW, EPANEL], col: C.b, n: 2, sp: 0.006 },
          { pts: [EPANEL, { x: EPANEL.x, y: HOME.y }, HOME], col: C.h, n: 3, sp: 0.004 },
        ],
        dot: "id-s", timeCls: "itime-off", timeText: "OFF-PEAK · 7:00 AM – 4:00 PM",
        title: "Solar Panels — How Your System Works",
        body: "<p>Your solar panels start producing electricity as soon as the sun comes up. Production follows a <strong>bell curve</strong> — it starts low in the morning, ramps up to full power by midday, then tapers off as the sun sets. In January the sun is lower and production is less. By summer, the sun is directly overhead and your system hits its maximum output.</p><p>We design your system at <strong>125% of your annual consumption</strong>. Why? Under <strong>NEM 3.0</strong>, you no longer get the 1-to-1 credit you used to get with NEM 2.0. Building the system bigger ensures you produce enough to fully offset your bill.</p><p>During the day, solar powers your home first. <strong>Excess energy charges your Powerwall battery</strong> so it's ready for tonight's peak hours (4pm–9pm) when SCE rates hit up to <strong>$0.58/kWh</strong>. This is the key to eliminating your electric bill.</p>",
        stats: [{ v: "125%", l: "system oversized" }, { v: "$0.24/kWh", l: "off-peak rate" }, { v: "$0.58/kWh", l: "peak rate (4-9pm)" }, { v: "NEM 3.0", l: "billing program" }],
      },
      ev: {
        btn: "a-ev", sun: 1, moon: 0, stars: 0, lit: 1, evp: 1,
        sky: "sky-day", darkFilter: "brightness(5.5) contrast(1.05) saturate(1.4)",
        badge: '<span class="tbd tbd-off"></span>OFF-PEAK · Charge Smart',
        progColor: "var(--ev)",
        overlay: {
          title: "⚡ Tesla Charging — Drive on Sunshine",
          body: "<strong>NEVER charge your Tesla 4pm–9pm</strong> — it costs 3x more! Charge with solar during the day for <strong>FREE</strong>, or off-peak after 9pm at just ~$0.07/mile.",
          color: "var(--ev)",
        },
        paths: [
          { pts: [SUN, PANELS], col: C.s, n: 3, sp: 0.005 },
          { pts: [PANELS, { x: PW.x, y: PANELS.y }, PW], col: C.s, n: 2, sp: 0.005 },
          { pts: [PW, EPANEL], col: C.e, n: 2, sp: 0.005 },
          { pts: [EPANEL, { x: EPANEL.x, y: WC.y }, WC, CAR], col: C.e, n: 4, sp: 0.004 },
        ],
        dot: "id-e", timeCls: "itime-off", timeText: "OFF-PEAK · Before 4 PM or After 9 PM",
        title: "Tesla Charging — The Rules That Save You Money",
        body: "<p><strong>The #1 rule: never charge your car between 4pm–9pm.</strong> That's the most expensive window of the day — SCE charges up to $0.58/kWh during peak hours. Charging at the wrong time can cost you <strong>3x more per mile</strong>.</p><p><strong>Best time to charge:</strong> During the day when your solar panels are producing free electricity, or after 9pm when super off-peak rates kick in (~$0.16/kWh).</p><p><strong>Important — if the power goes out, do not charge your car.</strong> Your Tesla charges on a 50-amp circuit and will drain your Powerwall battery very quickly. During an outage, your battery needs to keep the essential things in your home running — not charge a car.</p>",
        stats: [{ v: "$0.00", l: "solar charging" }, { v: "$0.16/kWh", l: "super off-peak" }, { v: "$0.58/kWh", l: "peak (NEVER)" }, { v: "50 amps", l: "car draws" }],
      },
      battery: {
        btn: "a-battery", sun: 0, moon: 1, stars: 1, lit: 1, evp: 0,
        sky: "sky-eve", darkFilter: "brightness(1)",
        badge: '<span class="tbd tbd-pk"></span>PEAK · 4:00 PM – 9:00 PM · UP TO $0.58/kWh',
        progColor: "var(--battery)",
        overlay: {
          title: "🔋 Powerwall 3 — Running Your Home Off Battery",
          body: "It's <strong>4pm–9pm</strong> — the most expensive part of the day. Your Powerwall is <strong>running your entire home on stored solar energy</strong> so you're not buying a single kWh from SCE. We don't export power back to the grid — <strong>every bit goes to your home</strong>.",
          color: "var(--battery)",
        },
        paths: [
          { pts: [PW, EPANEL], col: C.b, n: 3, sp: 0.005 },
          { pts: [EPANEL, { x: EPANEL.x, y: HOME.y }, HOME], col: C.h, n: 3, sp: 0.004 },
        ],
        dot: "id-b", timeCls: "itime-pk", timeText: "PEAK · 4:00 PM – 9:00 PM",
        title: "Powerwall 3 — Peak Hour Protection",
        body: "<p>Every day from <strong>4pm to 9pm</strong>, SCE charges the highest rates — up to <strong>$0.58/kWh</strong>. Your Powerwall discharges the free solar energy it stored during the day, running your home entirely off battery. <strong>We do not use export mode</strong> — every kWh goes straight to your home, not back to the grid. Under NEM 3.0, exporting doesn't make financial sense.</p><p><strong>How many batteries do you need?</strong> It depends on what you're running. If you're keeping it to lights, plugs, and everyday essentials, <strong>one Powerwall (13.5 kWh)</strong> can get you through 4–9pm. If you're running air conditioning and major appliances during peak, you'll likely need <strong>two batteries</strong>.</p><p>The goal is simple: <strong>use zero grid power from 4pm to 9pm</strong>. If you see a charge on your bill at the end of the month, it usually means the battery didn't quite make it all the way through peak — and that's when we discuss adding a second Powerwall.</p>",
        stats: [{ v: "$0.58/kWh", l: "SCE peak rate" }, { v: "$0.00", l: "your cost" }, { v: "13.5 kWh", l: "per battery" }, { v: "1 or 2", l: "batteries needed" }],
      },
      home: {
        btn: "a-home", sun: 0, moon: 1, stars: 1, lit: 0, evp: 0,
        sky: "sky-blackout", darkFilter: "brightness(0.6)",
        badge: '<span class="tbd tbd-em"></span>GRID DOWN · BACKUP ACTIVE',
        progColor: "var(--home)",
        overlay: {
          title: "🏠 Power Outage — Your Home Stays On",
          body: "The grid goes down. Your <strong>Powerwall kicks on instantly</strong> — lights, fridge, WiFi, everything stays running. <strong>Monitor your battery level in the Tesla app</strong> and conserve energy if the outage may last a while. During the day, your solar panels recharge the battery.",
          color: "var(--home)",
        },
        paths: [
          { pts: [PW, EPANEL], col: C.b, n: 3, sp: 0.005 },
          { pts: [EPANEL, { x: EPANEL.x, y: HOME.y }, HOME], col: C.h, n: 3, sp: 0.004 },
        ],
        dot: "id-h", timeCls: "itime-em", timeText: "GRID DOWN · EMERGENCY BACKUP",
        title: "Whole Home Backup — When the Grid Fails",
        body: "<p>When the power goes out, your Powerwall <strong>automatically disconnects from the grid and takes over in milliseconds</strong>. Your home stays running — lights, refrigerator, WiFi, garage door, plugs, everything.</p><p><strong>The key during an outage: watch your battery level in the Tesla app.</strong> If the outage might last a while, be smart about what you're running. Turn off big appliances like AC and the dryer to stretch your battery longer. If it's daytime, your solar panels will continue recharging the battery.</p><p><strong>For customers who never want to worry about it:</strong> We install <strong>4 or more Powerwalls</strong> so you can run everything — AC, appliances, all of it — without thinking twice. For most families, <strong>1–2 batteries</strong> will keep the essentials running through a typical outage. It's all about what gives you peace of mind.</p>",
        stats: [{ v: "Instant", l: "switchover" }, { v: "1-2", l: "batteries for essentials" }, { v: "4+", l: "batteries for everything" }, { v: "Solar", l: "recharges by day" }],
      },
    };

    let autoTimer: ReturnType<typeof setTimeout> | null = null;
    let autoPlaying = false;
    let autoIdx = 0;

    function toggleAuto() {
      if (autoPlaying) stopAuto();
      else startAuto();
    }

    function startAuto() {
      autoPlaying = true;
      const btn = document.getElementById("playBtn");
      if (btn) { btn.textContent = "⏸ Pause"; btn.classList.add("playing"); }
      autoIdx = 0;
      runStep();
    }

    function stopAuto() {
      autoPlaying = false;
      if (autoTimer) clearTimeout(autoTimer);
      const btn = document.getElementById("playBtn");
      if (btn) { btn.textContent = "▶ Watch the Full Day"; btn.classList.remove("playing"); }
      const pf = document.getElementById("progFill");
      if (pf) { pf.style.transition = "none"; pf.style.width = "0%"; }
    }

    function runStep() {
      if (!autoPlaying) return;
      go(MODES[autoIdx]);
      const pf = document.getElementById("progFill");
      if (pf) {
        pf.style.transition = "none"; pf.style.width = "0%";
        pf.style.background = STAGES[MODES[autoIdx]].progColor;
        setTimeout(() => { pf.style.transition = `width ${STEP_DUR - 200}ms linear`; pf.style.width = "100%"; }, 50);
      }
      for (let i = 0; i < 4; i++) {
        const sd = document.getElementById("sd" + i);
        if (sd) {
          sd.className = "sd";
          if (i === autoIdx) sd.classList.add("on", "sd-" + ["s", "e", "b", "h"][i]);
        }
      }
      autoIdx = (autoIdx + 1) % 4;
      autoTimer = setTimeout(runStep, STEP_DUR);
    }

    function goManual(idx: number) {
      stopAuto();
      for (let i = 0; i < 4; i++) {
        const sd = document.getElementById("sd" + i);
        if (sd) { sd.className = "sd"; if (i === idx) sd.classList.add("on", "sd-" + ["s", "e", "b", "h"][i]); }
      }
      go(MODES[idx]);
    }

    function go(m: string) {
      reset2();
      const d = STAGES[m];
      const btn = document.querySelector(`[data-m="${m}"]`);
      if (btn) btn.classList.add(d.btn);
      const darkImg = document.getElementById("darkImg") as HTMLImageElement;
      const litImg = document.getElementById("litImg") as HTMLImageElement;
      if (darkImg) darkImg.style.filter = d.darkFilter;
      if (d.lit && litImg) litImg.classList.add("on");
      const skyOv = document.getElementById("skyOv");
      if (skyOv) skyOv.className = "sky-ov " + d.sky;
      if (d.sun) document.getElementById("sun")?.classList.add("vis");
      if (d.moon) document.getElementById("moon")?.classList.add("vis");
      if (d.stars) document.getElementById("starsEl")?.classList.add("vis");
      const tb = document.getElementById("tb");
      if (tb) { tb.innerHTML = d.badge; tb.classList.add("on"); }
      if (d.evp) document.getElementById("evp")?.classList.add("on");
      const ov = document.getElementById("msgOv");
      const msgT = document.getElementById("msgT");
      const msgB = document.getElementById("msgB");
      if (msgT) msgT.innerHTML = `<span class="md" style="background:${d.overlay.color};box-shadow:0 0 8px ${d.overlay.color}"></span>${d.overlay.title}`;
      if (msgB) msgB.innerHTML = d.overlay.body;
      if (ov) ov.classList.add("on");
      activePaths = [];
      d.paths.forEach((p: any) => addPath(p.pts, p.col, p.n, p.sp));
      const sh = d.stats.map((s: any) => `<div class="pill"><span class="v">${s.v}</span><span class="l">${s.l}</span></div>`).join("");
      const info = document.getElementById("info");
      if (info) info.innerHTML = `<div class="ititle"><span class="id ${d.dot}"></span>${d.title}</div><div class="itime ${d.timeCls}">${d.timeText}</div>${d.body}<div class="stats">${sh}</div>`;
      if (m === "home") {
        if (litImg) litImg.classList.remove("on");
        if (darkImg) darkImg.style.filter = "brightness(0.3)";
        if (skyOv) skyOv.className = "sky-ov sky-blackout";
        if (ov) ov.classList.remove("on");
        activePaths = [];
        setTimeout(() => {
          if (litImg) litImg.classList.add("on");
          if (darkImg) darkImg.style.filter = "brightness(0.6)";
          if (ov) ov.classList.add("on");
          STAGES.home.paths.forEach((p: any) => addPath(p.pts, p.col, p.n, p.sp));
        }, 3000);
      }
    }

    function reset2() {
      activePaths = [];
      document.querySelectorAll(".cbtn").forEach((b) => { (b as HTMLElement).className = "cbtn"; });
      const litImg = document.getElementById("litImg");
      const darkImg = document.getElementById("darkImg") as HTMLImageElement;
      if (litImg) litImg.classList.remove("on");
      if (darkImg) darkImg.style.filter = "brightness(1)";
      document.getElementById("tb")?.classList.remove("on");
      document.getElementById("sun")?.classList.remove("vis");
      document.getElementById("moon")?.classList.remove("vis");
      document.getElementById("starsEl")?.classList.remove("vis");
      document.getElementById("evp")?.classList.remove("on");
      const skyOv = document.getElementById("skyOv");
      if (skyOv) skyOv.className = "sky-ov";
      document.getElementById("msgOv")?.classList.remove("on");
    }

    // Expose functions to window for onclick handlers
    (window as any).toggleAuto = toggleAuto;
    (window as any).goManual = goManual;

    // Auto-start after 1.5s
    const startTimer = setTimeout(() => startAuto(), 1500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(rszTimer);
      if (autoTimer) clearTimeout(autoTimer);
      window.removeEventListener("resize", rsz);
      delete (window as any).toggleAuto;
      delete (window as any).goManual;
      const injectedStyle = document.getElementById("solar-demo-styles");
      if (injectedStyle) injectedStyle.remove();
    };
  }, []);

  return (
    <div id="ps-solar-demo-page">
      {/* Back nav */}
      <Link href="/" className="solar-demo-back">← Back</Link>

      {/* Hero */}
      <div className="hiw-hero">
        <div className="hiw-hero-inner">
          <div className="hiw-badge">
            <span className="hiw-badge-dot"></span> INTERACTIVE DEMO
          </div>
          <h1>How Your <span>Solar Home</span> Works</h1>
          <p className="hiw-hero-p">
            Watch a full day unfold on a Pell Solar home — from sunrise energy production to peak-hour battery protection to whole-home backup. This is exactly how we design every system.
          </p>
          <div className="hiw-hero-tags">
            <span className="hiw-tag"><span className="hiw-tag-icon">☀️</span> Solar Panels</span>
            <span className="hiw-tag"><span className="hiw-tag-icon">🔋</span> Powerwall 3</span>
            <span className="hiw-tag"><span className="hiw-tag-icon">⚡</span> EV Charging</span>
            <span className="hiw-tag"><span className="hiw-tag-icon">🏠</span> Backup Power</span>
          </div>
        </div>
      </div>

      {/* Demo */}
      <div className="sol-demo-section" id="ps-demo">
        <div className="wrap">
          <div className="scene" id="scene">
            <img decoding="async" className="dark" id="darkImg" src={DARK_IMG} alt="Solar home" />
            <img decoding="async" className="lit" id="litImg" src={LIT_IMG} alt="Solar home lit" />
            <div className="sky-ov" id="skyOv"></div>
            <div className="stars" id="starsEl"></div>
            <div className="sun" id="sun"><div className="sun-inner"></div></div>
            <div className="moon" id="moon"><div className="moon-c"></div><div className="moon-sh"></div></div>
            <div className="tbadge" id="tb"></div>
            <div className="evp" id="evp"></div>
            <div className="msg-ov" id="msgOv">
              <div className="mt" id="msgT"></div>
              <div className="mb" id="msgB"></div>
            </div>
            <div className="prog-bar"><div className="prog-fill" id="progFill"></div></div>
            <canvas className="fx" id="fx"></canvas>
          </div>

          <div className="ctrl-row">
            <button className="play-btn" id="playBtn" onClick={() => (window as any).toggleAuto?.()}>
              ▶ Watch the Full Day
            </button>
            <div className="step-dots">
              <div className="sd" id="sd0" onClick={() => (window as any).goManual?.(0)} title="Solar Panels"></div>
              <div className="sd" id="sd1" onClick={() => (window as any).goManual?.(1)} title="Tesla Charging"></div>
              <div className="sd" id="sd2" onClick={() => (window as any).goManual?.(2)} title="Powerwall"></div>
              <div className="sd" id="sd3" onClick={() => (window as any).goManual?.(3)} title="Whole Home Backup"></div>
            </div>
          </div>

          <div className="ctrls">
            <button className="cbtn" data-m="solar" onClick={() => (window as any).goManual?.(0)}>
              <div className="ci ci-s">☀️</div>
              <div className="cbt"><span className="ct">Solar Panels</span><span className="cs2">7am – 4pm · Off-Peak</span></div>
            </button>
            <button className="cbtn" data-m="ev" onClick={() => (window as any).goManual?.(1)}>
              <div className="ci ci-e">⚡</div>
              <div className="cbt"><span className="ct">Tesla Charging</span><span className="cs2">Off-Peak · Charge Smart</span></div>
            </button>
            <button className="cbtn" data-m="battery" onClick={() => (window as any).goManual?.(2)}>
              <div className="ci ci-b">🔋</div>
              <div className="cbt"><span className="ct">Powerwall 3</span><span className="cs2">4pm – 9pm · Peak Protection</span></div>
            </button>
            <button className="cbtn" data-m="home" onClick={() => (window as any).goManual?.(3)}>
              <div className="ci ci-h">🏠</div>
              <div className="cbt"><span className="ct">Whole Home Backup</span><span className="cs2">Grid Down · Battery Powered</span></div>
            </button>
          </div>

          <div className="info" id="info">
            <div className="info-empty">
              <span className="arr">☝️</span> Tap a button or press play to see your solar system in action
            </div>
          </div>

          <div className="foot">
            Built by <a href="https://pellsolar.com" target="_blank" rel="noreferrer">Pell Solar</a> — Southern California &amp; Idaho's Trusted Tesla Installer
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="hiw-cta">
        <h2>Ready to See What Solar Can Do for Your Home?</h2>
        <p className="hiw-cta-sub">Get a free consultation and see why homeowners across California and Idaho trust Pell Solar.</p>
        <a href="/get-quote" className="hiw-cta-btn">GET YOUR FREE CONSULTATION</a>
      </div>
    </div>
  );
}
