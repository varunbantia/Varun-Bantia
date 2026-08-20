"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { portfolioData } from "@/data/portfolio";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const codeSnippet = `const idea = "Build";\nconst product = idea + "SomethingGreat";`;

  useEffect(() => {
    let frame: number;
    const handleMouseMove = (e: MouseEvent) => {
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePosition({ x, y });
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(codeSnippet.slice(0, index));
      index++;
      if (index > codeSnippet.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [codeSnippet]);

  return (
    <section 
      id="home" 
      className="relative flex flex-col justify-center min-h-screen pt-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none perspective-[1000px]">
        {/* Glow orb */}
        <motion.div
          animate={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]"
        />
        
        {/* Abstract 3D Cards */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute hidden md:block w-40 h-40 border border-white/5 rounded-2xl glass"
            style={{
              top: `${20 + i * 20}%`,
              right: `${15 + (i % 2) * 10}%`,
              opacity: 0.3,
            }}
            animate={{
              rotateX: mousePosition.y * 30 * (i % 2 === 0 ? 1 : -1),
              rotateY: mousePosition.x * 30 * (i % 2 === 0 ? -1 : 1),
              x: mousePosition.x * 50 * (i + 1),
              y: mousePosition.y * 50 * (i + 1),
            }}
            transition={{ type: "spring", stiffness: 30, damping: 40 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Content */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          <AnimatedText 
            text={portfolioData.hero.headline} 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] mb-6"
            el="h1"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-10"
          >
            {portfolioData.hero.subline}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a 
              href="#projects" 
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors"
            >
              Let's Build Something
            </a>
          </motion.div>
        </div>

        {/* Code Snippet terminal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="lg:col-span-4 self-center lg:justify-self-end w-full max-w-md hidden lg:block"
        >
          <div className="glass-hover rounded-2xl p-6 border border-white/10 font-mono text-sm leading-relaxed text-white/80 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-10 border-b border-white/5 flex gap-2 items-center px-4 bg-white/5 rounded-t-2xl">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <pre className="pt-10 whitespace-pre-wrap selection:bg-white/20">
              <code dangerouslySetInnerHTML={{
                __html: typedText
                  .replace(/const/g, '<span class="text-blue-400">const</span>')
                  .replace(/"Build"/g, '<span class="text-green-300">"Build"</span>')
                  .replace(/"SomethingGreat"/g, '<span class="text-green-300">"SomethingGreat"</span>')
              }} />
              <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
