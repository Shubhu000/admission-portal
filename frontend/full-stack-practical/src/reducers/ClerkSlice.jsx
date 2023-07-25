import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CLERK_URL = "http://localhost:5000/api/";

export const loginUser = createAsyncThunk(
  "clerk/loginUser",
  async (payload) => {
    const { data, status } = await axios.post(CLERK_URL + "login", payload);
    data.status = status;
    return data;
  }
);

export const registerUser = createAsyncThunk(
  "clerk/registerUser",
  async (payload) => {
    const { data, status } = await axios.post(CLERK_URL + "register", payload);
    data.status = status;
    return data;
  }
);

const initialState = {
  clerk: [],
  token: "",
  status: "idle",
  error: null,
};

const ClerkSlice = createSlice({
  name: "clerk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clerk = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clerk = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ClerkSlice.reducer;
