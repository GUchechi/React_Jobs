import { configureStore } from '@reduxjs/toolkit';
// import jobsReducer from './slices/jobsSlice';

const store = configureStore({
  reducer: {
    // jobs: jobsReducer,
  },
});

export default store;
