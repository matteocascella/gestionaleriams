
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Members from "@/pages/Members";
import Vehicles from "@/pages/Vehicles";
import Events from "@/pages/Events";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import MemberForm from "@/components/members/MemberForm";
import Login from "@/pages/Login";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

// Componente per proteggere le route
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      Caricamento...
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route path="/" element={<Dashboard />} />
        <Route path="/soci" element={<Members />} />
        <Route path="/soci/nuovo" element={<MemberForm onSubmit={() => {}} />} />
        <Route path="/soci/:id" element={<MemberForm onSubmit={() => {}} />} />
        <Route path="/veicoli" element={<Vehicles />} />
        <Route path="/eventi" element={<Events />} />
        <Route path="/impostazioni" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
