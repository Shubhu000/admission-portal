import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TotoalAdminssion from "./component/TotoalAdminssionCard";
import StreamsTable from "./component/StreamsCard";
import Dashboard from "./pages/Dashboard";
import AddStudents from "./component/AddStudentsModal";
import { useSelector } from "react-redux";
import PrivateRoute from "./privateRoute";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
