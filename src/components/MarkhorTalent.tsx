import React from 'react';
import { motion } from 'motion/react';
import { MarkhorData } from '../types';
import { Facebook, Instagram, Linkedin, Twitter, Music2 } from 'lucide-react';

interface Props {
  data: MarkhorData;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function MarkhorTalent({ data, containerRef }: Props) {
  // Logic to parse potential highlights in format [word]
  const renderTextWithHighlights = (text: string) => {
    const parts = text.split(/(\[.*?\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const content = part.slice(1, -1);
        return (
          <span 
            key={index} 
            className="bg-aqua-primary text-black px-2 mx-1 inline-block transform skew-x-[-10deg] font-black"
          >
            <span className="inline-block transform skew-x-[10deg]">{content}</span>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/5] bg-neutral-900 overflow-hidden shadow-2xl flex flex-col justify-end"
      id="markhor-template"
    >
      {/* Background Image */}
      {data.personImage ? (
        <img 
          src={data.personImage} 
          alt="Person" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-neutral-500 bg-neutral-800">
          Upload Person Image
        </div>
      )}

      {/* Dark Overlay for Text Readability (darker at bottom) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10 opacity-90" />

      {/* Top Left Logo (2nd picture style) */}
      <div className="absolute top-8 left-8 z-30">
        {data.logo ? (
          <div className="relative group">
            <div className="absolute inset-0 bg-aqua-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src={data.logo} alt="Logo" className="h-28 w-28 object-contain relative z-10 drop-shadow-2xl" />
          </div>
        ) : (
          <div className="h-20 w-20 rounded-full border-4 border-aqua-primary bg-black/50 flex flex-col items-center justify-center text-center p-2">
             <span className="text-[10px] text-aqua-primary font-black leading-none">MARKHOR</span>
             <span className="text-[6px] text-white font-bold">TALENT HUB</span>
          </div>
        )}
      </div>

      {/* Top Right Logo (Optional) */}
      <div className="absolute top-8 right-8 z-30">
        {data.topRightLogo && (
          <div className="relative group">
            <div className="absolute inset-0 bg-white/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src={data.topRightLogo} alt="Top Right Logo" className="h-16 w-16 object-contain relative z-10 drop-shadow-xl" />
          </div>
        )}
      </div>

      {/* Content Content Container */}
      <div className="relative z-20 px-10 pb-12 w-full text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
        >
          <div className="text-white font-display font-black text-2xl md:text-3xl leading-[1.3] drop-shadow-lg uppercase">
            {renderTextWithHighlights(data.content)}
          </div>
        </motion.div>

        {/* Social Media Icons (matching the image) */}
        <div className="flex items-center justify-center gap-4 mt-6">
           {[
             { Icon: Facebook, color: 'bg-[#FBBF24]' },
             { Icon: Instagram, color: 'bg-[#FBBF24]' },
             { Icon: Linkedin, color: 'bg-[#FBBF24]' },
             { Icon: Twitter, color: 'bg-[#FBBF24]' },
             { Icon: Music2, color: 'bg-[#FBBF24]' }
           ].map((item, idx) => (
             <div 
               key={idx} 
               className={`${item.color} p-2.5 rounded-full text-black shadow-lg hover:scale-110 transition-transform cursor-pointer`}
             >
               <item.Icon size={18} strokeWidth={3} />
             </div>
           ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-aqua-primary z-30" />
    </div>
  );
}
