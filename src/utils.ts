import { CartItem, CustomRequest, ContactMessage } from "./types";

// Local storage keys
const CART_KEY = "sticker_pink_cart";
const CUSTOM_REQUESTS_KEY = "sticker_pink_custom_requests";
const CONTACT_MESSAGES_KEY = "sticker_pink_contact_messages";

export const getCart = (): CartItem[] => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? (JSON.parse(data) as CartItem[]) : [];
  } catch {
    return [];
  }
};

export const saveCart = (items: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const getCustomRequests = (): CustomRequest[] => {
  try {
    const data = localStorage.getItem(CUSTOM_REQUESTS_KEY);

    if (!data) {
      const initial: CustomRequest[] = [
        {
          id: "req-1",
          name: "Alejandra Gómez",
          email: "alejandra@creative.design",
          details: "Pegatinas holográficas redondas de 5x5cm para el logotipo de mi marca.",
          fileName: "logo_brand_vector.svg",
          status: "Aprobado",
          createdAt: "2026-05-18T14:30:00Z"
        },
        {
          id: "req-2",
          name: "Carlos Ruiz",
          email: "carlos@gaming.io",
          details: "Pegatinas mate troqueladas de 8x10cm estilo cyberpunk.",
          fileName: "cyber_neon_cat.png",
          status: "En revisión",
          createdAt: "2026-05-19T11:20:00Z"
        }
      ];

      localStorage.setItem(CUSTOM_REQUESTS_KEY, JSON.stringify(initial));
      return initial;
    }

    return JSON.parse(data) as CustomRequest[];
  } catch {
    return [];
  }
};

export const saveCustomRequests = (requests: CustomRequest[]): void => {
  localStorage.setItem(CUSTOM_REQUESTS_KEY, JSON.stringify(requests));
};

export const getContactMessages = (): ContactMessage[] => {
  try {
    const data = localStorage.getItem(CONTACT_MESSAGES_KEY);
    return data ? (JSON.parse(data) as ContactMessage[]) : [];
  } catch {
    return [];
  }
};

export const saveContactMessages = (messages: ContactMessage[]): void => {
  localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(messages));
};