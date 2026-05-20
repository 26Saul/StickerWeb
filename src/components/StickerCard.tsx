import React, { useState, useRef } from "react";
import { Plus, Check, Info } from "lucide-react";
import { Sticker } from "../types";

interface StickerCardProps {
  key?: string;
  sticker: Sticker;
  onAddToCart: (sticker: Sticker) => void;
}

export default function StickerCard({ sticker, onAddToCart }: StickerCardProps) {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [added, setAdded] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth angle ratios
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
  };

  const handleAdd = () => {
    onAddToCart(sticker);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  return (
    <>
      <div className="group flex flex-col h-full bg-white rounded-2xl p-3 border border-outline-variant/15 hover:border-primary-container/30 transition-all duration-300">
        
        {/* Tilt Img Preview Box */}
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform, transition: transform.includes("0deg") ? "transform 0.4s ease-out" : "none" }}
          className="relative aspect-square rounded-xl bg-surface-container-low p-4 mb-3 bubbly-shadow cursor-pointer overflow-hidden flex items-center justify-center select-none"
          onClick={() => setShowDetailModal(true)}
        >
          <img 
            src={sticker.image} 
            alt={sticker.name} 
            className="max-w-[85%] max-h-[85%] object-contain drop-shadow-xl"
            referrerPolicy="no-referrer"
          />

          {/* New/Hot Badges */}
          {sticker.isNew && (
            <span className="absolute top-3 right-3 bg-tertiary-container text-on-tertiary-fixed-variant text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Nuevo
            </span>
          )}
          {sticker.isHot && (
            <span className="absolute top-3 right-3 bg-primary-container text-on-primary-fixed-variant text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Hot 🔥
            </span>
          )}

          {/* Quick info icon */}
          <div className="absolute bottom-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white/85 p-1 rounded-full text-primary hover:bg-white shadow">
            <Info className="w-4 h-4" />
          </div>
        </div>

        {/* Content Box */}
        <div className="flex justify-between items-start gap-1 flex-1">
          <div>
            <h3 
              onClick={() => setShowDetailModal(true)}
              className="font-sans font-extrabold text-sm text-on-surface leading-snug cursor-pointer hover:text-primary transition-colors line-clamp-1"
            >
              {sticker.name}
            </h3>
            <p className="font-sans font-bold text-xs text-primary mt-0.5">
              ${sticker.price.toFixed(2)}
            </p>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant/70 tracking-wider">
              {sticker.category === "holographic" ? "💎 Holográfico" : sticker.category === "matte" ? "✨ Vinilo Mate" : "🌸 Pastel"}
            </span>
          </div>

          {/* Dynamic addition toggle button */}
          <button 
            onClick={handleAdd}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm active:scale-90 ${
              added 
                ? "bg-green-600 text-white" 
                : "bg-primary text-white hover:bg-primary-container hover:text-on-primary-container"
            }`}
          >
            {added ? <Check className="w-5 h-5 animate-scale" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Details/Description Modal Backdrop */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none">
          <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant/20 animate-scale-up">
            
            {/* Top Close Button */}
            <button 
              onClick={() => setShowDetailModal(false)}
              className="absolute top-4 right-4 bg-surface-container-low p-1.5 rounded-full hover:bg-surface-container-high transition-colors"
            >
              <Check className="w-5 h-5 rotate-45 text-on-surface-variant" />
            </button>

            {/* Modal Image Box */}
            <div className="w-full aspect-square bg-surface-container-low rounded-2xl p-6 flex items-center justify-center border border-outline-variant/10">
              <img 
                src={sticker.image} 
                alt={sticker.name} 
                className="max-w-[70%] max-h-[70%] object-contain drop-shadow-2xl"
              />
            </div>

            {/* Text description */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-primary bg-secondary-container/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {sticker.category} Stickers
              </span>
              <h3 className="font-sans font-extrabold text-xl text-on-surface pt-1">{sticker.name}</h3>
              <p className="font-black text-lg text-primary pt-0.5">${sticker.price.toFixed(2)}</p>
              <p className="text-on-surface-variant text-sm pt-2 leading-relaxed">
                {sticker.description}
              </p>
            </div>

            {/* Call to action inside detail */}
            <button 
              onClick={() => {
                handleAdd();
                setShowDetailModal(false);
              }}
              className="w-full py-3 mt-2 rounded-full bg-primary text-on-primary font-bold hover:bg-opacity-95 transition-all text-sm shadow-md"
            >
              Agregar a mi bolsa
            </button>
          </div>
        </div>
      )}
    </>
  );
}
