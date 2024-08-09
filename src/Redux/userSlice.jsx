import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  govenorate: '',
  image: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserData: (state, { payload }) => {
      state.id = payload.id;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
      state.phoneNumber = payload.phoneNumber;
      state.govenorate = payload.govenorate;
      state.image = payload.image;
    },
  },
});

export const { getUserData } = userSlice.actions;
export default userSlice.reducer;
