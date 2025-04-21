'use client'
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, UploadCloud, CheckCircle, AlertCircle, Clock, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

export default function PatientDashboard() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [appointmentType, setAppointmentType] = useState("online");
  const [date, setDate] = useState(null);

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
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="diagnosis">Skin Analysis</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="diagnosis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skin Image Upload</CardTitle>
                <CardDescription>
                  Upload a clear image of the affected skin area for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                    <p className="mt-2 text-sm text-slate-600">
                      Drag and drop an image, or click to browse
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      className="mt-4"
                      onChange={handleImageUpload}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="relative w-full h-64 mb-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded skin"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button onClick={() => setUploadedImage(null)} variant="outline">
                        Remove
                      </Button>
                      <Button onClick={() => setUploadedImage(null)}>
                        Upload New
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-start text-sm text-slate-500">
                <p>• For best results, ensure good lighting and focus</p>
                <p>• Avoid shadows and blurry images</p>
                <p>• Your images are securely stored and processed</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  AI-powered skin condition assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!diagnosisResult && !uploadedImage && (
                  <div className="text-center py-12">
                    <AlertCircle className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-2 text-slate-500">
                      Please upload an image to see analysis results
                    </p>
                  </div>
                )}

                {uploadedImage && !diagnosisResult && (
                  <div className="text-center py-12">
                    <Clock className="mx-auto h-12 w-12 text-blue-500 animate-pulse" />
                    <p className="mt-2 text-slate-700">Analyzing your image...</p>
                    <p className="text-sm text-slate-500">This usually takes a few seconds</p>
                  </div>
                )}

                {diagnosisResult && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-medium">{diagnosisResult.condition}</h3>
                        <p className="text-slate-500 text-sm">
                          Severity: {diagnosisResult.severity}
                        </p>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                        {diagnosisResult.confidence}% Confidence
                      </Badge>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-1">AI Summary</h4>
                      <p className="text-sm text-slate-600">{diagnosisResult.summary}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-1">Recommendations</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {diagnosisResult.recommendations.map((rec, i) => (
                          <li key={i} className="flex gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full">Schedule Doctor Consultation</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Diagnosis History</CardTitle>
              <CardDescription>
                Review your previous skin condition diagnoses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastDiagnoses.map((diagnosis) => (
                  <div
                    key={diagnosis.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{diagnosis.condition}</h3>
                      <p className="text-sm text-slate-500">
                        {diagnosis.date} • Severity: {diagnosis.severity}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          diagnosis.status === "Resolved"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                        }
                      >
                        {diagnosis.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule an Appointment</CardTitle>
                <CardDescription>
                  Consult with a qualified dermatologist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Appointment Type</h3>
                    <RadioGroup
                      value={appointmentType}
                      onValueChange={setAppointmentType}
                      className="flex space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online" className="flex items-center gap-1">
                          <Video className="h-4 w-4" /> Online
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inperson" id="inperson" />
                        <Label htmlFor="inperson">In-person</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="specialty">Specialist</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialist" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dermatologist">Dermatologist</SelectItem>
                        <SelectItem value="allergist">Allergist</SelectItem>
                        <SelectItem value="pediatric-dermatologist">
                          Pediatric Dermatologist
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (1PM - 5PM)</SelectItem>
                        <SelectItem value="evening">Evening (6PM - 8PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      placeholder="Describe your concerns or symptoms"
                      className="resize-none"
                    />
                  </div>

                  <Button className="w-full">Schedule Appointment</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>
                  Your scheduled consultations with specialists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-medium">{appointment.doctor}</h3>
                          <Badge
                            className={
                              appointment.type === "Online"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                            }
                          >
                            {appointment.type}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-500">
                          <p>{appointment.specialty}</p>
                          <p>
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Cancel
                          </Button>
                          {appointment.type === "Online" && (
                            <Button size="sm" className="flex-1">
                              Join Now
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-slate-500">No upcoming appointments</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}