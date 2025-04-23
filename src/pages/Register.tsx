
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowSuccess(false);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message || "Registrazione non riuscita");
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-[350px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif text-center">Registrati</CardTitle>
          <CardDescription className="text-center">
            Compila il form per creare il tuo account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleRegister}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tuo@email.it"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              className="w-full bg-vintage-green hover:bg-vintage-green/90"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registrazione in corso..." : "Registrati"}
            </Button>
            {showSuccess && (
              <div className="text-green-600 text-center mt-2 text-sm">
                Registrazione eseguita! Controlla la tua email per la conferma.
              </div>
            )}
            {error && (
              <div className="text-red-600 text-center mt-2 text-sm">
                {error}
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-muted-foreground text-center mt-2">
            Sei già registrato? <a href="/login" className="text-vintage-green underline ml-1">Accedi</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
