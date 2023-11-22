import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definice typu pro jeden den
interface OneDay {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  totalMinutes: number;
  id: string;
}

// Definice typu pro initialState
interface HoursState {
  sumDays: OneDay[];
  sumMinutes: number;
}

// Načtení hodnot z localStorage nebo použití výchozích hodnot
const sumDaysLS: OneDay[] =
  localStorage.getItem("sumDays") !== null
    ? JSON.parse(localStorage.getItem("sumDays") || "[]")
    : [];

const sumMinutesLS: number =
  localStorage.getItem("sumMinutes") !== null
    ? JSON.parse(localStorage.getItem("sumMinutes") || "0")
    : 0;

// Vytvoření slicu s využitím initialState typu HoursState
export const hoursSlice = createSlice({
  name: "hours",

  initialState: {
    sumDays: sumDaysLS,
    sumMinutes: sumMinutesLS,
  } as HoursState,

  reducers: {
    addDay: (state, action: PayloadAction<OneDay>) => {
      state.sumDays = [action.payload, ...state.sumDays];
      state.sumMinutes = state.sumDays.reduce(
        (total, oneDay) => total + oneDay.totalMinutes,
        0
      );
      localStorage.setItem("sumDays", JSON.stringify(state.sumDays));
      localStorage.setItem("sumMinutes", JSON.stringify(state.sumMinutes));
    },
    deleteDay: (state, action: PayloadAction<string>) => {
      state.sumDays = state.sumDays.filter((oneDay) => {
        return oneDay.id !== action.payload;
      });
      state.sumMinutes = state.sumDays.reduce(
        (total, oneDay) => total + oneDay.totalMinutes,
        0
      );
      localStorage.setItem("sumDays", JSON.stringify(state.sumDays));
      localStorage.setItem("sumMinutes", JSON.stringify(state.sumMinutes));
    },
    deleteAll: (state) => {
      state.sumDays = [];
      state.sumMinutes = 0;
      localStorage.setItem("sumDays", JSON.stringify([]));
      localStorage.setItem("sumMinutes", JSON.stringify(0));
    },
  },
});

export const { addDay, deleteDay, deleteAll } = hoursSlice.actions;

export default hoursSlice.reducer;
