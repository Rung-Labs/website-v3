import React, { useEffect, useRef } from "react";

export const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];

    // Configuration
    const particleCount = 35;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
      opacity: number;
      fadeSpeed: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Horizontal "rung" shape
        this.width = Math.random() * 80 + 20;
        this.height = Math.random() * 3 + 1;
        this.speed = Math.random() * 0.4 + 0.1;
        this.opacity = 0;
        this.fadeSpeed = Math.random() * 0.008 + 0.002;
        // White/Cyan tint for visibility on dark background
        this.color = Math.random() > 0.5 ? "255, 255, 255" : "186, 230, 253";
      }

      reset() {
        this.y = height + 50;
        this.x = Math.random() * width;
        this.opacity = 0;
      }

      update() {
        this.y -= this.speed;

        // Fade in then out logic
        if (this.y > height - 150) {
          if (this.opacity < 0.4) this.opacity += this.fadeSpeed;
        } else if (this.y < 200) {
          this.opacity -= this.fadeSpeed;
        } else {
          if (this.opacity < 0.4) this.opacity += this.fadeSpeed;
        }

        if (this.y < -50 || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        // Use rect instead of roundRect for better performance on some browsers, or polyfill
        // But most modern browsers support roundRect.
        if (ctx.roundRect) {
          ctx.roundRect(this.x, this.y, this.width, this.height, 4);
        } else {
          ctx.rect(this.x, this.y, this.width, this.height);
        }

        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        // Add a slight glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // RADIAL GRADIENT: Dark Center -> Light Edges (Black/White)
      // Center (darkest point): Near Black
      // Edges (lightest point): Light Gray/White
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.85
      );

      // We want the CENTER to be the DARKEST point.
      gradient.addColorStop(0, "#0a0a0a"); // Near Black Center
      gradient.addColorStop(0.3, "#1a1a1a"); // Dark Gray
      gradient.addColorStop(0.7, "#4a4a4a"); // Medium Gray
      gradient.addColorStop(1, "#e5e5e5"); // Light Gray/White Edges

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines (White, very transparent)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;

      // Vertical Grid
      for (let i = 0; i < width; i += 120) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }

      // Horizontal Grid
      for (let j = 0; j < height; j += 120) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }

      // Update and draw Rung particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);

    canvas.width = width;
    canvas.height = height;
    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
};
