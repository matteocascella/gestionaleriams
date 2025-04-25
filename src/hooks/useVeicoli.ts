import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type Veicolo = {
  id: string;
  brand: string;
  model: string;
  year: number;
  licenseplate: string;
  ownerid: string;
  status: string;
  category: string;
  created_at?: string;
  owner?: string;
  soci?: any;
};

export const useVeicoli = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const getVeicoli = async (): Promise<Veicolo[]> => {
    const { data, error } = await supabase
      .from('veicoli')
      .select(`
        *,
        soci (
          name,
          surname
        )
      `)
      .order('brand', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data?.map(vehicle => ({
      ...vehicle,
      owner: vehicle.soci ? `${vehicle.soci.name} ${vehicle.soci.surname}` : 'N/A'
    })) || [];
  };

  const getVeicoloById = async (id: string): Promise<Veicolo> => {
    const { data, error } = await supabase
      .from('veicoli')
      .select(`
        *,
        soci (
          id,
          name,
          surname
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    
    return {
      ...data,
      owner: data.soci ? `${data.soci.name} ${data.soci.surname}` : 'N/A'
    };
  };

  const addVeicolo = async (veicolo: Omit<Veicolo, 'id' | 'created_at' | 'owner' | 'soci'>): Promise<Veicolo> => {
    const { data, error } = await supabase
      .from('veicoli')
      .insert([veicolo])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  };

  const updateVeicolo = async ({ id, ...veicolo }: Veicolo): Promise<Veicolo> => {
    const { data, error } = await supabase
      .from('veicoli')
      .update({ ...veicolo })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  };

  const deleteVeicolo = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('veicoli')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  };

  const { data: veicoli, isLoading: isLoadingVeicoli, error: veicoliError } = useQuery({
    queryKey: ['veicoli'],
    queryFn: getVeicoli,
  });

  const addVeicoloMutation = useMutation({
    mutationFn: addVeicolo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['veicoli'] });
      toast({
        title: "Veicolo aggiunto",
        description: "Il nuovo veicolo è stato registrato con successo",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile aggiungere il veicolo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateVeicoloMutation = useMutation({
    mutationFn: updateVeicolo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['veicoli'] });
      toast({
        title: "Veicolo aggiornato",
        description: "Le informazioni del veicolo sono state aggiornate con successo",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile aggiornare il veicolo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteVeicoloMutation = useMutation({
    mutationFn: deleteVeicolo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['veicoli'] });
      toast({
        title: "Veicolo eliminato",
        description: "Il veicolo è stato rimosso con successo",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: `Impossibile eliminare il veicolo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const getVeicoloByIdQuery = (id: string) => useQuery({
    queryKey: ['veicoli', id],
    queryFn: () => getVeicoloById(id),
    enabled: !!id,
  });

  return {
    veicoli,
    isLoadingVeicoli,
    veicoliError,
    getVeicoloById: getVeicoloByIdQuery,
    addVeicolo: addVeicoloMutation.mutate,
    updateVeicolo: updateVeicoloMutation.mutate,
    deleteVeicolo: deleteVeicoloMutation.mutate,
    isAddingVeicolo: addVeicoloMutation.isPending,
    isUpdatingVeicolo: updateVeicoloMutation.isPending,
    isDeletingVeicolo: deleteVeicoloMutation.isPending,
  };
};
