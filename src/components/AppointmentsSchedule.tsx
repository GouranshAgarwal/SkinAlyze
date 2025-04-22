// AppointmentsSchedule.jsx
import React from 'react';
import { Clock, Video, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const AppointmentsSchedule = () => {
  // In a real component, we would use state or props
  const upcomingAppointments = [
    {
      id: 1,
      patientName: 'Jane Smith',
      date: 'Today',
      time: '10:00 AM',
      appointmentType: 'Online',
      status: 'Confirmed',
      image: '/api/placeholder/48/48'
    },
    {
      id: 2,
      patientName: 'John Doe',
      date: 'Tomorrow',
      time: '2:30 PM',
      appointmentType: 'In-person',
      status: 'Confirmed',
      image: '/api/placeholder/48/48'
    }
  ];
  
  const viewPatientDetails = (appointment) => {
    // This would handle viewing patient details
    console.log('View patient details', appointment);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <Card className="lg:col-span-3">
        <CardHeader className="pb-3">
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>
            You have {upcomingAppointments.filter(a => a.date === 'Today').length} appointments today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments
              .filter(appointment => appointment.date === 'Today')
              .map(appointment => (
              <div 
                key={appointment.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:border-indigo-200 hover:bg-indigo-50/40 cursor-pointer transition-colors"
                onClick={() => viewPatientDetails(appointment)}
              >
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={appointment.image} alt={appointment.patientName} />
                    <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{appointment.patientName}</h3>
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="h-3 w-3 mr-1" /> {appointment.time}
                      <span className="mx-2">•</span>
                      {appointment.appointmentType === "Online" ? 
                        <span className="flex items-center"><Video className="h-3 w-3 mr-1" /> Online</span> : 
                        <span>In-person</span>
                      }
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Badge className={
                    appointment.status === "Confirmed" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                    appointment.status === "Checked-in" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                    "bg-amber-100 text-amber-800 hover:bg-amber-100"
                  }>
                    {appointment.status}
                  </Badge>
                  <ChevronRight className="h-5 w-5 text-slate-400 ml-3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Upcoming Schedule</CardTitle>
          <CardDescription>
            View your upcoming appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments
              .filter(appointment => appointment.date !== 'Today')
              .map(appointment => (
              <div 
                key={appointment.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:border-indigo-200 hover:bg-indigo-50/40 cursor-pointer transition-colors"
                onClick={() => viewPatientDetails(appointment)}
              >
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={appointment.image} alt={appointment.patientName} />
                    <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-sm">{appointment.patientName}</h3>
                    <div className="flex items-center text-xs text-slate-500">
                      <span>{appointment.date}</span>
                      <span className="mx-1">•</span>
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Badge className={
                    appointment.appointmentType === "Online" ? 
                    "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                    "bg-purple-100 text-purple-800 hover:bg-purple-100"
                  }>
                    {appointment.appointmentType}
                  </Badge>
                  <ChevronRight className="h-5 w-5 text-slate-400 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsSchedule;