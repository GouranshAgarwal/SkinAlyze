// // RescheduleDialog.jsx
// import React, { useState } from 'react';
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { Textarea } from '@/components/ui/textarea';

// const RescheduleDialog = ({ open, onOpenChange, patient }) => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Reschedule Appointment</DialogTitle>
//           <DialogDescription>
//             Change appointment date and time for {patient?.patientName}
//           </DialogDescription>
//         </DialogHeader>
        
//         <div className="space-y-4 py-2">
//           <div>
//             <Label className="mb-2 block">Appointment Type</Label>
//             <div className="flex gap-4">
//               <div className="flex items-center space-x-2">
//                 <input 
//                   type="radio" 
//                   id="in-person" 
//                   name="appointment-type" 
//                   className="h-4 w-4 text-indigo-600" 
//                   defaultChecked={patient?.appointmentType === "In-person"} 
//                 />
//                 <Label htmlFor="in-person" className="font-normal cursor-pointer">In-person</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <input 
//                   type="radio" 
//                   id="online" 
//                   name="appointment-type" 
//                   className="h-4 w-4 text-indigo-600" 
//                   defaultChecked={patient?.appointmentType === "Online"} 
//                 />
//                 <Label htmlFor="online" className="font-normal cursor-pointer">Online</Label>
//               </div>
//             </div>
//           </div>
          
//           <div className="space-y-2">
//             <Label>Select Date</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start text-left font-normal"
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   selected={selectedDate}
//                   onSelect={setSelectedDate}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>
          
//           <div className="space-y-2">
//             <Label>Select Time</Label>
//             <Select defaultValue="10:00">
//               <SelectTrigger>
//                 <SelectValue placeholder="Select time" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="9:00">9:00 AM</SelectItem>
//                 <SelectItem value="9:30">9:30 AM</SelectItem>
//                 <SelectItem value="10:00">10:00 AM</SelectItem>
//                 <SelectItem value="10:30">10:30 AM</SelectItem>
//                 <SelectItem value="11:00">11:00 AM</SelectItem>
//                 <SelectItem value="11:30">11:30 AM</SelectItem>
//                 <SelectItem value="13:00">1:00 PM</SelectItem>
//                 <SelectItem value="13:30">1:30 PM</SelectItem>
//                 <SelectItem value="14:00">2:00 PM</SelectItem>
//                 <SelectItem value="14:30">2:30 PM</SelectItem>
//                 <SelectItem value="15:00">3:00 PM</SelectItem>
//                 <SelectItem value="15:30">3:30 PM</SelectItem>
//                 <SelectItem value="16:00">4:00 PM</SelectItem>
//                 <SelectItem value="16:30">4:30 PM</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
          
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="notify-patient">Send notification to patient</Label>
//               <Switch id="notify-patient" defaultChecked />
//             </div>
//             <p className="text-xs text-slate-500">
//               An email and SMS notification will be sent to the patient with the updated appointment details.
//             </p>
//           </div>
          
//           <div>
//             <Label htmlFor="reschedule-notes">Notes (optional)</Label>
//             <Textarea
//               id="reschedule-notes"
//               placeholder="Add any notes about this rescheduling"
//               className="h-20"
//             />
//           </div>
//         </div>
        
//         <DialogFooter>
//           <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
//           <Button onClick={() => onOpenChange(false)}>
//             Reschedule
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default RescheduleDialog;

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const times = [
  "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

const RescheduleDialog = ({ open, onOpenChange, patient }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      appointmentType: patient?.appointmentType || "In-person",
      date: null,
      time: "10:00",
      notify: true,
      notes: ""
    }
  });

  const onSubmit = (data) => {
    console.log("Reschedule Form Data:", data);
    // here you can call your actual backend API
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            Change appointment date and time for {patient?.patientName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Appointment Type */}
          <div>
            <Label className="mb-2 block">Appointment Type</Label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="In-person" {...register("appointmentType")} />
                <span>In-person</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="Online" {...register("appointmentType")} />
                <span>Online</span>
              </label>
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP") : "Select a date"}
                    </Button>
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
              )}
            />
          </div>

          {/* Time Picker */}
          <div className="space-y-2">
            <Label>Select Time</Label>
            <Controller
              control={control}
              name="time"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {times.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Notify Switch */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="notify-patient">Send notification to patient</Label>
              <Controller
                control={control}
                name="notify"
                render={({ field }) => (
                  <Switch id="notify-patient" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
            <p className="text-xs text-slate-500">
              An email and SMS notification will be sent to the patient.
            </p>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes"
              className="h-20"
              {...register("notes")}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" onClick={()=>onOpenChange(true)}>Reschedule</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleDialog;
