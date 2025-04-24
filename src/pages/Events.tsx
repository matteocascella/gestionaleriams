
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, Car, Loader2, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEventi, Evento } from '@/hooks/useEventi';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';

const Events = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Evento | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    participants: 0,
    carsExpected: 0,
  });

  const { eventi, isLoadingEventi, eventiError, addEvento, updateEvento, isAddingEvento, isUpdatingEvento } = useEventi();
  const { isAdmin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: ['participants', 'carsExpected'].includes(id) ? Number(value) : value
    }));
  };

  const handleOpenDialog = (event?: Evento) => {
    if (event) {
      setCurrentEvent(event);
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        participants: event.participants,
        carsExpected: event.carsExpected,
      });
    } else {
      setCurrentEvent(null);
      setFormData({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        participants: 0,
        carsExpected: 0,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (currentEvent) {
      updateEvento({ id: currentEvent.id, ...formData });
    } else {
      addEvento(formData);
    }
    setIsDialogOpen(false);
  };

  if (isLoadingEventi) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (eventiError) {
    return (
      <div className="p-6 text-center text-destructive">
        Si è verificato un errore nel caricamento degli eventi.
      </div>
    );
  }

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
          {isAdmin && (
            <Button className="bg-vintage-green hover:bg-vintage-green/90" onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" /> Nuovo Evento
            </Button>
          )}
        </div>
        <TabsContent value="upcoming" className="space-y-6">
          {eventi && eventi.length > 0 ? (
            eventi.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="hidden md:block md:w-1/4 bg-gradient-to-br from-vintage-green to-vintage-green/50 text-white p-6 flex flex-col justify-center items-center">
                    <Calendar className="h-12 w-12 mb-2" />
                    <div className="text-center">
                      <div className="text-lg font-bold">{event.date.split(' ')[0] || ''}</div>
                      <div className="text-xl font-bold">{event.date.split(' ')[1] || ''}</div>
                      <div>{event.date.split(' ')[2] || ''}</div>
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
                          {isAdmin && (
                            <Button 
                              variant="outline" 
                              className="text-amber-600 border-amber-600 hover:bg-amber-50"
                              onClick={() => handleOpenDialog(event)}
                            >
                              Modifica
                            </Button>
                          )}
                          <Button className="bg-vintage-burgundy hover:bg-vintage-burgundy/90">
                            Partecipa
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-6">
              <div className="text-center py-8 text-muted-foreground">
                Nessun evento in programma al momento.
              </div>
            </Card>
          )}
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

      {/* Dialog per aggiungere/modificare evento */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{currentEvent ? 'Modifica Evento' : 'Nuovo Evento'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Titolo</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Es: Raduno di Primavera"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input 
                  id="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  placeholder="Es: 15 Maggio 2025"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Orario</Label>
                <Input 
                  id="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                  placeholder="Es: 10:00 - 17:00"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Luogo</Label>
              <Input 
                id="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="Es: Villa Borghese, Roma"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrizione</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Descrivi l'evento..."
                rows={4}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="participants">Partecipanti previsti</Label>
                <Input 
                  id="participants" 
                  type="number"
                  min={0}
                  value={formData.participants} 
                  onChange={handleChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carsExpected">Auto previste</Label>
                <Input 
                  id="carsExpected" 
                  type="number"
                  min={0}
                  value={formData.carsExpected} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            <Button 
              onClick={handleSave} 
              className="w-full bg-vintage-green hover:bg-vintage-green/90 mt-4"
              disabled={isAddingEvento || isUpdatingEvento}
            >
              {(isAddingEvento || isUpdatingEvento) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {currentEvent ? 'Aggiorna Evento' : 'Crea Evento'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
