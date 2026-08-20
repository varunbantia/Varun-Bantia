"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { useRef } from "react";
import { AnimatedText } from "@/components/animations/AnimatedText";

const ProjectShowcase = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.9, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 1, 1, 0.1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="relative w-full py-24 flex flex-col justify-center mb-16 md:mb-24 last:mb-0 border-b border-white/10"
    >
      <div className="flex flex-col gap-8 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <span className="text-sm font-mono tracking-widest text-white/50 uppercase">0{index + 1}</span>
          <span className="w-12 h-px bg-white/20" />
          <span className="text-sm font-medium text-white/50 tracking-wide">{project.category}</span>
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter"
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium"
        >
          {project.description}
        </motion.p>

        {project.details && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="text-lg text-white/50 leading-relaxed"
          >
            {project.details}
          </motion.p>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3 mt-6"
        >
          {project.tech.map((tech: string) => (
            <span key={tech} className="px-4 py-2 text-sm font-medium border border-white/10 rounded-full bg-white/5 text-white/90">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <AnimatedText 
          text="Selected Work" 
          el="h2" 
          className="text-4xl md:text-7xl font-bold tracking-tight mb-20 md:mb-32" 
        />
        
        <div className="flex flex-col">
          {portfolioData.projects.map((project, idx) => (
            <ProjectShowcase key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
