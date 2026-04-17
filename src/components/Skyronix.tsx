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
  const aspectClass = data.aspectRatio === '9/16' ? 'aspect-[9/16]' : data.aspectRatio === '4/5' ? 'aspect-[4/5]' : 'aspect-square';

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectClass} bg-[#f5f5f5] overflow-hidden flex flex-col font-sans transition-all duration-500`}
      id="skyronix-template"
    >
      {/* Luxurious Background with Deep Golden and Aqua Tones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Intense Golden/Aqua Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c121d] via-[#004d4d] to-[#0c121d]" />
        
        {/* Glow Effects */}
        <div className="absolute top-[5%] right-[5%] w-96 h-96 bg-gold-primary/30 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-aqua-primary/20 rounded-full blur-[120px] opacity-40" />
        
        {/* Decorative Golden Elements */}
        <div className="absolute top-0 left-0 w-64 h-96 bg-gradient-to-b from-gold-primary/40 to-transparent blur-3xl -rotate-12 translate-x-[-30%]" />
        <div className="absolute top-0 right-0 w-64 h-96 bg-gradient-to-b from-gold-primary/40 to-transparent blur-3xl rotate-12 translate-x-[30%]" />

        {/* Dynamic Light Rays */}
        <div className="absolute top-[-20%] left-[50%] w-[200%] h-[150%] bg-gradient-to-b from-white/10 to-transparent blur-[100px] -translate-x-1/2 rotate-[35deg]" />

        {/* Sparkle pattern */}
        <div className="absolute inset-0 opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle, #ffd700 1.5px, transparent 1.5px)', 
          backgroundSize: '40px 40px' 
        }} />
      </div>

      {/* Main Content Area - Better vertical distribution */}
      <div className="flex-1 px-12 pt-12 pb-4 flex flex-col items-center justify-around relative z-10 overflow-hidden">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center space-y-2 mb-4 w-full"
        >
          <h1 className={`font-display font-black text-white drop-shadow-[0_2px_10px_rgba(255,215,0,0.3)] tracking-tight
            ${data.aspectRatio === '9/16' ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'}`}>
            {data.title || "Innovation & Strategy"}
          </h1>
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto" />
          <p className="text-lg font-medium text-white/90 max-w-lg mx-auto leading-tight">
            {data.subHeadline || "Advancing digital frontiers with intelligence"}
          </p>
        </motion.div>

        {/* Strategic Cards - Smart Adaptive Layout */}
        <div className={`w-full grid gap-6 transition-all duration-500 my-auto
          ${!data.points || data.points.length === 0 ? 'hidden' : 
            data.points.length === 1 ? 'grid-cols-1 max-w-lg mx-auto' : 
            data.points.length === 2 ? 'grid-cols-2 max-w-4xl mx-auto' : 
            data.points.length === 3 ? 'grid-cols-3' : 
            'grid-cols-2'}`}>
          {data.points?.map((point, index) => {
            const Icon = IconMap[point.iconType] || Shield;
            const isGold = index % 2 !== 0; // Alternate motifs
            
            const isSingle = data.points?.length === 1;
            const isPortrait = data.aspectRatio === '9/16' || data.aspectRatio === '4/5';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative rounded-3xl p-6 pt-10 shadow-2xl border border-white/20 group overflow-hidden
                  ${isGold ? 'bg-gradient-to-br from-gold-primary to-gold-dark' : 'bg-gradient-to-br from-[#006666] to-[#004d4d]'}
                  ${isSingle ? 'py-16' : ''}
                  ${isPortrait && !isSingle ? 'py-10' : ''}`}
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
                    ${isSingle ? 'text-4xl' : 'text-xl'}`}>
                    {point.title}
                  </h3>
                  <p className={`text-sm leading-relaxed font-medium
                    ${isGold ? 'text-black/80' : 'text-white/80'}
                    ${isSingle ? 'text-lg max-w-sm mx-auto' : 'text-xs'}`}>
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
            className="w-full bg-black/40 backdrop-blur-md py-4 px-8 rounded-xl border-l-4 border-gold-primary shadow-2xl mt-4 mb-2 flex items-center justify-center text-center max-w-4xl"
          >
            <p className="text-white font-display font-bold text-lg md:text-xl">
              {data.summary}
            </p>
          </motion.div>
        )}
      </div>

      {/* Profile Footer Section - Reference Image Matching Style */}
      <div className="relative z-20 mx-10 mb-10 min-h-[8rem] md:min-h-[10rem] h-auto bg-[#0c121d] rounded-[2.5rem] border-2 border-white/10 p-6 md:p-8 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4 md:gap-6 min-w-0 py-2">
          <div className="relative shrink-0">
            {/* Elegant Ring Accents */}
            <div className="absolute inset-[-6px] rounded-full border border-aqua-primary/30" />
            <div className="absolute inset-[-3px] rounded-full border-2 border-gold-primary rotate-45" />
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-transparent overflow-hidden relative shadow-2xl bg-neutral-800">
              {data.userImage ? (
                <img src={data.userImage} alt={data.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-neutral-500 font-bold uppercase">Photo</div>
              )}
            </div>
            {/* Status Badge */}
            <div className="absolute -bottom-1 -right-1 bg-gold-primary rounded-full p-1.5 md:p-2 text-black shadow-lg border-2 border-[#0c121d]">
              <CheckCircle2 size={12} className="md:w-4 md:h-4" strokeWidth={4} />
            </div>
          </div>
          
          <div className="flex flex-col min-w-0">
             <div className="flex items-center gap-2">
                <h3 className="text-2xl md:text-3xl font-display font-black text-white italic tracking-tighter uppercase leading-none whitespace-nowrap">
                  {data.name || "Hamid Ullah"}
                </h3>
                <Award size={20} className="text-gold-primary shrink-0 md:w-6 md:h-6" />
             </div>
             <p className="text-aqua-primary font-black text-[10px] md:text-[13px] uppercase tracking-tighter mt-2 opacity-90 leading-tight">
                {data.description || "Digital Marketing Expert with Ai integration"}
             </p>
          </div>
        </div>

        {/* Brand Side Branding - Custom Logo Replacement */}
        <div className="flex items-center ml-4 shrink-0">
          {data.brandLogo ? (
            <div className="h-16 md:h-24 w-auto max-w-[120px] md:max-w-[150px] flex items-center justify-center">
              <img src={data.brandLogo} alt="Brand" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-end text-right">
                 <span className="text-[8px] md:text-[10px] text-white/40 uppercase tracking-[0.4em] font-black opacity-80 mb-1">
                   Authorized by
                 </span>
                 <div className="flex flex-col leading-none">
                   <span className="text-gold-primary font-display font-black text-xl md:text-2xl select-none tracking-tighter uppercase whitespace-nowrap">
                     SKYRONIX
                   </span>
                   <span className="text-aqua-primary text-[8px] md:text-[10px] font-black tracking-widest uppercase opacity-80">
                     Artificial Intelligence
                   </span>
                 </div>
              </div>
            </>
          )}
          {/* Vertical Separator */}
          <div className="w-[3px] h-12 bg-aqua-primary ml-4 md:ml-5 rounded-full shadow-[0_0_10px_rgba(0,242,255,0.4)]" />
        </div>
      </div>
    </div>
  );
}
