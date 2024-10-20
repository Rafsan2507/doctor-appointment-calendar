"use client";
import React, { useEffect, useState } from "react";
import CreateAppointment from "../AppointmentComponent/CreateAppointment";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import ShowAppointments from "../AppointmentComponent/ShowAppointments";
type Props = {
    extractedYear?: string;
    extractedMonthIndex?: number;
}
const Home = ({extractedYear, extractedMonthIndex}: Props) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (extractedYear && extractedMonthIndex) {
      setMonth(months[extractedMonthIndex-1]);
      setYear(extractedYear);
    }
  }, [extractedYear, extractedMonthIndex]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 11 }, (_, i) => (2020 + i).toString());


  return (
    <div className="bg-[#fff9f9] h-screen overflow-y-auto">
      <div className="flex my-6 mx-6 justify-between">
        <div className="flex gap-4">
          <div className="w-full">
            <Select onValueChange={(value) => setMonth(value)}>
              <SelectTrigger className="w-[200px] bg-white">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Month</SelectLabel>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <Select onValueChange={(value) => setYear(value)}>
              <SelectTrigger className="w-[200px] bg-white">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Year</SelectLabel>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <CreateAppointment />
        </div>
      </div>

      <div>
        <ShowAppointments month={month} year={year} />
      </div>
    </div>
  );
};

export default Home;
