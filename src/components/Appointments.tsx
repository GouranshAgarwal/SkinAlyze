// 'use client'
// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarIcon, Video } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { format } from "date-fns";

// export default function Appointments() {
//   const [appointmentType, setAppointmentType] = useState("online");
//   const [date, setDate] = useState(null);

//   const upcomingAppointments = [
//     {
//       id: 1,
//       date: "Apr 25, 2025",
//       time: "2:00 PM",
//       doctor: "Dr. Sarah Williams",
//       type: "Online",
//       specialty: "Dermatologist"
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Schedule an Appointment</CardTitle>
//           <CardDescription>
//             Consult with a qualified dermatologist
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-sm font-medium mb-2">Appointment Type</h3>
//               <RadioGroup
//                 value={appointmentType}
//                 onValueChange={setAppointmentType}
//                 className="flex space-x-2"
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="online" id="online" />
//                   <Label htmlFor="online" className="flex items-center gap-1">
//                     <Video className="h-4 w-4" /> Online
//                   </Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="inperson" id="inperson" />
//                   <Label htmlFor="inperson">In-person</Label>
//                 </div>
//               </RadioGroup>
//             </div>

//             <div>
//               <Label htmlFor="specialty">Specialist</Label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select specialist" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="dermatologist">Dermatologist</SelectItem>
//                   <SelectItem value="allergist">Allergist</SelectItem>
//                   <SelectItem value="pediatric-dermatologist">
//                     Pediatric Dermatologist
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label>Select Date</Label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start text-left font-normal"
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {date ? format(date, "PPP") : "Pick a date"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     selected={date}
//                     onSelect={setDate}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>

//             <div>
//               <Label htmlFor="time">Preferred Time</Label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select time" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
//                   <SelectItem value="afternoon">Afternoon (1PM - 5PM)</SelectItem>
//                   <SelectItem value="evening">Evening (6PM - 8PM)</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="notes">Notes (Optional)</Label>
//               <Textarea
//                 placeholder="Describe your concerns or symptoms"
//                 className="resize-none"
//               />
//             </div>

//             <Button className="w-full">Schedule Appointment</Button>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Upcoming Appointments</CardTitle>
//           <CardDescription>
//             Your scheduled consultations with specialists
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {upcomingAppointments.length > 0 ? (
//               upcomingAppointments.map((appointment) => (
//                 <div
//                   key={appointment.id}
//                   className="border rounded-lg p-4 space-y-3"
//                 >
//                   <div className="flex justify-between">
//                     <h3 className="font-medium">{appointment.doctor}</h3>
//                     <Badge
//                       className={
//                         appointment.type === "Online"
//                           ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
//                           : "bg-purple-100 text-purple-800 hover:bg-purple-100"
//                       }
//                     >
//                       {appointment.type}
//                     </Badge>
//                   </div>
//                   <div className="text-sm text-slate-500">
//                     <p>{appointment.specialty}</p>
//                     <p>
//                       {appointment.date} at {appointment.time}
//                     </p>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button variant="outline" size="sm" className="flex-1">
//                       Reschedule
//                     </Button>
//                     <Button variant="outline" size="sm" className="flex-1">
//                       Cancel
//                     </Button>
//                     {appointment.type === "Online" && (
//                       <Button size="sm" className="flex-1">
//                         Join Now
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-12">
//                 <p className="text-slate-500">No upcoming appointments</p>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { appointmentSchema } from "@/types/AppointmentSchema"
import * as z from 'zod'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"

export default async function Appointments() {
  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      appointmentType: "online",
      specialty: "",
      date: undefined,
      time: undefined,
      notes: ""
    }
  });

  const onSubmit = async(data: z.infer<typeof appointmentSchema>) => {
    const response = await axios.post("/api/appointment", data); // check if data sent is correct in format
    // toast.success("Appointment Scheduled!");
    console.log("Form submitted:", data);
    console.log("response :", response);
  }

  const date = new Date(Date.now());

  const upcomingAppointments = await axios.get(`/api/appointment?date=${date}`);
  console.log("upcoming appointments", upcomingAppointments);
  // [
  //   {
  //     id: 1,
  //     date: "Apr 25, 2025",
  //     time: "2:00 PM",
  //     doctor: "Dr. Sarah Williams",
  //     type: "Online",
  //     specialty: "Dermatologist"
  //   }
  // ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Schedule an Appointment</CardTitle>
          <CardDescription>Consult with a qualified dermatologist</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Appointment Type */}
              <FormField
                control={form.control}
                name="appointmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Type</FormLabel>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Specialist */}
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialist</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialist" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dermatologist">Dermatologist</SelectItem>
                        <SelectItem value="allergist">Allergist</SelectItem>
                        <SelectItem value="pediatric-dermatologist">Pediatric Dermatologist</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (1PM - 5PM)</SelectItem>
                        <SelectItem value="evening">Evening (6PM - 8PM)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your concerns or symptoms" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Schedule Appointment
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled consultations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{appointment.doctor}</h3>
                    <Badge
                      className={appointment.type === "Online" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}>
                      {appointment.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p>{appointment.specialty}</p>
                    <p>{appointment.date} at {appointment.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Reschedule</Button>
                    <Button variant="outline" size="sm" className="flex-1">Cancel</Button>
                    {appointment.type === "Online" && (
                      <Button size="sm" className="flex-1">Join Now</Button>
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
  )
}
