import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StreamsTable = () => {
  const { students } = useSelector((state) => state.students);

  const getStudentCountByStream = (streamName) => {
    return students.reduce((count, student) => {
      return student.stream === streamName ? count + 1 : count;
    }, 0);
  };

  return (
    <div className="card p-3" style={{ width: "18rem" }}>
      <h5 className="card-title d-flex">Admission By Stream</h5>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h6 className="card-subtitle mb-2 text-muted">Computer</h6>
          <h6 className="card-subtitle mb-2 text-muted">
            {getStudentCountByStream("Computer") || 0}
          </h6>
        </div>
        <div className="d-flex justify-content-between">
          <h6 className="card-subtitle mb-2 text-muted">Mechanical</h6>
          <h6 className="card-subtitle mb-2 text-muted">
            {getStudentCountByStream("Mechanical") || 0}
          </h6>
        </div>{" "}
        <div className="d-flex justify-content-between">
          <h6 className="card-subtitle mb-2 text-muted">Electrical</h6>
          <h6 className="card-subtitle mb-2 text-muted">
            {getStudentCountByStream("Electrical") || 0}
          </h6>
        </div>{" "}
        <div className="d-flex justify-content-between">
          <h6 className="card-subtitle mb-2 text-muted">AutoMobile</h6>
          <h6 className="card-subtitle mb-2 text-muted">
            {getStudentCountByStream("Automobile") || 0}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default StreamsTable;
