"use client";
import React, { useState } from "react";
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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Calendar } from "../ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Appointment,
  createAppointment,
} from "@/redux/AppointmentSlice/AppointmentSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
type Props = {};

const CreateAppointment = (props: Props) => {
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("00:00");
  const dispatch = useDispatch<AppDispatch>();

  const genders = ["Male", "Female"];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: Appointment = {
      name,
      gender,
      age,
      date,
      time,
    };
    dispatch(createAppointment(data));
    setName("");
    setGender("");
    setAge(0);
    setDate(undefined);
    setTime("00:00");
    
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#0FFCBE] text-[#106ebe] hover:bg-[#0FFCBE] hover:text-[#106ebe] font-semibold mb-[2vh]">
          Create Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg overflow-y-auto max-h-screen bg-[#fff9f9]">
        <DialogHeader>
          <DialogTitle>Create Appointment</DialogTitle>
          <DialogDescription>
            Create your appointment info here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 w-full">
                <Label htmlFor="name" className="font-semibold">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex gap-4">

              <div className="flex flex-col gap-4 w-full">
                <Label htmlFor="gender" className="font-semibold">Gender</Label>
                <Select onValueChange={(value) => setGender(value)}>
                  <SelectTrigger className="w-[450px]">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      {genders.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <Label htmlFor="age" className="font-semibold">Age</Label>
                <Input
                  type="number"
                  id="age"
                  placeholder="age"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                />
              </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <Label htmlFor="date" className="font-semibold">Appointment Date and Time</Label>
              <div className="flex gap-4">
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>Pick a Date</span>
                        )}
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
                  <Select
                    defaultValue={time!}
                    onValueChange={(e) => {
                      setTime(e);
                      if (date) {
                        const [hours, minutes] = e.split(":");
                        const newDate = new Date(date.getTime());
                        newDate.setHours(parseInt(hours), parseInt(minutes));
                        setDate(newDate);
                      }
                    }}
                  >
                    <SelectTrigger className="font-normal focus:ring-0 w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="h-[15rem]">
                        {Array.from({ length: 96 }).map((_, i) => {
                          const hour = Math.floor(i / 4)
                            .toString()
                            .padStart(2, "0");
                          const minute = ((i % 4) * 15)
                            .toString()
                            .padStart(2, "0");
                          return (
                            <SelectItem key={i} value={`${hour}:${minute}`}>
                              {hour}:{minute}
                            </SelectItem>
                          );
                        })}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="bg-[#106ebe] text-white hover:bg-[#106ebe] hover:text-[#0FFCBE]">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppointment;
