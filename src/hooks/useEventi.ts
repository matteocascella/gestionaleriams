
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

export const useEventi = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Ottieni tutti gli eventi
  const getEventi = async (): Promise<Evento[]> => {
    const { data, error } = await supabase
      .from('eventi')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data || [];
  };

  // Ottieni un evento specifico per ID
  const getEventoById = async (id: string): Promise<Evento> => {
    const { data, error } = await supabase
      .from('eventi')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  };

  // Aggiungi un nuovo evento
  const addEvento = async (evento: Omit<Evento, 'id' | 'created_at'>): Promise<Evento> => {
    const { data, error } = await supabase
      .from('eventi')
      .insert([{ ...evento }])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  };

  // Aggiorna un evento esistente
  const updateEvento = async ({ id, ...evento }: Evento): Promise<Evento> => {
    const { data, error } = await supabase
      .from('eventi')
      .update({ ...evento })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  };

  // Elimina un evento
  const deleteEvento = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('eventi')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  };

  // Query per ottenere tutti gli eventi
  const { data: eventi, isLoading: isLoadingEventi, error: eventiError } = useQuery({
    queryKey: ['eventi'],
    queryFn: getEventi,
  });

  // Mutation per aggiungere un evento
  const addEventoMutation = useMutation({
    mutationFn: addEvento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventi'] });
      toast({
        title: "Evento aggiunto",
        description: "Il nuovo evento è stato registrato con successo",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile aggiungere l'evento: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Mutation per aggiornare un evento
  const updateEventoMutation = useMutation({
    mutationFn: updateEvento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventi'] });
      toast({
        title: "Evento aggiornato",
        description: "Le informazioni dell'evento sono state aggiornate con successo",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile aggiornare l'evento: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Mutation per eliminare un evento
  const deleteEventoMutation = useMutation({
    mutationFn: deleteEvento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventi'] });
      toast({
        title: "Evento eliminato",
        description: "L'evento è stato rimosso con successo",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile eliminare l'evento: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Query per ottenere un evento specifico
  const getEventoByIdQuery = (id: string) => useQuery({
    queryKey: ['eventi', id],
    queryFn: () => getEventoById(id),
    enabled: !!id,
  });

  return {
    eventi,
    isLoadingEventi,
    eventiError,
    getEventoById: getEventoByIdQuery,
    addEvento: addEventoMutation.mutate,
    updateEvento: updateEventoMutation.mutate,
    deleteEvento: deleteEventoMutation.mutate,
    isAddingEvento: addEventoMutation.isPending,
    isUpdatingEvento: updateEventoMutation.isPending,
    isDeletingEvento: deleteEventoMutation.isPending,
  };
};
