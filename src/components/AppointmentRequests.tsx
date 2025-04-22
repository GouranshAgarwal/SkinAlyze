// AppointmentRequests.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const AppointmentRequests = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Requests</CardTitle>
        <CardDescription>Review and respond to new appointment requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/api/placeholder/40/40" alt="Patient" />
                  <AvatarFallback>LM</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Leila Morrison</h3>
                  <p className="text-sm text-slate-500">New Patient • Skin Rash Consultation</p>
                </div>
              </div>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
            </div>
            
            <div className="mb-3">
              <p className="text-sm mb-2">
                "I've developed a rash on my arms and neck that hasn't responded to over-the-counter treatments. Would like to get it checked as soon as possible."
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-50">Requested: Online</Badge>
                <Badge variant="outline" className="bg-blue-50">Apr 22, Afternoon</Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">Accept</Button>
              <Button variant="outline" size="sm" className="flex-1">Reschedule</Button>
              <Button variant="ghost" size="sm" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                Decline
              </Button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/api/placeholder/40/40" alt="Patient" />
                  <AvatarFallback>PL</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Peter Liu</h3>
                  <p className="text-sm text-slate-500">Returning Patient • Psoriasis Follow-up</p>
                </div>
              </div>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
            </div>
            
            <div className="mb-3">
              <p className="text-sm mb-2">
                "My psoriasis symptoms have returned. Would like to discuss adjusting my treatment plan."
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-50">Requested: In-person</Badge>
                <Badge variant="outline" className="bg-blue-50">Apr 21, Morning</Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              {/* <Button size="sm" className="flex-1">Accept</Button> */}
              <Button variant="outline" size="sm" className="flex-1">Reschedule</Button>
              <Button variant="ghost" size="sm" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                Decline
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentRequests;