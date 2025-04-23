
import { createClient } from '@supabase/supabase-js';

// Creiamo un client Supabase usando le variabili d'ambiente fornite da Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL o chiave anonima mancanti');
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

// Definizioni dei tipi per le tabelle principali
export type Socio = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  taxCode: string;
  address: string;
  city: string;
  postalCode: string;
  membershipType: 'standard' | 'premium' | 'honorary' | string;
  memberSince: string;
  cardNumber: string;
  cardExpiryDate: string;
  status: 'Attivo' | 'Scaduto' | 'Sospeso' | string;
  notes?: string;
  created_at?: string;
};

export type Veicolo = {
  id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  ownerId: string;
  status: 'Certificato' | 'In Revisione' | string;
  category: string;
  created_at?: string;
};

export type Evento = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  participants: number;
  carsExpected: number;
  image?: string;
  created_at?: string;
};

export type Garage = {
  id: string;
  name: string;
  address: string;
  phone: string;
  discount: number;
  services: string;
  created_at?: string;
};

export type Session = {
  user: {
    id: string;
    email: string;
    role?: string;
  } | null;
};
