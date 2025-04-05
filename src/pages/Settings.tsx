import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Impostazioni</h1>
        <p className="text-muted-foreground">
          Gestisci le impostazioni del registro e configura le preferenze dell'applicazione.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Generale</TabsTrigger>
          <TabsTrigger value="membership">Iscrizioni</TabsTrigger>
          <TabsTrigger value="cards">Tessere</TabsTrigger>
          <TabsTrigger value="notifications">Notifiche</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Informazioni Registro</CardTitle>
              <CardDescription>
                Configura le informazioni generali del registro italiano auto e moto storiche.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="club-name">Nome del Registro</Label>
                <Input id="club-name" defaultValue="RIAMS - Registro Italiano Auto e Moto Storiche" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="club-address">Indirizzo Sede</Label>
                <Input id="club-address" defaultValue="Via delle Auto Antiche, 123, Roma" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email Contatto</Label>
                  <Input id="contact-email" type="email" defaultValue="info@riams.it" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Telefono</Label>
                  <Input id="contact-phone" defaultValue="+39 06 1234567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="club-description">Descrizione</Label>
                <Input id="club-description" defaultValue="Registro ufficiale italiano dedicato agli appassionati di auto e moto d'epoca." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="club-foundation">Anno di Fondazione</Label>
                <Input id="club-foundation" defaultValue="1982" />
              </div>
              <Button className="bg-vintage-green hover:bg-vintage-green/90">
                Salva Modifiche
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="membership">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Configurazione Iscrizioni</CardTitle>
              <CardDescription>
                Gestisci le tipologie di iscrizione e le relative quote.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tipi di Iscrizione</h3>
                <div className="border rounded-md">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Standard</h4>
                        <p className="text-sm text-muted-foreground">Iscrizione base al club</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input className="w-24" defaultValue="75" />
                        <span>€</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Premium</h4>
                        <p className="text-sm text-muted-foreground">Iscrizione avanzata con benefici esclusivi</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input className="w-24" defaultValue="150" />
                        <span>€</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Onorario</h4>
                        <p className="text-sm text-muted-foreground">Per soci benemeriti e fondatori</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input className="w-24" defaultValue="0" />
                        <span>€</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-renewal">Rinnovo Automatico</Label>
                  <Switch id="auto-renewal" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Abilita il rinnovo automatico delle iscrizioni alla scadenza
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="renewal-reminders">Promemoria Rinnovo</Label>
                  <Switch id="renewal-reminders" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Invia promemoria via email 30 giorni prima della scadenza
                </p>
              </div>
              
              <Button className="bg-vintage-green hover:bg-vintage-green/90">
                Salva Modifiche
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cards">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Gestione Tessere</CardTitle>
              <CardDescription>
                Configura le tessere associate e gestisci le scadenze.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Impostazioni Tessere</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="card-prefix">Prefisso Numero Tessera</Label>
                    <Input id="card-prefix" defaultValue="RIAMS-" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-digits">Cifre Numero Tessera</Label>
                    <Select defaultValue="6">
                      <SelectTrigger id="card-digits">
                        <SelectValue placeholder="Seleziona numero cifre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">4 cifre</SelectItem>
                        <SelectItem value="5">5 cifre</SelectItem>
                        <SelectItem value="6">6 cifre</SelectItem>
                        <SelectItem value="7">7 cifre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="card-expiry">Durata Validità Tessera</Label>
                  <Select defaultValue="365">
                    <SelectTrigger id="card-expiry">
                      <SelectValue placeholder="Seleziona durata validità" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="182">6 mesi</SelectItem>
                      <SelectItem value="365">1 anno</SelectItem>
                      <SelectItem value="730">2 anni</SelectItem>
                      <SelectItem value="1095">3 anni</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="expiry-notifications">Notifiche Scadenza</Label>
                    <Switch id="expiry-notifications" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Invia notifiche automatiche di scadenza tessera ai soci
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notification-days">Giorni di Preavviso</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="notification-days">
                      <SelectValue placeholder="Seleziona giorni di preavviso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 giorni</SelectItem>
                      <SelectItem value="30">30 giorni</SelectItem>
                      <SelectItem value="45">45 giorni</SelectItem>
                      <SelectItem value="60">60 giorni</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="card-qr">Codice QR su Tessera</Label>
                    <Switch id="card-qr" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Genera automaticamente un codice QR per ogni tessera
                  </p>
                </div>
              </div>
              
              <Button className="bg-vintage-green hover:bg-vintage-green/90">
                Salva Modifiche
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Impostazioni Notifiche</CardTitle>
              <CardDescription>
                Configura il sistema di notifiche del club.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-events">Notifiche Eventi</Label>
                  <Switch id="email-events" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Invia notifiche via email per nuovi eventi
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-membership">Notifiche Iscrizioni</Label>
                  <Switch id="email-membership" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Invia notifiche via email per scadenze e rinnovi
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-newsletter">Newsletter Mensile</Label>
                  <Switch id="email-newsletter" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Invia newsletter mensile con notizie e aggiornamenti
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="email-template">Template Email</Label>
                <Select>
                  <SelectTrigger id="email-template">
                    <SelectValue placeholder="Seleziona template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="vintage">Vintage</SelectItem>
                    <SelectItem value="modern">Moderno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="bg-vintage-green hover:bg-vintage-green/90">
                Salva Modifiche
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Impostazioni Sistema</CardTitle>
              <CardDescription>
                Configura le impostazioni tecniche dell'applicazione.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Tema Scuro</Label>
                  <Switch id="dark-mode" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Abilita il tema scuro per l'interfaccia
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-backup">Backup Automatico</Label>
                  <Switch id="auto-backup" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Esegui backup automatico dei dati giornalmente
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="analytics">Analytics</Label>
                  <Switch id="analytics" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Raccogli dati di utilizzo anonimi per migliorare l'applicazione
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="language">Lingua</Label>
                <Select defaultValue="it">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Seleziona lingua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">Italiano</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="bg-vintage-green hover:bg-vintage-green/90">
                Salva Modifiche
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
