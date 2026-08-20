"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { AnimatedText } from "@/components/animations/AnimatedText";

export function ContactSection() {
  const { contact } = portfolioData;

  return (
    <section id="contact" className="relative pt-32 pb-12 px-6 md:px-12 bg-[#020202] overflow-hidden flex flex-col justify-between min-h-screen">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center items-center text-center mt-20">
        
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="w-24 h-24 rounded-full bg-white/5 blur-2xl mb-12 flex items-center justify-center relative animate-pulse-slow"
        >
          <div className="w-8 h-8 rounded-full bg-white/30 blur-md absolute" />
        </motion.div>

        <AnimatedText 
          text={contact.headline} 
          el="h2" 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 max-w-4xl leading-[1.1]" 
        />
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-3xl text-white/60 max-w-3xl leading-relaxed mb-16"
        >
          {contact.subline}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href={`mailto:${contact.email}`}
            className="px-12 py-6 bg-white text-black font-bold tracking-wide rounded-full text-lg hover:scale-105 transition-transform inline-block group relative"
          >
            Start a Conversation
            <span className="absolute inset-0 rounded-full ring-4 ring-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </div>

      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
        className="w-full mt-32 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12"
      >
        <div className="flex items-center gap-6">
          <div className="font-black text-2xl tracking-tighter relative group cursor-default">
            VB
            <div className="absolute inset-0 bg-white blur-xl opacity-0 hover:opacity-20 transition-opacity duration-1000" />
          </div>
          <span className="text-white/30 text-sm font-medium">© 2026 Varun Banthia</span>
        </div>

        <div className="flex flex-wrap gap-8 items-center text-sm font-medium tracking-wide">
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors relative group">
            Github
            <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors relative group">
            LinkedIn
            <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors relative group">
            Instagram
            <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </a>
        </div>
      </motion.footer>
    </section>
  );
}
