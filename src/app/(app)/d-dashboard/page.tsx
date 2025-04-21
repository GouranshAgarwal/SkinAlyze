'use client'
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon, Search, Clock, Video, FileText, PlusCircle, MessageSquare, User, ChevronRight, ArrowRight, Star, Clock3, X, Check, Bell } from "lucide-react";
import { format } from "date-fns";
import Sidebar from "@/components/SideBar";

export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMedicationDialog, setShowMedicationDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [prescriptionItems, setPrescriptionItems] = useState([
    { id: 1, name: "", dosage: "", frequency: "", duration: "" }
  ]);

  // Mock data
  const upcomingAppointments = [
    {
      id: 1,
      patientName: "Emma Wilson",
      patientAge: 34,
      date: "Today",
      time: "10:30 AM",
      appointmentType: "Online",
      condition: "Atopic Dermatitis",
      status: "Confirmed",
      image: "/api/placeholder/64/64"
    },
    {
      id: 2,
      patientName: "Michael Chen",
      patientAge: 29,
      date: "Today",
      time: "2:15 PM",
      appointmentType: "In-person",
      condition: "Psoriasis Follow-up",
      status: "Checked-in",
      image: "/api/placeholder/64/64"
    },
    {
      id: 3,
      patientName: "Sophia Rodriguez",
      patientAge: 45,
      date: "Tomorrow",
      time: "11:00 AM",
      appointmentType: "Online",
      condition: "Acne Treatment",
      status: "Confirmed",
      image: "/api/placeholder/64/64"
    },
    {
      id: 4,
      patientName: "James Thompson",
      patientAge: 52,
      date: "Apr 20, 2025",
      time: "3:45 PM",
      appointmentType: "In-person",
      condition: "Skin Cancer Screening",
      status: "Confirmed",
      image: "/api/placeholder/64/64"
    }
  ];

  const patientHistory = [
    {
      id: 1,
      date: "Mar 15, 2025",
      diagnosis: "Atopic Dermatitis",
      severity: "Moderate",
      notes: "Patient reports itching and redness on inner elbows and behind knees. Prescribed hydrocortisone cream.",
      images: ["/api/placeholder/120/120"]
    },
    {
      id: 2,
      date: "Jan 05, 2025",
      diagnosis: "Contact Dermatitis",
      severity: "Mild",
      notes: "Allergic reaction to new soap. Recommended switching to hypoallergenic products and prescribed antihistamines.",
      images: ["/api/placeholder/120/120"]
    }
  ];

  const medications = [
    { id: 1, name: "Hydrocortisone Cream", type: "Topical", recommended: true },
    { id: 2, name: "Triamcinolone Acetonide", type: "Topical", recommended: false },
    { id: 3, name: "Cetirizine", type: "Oral", recommended: true },
    { id: 4, name: "Clobetasol Propionate", type: "Topical", recommended: false },
    { id: 5, name: "Adapalene Gel", type: "Topical", recommended: true },
    { id: 6, name: "Doxycycline", type: "Oral", recommended: false },
    { id: 7, name: "Tacrolimus Ointment", type: "Topical", recommended: true },
    { id: 8, name: "Prednisone", type: "Oral", recommended: false }
  ];

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addPrescriptionItem = () => {
    setPrescriptionItems([
      ...prescriptionItems,
      { id: prescriptionItems.length + 1, name: "", dosage: "", frequency: "", duration: "" }
    ]);
  };

  const removePrescriptionItem = (id) => {
    if (prescriptionItems.length > 1) {
      setPrescriptionItems(prescriptionItems.filter(item => item.id !== id));
    }
  };

  const updatePrescriptionItem = (id, field, value) => {
    setPrescriptionItems(
      prescriptionItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const viewPatientDetails = (patient) => {
    setSelectedPatient(patient);
  };

  const closePatientDetails = () => {
    setSelectedPatient(null);
  };

  const DoctorStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-blue-50 to-violet-50 border-blue-100">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Today's Appointments</p>
              <h3 className="text-2xl font-bold text-slate-800">8</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Completed Today</p>
              <h3 className="text-2xl font-bold text-slate-800">5</h3>
            </div>
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Check className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-600">Pending Reviews</p>
              <h3 className="text-2xl font-bold text-slate-800">12</h3>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock3 className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-100">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Patient Rating</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-slate-800">4.9</h3>
                <div className="flex ml-2">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <User className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const PatientDetails = ({ patient }) => {
    if (!patient) return null;
    const matchingHistory = patientHistory;
    
    return (
      <div className="fixed inset-0 bg-black/30 flex justify-end z-50 overflow-hidden">
        <div className="bg-white w-full max-w-lg h-full overflow-y-auto animate-slide-in-right">
          <div className="p-6 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Patient Details</h2>
            <Button variant="ghost" size="icon" onClick={closePatientDetails}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src={patient.image} alt={patient.patientName} />
                <AvatarFallback>{patient.patientName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{patient.patientName}</h3>
                <p className="text-slate-500">{patient.patientAge} years • Female</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-blue-600 bg-blue-50 hover:bg-blue-50">Recurring Patient</Badge>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-slate-500 mb-2">Appointment Info</h4>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between mb-2">
                    <p className="text-slate-600">Date & Time</p>
                    <p className="font-medium">{patient.date}, {patient.time}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-slate-600">Type</p>
                    <Badge className={patient.appointmentType === "Online" ? 
                      "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                      "bg-purple-100 text-purple-800 hover:bg-purple-100"}>
                      {patient.appointmentType}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-slate-600">Reason</p>
                    <p className="font-medium">{patient.condition}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-slate-500">Medical History</h4>
                <Button variant="ghost" size="sm" className="h-8 text-slate-600">
                  View Full History
                </Button>
              </div>
              
              <div className="space-y-4">
                {matchingHistory.map(record => (
                  <Card key={record.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-2">
                        <h5 className="font-medium">{record.diagnosis}</h5>
                        <Badge className={
                          record.severity === "Mild" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                          record.severity === "Moderate" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" :
                          "bg-red-100 text-red-800 hover:bg-red-100"
                        }>
                          {record.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 mb-3">{record.date}</p>
                      <p className="text-sm mb-3">{record.notes}</p>
                      <div className="flex gap-2">
                        {record.images.map((img, i) => (
                          <div key={i} className="relative h-20 w-20 rounded-md overflow-hidden">
                            <img src={img} alt="Patient skin condition" className="h-full w-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <Button className="flex-1" onClick={() => setShowMedicationDialog(true)}>
                <FileText className="mr-2 h-4 w-4" /> Prescribe
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowRescheduleDialog(true)}>
                <Calendar className="mr-2 h-4 w-4" /> Reschedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar name={"Gouransh"} role={"doctor"}/> {/*do it properly*/}
        
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
              </TabsContent>
              
              <TabsContent value="past">
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
              </TabsContent>
              
              <TabsContent value="requests">
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
                          <Button size="sm" className="flex-1">Accept</Button>
                          <Button variant="outline" size="sm" className="flex-1">Reschedule</Button>
                          <Button variant="ghost" size="sm" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
      
      {/* Patient details side panel */}
      <PatientDetails patient={selectedPatient} />
      
      {/* Prescription Dialog */}
      <Dialog open={showMedicationDialog} onOpenChange={setShowMedicationDialog}>
        {/* Prescription Dialog (continued) */}
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Prescription</DialogTitle>
            <DialogDescription>
              Add medication and dosage information for {selectedPatient?.patientName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <div className="flex items-center justify-between mb-3">
              <Label htmlFor="med-search">Search Medications</Label>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>Clear</Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                id="med-search"
                placeholder="Search medications..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 max-h-40 overflow-y-auto">
              {filteredMedications.map(med => (
                <div 
                  key={med.id}
                  className="p-2 border rounded-md cursor-pointer hover:bg-slate-50 flex items-center justify-between"
                  onClick={() => {
                    // Update the first prescription item or the first empty one
                    const itemToUpdate = prescriptionItems.find(item => !item.name) || prescriptionItems[0];
                    updatePrescriptionItem(itemToUpdate.id, "name", med.name);
                    setSearchQuery("");
                  }}
                >
                  <div>
                    <p className="font-medium text-sm">{med.name}</p>
                    <p className="text-xs text-slate-500">{med.type}</p>
                  </div>
                  {med.recommended && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Recommended</Badge>
                  )}
                </div>
              ))}
              {filteredMedications.length === 0 && (
                <div className="col-span-2 p-3 text-center text-slate-500 text-sm">
                  No medications found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            {prescriptionItems.map((item, index) => (
              <div key={item.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Medication #{index + 1}</h4>
                  {prescriptionItems.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-600"
                      onClick={() => removePrescriptionItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`med-name-${item.id}`}>Medication Name</Label>
                    <Input 
                      id={`med-name-${item.id}`}
                      placeholder="Enter medication name" 
                      value={item.name}
                      onChange={e => updatePrescriptionItem(item.id, "name", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`med-dosage-${item.id}`}>Dosage</Label>
                      <Input 
                        id={`med-dosage-${item.id}`}
                        placeholder="e.g., 10mg" 
                        value={item.dosage}
                        onChange={e => updatePrescriptionItem(item.id, "dosage", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`med-frequency-${item.id}`}>Frequency</Label>
                      <Select 
                        value={item.frequency} 
                        onValueChange={value => updatePrescriptionItem(item.id, "frequency", value)}
                      >
                        <SelectTrigger id={`med-frequency-${item.id}`}>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once-daily">Once daily</SelectItem>
                          <SelectItem value="twice-daily">Twice daily</SelectItem>
                          <SelectItem value="three-times-daily">Three times daily</SelectItem>
                          <SelectItem value="every-morning">Every morning</SelectItem>
                          <SelectItem value="every-night">Every night</SelectItem>
                          <SelectItem value="as-needed">As needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`med-duration-${item.id}`}>Duration</Label>
                    <Select 
                      value={item.duration} 
                      onValueChange={value => updatePrescriptionItem(item.id, "duration", value)}
                    >
                      <SelectTrigger id={`med-duration-${item.id}`}>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-days">3 days</SelectItem>
                        <SelectItem value="5-days">5 days</SelectItem>
                        <SelectItem value="7-days">7 days</SelectItem>
                        <SelectItem value="10-days">10 days</SelectItem>
                        <SelectItem value="14-days">14 days</SelectItem>
                        <SelectItem value="30-days">30 days</SelectItem>
                        <SelectItem value="90-days">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor={`med-instructions-${item.id}`}>Special Instructions</Label>
                    <Textarea 
                      id={`med-instructions-${item.id}`}
                      placeholder="Any special instructions for this medication" 
                      className="h-20"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={addPrescriptionItem}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Another Medication
            </Button>
          </div>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowMedicationDialog(false)}>Cancel</Button>
            <Button className="ml-2">
              <FileText className="mr-2 h-4 w-4" /> Create Prescription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reschedule Appointment Dialog */}
      <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Change appointment date and time for {selectedPatient?.patientName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div>
              <Label className="mb-2 block">Appointment Type</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="in-person" 
                    name="appointment-type" 
                    className="h-4 w-4 text-indigo-600" 
                    defaultChecked={selectedPatient?.appointmentType === "In-person"} 
                  />
                  <Label htmlFor="in-person" className="font-normal cursor-pointer">In-person</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="online" 
                    name="appointment-type" 
                    className="h-4 w-4 text-indigo-600" 
                    defaultChecked={selectedPatient?.appointmentType === "Online"} 
                  />
                  <Label htmlFor="online" className="font-normal cursor-pointer">Online</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Select Time</Label>
              <Select defaultValue="10:00">
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:00">9:00 AM</SelectItem>
                  <SelectItem value="9:30">9:30 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="10:30">10:30 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="11:30">11:30 AM</SelectItem>
                  <SelectItem value="13:00">1:00 PM</SelectItem>
                  <SelectItem value="13:30">1:30 PM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="14:30">2:30 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="15:30">3:30 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                  <SelectItem value="16:30">4:30 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-patient">Send notification to patient</Label>
                <Switch id="notify-patient" defaultChecked />
              </div>
              <p className="text-xs text-slate-500">
                An email and SMS notification will be sent to the patient with the updated appointment details.
              </p>
            </div>
            
            <div>
              <Label htmlFor="reschedule-notes">Notes (optional)</Label>
              <Textarea
                id="reschedule-notes"
                placeholder="Add any notes about this rescheduling"
                className="h-20"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRescheduleDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowRescheduleDialog(false)}>
              Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}