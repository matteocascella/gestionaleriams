
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type Garage = {
  id: string;
  name: string;
  address: string;
  phone: string;
  discount: number;
  services: string;
  created_at?: string;
};

export const useGarageConvenzionati = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Ottieni tutti i garage
  const getGarages = async (): Promise<Garage[]> => {
    // Return mock data for development until the table is created
    return [
      {
        id: '1',
        name: 'Officina Classica',
        address: 'Via Roma 123, Milano',
        phone: '+39 02 1234567',
        discount: 15,
        services: 'Restauro completo, riparazioni meccaniche, verniciatura'
      },
      {
        id: '2',
        name: 'Auto d\'Epoca Service',
        address: 'Corso Italia 45, Torino',
        phone: '+39 011 9876543',
        discount: 10,
        services: 'Manutenzione, ricambi originali, certificazioni'
      }
    ];
  };

  // Ottieni un garage specifico per ID
  const getGarageById = async (id: string): Promise<Garage> => {
    // Return mock data for the specified ID
    const mockGarages = [
      {
        id: '1',
        name: 'Officina Classica',
        address: 'Via Roma 123, Milano',
        phone: '+39 02 1234567',
        discount: 15,
        services: 'Restauro completo, riparazioni meccaniche, verniciatura'
      },
      {
        id: '2',
        name: 'Auto d\'Epoca Service',
        address: 'Corso Italia 45, Torino',
        phone: '+39 011 9876543',
        discount: 10,
        services: 'Manutenzione, ricambi originali, certificazioni'
      }
    ];
    
    const garage = mockGarages.find(g => g.id === id);
    if (!garage) {
      throw new Error('Garage non trovato');
    }
    
    return garage;
  };

  // Aggiungi un nuovo garage
  const addGarage = async (garage: Omit<Garage, 'id' | 'created_at'>): Promise<Garage> => {
    // In a real scenario, this would add to the database
    // For now, just return a mock with an ID assigned
    return {
      ...garage,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
  };

  // Aggiorna un garage esistente
  const updateGarage = async ({ id, ...garage }: Garage): Promise<Garage> => {
    // In a real scenario, this would update the database
    // For now, just return the object as is
    return {
      id,
      ...garage,
    };
  };

  // Elimina un garage
  const deleteGarage = async (id: string): Promise<void> => {
    // In a real scenario, this would delete from the database
    // For now, just return void
    return;
  };

  // Query per ottenere tutti i garage
  const { data: garages, isLoading: isLoadingGarages, error: garagesError } = useQuery({
    queryKey: ['garages'],
    queryFn: getGarages,
  });

  // Mutation per aggiungere un garage
  const addGarageMutation = useMutation({
    mutationFn: addGarage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['garages'] });
      toast({
        title: "Garage aggiunto",
        description: "Il nuovo garage convenzionato è stato registrato con successo",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile aggiungere il garage: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Mutation per aggiornare un garage
  const updateGarageMutation = useMutation({
    mutationFn: updateGarage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['garages'] });
      toast({
        title: "Garage aggiornato",
        description: "Le informazioni del garage sono state aggiornate con successo",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile aggiornare il garage: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Mutation per eliminare un garage
  const deleteGarageMutation = useMutation({
    mutationFn: deleteGarage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['garages'] });
      toast({
        title: "Garage eliminato",
        description: "Il garage è stato rimosso dalla lista dei convenzionati",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile eliminare il garage: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Query per ottenere un garage specifico
  const getGarageByIdQuery = (id: string) => useQuery({
    queryKey: ['garages', id],
    queryFn: () => getGarageById(id),
    enabled: !!id,
  });

  return {
    garages,
    isLoadingGarages,
    garagesError,
    getGarageById: getGarageByIdQuery,
    addGarage: addGarageMutation.mutate,
    updateGarage: updateGarageMutation.mutate,
    deleteGarage: deleteGarageMutation.mutate,
    isAddingGarage: addGarageMutation.isPending,
    isUpdatingGarage: updateGarageMutation.isPending,
    isDeletingGarage: deleteGarageMutation.isPending,
  };
};
