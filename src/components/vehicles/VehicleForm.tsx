
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

interface VehicleFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

const VehicleForm = ({ initialData, onSubmit }: VehicleFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      brand: '',
      model: '',
      year: '',
      licensePlate: '',
      vin: '',
      color: '',
      category: '',
      owner: '',
      purchaseDate: '',
      condition: 'good',
      description: '',
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif">{initialData ? 'Modifica Veicolo' : 'Nuovo Veicolo'}</CardTitle>
        <CardDescription>
          {initialData 
            ? 'Aggiorna le informazioni del veicolo nel registro del club.' 
            : 'Inserisci le informazioni del nuovo veicolo per registrarlo nel club.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <Input id="brand" {...register('brand', { required: true })} />
              {errors.brand && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Modello</Label>
              <Input id="model" {...register('model', { required: true })} />
              {errors.model && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="year">Anno</Label>
              <Input id="year" type="number" {...register('year', { required: true })} />
              {errors.year && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="licensePlate">Targa</Label>
              <Input id="licensePlate" {...register('licensePlate', { required: true })} />
              {errors.licensePlate && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Colore</Label>
              <Input id="color" {...register('color', { required: true })} />
              {errors.color && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vin">Telaio (VIN)</Label>
              <Input id="vin" {...register('vin', { required: true })} />
              {errors.vin && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select defaultValue={initialData?.category || ''}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Seleziona una categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sportscar">Sports Car</SelectItem>
                  <SelectItem value="coupe">Coupé</SelectItem>
                  <SelectItem value="sedan">Berlina</SelectItem>
                  <SelectItem value="convertible">Cabriolet</SelectItem>
                  <SelectItem value="gt">Grand Tourer</SelectItem>
                  <SelectItem value="citycar">City Car</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="owner">Proprietario</Label>
              <Select defaultValue={initialData?.owner || ''}>
                <SelectTrigger id="owner">
                  <SelectValue placeholder="Seleziona proprietario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Marco Rossi</SelectItem>
                  <SelectItem value="2">Laura Bianchi</SelectItem>
                  <SelectItem value="3">Giuseppe Verdi</SelectItem>
                  <SelectItem value="4">Sofia Romano</SelectItem>
                  <SelectItem value="5">Antonio Esposito</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Condizioni</Label>
              <Select defaultValue={initialData?.condition || 'good'}>
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Seleziona condizioni" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Eccellente</SelectItem>
                  <SelectItem value="good">Buone</SelectItem>
                  <SelectItem value="fair">Discrete</SelectItem>
                  <SelectItem value="poor">Da restaurare</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea
              id="description"
              rows={4}
              {...register('description')}
              placeholder="Aggiungi dettagli sul veicolo, specifiche, storia e altre note rilevanti..."
            />
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <Button type="submit" className="bg-vintage-green hover:bg-vintage-green/90">
              {initialData ? 'Aggiorna Veicolo' : 'Registra Veicolo'}
            </Button>
            <Button type="button" variant="outline">
              Annulla
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VehicleForm;
