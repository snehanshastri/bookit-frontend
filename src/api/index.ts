import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface Experience {
  id: string;
  name: string;
  location: string;
  description: string;
  about?: string;
  image?: string;         // still keep this for mock data
  imageUrl?: string;      // add this for Firestore data
  price: number;
  slots?: Slot[];         // make optional if loading async
}


export interface Slot {
  id: string;
  date: string;
  time: string;
  available: number;
  capacity: number;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  experienceId: string;
  slotId: string;
  promoCode?: string;
  total: number;
  referenceId: string;
}

export interface PromoValidation {
  valid: boolean;
  discount: number;
  type: 'percentage' | 'flat';
}

// API Endpoints
export const experiencesApi = {
  getAll: () => api.get<Experience[]>('/experiences'),
  getById: (id: string) => api.get<Experience>(`/experiences/${id}`),
};

export const bookingsApi = {
  create: (data: {
    name: string;
    email: string;
    experienceId: string;
    slotId: string;
    promoCode?: string;
  }) => api.post<Booking>('/bookings', data),
};

export const promoApi = {
  validate: (code: string) => api.post<PromoValidation>('/promo/validate', { code }),
};

export default api;
