import React, { useState, useRef } from "react";
import { Upload, Send, Sparkles, Award, FileSpreadsheet, Eye, Timer } from "lucide-react";
import { CustomRequest } from "../types";

interface CustomStickerFormProps {
  customRequests: CustomRequest[];
  onAddCustomRequest: (req: Omit<CustomRequest, "id" | "status" | "createdAt">) => void;
}

export default function CustomStickerForm({
  customRequests,
  onAddCustomRequest
}: CustomStickerFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileDataUrl, setFileDataUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  
  // Interaction states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file) return;
    setFileName(file.name);
    
    // Read image data URL for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    
    // Simulate real network upload & analysis delay
    setTimeout(() => {
      onAddCustomRequest({
        name,
        email,
        details: details || "Sin detalles adicionales (por defecto: 5x5 cm, Vinilo Mate)",
        fileName: fileName || "diseño_digital.png",
        fileDataUrl: fileDataUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBCQImgXtro79TYOrdUNlZy97OoHc-DRnXuWF_zF46mv_6-u6fNg8xUH8P3WEFu1JVfMw_c6hk2LYuLo4zEwyIxLzqGUTEK2xnVYED57MlImJRfnISyeyLrW9oj-jMMwolUjCjKfweKcg5q9lP-ZiRooFSwmLJH2Knlc5VMQmVutJwNGioOWv4rV1-GCQ7oZd6gWAxDpM2tI1H6R2_U6BOV_UlRux53I-yYlO6lG0AZkD_7tRLTDLwKERJUridoVyHYScVflCNpAWc"
      });
      
      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset form variables
      setName("");
      setEmail("");
      setDetails("");
      setFileName("");
      setFileDataUrl("");
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1800);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Intro banner */}
      <div className="bg-secondary-container/15 rounded-3xl p-6 border border-secondary-container/40 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="space-y-1 text-center md:text-left">
          <span className="bg-secondary-container text-primary font-bold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Exclusivo & Profesional
          </span>
          <h3 className="font-sans font-extrabold text-lg text-primary pt-1">
            Impresión y troquelado con precisión milimétrica
          </h3>
          <p className="text-on-surface-variant text-xs max-w-xl">
            Sube tu diseño y nuestro equipo de Sticker Pink lo optimizará sin costo adicional. Ajustamos colores, líneas de corte y resolvemos imperfecciones gratuitas para que recibas el mejor sticker de vinilo del mercado.
          </p>
        </div>
        <div className="flex gap-2 text-xs font-bold text-primary bg-white px-4 py-2 rounded-full shadow-xs">
          <Award className="w-4 h-4 text-primary" />
          <span>Garantía 100% Feliz</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left column: Request Form */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-outline-variant/15 shadow-sm space-y-4">
          <div className="border-b border-outline-variant/10 pb-2">
            <h3 className="font-sans font-extrabold text-base text-on-surface">Formula tu Solicitud</h3>
            <p className="text-xs text-on-surface-variant">Cuéntanos sobre tu idea y sube una ilustración.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant pl-1">Tu Nombre</label>
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre o firma artística"
                  className="w-full px-4 py-2.5 rounded-full bg-surface-container-low border border-transparent focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-on-surface-variant pl-1">Email</label>
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hola@ejemplo.com"
                  className="w-full px-4 py-2.5 rounded-full bg-surface-container-low border border-transparent focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface-variant pl-1">Detalles de tu Diseño</label>
              <textarea 
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Indícanos tamaño deseado (ej. 6x6cm), cantidad aproximada y terminaciones especiales (mate, holográfico, diamantina)..."
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none text-xs resize-none"
              />
            </div>

            {/* Custom file Dropzone */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface-variant pl-1">Sube tu Archivo</label>
              
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragging 
                    ? "border-primary bg-secondary-container/10" 
                    : fileDataUrl 
                      ? "border-green-400 bg-green-50/20" 
                      : "border-outline-variant/60 bg-surface-container-low hover:bg-secondary-fixed/10 hover:border-primary"
                }`}
              >
                <input 
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {fileDataUrl ? (
                  <div className="space-y-2">
                    <div className="w-14 h-14 mx-auto rounded-lg overflow-hidden border border-green-200 p-1 bg-white flex items-center justify-center shadow-xs">
                      <img src={fileDataUrl} alt="custom design" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-green-700 line-clamp-1">{fileName}</p>
                      <p className="text-[10px] text-on-surface-variant/70">Diseño cargado con éxito. Haz clic para cambiarlo.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 py-2">
                    <div className="w-10 h-10 mx-auto rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                      <Upload className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary">Subir Imagen</p>
                      <p className="text-[10px] text-on-surface-variant/70 mt-0.5">
                        Arrastra tu archivo aquí o examina tus carpetas
                      </p>
                      <span className="text-[9px] text-on-surface-variant/50 bg-white px-2 py-0.5 rounded border border-outline-variant/20 inline-block mt-2">
                        PNG, JPG o SVG (Máx. 10MB)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form actions */}
            <div className="pt-2">
              {success ? (
                <div className="w-full text-center bg-green-100 text-green-800 p-3 rounded-full text-xs font-bold animate-pulse">
                  ✓ ¡Solicitud Enviada con Éxito! Revisa la tabla de seguimiento al lado.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-primary text-on-primary font-bold hover:bg-opacity-95 text-xs transition-transform active:scale-95 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Procesando Archivo & Vectores...
                    </>
                  ) : (
                    <>
                      Enviar Solicitud
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right column: Status Tracking and live mockup render */}
        <div className="md:col-span-5 flex flex-col gap-6">

          {/* Holographic interactive preview sticker */}
          <div className="bg-surface-container-lowest border border-outline-variant/15 p-5 rounded-3xl bubbly-shadow relative group">
            <span className="absolute top-3 left-3 bg-primary/10 text-primary uppercase text-[9px] font-black px-2 pb-0.5 rounded-full z-10">
              Mockup en Tiempo Real
            </span>

            <div className="aspect-square bg-gradient-to-tr from-pink-50 to-indigo-50 border border-outline-variant/10 rounded-2xl flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
              
              {/* Virtual sticker element - peels on hover */}
              <div className="w-[185px] h-[185px] rounded-full bg-white p-4 flex items-center justify-center relative shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 transform hover:rotate-2 group">
                {fileDataUrl ? (
                  <img 
                    src={fileDataUrl} 
                    alt="Uploaded design render" 
                    className="w-[85%] h-[85%] object-contain rounded-full"
                  />
                ) : (
                  <div className="text-center px-4 space-y-1">
                    <div className="w-10 h-10 mx-auto rounded-full bg-secondary-container/30 flex items-center justify-center animate-pulse">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-[11px] font-bold text-primary">Previsualizador Láser</p>
                    <p className="text-[9px] text-on-surface-variant/80">
                      Sube tu obra para verla troquelada en la plantilla circular
                    </p>
                  </div>
                )}
                
                {/* Simulated sticker edge peel */}
                <div className="absolute bottom-1 right-2 w-7 h-7 bg-pink-100 rounded-tl-full shadow-inner opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[8px] font-bold text-primary/60">Peel</span>
                </div>
              </div>

              {/* Floating lights */}
              <div className="absolute top-1/2 left-4 w-4 h-4 bg-yellow-300 rounded-full blur-xs opacity-45 group-hover:scale-150 transition-transform"></div>
              <div className="absolute bottom-4 right-1/4 w-6 h-6 bg-purple-300 rounded-full blur-md opacity-25 group-hover:-translate-x-12 transition-transform"></div>
            </div>
          </div>

          {/* Follow-up orders history tracker */}
          <div className="bg-white rounded-3xl p-5 border border-outline-variant/15 shadow-xs flex-1 flex flex-col">
            <div className="flex items-center justify-between border-b border-outline-variant/10 pb-2 mb-3">
              <div className="flex items-center gap-1.5 text-primary">
                <FileSpreadsheet className="w-4 h-4" />
                <h4 className="font-sans font-extrabold text-sm">Tus Cotizaciones ({customRequests.length})</h4>
              </div>
              <span className="text-[10px] text-on-surface-variant flex items-center gap-1">
                <Timer className="w-3 h-3 text-secondary" />
                Actualizado en vivo
              </span>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 flex-1">
              {customRequests.length === 0 ? (
                <div className="text-center py-6 text-on-surface-variant/70 text-xs">
                  Aún no has enviado diseños a medida. ¡Sube uno arriba!
                </div>
              ) : (
                customRequests.map((req, idx) => (
                  <div 
                    key={req.id || idx}
                    className="p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[11px] flex justify-between items-start gap-2 hover:bg-secondary-container/5 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-on-surface line-clamp-1">{req.name}</span>
                        <span className="text-[9px] text-on-surface-variant/60">{new Date(req.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-on-surface-variant/80 line-clamp-1 italic">"{req.details}"</p>
                      
                      {/* Attached file link */}
                      {req.fileName && (
                        <div className="flex items-center gap-1 text-[9px] text-secondary font-medium">
                          <Eye className="w-2.5 h-2.5" />
                          <span>Adjunto: {req.fileName}</span>
                        </div>
                      )}
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${
                      req.status === "Aprobado" 
                        ? "bg-green-100 text-green-800"
                        : req.status === "En revisión"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-purple-100 text-purple-800"
                    }`}>
                      {req.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
