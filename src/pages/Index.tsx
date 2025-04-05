
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This page just redirects to the dashboard
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">Auto Club Classico</h1>
        <p className="text-xl text-muted-foreground">Caricamento dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
