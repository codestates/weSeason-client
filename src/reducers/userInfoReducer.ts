import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  nickName: '',
  email: '',
  password: '',
  passwordCheck: '',
};

const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {
    changeName(state, action) {
      const name: string = action.payload;
      state.name = name;
    },
    changeNickName(state, action) {
      const nickname: string = action.payload;
      state.nickName = nickname;
    },
    changeEmail(state, action) {
      const email: string = action.payload;
      state.email = email;
    },
    changePassword(state, action) {
      const password: string = action.payload;
      state.password = password;
    },
    changePasswordCheck(state, action) {
      const passwordCheck: string = action.payload;
      state.passwordCheck = passwordCheck;
    },
  },
});

export const {
  changeName,
  changeNickName,
  changeEmail,
  changePassword,
  changePasswordCheck,
} = userInfoSlice.actions;

export const userInfoReducer = userInfoSlice.reducer;
