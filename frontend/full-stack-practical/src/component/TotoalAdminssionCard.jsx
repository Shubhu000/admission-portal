import React from "react";
import { useSelector } from "react-redux";

const TotoalAdminssion = () => {
  const { students } = useSelector((state) => state.students);
  const todayDate = new Date().toDateString();
  const totalCount = students.filter(
    (item) => new Date(item.createdAt).toDateString() === todayDate
  );

  return (
    <div className="card p-3" style={{ width: "18rem" }}>
      <h5 className="d-flex">Today's Admission</h5>
      <div className="card-body d-flex align-items-center justify-content-center">
        <h2 className="card-subtitle mb-2">{totalCount?.length || 0}</h2>
      </div>
    </div>
  );
};

export default TotoalAdminssion;
