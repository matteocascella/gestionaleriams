
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Loader2 } from 'lucide-react';
import { useEventi } from '@/hooks/useEventi';
import { Link } from 'react-router-dom';
import { parse } from 'date-fns';

const UpcomingEvents = () => {
  const { eventi, isLoadingEventi } = useEventi();
  
  // Ordina gli eventi per data (più vicini per primi) e prendi i primi 3
  const upcomingEvents = eventi
    ? [...eventi]
        .sort((a, b) => {
          const dateA = parse(a.date, 'dd/MM/yyyy', new Date());
          const dateB = parse(b.date, 'dd/MM/yyyy', new Date());
          return dateA.getTime() - dateB.getTime();
        })
        .slice(0, 3)
    : [];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-serif">Prossimi Eventi</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoadingEventi ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : upcomingEvents.length > 0 ? (
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
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/eventi/${event.id}`}>Dettagli</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center text-muted-foreground">
            Nessun evento in programma
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
