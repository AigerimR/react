import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type form1State = {
  name: string;
  age: number;
  email: string;
  password1: string;
  password2: string;
  gender: string;
  agreement: string;
  file: string;
};

const initialState: form1State = {
  name: "",
  age: 0,
  email: "",
  password1: "",
  password2: "",
  gender: "",
  agreement: "",
  file: "",
};

export const form1Slice = createSlice({
  name: "form1",
  initialState,
  reducers: {
    saveForm1Values: (state, action: PayloadAction<form1State>) => {
      return { ...state, ...action.payload };
    },
    clearForm1Values: () => initialState,
  },
});

export const { saveForm1Values, clearForm1Values } = form1Slice.actions;

export default form1Slice.reducer;
