import * as z from 'zod';

export const appointmentSchema = z.object({
  appointmentType: z.enum(['online', 'inperson'], { required_error: "Select appointment type" }),
  specialty: z.string().min(1, "Select a specialty"),
  date: z.date({ required_error: "Select a date" }),
  time: z.enum(['morning', 'afternoon', 'evening'], { required_error: "Select a time" }),
  notes: z.string().optional()
});
