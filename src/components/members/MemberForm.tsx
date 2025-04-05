
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';

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
      taxCode: '',  // Added codice fiscale
      address: '',
      city: '',
      postalCode: '',
      membershipType: 'standard',
      cardNumber: '',
      cardExpiryDate: '',
      notes: '',
    }
  });

  // Get current year for the expiry date
  const currentYear = new Date().getFullYear();
  // Generate December 31st of current year
  const defaultExpiryDate = `${currentYear}-12-31`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif">{initialData ? 'Modifica Socio' : 'Nuovo Socio'}</CardTitle>
        <CardDescription>
          {initialData 
            ? 'Aggiorna le informazioni del socio nel database del registro.' 
            : 'Inserisci le informazioni del nuovo socio per registrarlo nel registro.'}
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

          <div className="space-y-2">
            <Label htmlFor="taxCode">Codice Fiscale</Label>
            <Input id="taxCode" {...register('taxCode', { required: true })} />
            {errors.taxCode && <p className="text-sm text-destructive">Campo richiesto</p>}
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

          <Separator className="my-4" />
          
          <h3 className="text-lg font-medium">Informazioni Tessera</h3>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Numero Tessera</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">RIAMS-</span>
                <Input 
                  id="cardNumber" 
                  {...register('cardNumber')} 
                  placeholder="123456"
                  className="flex-1"
                />
              </div>
              {errors.cardNumber && <p className="text-sm text-destructive">Campo richiesto</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardExpiryDate">Scadenza Tessera</Label>
              <Input 
                id="cardExpiryDate" 
                type="date" 
                {...register('cardExpiryDate')} 
                className="flex-1"
                disabled
                defaultValue={defaultExpiryDate}
              />
              <p className="text-xs text-muted-foreground">La tessera scade sempre il 31 dicembre dell'anno corrente</p>
              {initialData?.cardExpiryDate && (
                <div className="mt-2">
                  <Badge className={initialData?.isExpired ? 'bg-red-500' : 'bg-vintage-green'}>
                    {initialData?.isExpired ? 'Scaduta' : 'Valida'}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Note</Label>
            <Input id="notes" {...register('notes')} />
          </div>

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
