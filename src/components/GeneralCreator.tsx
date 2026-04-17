import React from 'react';
import { motion } from 'motion/react';
import { GeneralData } from '../types';
import { Sparkles, MessageCircle, Image, Type } from 'lucide-react';

interface Props {
  data: GeneralData;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function GeneralCreator({ data, containerRef }: Props) {
  const getIcon = () => {
    switch (data.type) {
      case 'text': return <Type className="text-aqua-primary" />;
      case 'question': return <MessageCircle className="text-gold-primary" />;
      case 'picture': return <Image className="text-pink-400" />;
      default: return <Sparkles className="text-white" />;
    }
  };

  const getThemeColor = () => {
    switch (data.type) {
      case 'text': return 'border-aqua-primary';
      case 'question': return 'border-gold-primary';
      case 'picture': return 'border-pink-400';
      default: return 'border-white';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden flex flex-col p-10 font-sans border-8"
      id="general-template"
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
    >
      <div className={`absolute inset-0 border-[20px] ${getThemeColor()} opacity-10 pointer-events-none`} />
      
      <div className="flex-1 glass-card p-12 relative overflow-hidden flex flex-col justify-between rounded-2xl shadow-2xl backdrop-blur-3xl">
        <div className="flex items-center gap-5 mb-6">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
            {getIcon()}
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[4px] font-black text-white/40 mb-1">AI Generative Core</div>
            <div className="text-xs uppercase font-bold text-white/20">Module: {data.type} Synthesis</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {data.result ? (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="space-y-6"
             >
                <p className="text-2xl md:text-3xl font-display font-medium leading-relaxed italic text-white">
                  "{data.result}"
                </p>
                {data.imageResult && (
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src={data.imageResult} alt="Generated" className="w-full h-auto" referrerPolicy="no-referrer" />
                  </div>
                )}
             </motion.div>
          ) : (
            <div className="text-white/20 text-center font-display text-2xl">
              Type something and click Generate...
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-white/5 flex justify-between items-end">
          <div className="flex flex-col gap-1">
             <span className="text-[10px] text-white/30 uppercase tracking-widest font-black">Powered by</span>
             <span className="text-sm font-display font-bold">SOCIALSNAP STUDIO</span>
          </div>
          <div className="h-10 w-10 opacity-20 text-white">
             <Sparkles size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
