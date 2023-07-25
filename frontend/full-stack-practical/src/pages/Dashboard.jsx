import React from "react";
import Header from "../component/Header";
import TotoalAdminssion from "../component/TotoalAdminssionCard";
import StreamsTable from "../component/StreamsCard";
import FeesTable from "../component/FeesCard";
import StudenTable from "../component/StudentTable";
import WithAuth from "../privateRoute";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="d-flex justify-content-between mt-5">
          <TotoalAdminssion />
          <StreamsTable />
          <FeesTable />
        </div>
        <div className="mt-5">
          <StudenTable />
        </div>
      </div>
    </>
  );
};

export default WithAuth(Dashboard);
