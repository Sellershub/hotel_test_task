import { createSlice } from "@reduxjs/toolkit";

const chambermaidSlice = createSlice({
  name: "chambermaidSlice",

  initialState: {
    chambermaid: [
      {
        id: 1,
        name: "John",
        hotelName: "Hotel A",
        free: [{ start: "", end: "" }],
      },
      {
        id: 2,
        name: "Alice",
        hotelName: "Hotel A",
        free: [
          { start: "", end: "" },
          { start: "", end: "" },
        ],
      },
      {
        id: 3,
        name: "Bob",
        hotelName: "Hotel B",
        free: [{ start: "", end: "" }],
      },
      {
        id: 4,
        name: "Eva",
        hotelName: "Hotel A",
        free: [{ start: "", end: "" }],
      },
      {
        id: 5,
        name: "Mike",
        hotelName: "Hotel C",
        free: [{ start: "", end: "" }],
      },
      {
        id: 6,
        name: "Sarah",
        hotelName: "Hotel A",
        free: [{ start: "", end: "" }],
      },
      {
        id: 7,
        name: "Tom",
        hotelName: "Hotel A",
        free: [{ start: "", end: "" }],
      },
      {
        id: 8,
        name: "Olivia",
        hotelName: "Hotel C",
        free: [{ start: "", end: "" }],
      },
      {
        id: 9,
        name: "Jack",
        hotelName: "Hotel B",
        free: [{ start: "", end: "" }],
      },
      {
        id: 10,
        name: "Emma",
        hotelName: "Hotel A",
        free: [{ start: "", end: "" }],
      },
    ],
    hotels: [
      {
        id: "1",
        titleTask: "clean a room",
        name: "Hotel A",
        duration: { start: 12345678, end: 123456789 },
        deadline: 123456789,
        chambermaid: "Olivia",
      },
    ],
  },
  reducers: {
    setChambermaid: (state, action) => {
      for (let i = 0; i < state.chambermaid.length; i++) {
        if (state.chambermaid[i].name === action.payload.name) {
          state.chambermaid[i].free.push(action.payload.taskTime);
        }
      }
    },
    setHotels: (state, action) => {
      state.hotels.push(action.payload);
    },
  },
});

const chambermaidReducer = chambermaidSlice.reducer;
export const { setChambermaid, setHotels } = chambermaidSlice.actions;
export { chambermaidReducer };
