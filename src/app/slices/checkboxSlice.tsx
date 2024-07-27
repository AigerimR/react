import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CheckboxState = number[];

const initialState: CheckboxState = [];

export const checkboxSlice = createSlice({
  name: "checkboxList",
  initialState,
  reducers: {
    addToCheckboxList: (state, action: PayloadAction<number>) => {
      state.push(action.payload);
    },
    removeFromCheckboxList: (state, action: PayloadAction<number>) => {
      const i = state.indexOf(action.payload);
      if (i !== -1) {
        state.splice(i, 1);
      }
    },
  },
});

export const { addToCheckboxList, removeFromCheckboxList } =
  checkboxSlice.actions;

export default checkboxSlice.reducer;
