export interface Sticker {
  id: string;
  name: string;
  price: number;
  category: "all" | "holographic" | "matte" | "pastel";
  image: string;
  isNew?: boolean;
  isHot?: boolean;
  description: string;
}

export interface CartItem {
  id: string; // unique ID including finish option
  sticker: Sticker;
  quantity: number;
  finish: "holographic" | "matte" | "glitter";
}

export interface CustomRequest {
  id: string;
  name: string;
  email: string;
  details: string;
  fileName?: string;
  fileDataUrl?: string;
  status: "Recibido" | "En revisión" | "Aprobado";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  text: string;
  createdAt: string;
}

export type ActiveTab = "home" | "shop" | "custom" | "contact";
