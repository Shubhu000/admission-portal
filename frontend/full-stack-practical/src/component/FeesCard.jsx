import React from "react";
import { fees } from "../constant";

const FeesTable = () => {
  return (
    <div className="card p-3" style={{ width: "18rem" }}>
      <h5 className="card-title d-flex">Total Fees By Streams</h5>
      <div className="card-body">
        {fees.map((data, index) => (
          <div className="d-flex justify-content-between" key={index}>
            <h6 className="card-subtitle mb-2 text-muted">{data.stream}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{data.fees}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeesTable;
