
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

  // Ogni metodo simula le chain tipiche di Supabase ma restituisce SEMPRE una Promise
  const postgrestMethods = {
    select: () => Promise.resolve(mockReturn),
    insert: () => Promise.resolve(mockReturn),
    update: () => Promise.resolve(mockReturn),
    delete: () => Promise.resolve(mockReturn),
    eq: () => Promise.resolve(mockReturn),
    order: () => Promise.resolve(mockReturn),
    single: () => Promise.resolve(mockReturn),
  };

  // Per compatibilità con chaining, ogni metodo ritorna sempre l'interfaccia con tutti i metodi
  const handler = {
    get(_target: any, prop: string) {
      if (postgrestMethods[prop]) {
        return (...args: any[]) => {
          // Permetti chain es. .select().eq().single() 
          // Ogni chiamata restituisce sempre la stessa struttura Proxy con metodi
          return new Proxy(postgrestMethods, handler);
        };
      }
      // Per .then/.catch: se qualcuno fa await ..., ritorna effettivamente una Promise
      if (prop === 'then') {
        // L'ultimo metodo della catena restituirà la promise mock con errore
        // Qui semplicemente risolviamo mockReturn per .then(dati => ...) 
        return (resolve: any, reject: any) => Promise.resolve(mockReturn).then(resolve, reject);
      }
      if (prop === 'catch') {
        return (reject: any) => Promise.resolve(mockReturn).catch(reject);
      }
      return undefined;
    }
  };
  // Ritorno una Proxy che intercetta tutte le chiamate ai metodi più comuni di Postgrest
  return new Proxy(postgrestMethods, handler);
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
        resetPasswordForEmail: () => Promise.resolve({ data: null, error: new Error('Supabase non configurato') }),
        updateUser: () => Promise.resolve({ data: null, error: new Error('Supabase non configurato') }),
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

