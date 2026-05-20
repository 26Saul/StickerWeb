import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle } from "lucide-react";

interface HomeHeroProps {
  onNavigateTab: (tab: "shop" | "custom") => void;
}

export default function HomeHero({ onNavigateTab }: HomeHeroProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setSubscribed(false);
    }, 400);
  };

  return (
    <div className="space-y-12 select-none">
      
      {/* Hero Header Frame */}
      <section className="flex flex-col md:flex-row items-center gap-12 pt-4">
        
        {/* Left Information Texts */}
        <div className="flex-1 space-y-5 text-center md:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-bold text-xs">
            ✨ Nueva colección: Holographic Dreams
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-5xl font-extrabold text-primary leading-tight tracking-tight">
            Haz tu Pegatina <br />
            o Sticker <span className="text-primary-container drop-shadow-sm">a Medida</span>
          </h2>
          <p className="font-sans font-medium text-sm md:text-base text-on-surface-variant max-w-lg leading-relaxed">
            Convierte tus ideas, logos o ilustraciones favoritas en stickers de vinilo de alta calidad con acabados únicos e impermeables. Cada despegue es un pedazo de felicidad hecho a mano.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center md:justify-start">
            <button 
              onClick={() => onNavigateTab("shop")}
              className="px-8 py-3.5 rounded-full bg-primary text-on-primary font-bold text-xs hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all shadow-[0_4px_15px_rgba(181,0,125,0.25)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              Ver Catálogo Completo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigateTab("custom")}
              className="px-8 py-3.5 rounded-full border-2 border-primary-container text-primary font-bold text-xs hover:bg-primary-fixed/30 active:scale-95 transition-all text-center cursor-pointer"
            >
              Diseñar a Medida (Subir Archivo)
            </button>
          </div>
        </div>

        {/* Right Collaged Sticker Img */}
        <div className="flex-1 relative w-full aspect-square max-w-[450px] mx-auto">
          <div className="absolute inset-0 bg-secondary-container/20 rounded-full blur-3xl animate-pulse" />
          
          <div className="relative w-full h-full bg-white rounded-3xl p-6 bubbly-shadow border border-outline-variant/20 hover:scale-[1.03] transition-transform duration-300 flex items-center justify-center">
            
            {/* Overlay tag indicator */}
            <span className="absolute bottom-4 left-4 text-[10px] uppercase font-black text-primary bg-secondary-container/55 px-3 py-1 rounded-full">
              Pega la Felicidad 💖
            </span>

            {/* Main sticker graphic */}
            <img 
              alt="Custom Sticker Collage Preview" 
              className="w-full h-full object-contain drop-shadow-2xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-TGqGAZ774QiAKNBaG-wAMfVG9VqdHWvZX7_PxDvtm5Ok5oJy4zDa38634_wymlk4olk0cQn5JIyffV86qlkQGcD6IQM6vsMIl_zLZ6s50APoXDV8SnA3FYCxxJOdE9LhSWzNNVBiF1PW2bLtg4VqlqCD2ApDemq8_FOJHt9xbmfiActEoixtX7VeSpBV3jUUCMmxOzVQGqN5gEzdeBlY-lY5DLm3pnPfjnEealFdFwJRm8DK97d_pLJEVI1vOrYdWWGhIWgOwrU"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </section>

      {/* Visual highlights cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-6 pt-4">
        
        <div className="p-5 bg-white rounded-2xl border border-outline-variant/15 flex flex-col gap-2">
          <span className="text-2xl">🌱</span>
          <h4 className="font-bold text-sm text-primary">Vinilo Ecológico Impermeable</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Resistente al agua, lavavajillas y rayos UV. Tus diseños se verán vibrantes e intactos durante años.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-outline-variant/15 flex flex-col gap-2">
          <span className="text-2xl">⚡</span>
          <h4 className="font-bold text-sm text-primary">Troquelado Libre (Die-Cut)</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Cortamos con láser el contorno exacto de tu dibujo, dejando un reborde blanco de seguridad perfecto.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-outline-variant/15 flex flex-col gap-2">
          <span className="text-2xl">🎨</span>
          <h4 className="font-bold text-sm text-primary">Optimización de Colores</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Asistencia en vectores y equilibrio cromático gratuito por expertos antes de cada tirada.
          </p>
        </div>

      </section>

      {/* Join the Sticker Club / Newsletter Card */}
      <section className="bg-primary-fixed/50 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden shadow-xs border border-secondary-container/40">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex-1 space-y-1.5 z-10 text-center md:text-left">
          <h3 className="font-sans font-extrabold text-lg text-primary leading-tight">Únete al Sticker Club</h3>
          <p className="font-sans font-medium text-xs text-on-secondary-fixed-variant">
            ¡Suscríbete para recibir lanzamientos de pegatinas gratis, tips de pegado y un <span className="font-bold text-primary">10% de descuento</span> en tu primer pedido!
          </p>
        </div>

        <div className="flex-1 w-full max-w-sm z-10">
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input 
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="escribe@tuemail.com"
              className="flex-1 px-4 py-2.5 rounded-full border-none bg-white text-xs text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
            />
            {subscribed ? (
              <button 
                disabled 
                className="px-6 py-2.5 rounded-full bg-green-600 text-white font-bold text-xs flex items-center justify-center gap-1 shrink-0"
              >
                <CheckCircle className="w-4 h-4 text-white" /> ¡Listo!
              </button>
            ) : (
              <button 
                type="submit"
                className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs hover:bg-opacity-95 transition-all shrink-0 cursor-pointer"
              >
                Suscribirse
              </button>
            )}
          </form>
        </div>
      </section>

    </div>
  );
}
