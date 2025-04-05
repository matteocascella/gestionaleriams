
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';

interface MemberFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

const MemberForm = ({ initialData, onSubmit }: MemberFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      surname: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      membershipType: 'standard',
      notes: '',
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif">{initialData ? 'Modifica Socio' : 'Nuovo Socio'}</CardTitle>
        <CardDescription>
          {initialData 
            ? 'Aggiorna le informazioni del socio nel database del club.' 
            : 'Inserisci le informazioni del nuovo socio per registrarlo nel club.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register('name', { required: true })} />
              {errors.name && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="surname">Cognome</Label>
              <Input id="surname" {...register('surname', { required: true })} />
              {errors.surname && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email', { required: true })} />
              {errors.email && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefono</Label>
              <Input id="phone" {...register('phone', { required: true })} />
              {errors.phone && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Indirizzo</Label>
            <Input id="address" {...register('address', { required: true })} />
            {errors.address && <p className="text-sm text-destructive">Campo richiesto</p>}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">Città</Label>
              <Input id="city" {...register('city', { required: true })} />
              {errors.city && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">CAP</Label>
              <Input id="postalCode" {...register('postalCode', { required: true })} />
              {errors.postalCode && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="membershipType">Tipo di Iscrizione</Label>
            <Select defaultValue={initialData?.membershipType || 'standard'}>
              <SelectTrigger id="membershipType">
                <SelectValue placeholder="Seleziona tipo iscrizione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="honorary">Onorario</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Note</Label>
            <Input id="notes" {...register('notes')} />
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <Button type="submit" className="bg-vintage-green hover:bg-vintage-green/90">
              {initialData ? 'Aggiorna Socio' : 'Registra Socio'}
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

export default MemberForm;
