"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { AnimatedText } from "@/components/animations/AnimatedText";

export function DeveloperSection() {
  const [terminalHistory, setTerminalHistory] = useState([
    { cmd: "whoami", out: "Varun Banthia" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    
    const cmd = inputVal.trim().toLowerCase();
    let out = "Command not found. Try 'whoami', 'focus', 'stack', 'clear'.";
    
    if (cmd === "whoami") out = "Varun Banthia - Full Stack Developer.";
    else if (cmd === "focus") out = "Building digital products.";
    else if (cmd === "stack") out = "React Native • React • Node • Firebase";
    else if (cmd === "clear") {
      setTerminalHistory([]);
      setInputVal("");
      return;
    }
    
    setTerminalHistory(prev => [...prev, { cmd, out }]);
    setInputVal("");
  };

  useEffect(() => {
    if (terminalHistory.length > 1) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [terminalHistory]);

  return (
    <section id="developer" className="relative py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <AnimatedText 
            text="Behind the Interface" 
            el="h2" 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-12" 
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-6 md:p-8 rounded-3xl border border-white/5 font-mono text-sm md:text-base leading-loose shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <pre className="text-white/80 whitespace-pre-wrap selection:bg-white/20">
              <span className="text-purple-400">const</span> <span className="text-white">developer</span> = {"{\n"}
              {"  "}name: <span className="text-green-300">"Varun Banthia"</span>,{"\n"}
              {"  "}focus: [{"\n"}
              {"    "}<span className="text-green-300">"Mobile Development"</span>,{"\n"}
              {"    "}<span className="text-green-300">"Full Stack Development"</span>,{"\n"}
              {"    "}<span className="text-green-300">"Product Engineering"</span>{"\n"}
              {"  "}],{"\n"}
              {"  "}mindset: <span className="text-green-300">"Build. Test. Improve."</span>{"\n"}
              {"}"};
            </pre>
          </motion.div>
        </div>

        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="w-full flex justify-end"
        >
          <div className="w-full max-w-lg glass rounded-2xl border border-white/5 flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-[400px]">
            <div className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-white/[0.02]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-xs font-mono text-white/30 tracking-widest">GUEST -- BASH</div>
            </div>
            
            <div className="flex-1 p-6 font-mono text-sm overflow-y-auto flex flex-col gap-4 no-scrollbar relative" onClick={() => document.getElementById('terminal-input')?.focus()}>
              <div className="text-white/40 mb-2">Welcome to interactive terminal v1.0.0.</div>
              {terminalHistory.map((h, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex gap-3 text-white/70 items-center">
                    <span className="text-green-400 font-bold">$</span>
                    <span className="text-white">{h.cmd}</span>
                  </div>
                  <div className="text-white/50 pl-5">{h.out}</div>
                </div>
              ))}
              <form onSubmit={handleCommand} className="flex gap-3 text-white items-center">
                <span className="text-green-400 font-bold">$</span>
                <input 
                  id="terminal-input"
                  type="text" 
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white/90"
                  spellCheck={false}
                  placeholder="Try 'focus' or 'stack'"
                  autoComplete="off"
                />
              </form>
              <div ref={terminalEndRef} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
