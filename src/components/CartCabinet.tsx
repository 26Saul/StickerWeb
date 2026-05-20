import React, { useState } from "react";
import { X, Trash2, ShieldCheck, Heart, ShoppingBag, Sparkles } from "lucide-react";
import { CartItem } from "../types";

interface CartCabinetProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: string, newQty: number) => void;
  onUpdateFinish: (id: string, finish: "holographic" | "matte" | "glitter") => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartCabinet({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onUpdateFinish,
  onRemoveItem,
  onCheckout
}: CartCabinetProps) {
  const [step, setStep] = useState<"review" | "checkout" | "success">("review");
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [email, setEmail] = useState("");
  const [creditCard, setCreditCard] = useState("");
  
  // Calculate price helper
  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      let finalPrice = item.sticker.price;
      if (item.finish === "holographic") finalPrice += 1.00;
      if (item.finish === "glitter") finalPrice += 1.50;
      return sum + finalPrice * item.quantity;
    }, 0);
  };

  const finalTotal = getSubtotal();

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingAddress || !email) return;
    setStep("success");
    setTimeout(() => {
      onCheckout(); // Clear cart and reset state
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (step !== "success") onClose();
        }}
      />

      {/* Slide drawer container */}
      <div className="relative w-full max-w-md bg-white h-screen shadow-2xl flex flex-col z-10 animate-slide-in overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-primary w-5 h-5" />
            <h2 className="font-sans font-bold text-lg text-primary">Mi Carrito ({cartItems.length})</h2>
          </div>
          {step !== "success" && (
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Dynamic content scroll area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {step === "review" && (
            <>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-80 text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary-container/20 rounded-full flex items-center justify-center text-primary-container">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-on-surface">Tu bolsa está vacía</h3>
                    <p className="text-on-surface-variant/80 text-sm max-w-xs mt-1">
                      ¡Explora nuestro catálogo y agrega divertidas pegatinas de vinilo para llenar tu mundo de color!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => {
                    let itemBasePrice = item.sticker.price;
                    if (item.finish === "holographic") itemBasePrice += 1.00;
                    if (item.finish === "glitter") itemBasePrice += 1.50;
                    
                    return (
                      <div 
                        key={item.id}
                        className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex gap-3 relative"
                      >
                        <div className="w-16 h-16 rounded-lg bg-white p-1 border border-outline-variant/10 flex-shrink-0">
                          <img 
                            src={item.sticker.image} 
                            alt={item.sticker.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-sans font-bold text-sm text-on-surface">{item.sticker.name}</h4>
                            
                            {/* Finish selector inside cart */}
                            <div className="mt-1 flex gap-1 items-center">
                              <span className="text-[10px] text-on-surface-variant">Acabado:</span>
                              <select 
                                value={item.finish}
                                onChange={(e) => onUpdateFinish(item.id, e.target.value as any)}
                                className="bg-white/80 border border-outline-variant/30 text-[11px] rounded px-1 text-primary focus:outline-none"
                              >
                                <option value="matte">Vinilo Mate ($0.00)</option>
                                <option value="holographic">Holográfico (+$1.00)</option>
                                <option value="glitter">Brillantina / Glitter (+$1.50)</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold text-primary">
                              ${(itemBasePrice * item.quantity).toFixed(2)}
                            </span>
                            
                            {/* Quantity controls */}
                            <div className="flex items-center gap-2 border border-outline-variant/30 bg-white rounded-full px-2 py-0.5">
                              <button 
                                onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                                className="text-on-surface-variant font-bold text-sm hover:text-primary px-1"
                              >
                                -
                              </button>
                              <span className="text-xs font-semibold px-1">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                className="text-on-surface-variant font-bold text-sm hover:text-primary px-1"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove item */}
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="absolute top-2 right-2 text-on-surface-variant/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {step === "checkout" && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-1">
              <h3 className="font-sans font-bold text-base text-primary border-b border-outline-variant/10 pb-1">
                Datos de Envío & Pago
              </h3>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface-variant">Nombre Completo</label>
                  <input 
                    type="text"
                    required
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    placeholder="Ej. Saúl González"
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/10 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface-variant">Email de Contacto</label>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Escribe tu email"
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/10 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface-variant">Dirección de Despacho</label>
                  <textarea 
                    required
                    rows={2}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Calle, Número, Departamento, Ciudad"
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/10 focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-on-surface-variant">N° Tarjeta de Crédito (Simulada)</label>
                  <input 
                    type="text"
                    required
                    value={creditCard}
                    onChange={(e) => setCreditCard(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    maxLength={19}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/10 focus:ring-1 focus:ring-primary focus:outline-none text-sm font-mono text-center tracking-wider"
                  />
                </div>
              </div>

              {/* Secure verification banner */}
              <div className="p-3 bg-green-50 rounded-xl flex items-center gap-2 border border-green-200 text-green-800 text-xs">
                <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Pago y datos cifrados de manera segura con sistema virtual de simulación.</span>
              </div>
            </form>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center text-center h-[420px] space-y-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary animate-bounce">
                <Heart className="w-10 h-10 fill-primary text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-sans font-extrabold text-2xl text-primary leading-tight">
                  ¡Pedido Recibido!
                </h3>
                <p className="text-on-surface font-semibold text-sm">
                  Gracias por tu compra, {shippingName}.
                </p>
                <p className="text-on-surface-variant/80 text-xs max-w-sm px-6">
                  Hemos enviado la boleta de compra y el código de seguimiento a <span className="font-bold text-primary">{email}</span>. Tus pegatinas empezarán a producirse en nuestro taller de inmediato con amor y vinilo.
                </p>
              </div>
              <div className="relative w-full pt-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 py-2 px-4 rounded-full bg-secondary-container/50 text-[11px] font-bold text-primary animate-pulse">
                  Generando Amor e Impresión en Vinilo...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Total & action footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-outline-variant/30 bg-surface-container-low space-y-3">
            <div className="flex justify-between items-center text-on-surface">
              <span className="text-sm font-semibold">Subtotal de Stickers</span>
              <span className="text-lg font-black text-primary">${finalTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs text-on-surface-variant">
              <span>Envío (Correo prioritario)</span>
              <span className="font-semibold text-green-600">¡Gratis! Pre-promocionado</span>
            </div>

            <div className="border-t border-dashed border-outline-variant/40 pt-2 flex justify-between items-center text-on-surface">
              <span className="font-bold text-sm">Total Compra:</span>
              <span className="text-base font-extrabold text-primary">${finalTotal.toFixed(2)}</span>
            </div>

            <div className="pt-2">
              {step === "review" ? (
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full py-3 rounded-full bg-primary text-on-primary font-bold hover:bg-opacity-95 text-center block"
                >
                  Continuar al Pago
                </button>
              ) : step === "checkout" ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep("review")}
                    className="w-1/3 py-2 rounded-full border border-primary text-primary font-semibold text-sm transition-transform active:scale-95 text-center"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={handleCheckoutSubmit}
                    disabled={!shippingName || !shippingAddress || !email}
                    className="flex-1 py-3 rounded-full bg-primary text-on-primary font-bold hover:bg-opacity-95 text-sm transition-transform active:scale-95 disabled:opacity-50"
                  >
                    Confirmar Pedido (${finalTotal.toFixed(2)})
                  </button>
                </div>
              ) : (
                <button
                  disabled
                  className="w-full py-3 rounded-full bg-green-600 text-white font-bold opacity-80"
                >
                  Pedido Procesado ✓
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}