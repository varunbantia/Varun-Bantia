"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ElementType } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: ElementType;
  once?: boolean;
}

export function AnimatedText({ 
  text, 
  className, 
  el: Wrapper = "p", 
  once = true 
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  const defaultAnimations = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9] as any,
      },
    },
  };

  return (
    <Wrapper ref={ref} className={cn("", className)}>
      <motion.span
        className="inline-block"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
          hidden: {},
        }}
      >
        {text.split(" ").map((word, wordIndex) => (
          <span className="inline-block overflow-hidden pb-1" key={`${word}-${wordIndex}`}>
            <motion.span
              className="inline-block"
              variants={defaultAnimations}
            >
              {word}
            </motion.span>
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
}
