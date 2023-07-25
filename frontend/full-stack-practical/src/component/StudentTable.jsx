import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../reducers/StudentSlice";
import { fees } from "../constant/index";

const StudenTable = () => {
  const dispatch = useDispatch();
  const [studentList, setStudentList] = useState([]);
  const { fetch } = useSelector((state) => state.students);

  const getAllStudents = async () => {
    const res = await dispatch(fetchStudents());
    if (!res.payload) {
      return;
    }
    if (res?.payload?.status === 200) {
      setStudentList(res?.payload);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, [dispatch, fetch]);
  return (
    <div className="card p-3">
      <h5 className="card-title d-flex">Recent Admission</h5>
      <hr />
      <div className="card-body">
        <div className="container">
          <div className="table-responsive bg-white">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Student Name</th>
                  <th scope="col">Stream</th>
                  <th scope="col">Fees</th>
                  <th scope="col">Last Result</th>
                </tr>
              </thead>
              {studentList.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="4" className="text-center">
                      No data found
                    </td>
                  </tr>
                </tbody>
              ) : (
                studentList.map((data, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{`${data?.firstName} ${data?.middleName} ${data?.lastName}`}</td>
                      <td>{data.stream}</td>
                      <td>
                        {fees.find((fee) => fee.stream === data.stream)?.fees ||
                          "N/A"}
                      </td>
                      <td>{data.hscMarks}%</td>
                    </tr>
                  </tbody>
                ))
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudenTable;
