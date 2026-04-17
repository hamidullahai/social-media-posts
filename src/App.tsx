import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Download, 
  Sparkles, 
  User, 
  Star, 
  Globe, 
  Image as ImageIcon,
  Save,
  Menu,
  X,
  Upload,
  RefreshCw
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { AppMode, MarkhorData, SkyronixData, GeneralData } from './types';
import MarkhorTalent from './components/MarkhorTalent';
import Skyronix from './components/Skyronix';
import GeneralCreator from './components/GeneralCreator';
import { generateAIText } from './lib/gemini';

export default function App() {
  const [mode, setMode] = useState<AppMode>('markhor');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Markhor State
  const [markhor, setMarkhor] = useState<MarkhorData>({
    personImage: null,
    content: "Meet [Noor Ul Ain]: Who help small Businesses to grow their sales & visibility through [social media and digital Marketing].",
    logo: null,
    topRightLogo: null,
    optionalTopText: ""
  });

  // Skyronix State
  const [skyronix, setSkyronix] = useState<SkyronixData>({
    userImage: null,
    name: "Hamid Ullah",
    description: "Digital Marketing Expert with Ai Integration",
    content: "Mastering the Art of AI in Digital Marketing"
  });

  // General State
  const [general, setGeneral] = useState<GeneralData>({
    type: 'text',
    input: '',
    result: '',
    imageResult: null
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (previewRef.current === null) return;
    setIsProcessing(true);
    try {
      const dataUrl = await toPng(previewRef.current, { quality: 1.0 });
      const link = document.createElement('a');
      link.download = `social-snapshot-${mode}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!general.input) return;
    setIsProcessing(true);
    const result = await generateAIText(`You are a creative social media assistant. Based on this prompt: "${general.input}", generate a short, high-impact, professional social media quote or insight suitable for a design template.`);
    setGeneral(prev => ({ ...prev, result }));
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-bg-dark text-neutral-100 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-80 glass-sidebar flex flex-col z-50 fixed inset-y-0 lg:relative"
          >
            <div className="p-10 pb-4">
              <div className="flex items-center gap-3 mb-10">
                <div className="h-10 w-10 border-4 border-aqua-primary rounded-xl flex items-center justify-center font-black text-aqua-primary">
                  S
                </div>
                <h1 className="text-2xl font-display font-extrabold tracking-tighter text-white">
                  SOCIAL<span className="text-aqua-primary">GEN</span>
                </h1>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setMode('markhor')}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${mode === 'markhor' ? 'nav-item-active text-white font-semibold' : 'hover:bg-white/5 text-neutral-400'}`}
                >
                  <Star size={20} className={mode === 'markhor' ? 'text-aqua-primary' : ''} />
                  <span>Markhor Talent</span>
                </button>
                <button 
                  onClick={() => setMode('skyronix')}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${mode === 'skyronix' ? 'nav-item-active text-white font-semibold' : 'hover:bg-white/5 text-neutral-400'}`}
                >
                  <Globe size={20} className={mode === 'skyronix' ? 'text-aqua-primary' : ''} />
                  <span>Skyronix AI</span>
                </button>
                <button 
                  onClick={() => setMode('general')}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${mode === 'general' ? 'nav-item-active text-white font-semibold' : 'hover:bg-white/5 text-neutral-400'}`}
                >
                  <Plus size={20} className={mode === 'general' ? 'text-aqua-primary' : ''} />
                  <span>General Mode</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 pt-2 custom-scrollbar">
              <div className="space-y-8">
                {/* Mode Specific Inputs */}
                {mode === 'markhor' && (
                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Canvas Settings</h3>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Content Text</span>
                        <textarea 
                          value={markhor.content}
                          onChange={(e) => setMarkhor({...markhor, content: e.target.value})}
                          className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all h-28"
                        />
                      </label>
                    </div>
                    
                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Asset Upload</h3>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Person Image</span>
                        <div className="mt-2 flex items-center justify-center h-32 w-full bg-black/20 border border-dashed border-white/10 rounded-xl hover:border-aqua-primary transition-colors relative cursor-pointer group overflow-hidden">
                          {markhor.personImage ? (
                            <img src={markhor.personImage} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-neutral-500">
                               <Upload size={24} />
                               <span className="text-[10px] uppercase font-bold tracking-widest">Select Image</span>
                            </div>
                          )}
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, (url) => setMarkhor({...markhor, personImage: url}))} />
                        </div>
                      </div>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Main Logo (Top Left)</span>
                        <input type="file" className="mt-2 block w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-white/10 file:text-white hover:file:bg-white/20" onChange={(e) => handleImageUpload(e, (url) => setMarkhor({...markhor, logo: url}))} />
                      </label>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Optional Logo (Top Right)</span>
                        <input type="file" className="mt-2 block w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-white/10 file:text-white hover:file:bg-white/20" onChange={(e) => handleImageUpload(e, (url) => setMarkhor({...markhor, topRightLogo: url}))} />
                      </label>
                    </div>
                  </div>
                )}

                {mode === 'skyronix' && (
                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Identity</h3>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Profile Name</span>
                        <input 
                          value={skyronix.name}
                          onChange={(e) => setSkyronix({...skyronix, name: e.target.value})}
                          className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Specialization</span>
                        <input 
                          value={skyronix.description}
                          onChange={(e) => setSkyronix({...skyronix, description: e.target.value})}
                          className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all"
                        />
                      </label>
                    </div>

                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">Visuals</h3>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Display Photo</span>
                        <div className="mt-2 flex items-center justify-center h-24 w-24 bg-black/20 border border-dashed border-white/10 rounded-full hover:border-aqua-primary transition-colors relative cursor-pointer group overflow-hidden">
                          {skyronix.userImage ? (
                            <img src={skyronix.userImage} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={20} className="text-neutral-500" />
                          )}
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, (url) => setSkyronix({...skyronix, userImage: url}))} />
                        </div>
                      </div>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Headliner Text</span>
                        <textarea 
                          value={skyronix.content}
                          onChange={(e) => setSkyronix({...skyronix, content: e.target.value})}
                          className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all h-24"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {mode === 'general' && (
                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-[20px] space-y-4">
                      <h3 className="text-sm font-bold text-white/90">AI Interaction</h3>
                      <div className="flex gap-2 p-1 bg-black/20 rounded-xl">
                        {['text', 'question', 'picture'].map((t) => (
                          <button 
                            key={t}
                            onClick={() => setGeneral({...general, type: t as any})}
                            className={`flex-1 text-[10px] py-2 rounded-lg transition-all uppercase font-bold tracking-widest ${general.type === t ? 'bg-white/10 text-white shadow-lg' : 'bg-transparent text-neutral-500 hover:text-neutral-300'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      <label className="block">
                        <span className="text-[11px] font-bold uppercase tracking-[1px] text-white/40">Magic Prompt</span>
                        <textarea 
                          value={general.input}
                          onChange={(e) => setGeneral({...general, input: e.target.value})}
                          placeholder="What's on your mind?"
                          className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all h-32"
                        />
                      </label>
                      <button 
                        onClick={handleGenerateAI}
                        disabled={isProcessing || !general.input}
                        className="w-full bg-aqua-primary text-black font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 uppercase text-xs tracking-[1px]"
                      >
                        {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                        <span>Generate Intelligence</span>
                      </button>
                    </div>
                    
                    {general.result && (
                       <div className="glass-card p-6 rounded-[20px] animate-slide-up">
                         <h3 className="text-sm font-bold text-white/90">Output</h3>
                         <textarea 
                          value={general.result}
                          onChange={(e) => setGeneral({...general, result: e.target.value})}
                          className="mt-2 w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm focus:border-aqua-primary outline-none transition-all h-32"
                         />
                       </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 border-t border-white/10 space-y-4">
               <button 
                onClick={handleDownload}
                disabled={isProcessing}
                className="w-full bg-aqua-primary text-black font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all text-xs uppercase tracking-widest"
               >
                 <Download size={18} />
                 <span>Export Artwork</span>
               </button>
               <p className="text-[10px] text-white/30 text-center uppercase tracking-[2px] font-bold">
                 Powered by OpenAI & Gemini
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center">
        {/* Top Header */}
        <header className="w-full p-6 md:p-8 flex items-center justify-between sticky top-0 bg-bg-dark/60 backdrop-blur-xl z-40 border-b border-white/10">
           <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-3 hover:bg-white/5 rounded-xl transition-colors lg:hidden"
           >
             {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
           
           <div className="flex-1 lg:hidden text-center pl-4">
             <span className="font-display font-black tracking-tighter text-aqua-primary text-xl">SOCIALGEN</span>
           </div>

           <div className="flex items-center gap-6 ml-auto">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Workspace</span>
                <span className="text-xs font-bold text-aqua-primary uppercase">{mode} Template</span>
              </div>
              <div className="h-10 w-10 glass-card rounded-xl flex items-center justify-center text-aqua-primary">
                 <User size={20} />
              </div>
           </div>
        </header>

        {/* Preview Container Area */}
        <div className="w-full max-w-7xl p-6 md:p-12 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 min-h-[calc(100vh-100px)]">
           <div className="flex-1 w-full max-w-[600px] flex flex-col items-center gap-8">
              <div className="w-full flex items-center justify-between opacity-30 px-2">
                 <span className="text-[10px] font-bold uppercase tracking-[4px]">Live Preview Mode</span>
                 <div className="flex gap-4">
                   <div className="h-1 w-12 bg-white/20 rounded-full" />
                   <div className="h-1 w-6 bg-aqua-primary rounded-full" />
                 </div>
              </div>
              
              <div className="w-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden ring-1 ring-white/10 relative group bg-neutral-900 border border-dashed border-white/10 p-1">
                 <div className="overflow-hidden rounded-[22px]">
                   {mode === 'markhor' && <MarkhorTalent data={markhor} containerRef={previewRef} />}
                   {mode === 'skyronix' && <Skyronix data={skyronix} containerRef={previewRef} />}
                   {mode === 'general' && <GeneralCreator data={general} containerRef={previewRef} />}
                 </div>
              </div>

              <div className="flex items-center gap-10 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <div className="text-center">
                   <span className="block text-[10px] font-bold uppercase tracking-widest mb-1">Format</span>
                   <span className="text-sm font-medium">1080 x 1350</span>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                   <span className="block text-[10px] font-bold uppercase tracking-widest mb-1">Ratio</span>
                   <span className="text-sm font-medium">4:5 Portrait</span>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                   <span className="block text-[10px] font-bold uppercase tracking-widest mb-1">Render</span>
                   <span className="text-sm font-medium">HD Engine</span>
                </div>
              </div>
           </div>
        </div>

        {/* Desktop Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden lg:flex fixed bottom-10 left-10 p-4 glass-card rounded-2xl hover:bg-white/10 transition-all z-50 text-neutral-400 shadow-2xl"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </main>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center gap-6">
           <div className="relative">
              <RefreshCw className="text-aqua-primary animate-spin" size={48} />
              <div className="absolute inset-0 bg-aqua-primary blur-3xl opacity-20" />
           </div>
           <p className="text-lg font-display font-medium text-white/80 animate-pulse uppercase tracking-[0.2em]">Processing Creative</p>
        </div>
      )}
    </div>
  );
}
