import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Appointment } from "@/redux/AppointmentSlice/AppointmentSlice";
import { format, parseISO } from "date-fns";

type Props = {
  appointment: Appointment;
};

const AppointmentDetails = ({ appointment }: Props) => {
  const formattedDate = appointment.date
    ? format(appointment.date, "MMM d, yyyy")
    : "N/A";
  

  return (
    <Dialog open={true}>
      <DialogTrigger asChild>{appointment.name}</DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg overflow-y-auto max-h-screen bg-[#fff9f9]">
        <DialogHeader>
          <DialogTitle>{appointment.name} Details</DialogTitle>
          <DialogDescription>
            View or modify the details for {appointment.name}.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>
            <strong>Name:</strong> {appointment.name}
          </p>
          <p>
            <strong>Gender:</strong> {appointment.gender}
          </p>
          <p>
            <strong>Age:</strong> {appointment.age}
          </p>
          <p>
            <strong>Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>Time:</strong> {appointment.time}
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="bg-[#106ebe] text-white hover:bg-[#106ebe] hover:text-[#0FFCBE]"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetails;
