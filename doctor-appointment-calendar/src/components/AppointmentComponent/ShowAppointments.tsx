"use client";
import { getAppointmentsByMonth } from "@/redux/AppointmentSlice/AppointmentSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { getDaysInMonth, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../ui/card";
import AppointmentDetails from "../CustomComponents/AppointmentDetails";

type Props = {
  month: string;
  year: string;
};

const ShowAppointments = ({ month, year }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    dispatch(getAppointmentsByMonth({ month, year }));
  }, [dispatch, month, year]);

  const appointments = useSelector(
    (state: RootState) => state.appoints.filteredAppointments
  );

  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const daysInMonth = getDaysInMonth(new Date(Number(year), monthIndex));

  const appointmentsByDate: { [key: number]: any[] } = {};

  appointments.forEach((appointment) => {
    if (appointment.date) {
      const appointmentDate =
        typeof appointment.date === "string"
          ? parseISO(appointment.date)
          : appointment.date;

      const appointmentYear = appointmentDate.getFullYear();
      const appointmentMonth = appointmentDate.getMonth();
      const dayOfMonth = appointmentDate.getDate();

      if (appointmentYear === Number(year) && appointmentMonth === monthIndex) {
        if (!appointmentsByDate[dayOfMonth]) {
          appointmentsByDate[dayOfMonth] = [];
        }
        appointmentsByDate[dayOfMonth].push(appointment);
      }
    }
  });

  const handleClick = (appointment: any) => {
    setSelectedAppointment(appointment);
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-6 gap-2 mx-4">
        {Array.from({ length: daysInMonth }, (_, dayIndex) => {
          const day = dayIndex + 1;
          const dayAppointments = appointmentsByDate[day] || [];

          return (
            <Card
              key={day}
              className="border border-black p-2 rounded-sm h-[10vh] overflow-y-auto bg-[#106ebe] text-white"
            >
              <div className="font-bold">
                {day} {month} {year}
              </div>
              <div>
                {dayAppointments.length > 0 ? (
                  dayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="mt-2 cursor-pointer hover:text-[#0FFCBE]"
                      onClick={() => handleClick(appointment)}
                    >
                      {appointment.name} - {appointment.time}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400">No appointments</div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {selectedAppointment && (
        <AppointmentDetails appointment={selectedAppointment} />
      )}
    </div>
  );
};

export default ShowAppointments;
