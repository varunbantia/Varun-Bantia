"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { Smartphone, Monitor, Server, Database, Network, Layout, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  mobile: Smartphone,
  web: Monitor,
  backend: Server,
  firebase: Database,
  api: Network,
  uiux: Layout
};

export function ServicesSection() {
  return (
    <section id="services" className="relative py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <AnimatedText 
          text="What I Build" 
          el="h2" 
          className="text-4xl md:text-7xl font-bold tracking-tight mb-20 md:mb-32 text-center" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.services.map((service, idx) => {
            const Icon = iconMap[service.id];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative p-10 rounded-[2.5rem] glass-hover border border-white/5 shadow-2xl overflow-hidden cursor-default"
              >
                {/* Magnetic-like gradient effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-start gap-12">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-white/30 font-mono tracking-widest text-sm">0{idx + 1}</span>
                    <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-white/50 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      {Icon && <Icon size={24} strokeWidth={1.5} />}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-white transition-colors text-white/90">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
