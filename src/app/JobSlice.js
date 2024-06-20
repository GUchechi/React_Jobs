import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  status: "idle",
  error: null,
};

// Thunks
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (isHome) => {
  const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
});

// Add Jobs
export const addJob = createAsyncThunk("jobs/addJob", async (newJob) => {
  const response = await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newJob),
  });
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
