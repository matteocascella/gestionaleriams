
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
    const { data, error } = await supabase
      .from('garages')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data || [];
  };

  // Ottieni un garage specifico per ID
  const getGarageById = async (id: string): Promise<Garage> => {
    const { data, error } = await supabase
      .from('garages')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  };

  // Aggiungi un nuovo garage
  const addGarage = async (garage: Omit<Garage, 'id' | 'created_at'>): Promise<Garage> => {
    const { data, error } = await supabase
      .from('garages')
      .insert([{ ...garage }])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  };

  // Aggiorna un garage esistente
  const updateGarage = async ({ id, ...garage }: Garage): Promise<Garage> => {
    const { data, error } = await supabase
      .from('garages')
      .update({ ...garage })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  };

  // Elimina un garage
  const deleteGarage = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('garages')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
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
