//Codepen.io, 2018.
import React, { useEffect, useRef } from "react";

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
/*
References
Codepen.io. 2018. The shore shack — Beach sandwich bar menu #CodepenChallenge. (Version 1.0) [Source Code] Available at:< https://codepen.io/jerora98/details/KwNNyjg > [Accessed 12 October 2026].

*/