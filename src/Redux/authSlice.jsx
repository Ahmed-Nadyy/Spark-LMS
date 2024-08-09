import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  role: '',
  username: '',
  firstName: '',
  lastName: '',
  email:"",
  dob: '',
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
    },
    isStudent: (state) => {
    state.role = 'student';
    },
    isTeacher: (state) => {
      state.role = 'Teacher';
    },
    setName: (state,{payload}) => {
      state.firstName = payload;
    },
    setEmail: (state,{payload}) => {
      state.email = payload;
    },

  }
});

export const { loginSuccess, logoutSuccess , isStudent ,isTeacher, setName ,setEmail } = authSlice.actions;
export default authSlice.reducer;
