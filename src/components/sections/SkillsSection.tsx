"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { useState } from "react";
import { AnimatedText } from "@/components/animations/AnimatedText";

export function SkillsSection() {
  const { skills } = portfolioData;
  const categories = Object.keys(skills) as Array<keyof typeof skills>;
  
  const [activeCategory, setActiveCategory] = useState<keyof typeof skills | null>(null);

  return (
    <section id="skills" className="relative py-32 px-6 md:px-12 bg-[#020202]">
      <div className="max-w-7xl mx-auto">
        <AnimatedText 
          text="Technology Ecosystem" 
          el="h2" 
          className="text-4xl md:text-6xl font-bold tracking-tight mb-20 text-center" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onHoverStart={() => setActiveCategory(category)}
              onHoverEnd={() => setActiveCategory(null)}
              className={`p-8 rounded-3xl transition-all duration-500 border relative overflow-hidden ${
                activeCategory === category || activeCategory === null
                  ? "border-white/10 bg-white/5" 
                  : "border-transparent opacity-30 glass"
              }`}
            >
              <div 
                className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-opacity duration-500 -translate-y-1/2 translate-x-1/2 ${
                  activeCategory === category ? 'opacity-100 bg-white/10' : 'opacity-0'
                }`} 
              />

              <h3 className="relative z-10 text-sm font-mono tracking-widest uppercase mb-10 text-white/40">
                // {category}
              </h3>
              
              <div className="relative z-10 flex flex-col gap-6">
                {skills[category].map((skill, i) => (
                  <motion.div
                    key={skill}
                    whileHover={{ x: 10, color: "#fff" }}
                    className="text-xl md:text-2xl font-medium tracking-tight text-white/70 transition-colors flex items-center gap-3 cursor-default"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
