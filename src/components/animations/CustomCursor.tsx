"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth springs for cursor movement
  const cursorX = useSpring(0, { damping: 25, stiffness: 300, mass: 0.5 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Interactive elements
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select');
      
      // Special project cards
      const projectCard = target.closest('[data-cursor="view"]');
      
      if (projectCard) {
        setIsHovering(true);
        setHoverText("VIEW");
      } else if (isInteractive) {
        setIsHovering(true);
        setHoverText("");
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleElementHover, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference flex items-center justify-center rounded-full bg-white"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          default: {
            width: 12,
            height: 12,
            opacity: 1,
          },
          hover: {
            width: hoverText ? 64 : 40,
            height: hoverText ? 64 : 40,
            opacity: 1,
            backgroundColor: hoverText ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.2)",
            mixBlendMode: "difference",
          }
        }}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {hoverText && (
          <span className="text-black text-[10px] font-bold tracking-widest mix-blend-normal">
            {hoverText}
          </span>
        )}
      </motion.div>
    </>
  );
};
