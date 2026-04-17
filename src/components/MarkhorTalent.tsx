import React from 'react';
import { motion } from 'motion/react';
import { MarkhorData } from '../types';
import { Facebook, Instagram, Linkedin, Twitter, Music2 } from 'lucide-react';

interface Props {
  data: MarkhorData;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function MarkhorTalent({ data, containerRef }: Props) {
  // Select aspect ratio class
  const aspectClass = data.aspectRatio === '9/16' ? 'aspect-[9/16]' : data.aspectRatio === '4/5' ? 'aspect-[4/5]' : 'aspect-square';

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
      className={`relative w-full ${aspectClass} bg-neutral-900 overflow-hidden shadow-2xl flex flex-col font-sans transition-all duration-300`}
      id="markhor-template"
    >
      {/* Top Section: Person Picture (Dynamic remaining space) */}
      <div className="relative flex-1 w-full overflow-hidden bg-neutral-800">
        {data.personImage ? (
          <img 
            src={data.personImage} 
            alt="Person" 
            className="absolute inset-0 w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
            Person Photo (Flex Space)
          </div>
        )}
        
        {/* Logos anchored to the image area */}
        <div className="absolute top-[8%] left-[8%] z-30">
          <div className="relative group">
            <div className="absolute inset-0 bg-aqua-primary/30 blur-xl rounded-full opacity-60 pointer-events-none" />
            <img 
              src={data.logo || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=200&h=200&auto=format&fit=crop"} 
              alt="Markhor Logo" 
              className="h-20 w-20 object-contain rounded-full border-2 border-aqua-primary/50 relative z-10 drop-shadow-2xl bg-black/40 p-1" 
            />
          </div>
        </div>

        <div className="absolute top-[8%] right-[8%] z-30">
          {data.topRightLogo && (
            <div className="relative group">
              <div className="absolute inset-0 bg-white/10 blur-lg rounded-full opacity-60 pointer-events-none" />
              <img 
                src={data.topRightLogo} 
                alt="Top Right Logo" 
                className="h-12 w-12 object-contain relative z-10 drop-shadow-xl" 
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Text and Social Media Logos (Dynamic height based on content) */}
      <div className="relative h-auto w-full bg-gradient-to-b from-white/10 via-black/95 to-black border-t border-white/10 flex flex-col items-center py-6 px-6 text-center overflow-hidden shrink-0">
        {/* Subtle top edge glow for the "white" effect */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px]" />
        
        <div className="w-full h-full flex flex-col items-center">
          {/* Content area: No scaling, natural flow */}
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-6 w-full"
          >
            <div className="text-white font-display font-black leading-[1.1] drop-shadow-2xl uppercase break-words px-2 text-xl md:text-2xl xl:text-3xl">
              {renderTextWithHighlights(data.content)}
            </div>
          </motion.div>

          {/* Social Media Icons: Positioned as a footer */}
          <div className="w-full flex items-center justify-center gap-4 mt-auto">
             {[
               { Icon: Facebook, color: 'bg-[#FBBF24]' },
               { Icon: Instagram, color: 'bg-[#FBBF24]' },
               { Icon: Linkedin, color: 'bg-[#FBBF24]' },
               { Icon: Twitter, color: 'bg-[#FBBF24]' },
               { Icon: Music2, color: 'bg-[#FBBF24]' }
             ].map((item, idx) => (
               <div 
                 key={idx} 
                 className={`${item.color} p-2 rounded-full text-black shadow-lg hover:scale-110 transition-transform cursor-pointer`}
               >
                 <item.Icon size={16} strokeWidth={3} />
               </div>
             ))}
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-aqua-primary" />
      </div>
    </div>
  );
}
