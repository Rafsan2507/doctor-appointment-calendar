import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getMonth, parseISO } from "date-fns";

export interface Appointment {
  id?: string;
  name: string;
  gender: string;
  age: number;
  date?: Date;
  time: string;
}
export interface AppointmentState {
  appointments: Appointment[];
  filteredAppointments: Appointment[];
}

const initialState: AppointmentState = {
  appointments: [],
  filteredAppointments: [],
};
const Base_URL = "http://localhost:5000";
export const AppointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(createAppointment.fulfilled, (state, action) => {
      state.appointments.push(action.payload);
    });
    builder
    .addCase(getAppointmentsByMonth.fulfilled, (state, action) => {
      state.filteredAppointments = action.payload;
    })
  },
});

export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (appointment: Appointment) => {
    const response = await axios.post(`${Base_URL}/appointments`, appointment);
    return response.data;
  }
);

export const getAppointmentsByMonth = createAsyncThunk(
    "appointments/getByMonth",
    async ({ month, year }: { month: string; year: string }) => {
      const response = await axios.get(`${Base_URL}/appointments`);
      const allAppointments: Appointment[] = response.data;
  
      const monthIndex = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      };
  
      const filteredAppointments = allAppointments.filter((appointment) => {
        if (appointment.date) {
          const appointmentDate = parseISO(appointment.date as unknown as string); // Ensure date parsing
          const appointmentMonth = appointmentDate.getMonth();
          const appointmentYear = appointmentDate.getFullYear();
  
    
          return (
            appointmentMonth === monthIndex[month as keyof typeof monthIndex] &&
            appointmentYear === parseInt(year, 10)
          );
        }
        return false;
      });
  
      return filteredAppointments;
    }
  );
export default AppointmentSlice.reducer;
