import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './JobSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});

export default store;
