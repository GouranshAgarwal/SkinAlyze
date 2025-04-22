// PastAppointments.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const PastAppointments = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Past Appointments</CardTitle>
        <CardDescription>Review your previous patient consultations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src="/api/placeholder/48/48" alt="Patient" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-slate-500">Apr 15, 2025 • 9:00 AM • Acne Treatment</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src="/api/placeholder/48/48" alt="Patient" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Amanda Rodriguez</h3>
                <p className="text-sm text-slate-500">Apr 14, 2025 • 2:30 PM • Rosacea Consultation</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src="/api/placeholder/48/48" alt="Patient" />
                <AvatarFallback>BT</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Benjamin Taylor</h3>
                <p className="text-sm text-slate-500">Apr 12, 2025 • 11:15 AM • Eczema Follow-up</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PastAppointments;