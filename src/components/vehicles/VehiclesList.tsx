
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle } from 'lucide-react';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  owner: string;
  status: string;
  category: string;
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Alfa Romeo',
    model: 'Giulietta Sprint',
    year: 1962,
    licensePlate: 'AR123TQ',
    owner: 'Marco Rossi',
    status: 'Certificato',
    category: 'Sports Car'
  },
  {
    id: '2',
    brand: 'Lancia',
    model: 'Fulvia Coupé',
    year: 1968,
    licensePlate: 'LC456JK',
    owner: 'Laura Bianchi',
    status: 'In Revisione',
    category: 'Coupé'
  },
  {
    id: '3',
    brand: 'Fiat',
    model: '500',
    year: 1971,
    licensePlate: 'FT789OP',
    owner: 'Giuseppe Verdi',
    status: 'Certificato',
    category: 'City Car'
  },
  {
    id: '4',
    brand: 'Ferrari',
    model: '308 GTB',
    year: 1978,
    licensePlate: 'FR246QM',
    owner: 'Giuseppe Verdi',
    status: 'Certificato',
    category: 'Sports Car'
  },
  {
    id: '5',
    brand: 'Maserati',
    model: 'Ghibli',
    year: 1969,
    licensePlate: 'MS357WE',
    owner: 'Antonio Esposito',
    status: 'In Revisione',
    category: 'Grand Tourer'
  },
];

const VehiclesList = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredVehicles = mockVehicles.filter(vehicle => 
    vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-2xl font-serif">Veicoli Registrati</CardTitle>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cerca veicolo..."
                className="w-full sm:w-[260px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-vintage-green hover:bg-vintage-green/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Nuovo Veicolo
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Marca</TableHead>
                <TableHead>Modello</TableHead>
                <TableHead className="hidden md:table-cell">Anno</TableHead>
                <TableHead className="hidden lg:table-cell">Targa</TableHead>
                <TableHead className="hidden md:table-cell">Proprietario</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="hidden lg:table-cell">Categoria</TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.brand}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell className="hidden md:table-cell">{vehicle.year}</TableCell>
                  <TableCell className="hidden lg:table-cell">{vehicle.licensePlate}</TableCell>
                  <TableCell className="hidden md:table-cell">{vehicle.owner}</TableCell>
                  <TableCell>
                    <Badge
                      variant={vehicle.status === 'Certificato' ? 'outline' : 'secondary'}
                      className={
                        vehicle.status === 'Certificato'
                          ? 'border-green-500 text-green-500'
                          : 'bg-amber-500 text-amber-950'
                      }
                    >
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{vehicle.category}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 text-vintage-burgundy hover:text-vintage-burgundy/80">
                      Dettagli
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehiclesList;
