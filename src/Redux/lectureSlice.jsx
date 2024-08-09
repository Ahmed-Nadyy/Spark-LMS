import { createSlice } from '@reduxjs/toolkit';

const lectureSlice = createSlice({
  name: 'lecture',
  initialState: null,
  reducers: {
    setLecture: (state, action) => action.payload,
    clearLecture: () => null,
  },
});

export const { setLecture, clearLecture } = lectureSlice.actions;
export default lectureSlice.reducer;
