import { configureStore } from "@reduxjs/toolkit";
import StudentSlice from "../reducers/StudentSlice";
import ClerkSlice from "../reducers/ClerkSlice";

const store = configureStore({
  reducer: {
    students: StudentSlice,
    clerk: ClerkSlice,
  },
});

export default store;
