import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Userinfo = {
  name: string;
  nickname: string;
  email: string;
  password: string;
};
const initialState = {
  isEditPage: false,
  isEditClick: false,
  error: "",
  userinfo: { name: "", nickname: "", email: "", password: "" } as Userinfo,
  isNicknameChecked: false,
  isPasswordChecked: false,
  isWithdrawalClick: false,
  nickname: "",
  password: "",
  passwordCheck: "",
};

const mypageSlice = createSlice({
  name: "mypageReducer",
  initialState,
  reducers: {
    setNickname(state, { payload }: PayloadAction<string>) {
      state.nickname = payload;
    },
    setPassword(state, { payload }: PayloadAction<string>) {
      state.password = payload;
    },
    setPasswordCheck(state, { payload }: PayloadAction<string>) {
      state.passwordCheck = payload;
    },
    clickNicknameCheckbox(state) {
      state.isNicknameChecked = !state.isNicknameChecked;
      state.nickname = "";
    },
    clickPasswordCheckbox(state) {
      state.isPasswordChecked = !state.isPasswordChecked;
      state.password = "";
      state.passwordCheck = "";
    },
    setUserinfo(state, { payload }: PayloadAction<Userinfo>) {
      state.userinfo = payload;
    },
    clickEdit(state) {
      state.isEditClick = true;
    },
    goToEditPage(state) {
      state.isEditPage = true;
      state.isEditClick = false;
    },
    goToMyPage(state) {
      state.isEditPage = false;
      state.isEditClick = false;
      state.isPasswordChecked = false;
      state.isNicknameChecked = false;
      state.isWithdrawalClick = false;
      state.error = "";
      state.nickname = "";
      state.password = "";
      state.passwordCheck = "";
    },
    clickWithdrawal(state) {
      state.isWithdrawalClick = true;
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
    clickClose(state) {
      state.isEditClick = false;
      state.isWithdrawalClick = false;
      state.error = "";
    },
  },
});

export const {
  setNickname,
  setPassword,
  setPasswordCheck,
  clickNicknameCheckbox,
  clickPasswordCheckbox,
  setUserinfo,
  goToMyPage,
  goToEditPage,
  clickEdit,
  clickClose,
  setError,
  clickWithdrawal,
} = mypageSlice.actions;

export const mypageReducer = mypageSlice.reducer;
