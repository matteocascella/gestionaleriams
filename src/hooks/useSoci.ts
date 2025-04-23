
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Socio } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useSoci = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Ottieni tutti i soci
  const getSoci = async (): Promise<Socio[]> => {
    const { data, error } = await supabase
      .from('soci')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data || [];
  };

  // Ottieni un socio specifico per ID
  const getSocioById = async (id: string): Promise<Socio> => {
    const { data, error } = await supabase
      .from('soci')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  };

  // Aggiungi un nuovo socio
  const addSocio = async (socio: Omit<Socio, 'id' | 'created_at'>): Promise<Socio> => {
    const { data, error } = await supabase
      .from('soci')
      .insert([{ ...socio }])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  };

  // Aggiorna un socio esistente
  const updateSocio = async ({ id, ...socio }: Socio): Promise<Socio> => {
    const { data, error } = await supabase
      .from('soci')
      .update({ ...socio })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  };

  // Elimina un socio
  const deleteSocio = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('soci')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  };

  // Query per ottenere tutti i soci
  const { data: soci, isLoading: isLoadingSoci, error: sociError } = useQuery({
    queryKey: ['soci'],
    queryFn: getSoci,
  });

  // Mutation per aggiungere un socio
  const addSocioMutation = useMutation({
    mutationFn: addSocio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['soci'] });
      toast({
        title: "Socio aggiunto",
        description: "Il nuovo socio è stato registrato con successo",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile aggiungere il socio: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Mutation per aggiornare un socio
  const updateSocioMutation = useMutation({
    mutationFn: updateSocio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['soci'] });
      toast({
        title: "Socio aggiornato",
        description: "Le informazioni del socio sono state aggiornate con successo",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile aggiornare il socio: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Mutation per eliminare un socio
  const deleteSocioMutation = useMutation({
    mutationFn: deleteSocio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['soci'] });
      toast({
        title: "Socio eliminato",
        description: "Il socio è stato rimosso con successo",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile eliminare il socio: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Query per ottenere un socio specifico
  const getSocioByIdQuery = (id: string) => useQuery({
    queryKey: ['soci', id],
    queryFn: () => getSocioById(id),
    enabled: !!id,
  });

  return {
    soci,
    isLoadingSoci,
    sociError,
    getSocioById: getSocioByIdQuery,
    addSocio: addSocioMutation.mutate,
    updateSocio: updateSocioMutation.mutate,
    deleteSocio: deleteSocioMutation.mutate,
    isAddingSocio: addSocioMutation.isPending,
    isUpdatingSocio: updateSocioMutation.isPending,
    isDeletingSocio: deleteSocioMutation.isPending,
  };
};
