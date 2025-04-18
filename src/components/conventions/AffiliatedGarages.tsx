
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AffiliatedGarages = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Garage aggiunto",
      description: "Il garage è stato aggiunto con successo alla lista dei convenzionati.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif">Garage Convenzionati</CardTitle>
        <CardDescription>
          Gestisci i garage convenzionati e gli sconti riservati ai soci.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Aggiungi Garage
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Aggiungi Nuovo Garage</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Garage</Label>
                  <Input id="name" placeholder="Es: Officina Classica" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Indirizzo</Label>
                  <Input id="address" placeholder="Es: Via Roma 123, Milano" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input id="phone" placeholder="Es: +39 02 1234567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Sconto Soci (%)</Label>
                  <Input id="discount" type="number" placeholder="Es: 10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="services">Servizi Offerti</Label>
                  <Input id="services" placeholder="Es: Restauro, Manutenzione, Revisione" />
                </div>
                <Button onClick={handleSave} className="w-full">Salva</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Indirizzo</TableHead>
                <TableHead>Sconto</TableHead>
                <TableHead>Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Officina Classica</TableCell>
                <TableCell>Via Roma 123, Milano</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Restauro d'Epoca</TableCell>
                <TableCell>Via Venezia 45, Roma</TableCell>
                <TableCell>15%</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliatedGarages;
