
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: number;
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Raduno Primavera',
    date: '15/04/2025',
    location: 'Parco Villa Borghese, Roma',
    participants: 48,
  },
  {
    id: '2',
    title: 'Gita sui Colli Toscani',
    date: '03/05/2025',
    location: 'Siena, Toscana',
    participants: 32,
  },
  {
    id: '3',
    title: 'Mostra Auto d\'Epoca',
    date: '20/05/2025',
    location: 'Milano Fiera, Milano',
    participants: 56,
  },
];

const UpcomingEvents = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-serif">Prossimi Eventi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-start space-x-3">
                <div className="rounded-md bg-vintage-cream p-2 text-vintage-green">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{event.participants}</span> partecipanti
                </div>
                <Button variant="outline" size="sm">
                  Dettagli
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
