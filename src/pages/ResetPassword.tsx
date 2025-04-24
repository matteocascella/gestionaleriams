
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;

      toast({
        title: "Email inviata",
        description: "Controlla la tua email per il link di reset della password",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message || "Impossibile inviare l'email di reset",
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
          <CardTitle className="text-2xl font-serif text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Inserisci la tua email per ricevere il link di reset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@esempio.it"
                  required
                />
              </div>
              <Button 
                className="w-full bg-vintage-green hover:bg-vintage-green/90" 
                type="submit"
                disabled={loading}
              >
                {loading ? "Invio in corso..." : "Invia link di reset"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/login')}
              >
                Torna al login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
