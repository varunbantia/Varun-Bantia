"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { AnimatedText } from "@/components/animations/AnimatedText";

export function AboutSection() {
  const { about } = portfolioData;
  
  return (
    <section id="about" className="relative py-32 px-6 md:px-12 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <AnimatedText 
            text={about.headline} 
            el="h2" 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-8" 
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-white/70 leading-relaxed max-w-lg"
          >
            <p className="text-xl text-white font-medium">
              {about.philosophy}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {about.focus.map((item, i) => (
                <span key={i} className="px-4 py-2 rounded-full glass text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:ml-auto w-full max-w-2xl">
          {about.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`p-10 rounded-3xl glass-hover flex flex-col justify-center border border-white/5 shadow-2xl relative overflow-hidden ${
                i === 2 ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 text-6xl md:text-7xl font-bold tracking-tighter text-white mb-4">
                {stat.value}
              </div>
              <div className="relative z-10 text-white/40 font-mono uppercase tracking-widest text-xs">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
