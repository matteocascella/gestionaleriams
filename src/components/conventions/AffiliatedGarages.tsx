
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useGarageConvenzionati } from '@/hooks/useGarageConvenzionati';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const AffiliatedGarages = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentGarage, setCurrentGarage] = useState<any>(null);
  const [garageToDelete, setGarageToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    discount: 0,
    services: '',
  });

  const { 
    garages, 
    isLoadingGarages, 
    addGarage, 
    updateGarage, 
    deleteGarage,
    isAddingGarage,
    isUpdatingGarage,
    isDeletingGarage
  } = useGarageConvenzionati();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'discount' ? Number(value) : value
    }));
  };

  const handleEdit = (garage: any) => {
    setCurrentGarage(garage);
    setFormData({
      name: garage.name,
      address: garage.address,
      phone: garage.phone,
      discount: garage.discount,
      services: garage.services,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setGarageToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (garageToDelete) {
      deleteGarage(garageToDelete);
      setIsDeleteDialogOpen(false);
      setGarageToDelete(null);
    }
  };

  const handleSave = () => {
    if (currentGarage) {
      updateGarage({ id: currentGarage.id, ...formData });
    } else {
      addGarage(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      discount: 0,
      services: '',
    });
    setCurrentGarage(null);
  };

  const handleOpenDialog = () => {
    resetForm();
    setIsDialogOpen(true);
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
          <Button onClick={handleOpenDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi Garage
          </Button>

          {isLoadingGarages ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
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
                {garages && garages.length > 0 ? (
                  garages.map((garage) => (
                    <TableRow key={garage.id}>
                      <TableCell className="font-medium">{garage.name}</TableCell>
                      <TableCell>{garage.address}</TableCell>
                      <TableCell>{garage.discount}%</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit(garage)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(garage.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Nessun garage convenzionato trovato. Aggiungi il primo!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          {/* Dialog per aggiungere/modificare garage */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{currentGarage ? 'Modifica Garage' : 'Aggiungi Nuovo Garage'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Garage</Label>
                  <Input 
                    id="name" 
                    placeholder="Es: Officina Classica" 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Indirizzo</Label>
                  <Input 
                    id="address" 
                    placeholder="Es: Via Roma 123, Milano" 
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input 
                    id="phone" 
                    placeholder="Es: +39 02 1234567" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Sconto Soci (%)</Label>
                  <Input 
                    id="discount" 
                    type="number" 
                    placeholder="Es: 10" 
                    value={formData.discount}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="services">Servizi Offerti</Label>
                  <Input 
                    id="services" 
                    placeholder="Es: Restauro, Manutenzione, Revisione" 
                    value={formData.services}
                    onChange={handleChange}
                  />
                </div>
                <Button 
                  onClick={handleSave} 
                  className="w-full"
                  disabled={isAddingGarage || isUpdatingGarage}
                >
                  {(isAddingGarage || isUpdatingGarage) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {currentGarage ? 'Aggiorna' : 'Salva'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Dialog di conferma eliminazione */}
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
                <AlertDialogDescription>
                  Sei sicuro di voler eliminare questo garage dalla lista dei convenzionati? Questa azione non può essere annullata.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annulla</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={confirmDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={isDeletingGarage}
                >
                  {isDeletingGarage && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Elimina
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliatedGarages;
