
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { CreditCard, FileText, BadgeCheck, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const CardManagement = () => {
  const { toast } = useToast();

  const handleGenerateCards = () => {
    toast({
      title: "Generazione tessere in corso",
      description: "Le tessere saranno pronte a breve",
    });
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Download template",
      description: "Download del template tessere avviato",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif">Design Tessera</CardTitle>
          <CardDescription>
            Personalizza il layout e il design delle tessere socio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Logo RIAMS</Label>
              <div className="flex items-center gap-2">
                <Input type="file" accept="image/*" />
                <Button variant="outline" size="sm">Upload</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Template Tessera</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full" onClick={handleDownloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Scarica Template
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Orientamento</Label>
            <Select defaultValue="horizontal">
              <SelectTrigger>
                <SelectValue placeholder="Seleziona orientamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Orizzontale</SelectItem>
                <SelectItem value="vertical">Verticale</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>QR Code</Label>
              <Switch defaultChecked />
            </div>
            <p className="text-sm text-muted-foreground">
              Includi QR code per verifica digitale
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Foto Socio</Label>
              <Switch defaultChecked />
            </div>
            <p className="text-sm text-muted-foreground">
              Includi la foto del socio sulla tessera
            </p>
          </div>

          <Button className="w-full" onClick={handleGenerateCards}>
            <CreditCard className="mr-2 h-4 w-4" />
            Genera Tessere
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif">Personalizzazione Campi</CardTitle>
          <CardDescription>
            Seleziona quali informazioni visualizzare sulla tessera
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Numero Tessera</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Nome e Cognome</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Codice Fiscale</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Data di Iscrizione</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Data di Scadenza</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Tipo di Iscrizione</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <BadgeCheck className="mr-2 h-4 w-4" />
            Anteprima Tessera
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Anteprima Tessera</DialogTitle>
            <DialogDescription>
              Verifica il layout della tessera prima della stampa
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-[1.586/1] w-full bg-gradient-to-br from-vintage-burgundy to-vintage-green rounded-lg p-4 text-white">
            <div className="h-full border-2 border-white/20 rounded-lg p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-serif">RIAMS</h3>
                <Badge variant="outline" className="border-white text-white">
                  Premium
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm opacity-80">Tessera N° RIAMS-123456</p>
                <p className="text-lg font-medium">Mario Rossi</p>
                <p className="text-sm opacity-80">Scadenza: 31/12/2024</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline">
              Chiudi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CardManagement;
