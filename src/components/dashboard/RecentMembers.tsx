
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface RecentMember {
  id: string;
  name: string;
  joinDate: string;
  membershipType: string;
  vehicles: number;
}

const recentMembers: RecentMember[] = [
  {
    id: '1',
    name: 'Sofia Romano',
    joinDate: '22/09/2024',
    membershipType: 'Standard',
    vehicles: 1,
  },
  {
    id: '2',
    name: 'Paolo Ferrari',
    joinDate: '15/09/2024',
    membershipType: 'Premium',
    vehicles: 2,
  },
  {
    id: '3',
    name: 'Elena Martini',
    joinDate: '10/09/2024',
    membershipType: 'Standard',
    vehicles: 1,
  },
  {
    id: '4',
    name: 'Roberto Conti',
    joinDate: '02/09/2024',
    membershipType: 'Premium',
    vehicles: 3,
  },
];

const RecentMembers = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-serif">Soci Recenti</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-vintage-cream text-vintage-green">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">Iscritto il {member.joinDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={member.membershipType === 'Premium' ? 'default' : 'secondary'} 
                       className={member.membershipType === 'Premium' ? 'bg-vintage-green' : 'bg-vintage-burgundy'}>
                  {member.membershipType}
                </Badge>
                <Button variant="ghost" size="sm" className="text-vintage-burgundy hover:text-vintage-burgundy/80">
                  Profilo
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMembers;
