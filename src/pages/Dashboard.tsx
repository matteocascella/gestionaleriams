
import React from 'react';
import StatCards from '@/components/dashboard/StatCards';
import RecentMembers from '@/components/dashboard/RecentMembers';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Benvenuto nel sistema di gestione RIAMS - Registro Italiano Auto e Moto Storiche.
        </p>
      </div>

      <StatCards />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="analytics">Statistiche</TabsTrigger>
          <TabsTrigger value="reports">Rapporti</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Soci Recenti</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentMembers />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Eventi Imminenti</CardTitle>
              </CardHeader>
              <CardContent>
                <UpcomingEvents />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Statistiche Avanzate</CardTitle>
              <CardDescription>
                Le statistiche avanzate saranno disponibili in una versione futura.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Questa sezione mostrerà grafici e analisi dettagliate sui soci e veicoli registrati.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Rapporti</CardTitle>
              <CardDescription>
                I rapporti saranno disponibili in una versione futura.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Questa sezione permetterà di generare rapporti dettagliati sull'attività del registro.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
