import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isEditPage: false,
  isEditClick: false,
  isWithdrawalClick: false,
  error: "",
};

const mypageSlice = createSlice({
  name: "mypageReducer",
  initialState,
  reducers: {
    clickEdit(state) {
      state.isEditClick = true;
    },
    clickClose(state) {
      state.isEditClick = false;
      state.isWithdrawalClick = false;
      state.error = "";
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
    clickWithdrawal(state) {
      state.isWithdrawalClick = true;
    },
    goToEditPage(state) {
      state.isEditPage = true;
      state.isEditClick = false;
    },
  },
});

export const {
  goToEditPage,
  clickEdit,
  clickClose,
  setError,
  clickWithdrawal,
} = mypageSlice.actions;

export const mypageReducer = mypageSlice.reducer;
