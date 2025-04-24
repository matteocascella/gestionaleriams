
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';

type UserWithRole = {
  id: string;
  email: string;
  role: string;
};

const RoleManagement = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch all roles first
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');
      
      if (rolesError) throw rolesError;
      
      // Now get all users who have roles
      const userIds = roles?.map(r => r.user_id) || [];
      
      // Create a map of user_id to role for quick lookup
      const roleMap = {};
      roles?.forEach(r => {
        roleMap[r.user_id] = r.role;
      });
      
      // Get users from the auth.users table through RLS
      // NOTE: This is a workaround since we don't have admin API access
      // In production, you would use another approach like a custom edge function
      const { data: profileData, error: profileError } = await supabase
        .from('user_roles')
        .select('user_id, role');
        
      if (profileError) throw profileError;
      
      // Transform the data into the expected format
      const usersWithRoles = profileData?.map(item => ({
        id: item.user_id,
        email: item.user_id, // We don't have email, but we have user_id 
        role: item.role || 'utente'
      })) || [];
      
      setUsers(usersWithRoles);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare gli utenti: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: newRole });

      if (error) throw error;

      toast({
        title: "Ruolo aggiornato",
        description: "Il ruolo dell'utente è stato aggiornato con successo",
      });

      await fetchUsers();
    } catch (error: any) {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare il ruolo: " + error.message,
        variant: "destructive",
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-600">Accesso negato</h1>
        <p>Non hai i permessi per accedere a questa pagina.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestione Ruoli Utenti</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Caricamento...</p>
          ) : (
            <div className="space-y-4">
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <span>{user.email}</span>
                    <Select
                      defaultValue={user.role}
                      onValueChange={(value) => updateUserRole(user.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleziona ruolo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderatore">Moderatore</SelectItem>
                        <SelectItem value="utente">Utente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))
              ) : (
                <p>Nessun utente trovato. Registra nuovi utenti per assegnare ruoli.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManagement;
