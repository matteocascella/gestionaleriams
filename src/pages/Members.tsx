
import React from 'react';
import MembersList from '@/components/members/MembersList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Members = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Gestione Soci</h1>
        <p className="text-muted-foreground">
          Gestisci i soci del registro, visualizza le tessere e monitora le scadenze.
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tutti i Soci</TabsTrigger>
          <TabsTrigger value="active">Attivi</TabsTrigger>
          <TabsTrigger value="expired">Scaduti</TabsTrigger>
          <TabsTrigger value="expiring">In Scadenza</TabsTrigger>
          <TabsTrigger value="suspended">Sospesi</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <MembersList />
        </TabsContent>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Soci Attivi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Questa sezione mostrerà solo i soci con iscrizione attiva.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expired">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Soci Scaduti</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Questa sezione mostrerà i soci con iscrizione scaduta.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expiring">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Soci in Scadenza</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Questa sezione mostrerà i soci con tessera in scadenza al 31 dicembre dell'anno corrente.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="suspended">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Soci Sospesi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Questa sezione mostrerà i soci la cui iscrizione è stata sospesa.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Members;
