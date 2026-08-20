"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { useRef } from "react";
import { AnimatedText } from "@/components/animations/AnimatedText";

const TimelineItem = ({ item, index }: { item: any; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  
  // Transform for the connecting line fill
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Transform for opacity and sliding in
  const opacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const xOffset = index % 2 === 0 ? -50 : 50;
  const x = useTransform(scrollYProgress, [0.4, 1], [xOffset, 0]);

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center min-h-[30vh]">
      {/* Left Content (Desktop Left) */}
      <motion.div 
        style={{ opacity, x: index % 2 === 0 ? x : 0 }}
        className={`flex flex-col ${index % 2 === 0 ? 'text-right items-end hidden md:flex' : 'col-start-3 text-left items-start hidden'}`}
      >
        {index % 2 === 0 && (
          <div className="p-8 rounded-3xl glass w-full max-w-md border border-white/5 shadow-2xl relative group hover:border-white/20 transition-colors">
            <h4 className="text-2xl font-bold tracking-tight mb-2">{item.title}</h4>
            <div className="text-white/50 text-sm font-mono mb-4">{item.company} | {item.date}</div>
            <p className="text-white/70 leading-relaxed">{item.description}</p>
          </div>
        )}
      </motion.div>

      {/* Middle Timeline Line & Node */}
      <div className="flex flex-col items-center h-full relative col-start-1 md:col-start-2 px-4 md:px-0 mt-8 md:mt-0">
        {/* Background Line */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/10" />
        
        {/* Animated Fill Line */}
        <motion.div 
          className="absolute top-0 bottom-0 w-[2px] bg-white origin-top shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          style={{ scaleY: lineScaleY }}
        />
        
        {/* Node */}
        <motion.div 
          className="w-8 h-8 rounded-full border border-white bg-black z-10 flex items-center justify-center mt-12 md:mt-8"
          style={{ 
            boxShadow: useTransform(scrollYProgress, [0.8, 1], ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.5)"]),
            backgroundColor: useTransform(scrollYProgress, [0.8, 1], ["#000", "#fff"])
          }}
        >
          <motion.div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: useTransform(scrollYProgress, [0.8, 1], ["#fff", "#000"]) }}
          />
        </motion.div>
      </div>

      {/* Right Content / Mobile Uniform Alignment */}
      <motion.div 
        style={{ opacity, x: index % 2 !== 0 ? x : 0 }}
        className={`flex flex-col col-start-2 md:col-start-3 text-left items-start`}
      >
        <div className={`p-6 md:p-8 rounded-3xl glass w-full max-w-md border border-white/5 shadow-2xl relative group hover:border-white/20 transition-colors ${index % 2 === 0 ? 'md:hidden' : ''}`}>
          <h4 className="text-xl md:text-2xl font-bold tracking-tight mb-2">{item.title}</h4>
          <div className="text-white/50 text-xs md:text-sm font-mono mb-4">{item.company} | {item.date}</div>
          <p className="text-white/70 leading-relaxed text-sm md:text-base">{item.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 px-6 md:px-12 bg-[#020202]">
      <div className="max-w-5xl mx-auto">
        <AnimatedText 
          text="Experience" 
          el="h2" 
          className="text-4xl md:text-7xl font-bold tracking-tight mb-20 text-center" 
        />
        
        <div className="flex flex-col pt-10 pb-20">
          {portfolioData.experience.map((exp, idx) => (
            <TimelineItem key={exp.id} item={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
