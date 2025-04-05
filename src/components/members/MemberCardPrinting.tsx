
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Printer, FileText, BadgeCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for member types
const membershipTypes = [
  { id: 'standard', name: 'Standard', color: 'bg-blue-100 text-blue-800' },
  { id: 'premium', name: 'Premium', color: 'bg-purple-100 text-purple-800' },
  { id: 'honorary', name: 'Onorario', color: 'bg-amber-100 text-amber-800' },
];

// Mock data for members
const mockMembers = [
  { id: '1', name: 'Mario Rossi', cardNumber: 'RIAMS-000001', membershipType: 'standard', expiryDate: '31/12/2025', taxCode: 'RSSMRA80A01H501U' },
  { id: '2', name: 'Laura Bianchi', cardNumber: 'RIAMS-000002', membershipType: 'premium', expiryDate: '31/12/2025', taxCode: 'BNCLRA75M41H501W' },
  { id: '3', name: 'Giuseppe Verdi', cardNumber: 'RIAMS-000003', membershipType: 'honorary', expiryDate: '31/12/2025', taxCode: 'VRDGPP70H06H501J' },
  { id: '4', name: 'Anna Neri', cardNumber: 'RIAMS-000004', membershipType: 'standard', expiryDate: '31/12/2025', taxCode: 'NRENNA82B42H501X' },
  { id: '5', name: 'Roberto Gialli', cardNumber: 'RIAMS-000005', membershipType: 'premium', expiryDate: '31/12/2025', taxCode: 'GLLRRT65C19H501Y' },
];

const MemberCardPrinting = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredMembers = selectedType === 'all' 
    ? mockMembers 
    : mockMembers.filter(member => member.membershipType === selectedType);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMembers(filteredMembers.map(member => member.id));
    } else {
      setSelectedMembers([]);
    }
  };

  const handleSelectMember = (memberId: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers(prev => [...prev, memberId]);
    } else {
      setSelectedMembers(prev => prev.filter(id => id !== memberId));
    }
  };

  const handlePrintCards = () => {
    if (selectedMembers.length === 0) {
      toast({
        title: "Nessun socio selezionato",
        description: "Seleziona almeno un socio per stampare le tessere",
        variant: "destructive",
      });
      return;
    }

    const membersToPrint = mockMembers.filter(member => selectedMembers.includes(member.id));
    console.log('Printing cards for:', membersToPrint);
    
    // In a real application, this would generate PDF cards for printing
    // For demo purposes, we'll just show a toast
    toast({
      title: "Stampa delle tessere avviata",
      description: `Stampando ${membersToPrint.length} tessere`,
    });

    // Reset selection after printing
    setSelectedMembers([]);
  };

  const handleExportList = () => {
    if (selectedMembers.length === 0) {
      toast({
        title: "Nessun socio selezionato",
        description: "Seleziona almeno un socio per esportare la lista",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would generate a CSV/Excel file
    // For demo purposes, we'll just show a toast
    toast({
      title: "Esportazione lista avviata",
      description: `Esportando dati di ${selectedMembers.length} soci`,
    });
  };

  const getMembershipTypeColor = (type: string) => {
    const membership = membershipTypes.find(m => m.id === type);
    return membership ? membership.color : 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif">Stampa Tessere</CardTitle>
        <CardDescription>
          Stampa tessere per tipologia di socio o singoli membri.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="membership-type">Filtra per Tipologia</Label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger id="membership-type" className="w-full">
              <SelectValue placeholder="Seleziona tipologia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le Tipologie</SelectItem>
              {membershipTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={filteredMembers.length > 0 && selectedMembers.length === filteredMembers.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Numero Tessera</TableHead>
                <TableHead>Tipologia</TableHead>
                <TableHead>Scadenza</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedMembers.includes(member.id)}
                        onCheckedChange={(checked) => handleSelectMember(member.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.cardNumber}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMembershipTypeColor(member.membershipType)}`}>
                        {membershipTypes.find(t => t.id === member.membershipType)?.name || member.membershipType}
                      </span>
                    </TableCell>
                    <TableCell>{member.expiryDate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    Nessun socio trovato con i filtri selezionati
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between space-x-2">
          <span className="text-sm text-muted-foreground py-2">
            {selectedMembers.length} {selectedMembers.length === 1 ? 'socio selezionato' : 'soci selezionati'}
          </span>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExportList} disabled={selectedMembers.length === 0}>
              <FileText className="mr-2 h-4 w-4" /> Esporta Lista
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="bg-vintage-green hover:bg-vintage-green/90"
                  disabled={selectedMembers.length === 0}
                >
                  <Printer className="mr-2 h-4 w-4" /> Stampa Tessere
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Stampa Tessere</DialogTitle>
                  <DialogDescription>
                    Stai per stampare {selectedMembers.length} {selectedMembers.length === 1 ? 'tessera' : 'tessere'}.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-4">
                    <BadgeCheck className="h-10 w-10 text-vintage-green" />
                    <div>
                      <p className="font-medium">Conferma Stampa</p>
                      <p className="text-sm text-muted-foreground">
                        Le tessere saranno generate in formato PDF pronte per la stampa.
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {}} className="w-full sm:w-auto">Annulla</Button>
                  <Button 
                    onClick={handlePrintCards} 
                    className="w-full sm:w-auto bg-vintage-green hover:bg-vintage-green/90"
                  >
                    Conferma
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCardPrinting;
