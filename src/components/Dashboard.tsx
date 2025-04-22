// Dashboard.jsx
import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Sidebar from './SideBar';
import DoctorStats from './DoctorStats';
import AppointmentsSchedule from './AppointmentsSchedule';
import PastAppointments from './PastAppointments';
import AppointmentRequests from './AppointmentRequests';
import PatientDetails from './PatientDetails';
import PrescriptionDialog from './PrescriptionDialog';
import RescheduleDialog from './RescheduleDialog';

const Dashboard = () => {
  // State would be defined here in a real component
  const selectedPatient = null; // This would be state
  const showMedicationDialog = false; // This would be state
  const setShowMedicationDialog = () => {}; // This would be a state setter
  const showRescheduleDialog = false; // This would be state
  const setShowRescheduleDialog = () => {}; // This would be a state setter
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar name={"Gouransh"} role={"doctor"}/>
        
        {/* Main content */}
        <div className="flex-1 md:ml-64">
          <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">
            <div className="flex items-center md:hidden">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Skinalyze MD</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Avatar className="h-8 w-8 md:hidden">
                <AvatarImage src="#" alt="Dr. Sarah Williams" />
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          <main className="p-6">
            <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>
            
            <DoctorStats />
            
            <Tabs defaultValue="upcoming">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past Appointments</TabsTrigger>
                <TabsTrigger value="requests">Appointment Requests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <AppointmentsSchedule />
              </TabsContent>
              
              <TabsContent value="past">
                <PastAppointments />
              </TabsContent>
              
              <TabsContent value="requests">
                <AppointmentRequests />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
      
      {/* Patient details side panel */}
      <PatientDetails patient={selectedPatient} />
      
      {/* Dialogs */}
      <PrescriptionDialog 
        open={showMedicationDialog} 
        onOpenChange={setShowMedicationDialog} 
        patient={selectedPatient} 
      />
      
      <RescheduleDialog 
        open={showRescheduleDialog} 
        onOpenChange={setShowRescheduleDialog} 
        patient={selectedPatient} 
      />
    </div>
  );
};

export default Dashboard;