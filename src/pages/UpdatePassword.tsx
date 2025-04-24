
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      toast({
        title: "Password aggiornata",
        description: "La tua password è stata aggiornata con successo",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message || "Impossibile aggiornare la password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-[350px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif text-center">Nuova Password</CardTitle>
          <CardDescription className="text-center">
            Inserisci la tua nuova password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Nuova Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <Button 
                className="w-full bg-vintage-green hover:bg-vintage-green/90" 
                type="submit"
                disabled={loading}
              >
                {loading ? "Aggiornamento..." : "Aggiorna password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePassword;
