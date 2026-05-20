import React, { useState } from "react";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  MessageSquare,
  Send
} from "lucide-react";
import { ContactMessage } from "../types";

interface ContactUsProps {
  onAddMessage: (msg: Omit<ContactMessage, "id" | "createdAt">) => void;
  messages: ContactMessage[];
}

export default function ContactUs({ onAddMessage, messages = [] }: ContactUsProps) {
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

      setTimeout(() => setSuccess(false), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">

      {/* CARD PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

        {/* IZQUIERDA */}
        <div className="md:col-span-7 bg-white bubbly-shadow rounded-3xl p-6 border border-primary/20 flex flex-col gap-4">

          <div className="flex items-center gap-3">
            <div className="bg-primary-container/20 p-2.5 rounded-full text-primary">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-extrabold text-lg text-primary">
              Contacte con Nosotros
            </h3>
          </div>

          <div className="flex flex-col gap-3 text-sm">

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary mt-0.5" />
              <div>
                <p className="font-bold">Lugar de recogida</p>
                <p className="text-xs text-on-surface-variant">
                  Centro Comercial Las Arenas (Entrada Principal)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-primary" />
              <p className="text-sm">sunsetjoyner@gmail.com</p>
            </div>
          </div>

          {/* MAPA CLICKABLE */}
          <div
            onClick={() => setShowMapModal(true)}
            className="w-full h-48 rounded-2xl overflow-hidden relative group cursor-pointer mt-2 border border-outline-variant/30 shadow-inner"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKoAghteCNZgjX8WXdwM29bB1_p33dG1CSVIHbZGfPFoUPK9GvBjajdvfs5oECxEoCFcsikz87COh9ew66qfW-rSLUk6iJzDXEC3ygzmApO5PUQbiekc_A1kWx1Hc4uNXiWX5JQ2Bycn44HLc4_3Tt8ItyZxaM-NZTd4ZY9Kb-7JuTurLqPmM3r7aStUQTg_lrUy_b-7-g78CSGbDF7aXmmrQhmk9WEFTyknFK2XBXf0M1DEZy8rrnfIoRYMzV4m2UKnnQXr8fsn4"
              alt="map"
              className="w-full h-full object-cover group-hover:scale-105 transition"
            />

            <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 hover:scale-95 active:scale-90 cursor-pointer text-[11px] font-bold text-primary"
              onClick={() => setShowMapModal(true)}
            >
              <MapPin className="w-3.5 h-3.5 fill-primary" />
              Ver en Google Maps
            </div>
          </div>
        </div>

        {/* DERECHA */}
        <div className="md:col-span-5 flex flex-col gap-6">

          <div className="bg-white rounded-3xl p-5 border border-outline-variant/15 space-y-3">

            <div className="flex items-center gap-2 text-primary">
              <MessageSquare className="w-4 h-4" />
              <h4 className="font-bold text-sm">Enviar mensaje</h4>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5">

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                className="w-full px-4 py-2 rounded-full bg-gray-100 text-xs"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 rounded-full bg-gray-100 text-xs"
              />

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Mensaje"
                rows={3}
                className="w-full px-4 py-2 rounded-xl bg-gray-100 text-xs resize-none"
              />

              {success ? (
                <div className="text-center text-green-600 font-bold text-xs">
                  ✓ Mensaje enviado
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-2 rounded-full text-xs font-bold"
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </button>
              )}

            </form>
          </div>

        </div>
      </div>

      {/* MODAL MAPA */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">

          <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl p-5">

            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-primary flex items-center gap-1">
                📍 Las Arenas 35010
              </h3>

              <button
                onClick={() => setShowMapModal(false)}
                className="text-xs font-bold text-red-500"
              >
                Cerrar
              </button>
            </div>

            <div className="w-full aspect-video rounded-2xl overflow-hidden mt-3 relative">

              <iframe
                title="map"
                src="https://www.google.com/maps?q=28.0995,-15.4123&z=18&output=embed"
                className="w-full h-full border-0"
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">

                <div className="bg-primary text-white p-2 rounded-full animate-bounce border-2 border-white">
                  💖
                </div>

                <span className="bg-white px-2 py-1 text-[10px] rounded mt-1 font-bold text-primary">
                  StickySun Club
                </span>

              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}