
import React from 'react';
import StatCards from '@/components/dashboard/StatCards';
import RecentMembers from '@/components/dashboard/RecentMembers';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Benvenuto nel sistema di gestione del Club Auto Classiche.
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
            <RecentMembers className="col-span-4" />
            <UpcomingEvents className="col-span-3" />
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-serif mb-4">Statistiche Avanzate</h3>
            <p className="text-muted-foreground">
              Le statistiche avanzate saranno disponibili in una versione futura.
            </p>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-serif mb-4">Rapporti</h3>
            <p className="text-muted-foreground">
              I rapporti saranno disponibili in una versione futura.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
