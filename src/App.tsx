import { useEffect, useRef, useState } from "react";
import "./App.css";

function GameCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    let mx = -300, my = -300, prevMx = -300, prevMy = -300;
    let scale = 0.95, targetScale = 0.95;
    let glow = 5, targetGlow = 5;
    let clickPulse = 0;
    let rafId: number;

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };

    const onMove = (e: MouseEvent) => {
      prevMx = mx; prevMy = my;
      mx = e.clientX; my = e.clientY;
      const dx = mx - prevMx, dy = my - prevMy;
      const spd = Math.sqrt(dx * dx + dy * dy);
      targetScale = 0.95 + Math.min(spd * 0.008, 0.18);
    };

    const onClick = () => { clickPulse = 1; };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) targetGlow = 16;
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) targetGlow = 5;
    };

    const drawCursor = (x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.moveTo(0, 0);    // tip
      ctx.lineTo(5, 24);   // bottom-left  (slanted left edge)
      ctx.lineTo(11, 15);  // notch apex   (triangular cut)
      ctx.lineTo(19, 12);  // bottom-right
      ctx.closePath();

      ctx.shadowColor = "rgba(201, 164, 94, 0.9)";
      ctx.shadowBlur = glow / scale;

      ctx.fillStyle = "rgba(7, 7, 7, 0.9)";
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#c9a45e";
      ctx.lineWidth = 2 / scale;
      ctx.lineJoin = "round";
      ctx.stroke();

      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      scale += (targetScale - scale) * 0.12;
      targetScale = 0.95 + (targetScale - 0.95) * 0.84;
      glow += (targetGlow - glow) * 0.1;

      if (clickPulse > 0) {
        scale *= 0.84 + clickPulse * 0.04;
        clickPulse -= 0.14;
      }

      if (mx > -200) drawCursor(mx, my);
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="game-cursor" aria-hidden="true" />;
}

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/HrishabhCodes",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/hrishabh-jain/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/hrishabh_hj",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/HrishabhCodes",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        aria-hidden="true"
      >
        <path d="M33.8092,34.8772,26.8725,41.814a5.7258,5.7258,0,0,1-8.1154,0L8.6127,31.67a5.726,5.726,0,0,1,0-8.1155L18.7571,13.41a5.7258,5.7258,0,0,1,8.1154,0L34.5,21.0373" />
        <path d="M18.7571,13.41,27.7647,4.5" />
        <path d="M19.5838,27.5918h21.49" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:hrishabh507@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

function App() {
  const [toast, setToast] = useState(false);

  const handleEmail = () => {
    navigator.clipboard.writeText("hrishabh507@gmail.com");
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  };

  return (
    <div className="page">
      <GameCursor />
      <div className="grain" aria-hidden="true" />
      <div className={`toast ${toast ? "toast--show" : ""}`} aria-live="polite">
        email copied to clipboard
      </div>

      <main className="content">
        <p className="greeting">Hey, I am</p>

        <h1 className="name">
          <span className="name-line">Hrishabh</span>
          <span className="name-line name-line--last">Jain</span>
        </h1>

        <div className="divider" aria-hidden="true" />

        <nav className="socials" aria-label="Social links">
          {socialLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              onClick={link.href.startsWith("mailto") ? handleEmail : undefined}
              className="social-link"
              aria-label={link.name}
              style={{ animationDelay: `${0.65 + i * 0.08}s` }}
            >
              <span className="social-icon">{link.icon}</span>
              <span className="social-name">{link.name}</span>
            </a>
          ))}
        </nav>
      </main>
    </div>
  );
}

export default App;
