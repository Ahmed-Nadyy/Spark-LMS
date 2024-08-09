import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import quizziesReducer from './quizziesSlice';
import userReducer from './userSlice';
import lectureReducer from './lectureSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    quizzies: quizziesReducer,
    user: userReducer,
    lecture: lectureReducer,
  },
});

export default store;
