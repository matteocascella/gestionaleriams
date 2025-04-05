
import React from 'react';
import VehiclesList from '@/components/vehicles/VehiclesList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const Vehicles = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Gestione Veicoli</h1>
        <p className="text-muted-foreground">
          Visualizza e gestisci i veicoli storici registrati nel club.
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tutti i Veicoli</TabsTrigger>
          <TabsTrigger value="certified">Certificati</TabsTrigger>
          <TabsTrigger value="review">In Revisione</TabsTrigger>
          <TabsTrigger value="categories">Categorie</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <VehiclesList />
        </TabsContent>
        <TabsContent value="certified">
          <Card className="p-6">
            <h3 className="text-xl font-serif mb-4">Veicoli Certificati</h3>
            <p className="text-muted-foreground">
              Questa sezione mostrerà solo i veicoli che hanno ricevuto la certificazione storica.
            </p>
          </Card>
        </TabsContent>
        <TabsContent value="review">
          <Card className="p-6">
            <h3 className="text-xl font-serif mb-4">Veicoli in Revisione</h3>
            <p className="text-muted-foreground">
              Questa sezione mostrerà i veicoli in attesa di certificazione o in fase di revisione.
            </p>
          </Card>
        </TabsContent>
        <TabsContent value="categories">
          <Card className="p-6">
            <h3 className="text-xl font-serif mb-4">Categorie Veicoli</h3>
            <p className="text-muted-foreground">
              Questa sezione permetterà di visualizzare i veicoli divisi per categoria.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Vehicles;
