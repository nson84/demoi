import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthentication: false,
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
  },
};

export const accountSilde = createSlice({
  name: "account",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    LoginAction: (state, action) => {
      state.isAuthentication = true;
      state.user = action.payload;
    },
    getLoginAction: (state, action) => {
      state.isAuthentication = true;
      state.user = action.payload.user;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
  },

  extraReducers: (builder) => {},
});

export const { LoginAction, getLoginAction } = accountSilde.actions;

export default accountSilde.reducer;
