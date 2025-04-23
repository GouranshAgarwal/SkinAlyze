'use client'
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SkinAnalysis from "@/components/SkinAnalysis";
import History from "@/components/History";
import Appointments from "@/components/Appointments";

export default function PatientDashboard() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  // const [appointmentType, setAppointmentType] = useState("online");
  // const [date, setDate] = useState(null);

  // Mock function to handle image upload
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        // In a real app, you would send the image to your API here

        // For demo purposes, we'll simulate a diagnosis after 2 seconds
        setTimeout(() => {
          setDiagnosisResult({
            condition: "Atopic Dermatitis",
            confidence: 92,
            severity: "Moderate",
            summary: "The AI analysis indicates moderate atopic dermatitis (eczema). The affected area shows typical signs including redness, dry patches, and mild scaling. This condition is chronic but manageable with proper treatment.",
            recommendations: [
              "Apply prescribed topical corticosteroids to reduce inflammation",
              "Moisturize skin regularly with fragrance-free emollients",
              "Avoid known triggers (specific soaps, detergents, stress)",
              "Consider consulting with a dermatologist for personalized treatment"
            ]
          });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const pastDiagnoses = [
    {
      id: 1,
      date: "Apr 10, 2025",
      condition: "Contact Dermatitis",
      severity: "Mild",
      status: "Resolved"
    },
    {
      id: 2,
      date: "Mar 22, 2025",
      condition: "Tinea Corporis",
      severity: "Moderate",
      status: "Follow-up"
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      date: "Apr 25, 2025",
      time: "2:00 PM",
      doctor: "Dr. Sarah Williams",
      type: "Online",
      specialty: "Dermatologist"
    }
  ];

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Skinalyze</h1>
          <p className="text-slate-500">Skin Health Analysis & Consultation</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">Help</Button>
          <Avatar>
            <AvatarImage src="/api/placeholder/32/32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <Tabs defaultValue="diagnosis">
        <TabsList className="grid grid-cols-1 mb-8">
          <TabsTrigger value="diagnosis">Skin Analysis</TabsTrigger>
          {/* <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger> */}
        </TabsList>

        <TabsContent value="diagnosis">
          <SkinAnalysis/>
        </TabsContent>

        {/* <TabsContent value="history">
          <History/>
        </TabsContent> */}

        {/* <TabsContent value="appointments">
          <Appointments/>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}