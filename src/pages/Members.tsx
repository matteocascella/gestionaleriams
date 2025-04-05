
import React from 'react';
import MembersList from '@/components/members/MembersList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const Members = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Gestione Soci</h1>
        <p className="text-muted-foreground">
          Gestisci i soci del club, visualizza le loro informazioni e i veicoli associati.
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tutti i Soci</TabsTrigger>
          <TabsTrigger value="active">Attivi</TabsTrigger>
          <TabsTrigger value="expired">Scaduti</TabsTrigger>
          <TabsTrigger value="suspended">Sospesi</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <MembersList />
        </TabsContent>
        <TabsContent value="active">
          <Card className="p-6">
            <h3 className="text-xl font-serif mb-4">Soci Attivi</h3>
            <p className="text-muted-foreground">
              Questa sezione mostrerà solo i soci con iscrizione attiva.
            </p>
          </Card>
        </TabsContent>
        <TabsContent value="expired">
          <Card className="p-6">
            <h3 className="text-xl font-serif mb-4">Soci Scaduti</h3>
            <p className="text-muted-foreground">
              Questa sezione mostrerà i soci con iscrizione scaduta.
            </p>
          </Card>
        </TabsContent>
        <TabsContent value="suspended">
          <Card className="p-6">
            <h3 className="text-xl font-serif mb-4">Soci Sospesi</h3>
            <p className="text-muted-foreground">
              Questa sezione mostrerà i soci la cui iscrizione è stata sospesa.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Members;
