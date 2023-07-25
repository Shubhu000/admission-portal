import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STUDENTS_URL = "http://localhost:5000/api/";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const { data, status } = await axios.get(STUDENTS_URL + "dashboard");
    data.status = status;
    return data;
  }
);

export const registerStudent = createAsyncThunk(
  "clerk/registerStudent",
  async (payload) => {
    const { data, status } = await axios.post(
      STUDENTS_URL + "add-students",
      payload
    );
    data.status = status;
    return data;
  }
);

const initialState = {
  students: [] || null,
  student: {},
  status: "idle",
  error: null,
  fetch: false,
};

const StudentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerStudent.pending, (state) => {
        state.status = "loading";
        state.fetch = false;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student = action.payload;
        state.fetch = true;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.fetch = false;
      });
  },
});

export default StudentSlice.reducer;
