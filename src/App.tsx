import React, { useState, useEffect } from "react";
import {
  Home,
  Grid2X2,
  Sparkles,
  ShoppingBag,
  Phone,
  Menu,
  Search,
  X,
  Heart,
  Instagram,
  Compass,
  ArrowRight
} from "lucide-react";

import { ActiveTab, CartItem, CustomRequest, ContactMessage, Sticker } from "./types";
import { stickersData, marqueeStickers } from "./data";
import {
  getCart,
  saveCart,
  getCustomRequests,
  saveCustomRequests,
  getContactMessages,
  saveContactMessages
} from "./utils";

// Component imports
import HomeHero from "./components/HomeHero";
import StickerCard from "./components/StickerCard";
import CustomStickerForm from "./components/CustomStickerForm";
import ContactUs from "./components/ContactUs";
import CartCabinet from "./components/CartCabinet";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  // Cart state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search/Filters in Shop Section
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "holographic" | "matte" | "pastel">("all");
  const [visibleCount, setVisibleCount] = useState(8);

  // Load initial data from local storage once on mount
  useEffect(() => {
    setCartItems(getCart());
    setCustomRequests(getCustomRequests());
    setContactMessages(getContactMessages());
  }, []);

  // Sync cart adjustments to local storage
  const handleModifyCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    saveCart(newCart);
  };

  // Add item into cart session safely
  const handleAddToCart = (sticker: Sticker) => {
    const defaultFinish = "matte";
    const cartItemId = `${sticker.id}-${defaultFinish}`;

    const existingIndex = cartItems.findIndex(item => item.id === cartItemId);
    if (existingIndex > -1) {
      // increase quantity
      const copied = [...cartItems];
      copied[existingIndex].quantity += 1;
      handleModifyCart(copied);
    } else {
      // create new element
      const newItem: CartItem = {
        id: cartItemId,
        sticker,
        quantity: 1,
        finish: defaultFinish
      };
      handleModifyCart([...cartItems, newItem]);
    }
  };

  // Decrease or increase quantity
  const handleUpdateCartQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    const updated = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    handleModifyCart(updated);
  };

  // Switch finish type
  const handleUpdateCartFinish = (id: string, newFinish: "holographic" | "matte" | "glitter") => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        // Compute new unique ID to avoid duplicates if different finishes exist
        const splitId = id.split("-")[0];
        const updatedId = `${splitId}-${newFinish}`;
        return { ...item, id: updatedId, finish: newFinish };
      }
      return item;
    });
    handleModifyCart(updated);
  };

  // Remove single line item
  const handleRemoveCartItem = (id: string) => {
    const filtered = cartItems.filter(item => item.id !== id);
    handleModifyCart(filtered);
  };

  // Simulated clean order checkout
  const handleCheckoutSuccess = () => {
    handleModifyCart([]); // Reset Cart list
    setIsCartOpen(false); // Close drawer
  };

  // Custom request additions
  const handleAddCustomRequest = (newRequest: Omit<CustomRequest, "id" | "status" | "createdAt">) => {
    const req: CustomRequest = {
      ...newRequest,
      id: `req-${Date.now()}`,
      status: "Recibido",
      createdAt: new Date().toISOString()
    };
    const updated = [req, ...customRequests];
    setCustomRequests(updated);
    saveCustomRequests(updated);
  };

  // Message sent additions
  const handleAddContactMessage = (newMessage: Omit<ContactMessage, "id" | "createdAt">) => {
    const msg: ContactMessage = {
      ...newMessage,
      id: `m-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [msg, ...contactMessages];
    setContactMessages(updated);
    saveContactMessages(updated);
  };

  // Filter products by category & search criteria
  const filteredStickers = stickersData.filter(st => {
    const matchesCategory = activeCategory === "all" || st.category === activeCategory;
    const matchesSearch = st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured home stickers
  const featuredStickers = stickersData.slice(0, 5);

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md flex flex-col relative select-none selection:bg-primary-container selection:text-on-primary-container">

      {/* HEADER BAR */}
      <header className="bg-white/95 backdrop-blur-md flex justify-between items-center w-full px-5 md:px-12 py-4 sticky top-0 z-40 shadow-[0_2px_12px_rgba(181,0,125,0.04)] border-b border-outline-variant/10">

        {/* Logo and Brand Title */}
        <div
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_2px_8px_rgba(181,0,125,0.3)] group-hover:rotate-12 transition-transform overflow-hidden">
            <img
              src="/img1.jpg"
              alt="icono"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-display text-xl md:text-2xl font-black text-primary tracking-tight">
            Sticker Pink
          </h1>
        </div>

        {/* Desktop Links Nav */}
        <nav className="hidden md:flex gap-8 items-center font-sans">
          <button
            onClick={() => setActiveTab("home")}
            className={`text-xs font-bold tracking-wider uppercase transition-colors uppercase ${activeTab === "home" ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary"
              }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setActiveTab("shop")}
            className={`text-xs font-bold tracking-wider uppercase transition-colors uppercase ${activeTab === "shop" ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary"
              }`}
          >
            Tienda (Catálogo)
          </button>
          <button
            onClick={() => setActiveTab("custom")}
            className={`text-xs font-bold tracking-wider uppercase transition-colors uppercase ${activeTab === "custom" ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary"
              }`}
          >
            A Medida (Diseño)
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`text-xs font-bold tracking-wider uppercase transition-colors uppercase ${activeTab === "contact" ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary"
              }`}
          >
            Contacto
          </button>
        </nav>

        {/* Shopping Cart Indicator Icon */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-primary-container/20 p-2.5 rounded-full text-primary hover:bg-primary-container/30 hover:scale-105 active:scale-90 transition-all cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-5 h-5 font-bold" />

            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-scale">
                {cartItems.reduce((acc, current) => acc + current.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* INFINITE RUNNING MARQUEE (Top branding detail) */}
      <div className="bg-primary text-on-primary py-1.5 text-[10px] uppercase font-bold tracking-widest overflow-hidden border-b border-primary/25 font-sans select-none">
        <div className="animate-marquee-slow flex whitespace-nowrap gap-12">
          <span>🌸 Pegatinas hechas a mano con amor en vinilo de primera clase </span>
          <span>⚡ Resistente al Agua & Lavavajillas </span>
          <span>💎 Acabados Holográficos, Mate y Glitter </span>
          <span>🚀 Envío Gratuito en órdenes seleccionadas de la Comunidad </span>
          <span>🌸 Pegatinas hechas a mano con amor en vinilo de primera clase </span>
          <span>⚡ Resistente al Agua & Lavavajillas </span>
          <span>💎 Acabados Holográficos, Mate y Glitter </span>
          <span>🚀 Envío Gratuito en órdenes seleccionadas de la Comunidad </span>
        </div>
      </div>

      {/* DESIGN PREVIEW CONTAINER & NAVIGATION CONTENT */}
      <main className="flex-1 pb-16 py-6 px-5 md:px-12 max-w-7xl mx-auto w-full space-y-8">

        {/* View Home Component */}
        {activeTab === "home" && (
          <div className="space-y-12">

            {/* Direct Home Hero */}
            <HomeHero onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} />

            {/* Featured Stickers Section inside Home */}
            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-end border-b border-outline-variant/10 pb-2">
                <div>
                  <h3 className="font-sans font-extrabold text-lg text-on-surface">Diseños Destacados</h3>
                  <p className="text-xs text-on-surface-variant">Las pegatinas más deseadas de esta semana</p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab("shop");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-primary font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
                >
                  Ver Todo el Catálogo <ArrowRight className="w-4 h-4 inline" />
                </button>
              </div>

              {/* Grid with elements */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {featuredStickers.map((st) => (
                  <StickerCard
                    key={st.id}
                    sticker={st}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>

            {/* Custom collage sticker section banner */}
            <div className="p-6 bg-gradient-to-r from-pink-500 to-primary text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
              <div className="space-y-2 text-center md:text-left z-10">
                <h3 className="font-sans font-black text-xl md:text-2xl leading-tight">¿Tienes tus propios logotipos o dibujos?</h3>
                <p className="text-secondary-fixed text-xs max-w-xl">
                  Fabricamos pegatinas personalizadas a partir de tus fotos, bocetos o ilustraciones digitales. Ofrecemos cotización automática, línea de troquelado láser gratis y atención súper tierna.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab("custom");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full bg-white text-primary font-bold text-xs hover:scale-105 transition-transform shrink-0 cursor-pointer shadow"
              >
                Crear Pegatina Personalizada
              </button>
            </div>

          </div>
        )}

        {/* View Shop/Catalog Component */}
        {activeTab === "shop" && (
          <div className="space-y-8">

            {/* Header intro of Shop */}
            <div className="text-center space-y-3">
              <h2 className="font-display text-3xl font-extrabold text-primary">Fresh Out the Vinyl</h2>
              <p className="text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                Pegatinas de vinilo de primera clase, resistentes al agua para llenar tu termo o cuaderno de magia. Examina todos nuestros alegres modelos adhesivos.
              </p>

              {/* Search input and category filter chips */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center pt-2">

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar pegatinas..."
                    className="w-full pl-10 pr-4 py-2 bg-surface-container-low focus:bg-white rounded-full border border-transparent focus:border-primary-container focus:ring-1 focus:ring-primary focus:outline-none text-xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-red-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Categories filter layout */}
                <div className="flex gap-2 items-center overflow-x-auto no-scrollbar max-w-full pb-1">
                  <button
                    onClick={() => { setActiveCategory("all"); setVisibleCount(8); }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeCategory === "all" ? "bg-primary text-on-primary shadow-xs" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                      }`}
                  >
                    🚀 Mostrar Todo
                  </button>
                  <button
                    onClick={() => { setActiveCategory("holographic"); setVisibleCount(8); }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeCategory === "holographic" ? "bg-primary text-on-primary shadow-xs" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                      }`}
                  >
                    💎 Holográficos
                  </button>
                  <button
                    onClick={() => { setActiveCategory("matte"); setVisibleCount(8); }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeCategory === "matte" ? "bg-primary text-on-primary shadow-xs" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                      }`}
                  >
                    ✨ Vinilo Mate
                  </button>
                  <button
                    onClick={() => { setActiveCategory("pastel"); setVisibleCount(8); }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeCategory === "pastel" ? "bg-primary text-on-primary shadow-xs" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                      }`}
                  >
                    🌸 Diseños Pastel
                  </button>
                </div>

              </div>
            </div>

            {/* List grid */}
            {filteredStickers.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant font-medium">
                No encontramos pegatinas que coincidan con tu búsqueda. ¡Intenta de nuevo o solicita un diseño a medida!
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredStickers.slice(0, visibleCount).map((st) => (
                  <StickerCard
                    key={st.id}
                    sticker={st}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredStickers.length > visibleCount && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setVisibleCount(prev => prev + 4)}
                  className="px-8 py-3 bg-secondary-container text-on-secondary-container rounded-full font-bold text-xs hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 bubbly-shadow cursor-pointer"
                >
                  Cargar Más Pegatinas Especiales
                </button>
              </div>
            )}

          </div>
        )}

        {/* View Custom Sticker Form Component */}
        {activeTab === "custom" && (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="font-display text-3xl font-extrabold text-primary">Haz tu Pegatina Especial</h2>
              <p className="text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                Fabricamos stickers para marcas, proyectos independientes, artistas y creadores. Cuéntanos sobre tu idea y sube tu logo digital en segundos.
              </p>
            </div>
            <CustomStickerForm
              customRequests={customRequests}
              onAddCustomRequest={handleAddCustomRequest}
            />
          </div>
        )}

        {/* View Contact Us Component */}
        {activeTab === "contact" && (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="font-display text-3xl font-extrabold text-primary">¡Hola! Cuéntanos todo.</h2>
              <p className="text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                ¿Tienes alguna consulta especial sobre envíos, materiales o diseños mayoristas? Estamos aquí para responder rápido con amor.
              </p>
            </div>
            <ContactUs
              onAddMessage={handleAddContactMessage}
              messages={contactMessages}
            />
          </div>
        )}

        {/* Static Stickers spreads marquee running gallery */}
        <section className="mt-8 pt-8 overflow-hidden relative select-none">
          <div className="flex gap-4 animate-marquee whitespace-nowrap overflow-x-auto no-scrollbar pb-3">
            <div className="inline-flex gap-6">
              {marqueeStickers.map((stickerUrl, idx) => (
                <div
                  key={idx}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white bubbly-shadow p-3 flex items-center justify-center border border-outline-variant/10 cursor-pointer overflow-hidden transform hover:-translate-y-2 duration-300"
                >
                  <img
                    src={stickerUrl}
                    alt="sticker spread catalog"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              {/* Repeated elements to look nicely populated */}
              {marqueeStickers.map((stickerUrl, idx) => (
                <div
                  key={`rep-${idx}`}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white bubbly-shadow p-3 flex items-center justify-center border border-outline-variant/10 cursor-pointer overflow-hidden transform hover:-translate-y-2 duration-300"
                >
                  <img
                    src={stickerUrl}
                    alt="sticker spread catalog repeat"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER AREA */}
      <footer className="w-full px-5 py-8 flex flex-col gap-4 items-center text-center bg-white/80 border-t border-outline-variant/10 mt-auto select-none font-sans">
        <h3 className="font-display text-lg text-primary font-black">Sticker Pink</h3>

        <nav className="flex gap-6 text-[11px] font-bold text-on-surface-variant/80">
          <button onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-primary">Inicio</button>
          <button onClick={() => { setActiveTab("shop"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-primary">Catálogo</button>
          <button onClick={() => { setActiveTab("custom"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-primary">Stickers a Medida</button>
          <button onClick={() => { setActiveTab("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-primary">Preguntas & Contacto</button>
        </nav>

        <div className="flex gap-4 text-primary text-xs font-semibold py-1">
          <a href="#instagram" className="hover:opacity-80 flex items-center gap-1">
            <Instagram className="w-4 h-4" /> @StickerPink
          </a>
          <span className="opacity-30">|</span>
          <a href="#pinterest" className="hover:opacity-80 flex items-center gap-1">
            <Compass className="w-4 h-4" /> stickers.love
          </a>
        </div>

        <p className="text-[10px] text-on-surface-variant opacity-60">
          © 2026 Sticker Pink. Hecho con amor, pasión y vinilo de alta densidad.
        </p>
      </footer>

      {/* MOBILE FIXED BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 pb-4 pt-2 bg-white/95 backdrop-blur-md shadow-lg rounded-t-2xl border-t border-outline-variant/10 select-none">

        <button
          onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${activeTab === "home" ? "text-primary bg-secondary-container/20 font-bold" : "text-on-surface-variant"
            }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Inicio</span>
        </button>

        <button
          onClick={() => { setActiveTab("shop"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${activeTab === "shop" ? "text-primary bg-secondary-container/20 font-bold" : "text-on-surface-variant"
            }`}
        >
          <Grid2X2 className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Tienda</span>
        </button>

        <button
          onClick={() => { setActiveTab("custom"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all ${activeTab === "custom" ? "bg-primary text-on-primary font-bold shadow-md scale-105" : "text-on-surface-variant"
            }`}
        >
          <Sparkles className="w-4.5 h-4.5" />
          <span className="text-[10px] mt-0.5">A Medida</span>
        </button>

        <button
          onClick={() => { setActiveTab("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${activeTab === "contact" ? "text-primary bg-secondary-container/20 font-bold" : "text-on-surface-variant"
            }`}
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Contacto</span>
        </button>
      </nav>

      {/* CART OVERLAY CABINET DRAWER */}
      <CartCabinet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onUpdateFinish={handleUpdateCartFinish}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckoutSuccess}
      />

    </div>
  );
}
