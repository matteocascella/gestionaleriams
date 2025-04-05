
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle, CreditCard, AlertCircle } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  membershipType: string;
  status: string;
  vehicles: number;
  cardNumber: string;
  cardExpiry: string;
  isExpiring: boolean;
}

const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Marco Rossi',
    email: 'marco.rossi@example.com',
    phone: '+39 333 1234567',
    memberSince: '12/04/2019',
    membershipType: 'Premium',
    status: 'Attivo',
    vehicles: 2,
    cardNumber: 'RIAMS-123456',
    cardExpiry: '15/04/2025',
    isExpiring: false,
  },
  {
    id: '2',
    name: 'Laura Bianchi',
    email: 'laura.bianchi@example.com',
    phone: '+39 333 7654321',
    memberSince: '03/06/2020',
    membershipType: 'Standard',
    status: 'Attivo',
    vehicles: 1,
    cardNumber: 'RIAMS-234567',
    cardExpiry: '10/05/2024',
    isExpiring: true,
  },
  {
    id: '3',
    name: 'Giuseppe Verdi',
    email: 'giuseppe.verdi@example.com',
    phone: '+39 333 9876543',
    memberSince: '15/01/2018',
    membershipType: 'Premium',
    status: 'Scaduto',
    vehicles: 3,
    cardNumber: 'RIAMS-345678',
    cardExpiry: '20/03/2024',
    isExpiring: false,
  },
  {
    id: '4',
    name: 'Sofia Romano',
    email: 'sofia.romano@example.com',
    phone: '+39 333 5432167',
    memberSince: '22/09/2021',
    membershipType: 'Standard',
    status: 'Attivo',
    vehicles: 1,
    cardNumber: 'RIAMS-456789',
    cardExpiry: '05/11/2024',
    isExpiring: false,
  },
  {
    id: '5',
    name: 'Antonio Esposito',
    email: 'antonio.esposito@example.com',
    phone: '+39 333 4569870',
    memberSince: '07/11/2020',
    membershipType: 'Premium',
    status: 'Sospeso',
    vehicles: 2,
    cardNumber: 'RIAMS-567890',
    cardExpiry: '15/12/2023',
    isExpiring: false,
  },
];

const MembersList = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredMembers = mockMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.cardNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-2xl font-serif">Elenco Soci</CardTitle>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cerca socio o tessera..."
                className="w-full sm:w-[260px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-vintage-green hover:bg-vintage-green/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Nuovo Socio
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Telefono</TableHead>
                <TableHead className="hidden md:table-cell">Iscrizione</TableHead>
                <TableHead className="hidden lg:table-cell">Tipo</TableHead>
                <TableHead>N. Tessera</TableHead>
                <TableHead>Scadenza</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                  <TableCell className="hidden lg:table-cell">{member.phone}</TableCell>
                  <TableCell className="hidden md:table-cell font-sm">{member.memberSince}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant={member.membershipType === 'Premium' ? 'default' : 'secondary'} className={member.membershipType === 'Premium' ? 'bg-vintage-green' : 'bg-vintage-burgundy'}>
                      {member.membershipType}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-3 w-3 text-muted-foreground" />
                      {member.cardNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {member.isExpiring && (
                        <AlertCircle className="mr-1 h-3 w-3 text-amber-500" />
                      )}
                      {member.cardExpiry}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={member.status === 'Attivo' ? 'outline' : 'destructive'} 
                           className={
                             member.status === 'Attivo' 
                               ? 'border-green-500 text-green-500' 
                               : member.status === 'Sospeso' 
                               ? 'bg-amber-500' 
                               : ''
                           }>
                      {member.status}
                    </Badge>
                  </TableCell>
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

export default MembersList;
