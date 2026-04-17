import React from 'react';
import { motion } from 'motion/react';
import { SkyronixData } from '../types';
import { CheckCircle2, Award, Shield, Gem, Star, Rocket, Check, Lightbulb, Youtube, Linkedin, Globe } from 'lucide-react';

interface Props {
  data: SkyronixData;
  containerRef: React.RefObject<HTMLDivElement>;
}

const IconMap = {
  shield: Shield,
  diamond: Gem,
  star: Star,
  rocket: Rocket,
  check: Check,
  lightbulb: Lightbulb
};

export default function Skyronix({ data, containerRef }: Props) {
  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square bg-[#f5f5f5] overflow-hidden flex flex-col font-sans"
      id="skyronix-template"
    >
      {/* Luxurious Background with Sparkles and Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Golden/Aqua Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fff7e6] via-[#e6fcfc] to-[#fff7e6]" />
        
        {/* Sparkling effects */}
        <div className="absolute top-[5%] right-[5%] w-64 h-64 bg-gold-primary/20 rounded-full blur-[80px]" />
        <div className="absolute top-[20%] left-[-10%] w-80 h-80 bg-aqua-primary/10 rounded-full blur-[100px]" />
        
        {/* Decorative Golden Leaves (Abstract) */}
        <div className="absolute top-0 left-0 w-32 h-64 bg-gradient-to-b from-gold-primary/30 to-transparent blur-2xl -rotate-12 translate-x-[-20%]" />
        <div className="absolute top-0 right-0 w-32 h-64 bg-gradient-to-b from-gold-primary/30 to-transparent blur-2xl rotate-12 translate-x-[20%]" />

        {/* Light Rays */}
        <div className="absolute top-[-50%] left-[50%] w-[200%] h-[100%] bg-white/20 blur-[120px] -translate-x-1/2 rotate-45" />

        {/* Subtle sparkle dots */}
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle, #ffd700 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-12 pt-16 flex flex-col items-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center space-y-2 mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-display font-black text-[#1a1a1a] tracking-tight">
            {data.title || "Innovation & Strategy"}
          </h1>
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto" />
          <p className="text-lg font-medium text-[#333] max-w-lg mx-auto leading-tight">
            {data.subHeadline || "Advancing digital frontiers with intelligence"}
          </p>
        </motion.div>

        {/* Strategic Cards - Smart Adaptive Layout */}
        <div className={`w-full grid gap-6 mb-10 transition-all duration-500
          ${!data.points || data.points.length === 0 ? 'hidden' : 
            data.points.length === 1 ? 'grid-cols-1 max-w-lg mx-auto' : 
            data.points.length === 2 ? 'grid-cols-2 max-w-4xl mx-auto' : 
            data.points.length === 3 ? 'grid-cols-3' : 
            'grid-cols-2'}`}>
          {data.points?.map((point, index) => {
            const Icon = IconMap[point.iconType] || Shield;
            const isGold = index % 2 !== 0; // Alternate motifs
            
            const isSingle = data.points?.length === 1;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative rounded-3xl p-8 pt-12 shadow-xl border border-white/40 group overflow-hidden
                  ${isGold ? 'bg-gradient-to-br from-gold-primary/95 to-gold-dark' : 'bg-gradient-to-br from-[#006666] to-[#004d4d]'}
                  ${isSingle ? 'py-16' : ''}`}
              >
                {/* Background light pattern inside card */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:20px_20px] pointer-events-none" />

                {/* floating Icon */}
                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl rotate-45 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-[225deg]
                  ${isGold ? 'bg-white text-gold-dark' : 'bg-gold-primary text-black'}`}>
                  <div className="-rotate-45 group-hover:rotate-[135deg] transition-transform duration-500">
                    <Icon size={32} />
                  </div>
                </div>

                <div className="text-center space-y-3 relative z-10">
                  <h3 className={`font-display font-black uppercase tracking-wide
                    ${isGold ? 'text-black' : 'text-white'}
                    ${isSingle ? 'text-4xl' : 'text-2xl'}`}>
                    {point.title}
                  </h3>
                  <p className={`text-sm leading-relaxed font-medium
                    ${isGold ? 'text-black/80' : 'text-white/80'}
                    ${isSingle ? 'text-lg max-w-sm mx-auto' : 'text-sm'}`}>
                    {point.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Statement */}
        {data.summary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-[#002b2b] py-4 px-8 rounded-xl border-l-4 border-gold-primary shadow-2xl mb-6 flex items-center justify-center text-center"
          >
            <p className="text-white font-display font-bold text-lg md:text-xl">
              {data.summary}
            </p>
          </motion.div>
        )}
      </div>

      {/* Profile Footer Section - Reference Image Matching Style */}
      <div className="relative z-20 mx-10 mb-10 h-40 bg-[#0c121d] rounded-[2.5rem] border-2 border-white/5 p-8 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="relative">
            {/* Elegant Ring Accents */}
            <div className="absolute inset-[-6px] rounded-full border border-aqua-primary/30" />
            <div className="absolute inset-[-3px] rounded-full border-2 border-gold-primary rotate-45" />
            <div className="w-24 h-24 rounded-full border-4 border-transparent overflow-hidden relative shadow-2xl">
              {data.userImage ? (
                <img src={data.userImage} alt={data.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xs text-neutral-500 font-bold uppercase">Image</div>
              )}
            </div>
            {/* Status Badge */}
            <div className="absolute -bottom-1 -right-1 bg-gold-primary rounded-full p-2 text-black shadow-lg border-2 border-[#0c121d]">
              <CheckCircle2 size={16} strokeWidth={4} />
            </div>
          </div>
          
          <div className="flex flex-col">
             <div className="flex items-center gap-2">
                <h3 className="text-4xl font-display font-black text-white italic tracking-tighter uppercase leading-none">
                  {data.name || "Hamid Ullah"}
                </h3>
                <Award size={24} className="text-gold-primary" />
             </div>
             <p className="text-aqua-primary font-black text-[13px] uppercase tracking-tighter mt-1 opacity-90">
               {data.description || "Digital Marketing Expert with Ai integration"}
             </p>
          </div>
        </div>

        {/* Brand Side Branding */}
        <div className="flex items-center">
          <div className="flex flex-col items-end text-right">
             <span className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-black opacity-80 mb-1">
               Authorized by
             </span>
             <div className="flex flex-col leading-none">
               <span className="text-gold-primary font-display font-black text-2xl select-none tracking-tighter uppercase">
                 SKYRONIX
               </span>
               <span className="text-aqua-primary text-[10px] font-black tracking-widest uppercase opacity-80">
                 Artificial Intelligence
               </span>
             </div>
          </div>
          {/* Vertical Separator */}
          <div className="w-[3px] h-12 bg-aqua-primary ml-5 rounded-full shadow-[0_0_10px_rgba(0,242,255,0.4)]" />
        </div>
      </div>
    </div>
  );
}
