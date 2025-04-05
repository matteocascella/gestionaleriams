
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Car, Calendar, TrendingUp } from 'lucide-react';

const StatCards = () => {
  const stats = [
    {
      title: 'Soci Totali',
      value: '124',
      description: '+6 questo mese',
      icon: <Users className="h-8 w-8 text-vintage-green" />,
      color: 'bg-green-50',
    },
    {
      title: 'Veicoli Registrati',
      value: '237',
      description: '+12 questo mese',
      icon: <Car className="h-8 w-8 text-vintage-burgundy" />,
      color: 'bg-red-50',
    },
    {
      title: 'Eventi Programmati',
      value: '8',
      description: 'Prossimi 3 mesi',
      icon: <Calendar className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-50',
    },
    {
      title: 'Tasso di Rinnovo',
      value: '94%',
      description: '+2% rispetto al 2023',
      icon: <TrendingUp className="h-8 w-8 text-amber-500" />,
      color: 'bg-amber-50',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className={`p-4 ${stat.color}`}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">{stat.title}</CardTitle>
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className="text-sm text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatCards;
