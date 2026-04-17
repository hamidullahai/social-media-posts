import React from 'react';
import { motion } from 'motion/react';
import { SkyronixData } from '../types';
import { CheckCircle2, Award } from 'lucide-react';

interface Props {
  data: SkyronixData;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function Skyronix({ data, containerRef }: Props) {
  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square bg-neutral-950 overflow-hidden flex flex-col font-sans"
      id="skyronix-template"
    >
      {/* Background with abstract shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-aqua-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-gold-primary/10 rounded-full blur-[120px]" />
      </div>

      {/* Content Area */}
      <div className="flex-1 p-12 flex flex-col justify-center items-center text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-6"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="h-1 w-12 bg-aqua-primary" />
             <span className="uppercase tracking-[0.3em] text-aqua-primary text-xs font-bold">Exclusive Insight</span>
             <div className="h-1 w-12 bg-aqua-primary" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-aqua-primary to-gold-primary">
            {data.content || "Empowering Your Digital Presence with AI"}
          </h2>
        </motion.div>
      </div>

      {/* Profile Footer Section */}
      <div className="relative z-20 h-44 bg-black/60 backdrop-blur-xl border-t border-white/10 p-8 flex items-center justify-between mx-6 mb-6 rounded-2xl border-l border-r border-b shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gold-primary rounded-full blur-xl opacity-30 scale-125" />
            <div className="w-24 h-24 rounded-full border-2 border-aqua-primary overflow-hidden relative shadow-2xl">
              {data.userImage ? (
                <img src={data.userImage} alt={data.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xs text-neutral-500">Photo</div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-aqua-primary rounded-full p-2 text-black shadow-lg">
              <CheckCircle2 size={16} strokeWidth={3} />
            </div>
          </div>
          
          <div className="space-y-1">
             <div className="flex items-center gap-2">
                <h3 className="text-2xl font-display font-black text-white tracking-tight">{data.name || "Hamid Ullah"}</h3>
                <Award size={20} className="text-gold-primary fill-gold-primary/20" />
             </div>
             <p className="text-aqua-primary font-bold text-xs uppercase tracking-[2px]">
               {data.description || "Digital Marketing Expert with AI Integration"}
             </p>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end gap-2 text-right">
           <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Innovation Partner</div>
           <div className="text-gold-primary font-display font-bold text-lg select-none">SKYRONIX</div>
        </div>
      </div>
    </div>
  );
}
