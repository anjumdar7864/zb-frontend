import React, { useRef, useEffect } from "react";

// Pixel-snapper (use whole pixels for fills)
const snap = (n) => Math.round(n);

// Rounded rect fill with radius clamped to width/height
const roundRect = (ctx, x, y, width, height, radius) => {
  const w = Math.max(0, width);
  const h = Math.max(0, height);
  const r = Math.max(0, Math.min(radius, Math.floor(Math.min(w, h) / 2)));

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
  ctx.fill();
};

export default function HorizontalBarChart({
  labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jan", "Feb", "Mar", "Apr", "May"],
  data = [1, 2, 1000, 5, 0, 1, 2, 1000, 5, 0],
  colors = [],
  width = 700,
  height = 300,
  barHeight = 30,
  gap = 16,
  minBarWidth = 10,
  minWidthThreshold = 1,
  padding = { top: 24, right: 24, bottom: 24, left: 140 },
  borderRadius = 4,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const dpr = window.devicePixelRatio || 1;
    const rows = data.length;
    const logicalHeight = labels?.length < 4 ? height :
      padding.top + padding.bottom + rows * (barHeight + gap) - gap;
   
    // Ensure the backing store is DPR scaled but we draw in CSS pixels
    canvas.width = snap(width * dpr);
    canvas.height = snap(logicalHeight * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${logicalHeight}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels

    // Optional: this only affects images, but harmless to keep tidy
    ctx.imageSmoothingEnabled = false;

    ctx.clearRect(0, 0, width, logicalHeight);

    // Keep label font crisp—use whole pixel font size and integer baselines
    ctx.font = "14px Arial, sans-serif";
    ctx.textBaseline = "middle";

    const maxValue = Math.max(1, ...data);
    const chartWidth = width - padding.left - padding.right;

    data.forEach((value, i) => {
      // Snap Y and height to integers
      const y = snap(padding.top + i * (barHeight + gap));
      const h = snap(barHeight);

      // Compute width, then snap
      let w = (value / maxValue) * chartWidth;
      if (value >= minWidthThreshold && w > 0 && w < minBarWidth) w = minBarWidth;
      if (value <= 0) w = 0;
      w = snap(w);

      // Skip drawing zero-width bars (prevents tiny anti-aliased slivers)
      if (w > 0) {
        ctx.fillStyle = colors[i] || "rgba(75, 192, 192, 0.7)";
        // Snap X too
        const x = snap(padding.left);
        // Clamp radius per bar width/height to avoid over-rounded ends (causes blur)
        const r = Math.min(borderRadius, Math.floor(Math.min(w, h) / 2));
        roundRect(ctx, x, y, w, h, r);
      }

      // Label
      ctx.fillStyle = "#111";
      const labelY = snap(y + h / 2); // snap text baseline to an integer
      ctx.fillText(labels[i] ?? "", 12, labelY);

      // Value text
      const text = String(value);
      const textWidth = ctx.measureText(text).width;
      let xText = snap(padding.left + w + 6);

      if (xText + textWidth > width - padding.right) {
        xText = snap(padding.left + Math.max(w - textWidth - 6, 6));
        ctx.fillStyle = "#fff";
      } else {
        ctx.fillStyle = "#111";
      }
      ctx.fillText(text, xText, labelY);
    });
  }, [
    labels,
    data,
    colors,
    width,
    barHeight,
    gap,
    minBarWidth,
    minWidthThreshold,
    padding,
    borderRadius,
  ]);

  return <canvas ref={canvasRef} />;
}
