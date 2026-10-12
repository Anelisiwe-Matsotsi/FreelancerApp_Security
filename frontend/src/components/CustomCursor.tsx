import React, { useEffect, useRef } from "react";

// the teal dot + trailing ring from your original script
// (the grow-on-hover effect is already handled by your CSS with body:has(a:hover, button:hover))
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      frame = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
      // stay hidden until the mouse moves, so touch screens never show it
      dot.style.opacity = "1";
      ring.style.opacity = "";
    };

    // the ring eases toward the mouse a little each frame
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      frame = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div id='cur' ref={dotRef} style={{ opacity: 0 }} />
      <div id='cur-ring' ref={ringRef} style={{ opacity: 0 }} />
    </>
  );
};