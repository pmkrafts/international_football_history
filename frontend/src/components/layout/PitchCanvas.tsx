import { useEffect, useRef } from "react";

export default function PitchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawPitch(ctx, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function drawPitch(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#1F2A1F";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.4;

    // Outer border
    const margin = 40;
    ctx.strokeRect(margin, margin, w - margin * 2, h - margin * 2);

    // Halfway line
    ctx.beginPath();
    ctx.moveTo(w / 2, margin);
    ctx.lineTo(w / 2, h - margin);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 60, 0, Math.PI * 2);
    ctx.stroke();

    // Center spot
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#1F2A1F";
    ctx.fill();

    // Penalty areas
    const penaltyWidth = 120;
    const penaltyHeight = 300;
    ctx.strokeRect(margin, h / 2 - penaltyHeight / 2, penaltyWidth, penaltyHeight);
    ctx.strokeRect(w - margin - penaltyWidth, h / 2 - penaltyHeight / 2, penaltyWidth, penaltyHeight);

    // Goal boxes
    const goalBoxWidth = 50;
    const goalBoxHeight = 120;
    ctx.strokeRect(margin, h / 2 - goalBoxHeight / 2, goalBoxWidth, goalBoxHeight);
    ctx.strokeRect(w - margin - goalBoxWidth, h / 2 - goalBoxHeight / 2, goalBoxWidth, goalBoxHeight);

    ctx.globalAlpha = 1;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ willChange: "transform" }}
    />
  );
}
