import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  status: "idle",
  error: null,
};


// Add Jobs
export const addJob = createAsyncThunk("jobs/addJob", async (newJob) => {
  const response = await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newJob),
  });
  if (!response.ok) {
    throw new Error("Failed to add job");
  }
  return response.json();
});

// Delete a job
export const deleteJob = createAsyncThunk("jobs/deleteJob", async (id) => {
  const response = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete job");
  }
  return id;
});

// Update a job
export const updateJob = createAsyncThunk("jobs/updateJob", async (job) => {
  const response = await fetch(`/api/jobs/${job.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  if (!response.ok) {
    throw new Error("Failed to update job");
  }
  return response.json();
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(
          (job) => job.id === action.payload.id
        );
        state.jobs[index] = action.payload;
      });
  },
});

export default jobsSlice.reducer;
