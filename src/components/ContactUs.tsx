import React, { useState } from "react";
import { Store, MapPin, Phone, Mail, Clock, Calendar, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { ContactMessage } from "../types";

interface ContactUsProps {
  onAddMessage: (msg: Omit<ContactMessage, "id" | "createdAt">) => void;
  messages: ContactMessage[];
}

export default function ContactUs({ onAddMessage, messages }: ContactUsProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !text) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onAddMessage({ name, email, text });
      setIsSubmitting(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setText("");
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1200);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      
      {/* Cards layout: Location grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        {/* Visítanos Card */}
        <div className="md:col-span-7 bg-white bubbly-shadow rounded-3xl p-6 border border-primary/20 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-container/20 p-2.5 rounded-full flex items-center justify-center text-primary">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-extrabold text-lg text-primary">Visítanos en nuestra Tienda</h3>
          </div>

          <div className="flex flex-col gap-3 text-xs md:text-sm text-on-surface">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-bold">Calle de la Alegría 123</p>
                <p className="text-on-surface-variant text-xs">Barrio del Diseño, Ciudad Creativa (CABA)</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <p className="font-medium">+54 11 4567-8910</p>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <p className="font-medium">hola@stickerpink.com</p>
            </div>
          </div>

          {/* Map placeholder */}
          <div 
            onClick={() => setShowMapModal(true)}
            className="w-full h-48 rounded-2xl overflow-hidden relative group cursor-pointer mt-2 border border-outline-variant/30 shadow-inner"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKoAghteCNZgjX8WXdwM29bB1_p33dG1CSVIHbZGfPFoUPK9GvBjajdvfs5oECxEoCFcsikz87COh9ew66qfW-rSLUk6iJzDXEC3ygzmApO5PUQbiekc_A1kWx1Hc4uNXiWX5JQ2Bycn44HLc4_3Tt8ItyZxaM-NZTd4ZY9Kb-7JuTurLqPmM3r7aStUQTg_lrUy_b-7-g78CSGbDF7aXmmrQhmk9WEFTyknFK2XBXf0M1DEZy8rrnfIoRYMzV4m2UKnnQXr8fsn4"
              alt="Stylized map showing shop location"
              className="w-full h-full object-cover grayscale-xs group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors pointer-events-none" />
            
            {/* Overlay instruction */}
            <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transition-transform group-hover:scale-95 text-[11px] font-bold text-primary">
              <MapPin className="w-3.5 h-3.5 fill-primary" />
              <span>Ver en Google Maps</span>
            </div>
          </div>
        </div>

        {/* Right Columns: Open Times and Submit details */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Horarios Card */}
          <div className="bg-secondary-container/20 rounded-3xl p-6 border border-secondary-container/60 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              <h3 className="font-sans font-extrabold text-base text-secondary">Horarios de Atención</h3>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-secondary-container/40">
                <span className="font-semibold text-on-surface-variant flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Lunes - Sábado
                </span>
                <span className="font-black text-secondary">10:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-on-surface-variant/70">Domingos & Feriados</span>
                <span className="font-bold text-on-surface-variant/75 italic">Cerrado</span>
              </div>
            </div>

            {/* Live active indicator */}
            <div className="p-2.5 bg-white/60 rounded-xl flex items-center gap-2 border border-secondary/10">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-on-surface-variant">Estamos Abiertos — ¡Pásate por amor y vinilo!</span>
            </div>
          </div>

          {/* Form mini element */}
          <div className="bg-white rounded-3xl p-5 border border-outline-variant/15 flex-grow space-y-3">
            <div className="flex items-center gap-1.5 text-primary border-b border-outline-variant/10 pb-1.5">
              <MessageSquare className="w-4 h-4" />
              <h4 className="font-sans font-extrabold text-sm">Envíanos un Mensaje</h4>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5">
              <input 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu Nombre"
                className="w-full bg-surface-container-low border-none rounded-full px-4 py-2 text-xs focus:ring-1 focus:ring-primary-container focus:outline-none"
              />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu Email"
                className="w-full bg-surface-container-low border-none rounded-full px-4 py-2 text-xs focus:ring-1 focus:ring-primary-container focus:outline-none"
              />
              <textarea 
                required
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="¿En qué podemos ayudarte?"
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-primary-container focus:outline-none resize-none"
              />
              
              {success ? (
                <div className="w-full text-center bg-green-100 text-green-800 py-2 rounded-full text-xs font-bold">
                  ✓ Mensaje Enviado
                </div>
              ) : (
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-on-primary font-bold text-xs py-2.5 rounded-full transition-all active:scale-95 flex items-center justify-center gap-1 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  {!isSubmitting && <Send className="w-3 h-3" />}
                </button>
              )}
            </form>
          </div>

        </div>

      </div>

      {/* Map modal pop-out */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl p-5 flex flex-col gap-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
              <h3 className="font-sans font-extrabold text-primary flex items-center gap-1.5 text-base">
                <MapPin className="w-5 h-5 fill-primary text-primary" />
                Calle de la Alegría 123
              </h3>
              <button 
                onClick={() => setShowMapModal(false)}
                className="text-xs font-bold text-on-surface-variant hover:text-red-500 bg-surface-container-low rounded-full px-2 py-1"
              >
                Cerrar
              </button>
            </div>
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-outline-variant/20 relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKoAghteCNZgjX8WXdwM29bB1_p33dG1CSVIHbZGfPFoUPK9GvBjajdvfs5oECxEoCFcsikz87COh9ew66qfW-rSLUk6iJzDXEC3ygzmApO5PUQbiekc_A1kWx1Hc4uNXiWX5JQ2Bycn44HLc4_3Tt8ItyZxaM-NZTd4ZY9Kb-7JuTurLqPmM3r7aStUQTg_lrUy_b-7-g78CSGbDF7aXmmrQhmk9WEFTyknFK2XBXf0M1DEZy8rrnfIoRYMzV4m2UKnnQXr8fsn4"
                alt="map map"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white animate-bounce">
                  💖
                </div>
                <span className="bg-white/90 text-primary px-3 py-1 font-bold text-[10px] rounded shadow-md mt-1">Sticker Pink taller boutique</span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant/90 leading-relaxed text-center">
              Estamos ubicados en el corazón del Distrito Creativo. Ofrecemos retiro de mercancía en tienda de Lunes a Sábado. ¡Pasa a ver las muestras y el catálogo de vinilos exclusivos en persona!
            </p>
          </div>
        </div>
      )}

      {/* Messages tracker below (to show it's interactive and functional!) */}
      {messages.length > 0 && (
        <div className="bg-surface-container-low rounded-3xl p-5 border border-outline-variant/10 mt-6">
          <h4 className="font-sans font-extrabold text-xs text-primary mb-3">Mensajes Recibidos ({messages.length})</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {messages.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl p-3 border border-outline-variant/15 space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-[10px] text-on-surface-variant/80 border-b border-outline-variant/10 pb-1">
                  <span className="font-bold text-primary">{m.name}</span>
                  <span>{new Date(m.createdAt).toLocaleTimeString()}</span>
                </div>
                <p className="text-on-surface-variant font-medium text-[11px] italic">"{m.text}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
