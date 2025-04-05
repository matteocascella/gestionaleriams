
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, Car } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  participants: number;
  carsExpected: number;
  image?: string;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Raduno Primavera',
    date: '15 Aprile 2025',
    time: '10:00 - 17:00',
    location: 'Parco Villa Borghese, Roma',
    description: 'Il tradizionale raduno di primavera del nostro club. Un\'occasione per ammirare le auto storiche dei soci e condividere la passione per i motori d\'epoca.',
    participants: 48,
    carsExpected: 35,
  },
  {
    id: '2',
    title: 'Gita sui Colli Toscani',
    date: '3 Maggio 2025',
    time: '09:00 - 18:00',
    location: 'Siena, Toscana',
    description: 'Un percorso panoramico attraverso le colline toscane, con tappe in borghi medievali e degustazioni di prodotti tipici.',
    participants: 32,
    carsExpected: 20,
  },
  {
    id: '3',
    title: 'Mostra Auto d\'Epoca',
    date: '20 Maggio 2025',
    time: '09:30 - 19:00',
    location: 'Milano Fiera, Milano',
    description: 'Partecipazione alla grande fiera internazionale di auto d\'epoca. Il club avrà uno stand dedicato per esporre i modelli più prestigiosi.',
    participants: 56,
    carsExpected: 15,
  },
  {
    id: '4',
    title: 'Concorso d\'Eleganza',
    date: '12 Giugno 2025',
    time: '14:00 - 20:00',
    location: 'Villa d\'Este, Como',
    description: 'Partecipazione al prestigioso concorso d\'eleganza, con premi per le auto meglio conservate e restaurate.',
    participants: 40,
    carsExpected: 25,
  },
];

const Events = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Eventi</h1>
        <p className="text-muted-foreground">
          Calendario degli eventi organizzati dal club e partecipazioni a manifestazioni.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="upcoming">In Programma</TabsTrigger>
            <TabsTrigger value="past">Passati</TabsTrigger>
            <TabsTrigger value="calendar">Calendario</TabsTrigger>
          </TabsList>
          <Button className="bg-vintage-green hover:bg-vintage-green/90">
            Nuovo Evento
          </Button>
        </div>
        <TabsContent value="upcoming" className="space-y-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="md:flex">
                <div className={`hidden md:block md:w-1/4 bg-gradient-to-br from-vintage-green to-vintage-green/50 text-white p-6 flex flex-col justify-center items-center`}>
                  <Calendar className="h-12 w-12 mb-2" />
                  <div className="text-center">
                    <div className="text-lg font-bold">{event.date.split(' ')[0]}</div>
                    <div className="text-xl font-bold">{event.date.split(' ')[1]}</div>
                    <div>{event.date.split(' ')[2]}</div>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>{event.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{event.participants} partecipanti registrati</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span>{event.carsExpected} auto previste</span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline">Dettagli</Button>
                        <Button className="bg-vintage-burgundy hover:bg-vintage-burgundy/90">
                          Partecipa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="past">
          <Card className="p-6">
            <h3 className="text-xl font-serif mb-4">Eventi Passati</h3>
            <p className="text-muted-foreground">
              Qui verranno visualizzati gli eventi passati con foto e resoconti.
            </p>
          </Card>
        </TabsContent>
        <TabsContent value="calendar">
          <Card className="p-6">
            <h3 className="text-xl font-serif mb-4">Calendario Annuale</h3>
            <p className="text-muted-foreground">
              Visualizzazione del calendario con tutti gli eventi programmati.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;
