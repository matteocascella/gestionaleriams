
import { createClient } from '@supabase/supabase-js';

// Ottieni le variabili d'ambiente fornite da Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Controlla che le chiavi esistano e mostra un errore utile se mancano
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Errore: Le variabili d\'ambiente Supabase non sono disponibili. ' +
    'Assicurati di aver configurato correttamente il tuo progetto Supabase ' +
    'e che le variabili VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY siano definite.'
  );
}

// Mock per metodi che ritornano risultati PostgreSQL
const createMockPostgrest = () => {
  const mockReturn = { data: null, error: new Error('Supabase non configurato') };
  
  // Funzione ricorsiva che permette di concatenare metodi
  const createChain = () => {
    const chain = {
      select: () => chain,
      insert: () => chain,
      update: () => chain,
      delete: () => chain,
      eq: () => chain,
      order: () => chain,
      single: () => mockReturn,
      then: (callback: any) => Promise.resolve(mockReturn).then(callback),
      catch: (callback: any) => Promise.resolve(mockReturn).catch(callback),
    };
    return chain;
  };
  
  return createChain();
};

// Crea un client fittizio se le variabili non sono disponibili per evitare errori di runtime
// Altrimenti crea un client reale
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => createMockPostgrest(),
      auth: {
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase non configurato') }),
        signOut: () => Promise.resolve({ error: null }),
        getSession: () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    };

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
