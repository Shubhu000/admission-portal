import React, { useState } from "react";
import TotoalAdminssion from "./TotoalAdminssionCard";
import StreamsTable from "./StreamsCard";
import FeesTable from "./FeesCard";
import StudenTable from "./StudentTable";
import AddStudents from "./AddStudentsModal";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container-fluid">
        <h2 className="navbar-brand fw-bold">Admission Dashboard</h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <p onClick={handleShow} className="nav-link text-white cursor">
                Admission Form
              </p>
            </li>
            <li className="nav-item">
              <p className="nav-link text-white cursor" onClick={handleLogout}>
                Logout
              </p>
            </li>
          </ul>
          <AddStudents show={show} handleClose={handleClose} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
