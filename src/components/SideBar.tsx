import { CalendarIcon, Clock, FileText, MessageSquare, User } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export interface Sidebar{
  name:string;
  role:string;
  DoctorSpecialization?:string;
}

export default function Sidebar({
    name,
    role,
    DoctorSpecialization,
    ...props
    // add more fields
} : Sidebar){
    return (
        <div className="w-64 bg-white border-r border-slate-200 fixed h-full hidden md:block">
          <div className="p-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Skinalyze MD</h1>
            <p className="text-slate-500 text-sm mt-1">Dermatology Platform</p>
          </div>
          
          <div className="px-3">
            <div className="flex flex-col gap-1">
              <Button variant="ghost" className="justify-start h-10">
                <CalendarIcon className="mr-2 h-4 w-4" /> Dashboard
              </Button>
              <Button variant="ghost" className="justify-start h-10 bg-slate-100">
                <Clock className="mr-2 h-4 w-4" /> Appointments
              </Button>
              <Button variant="ghost" className="justify-start h-10">
                <User className="mr-2 h-4 w-4" /> {role === "doctor" ? "Patients" : "Doctors"}
              </Button>
              <Button variant="ghost" className="justify-start h-10">
                <FileText className="mr-2 h-4 w-4" /> Prescriptions
              </Button>
              <Button variant="ghost" className="justify-start h-10">
                <MessageSquare className="mr-2 h-4 w-4" /> Messages
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/api/placeholder/40/40" alt={name} />
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="font-medium text-sm truncate">{role === "doctor" ? "Dr. "+name : name}</p>
                {role === "doctor" ? (<p className="text-slate-500 text-xs">{DoctorSpecialization}</p>) : <div></div>}
              </div>
            </div>
          </div>
        </div>
    )
}