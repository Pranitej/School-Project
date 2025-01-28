import axios from "axios";
import React, { useEffect, useState } from "react";
import AddDayOffs from "./AddDayOffs";

export default function EmployeeDayOffs({ currentEmployee }) {
  const [approvedDayOffs, setApprovedDayOffs] = useState(null);

  const getApprovedDayOffs = () => {
    axios
      .get(
        `http://localhost:8091/api/daysOff/getDaysOffByEmpId/${currentEmployee.empId}`
      )
      .then((response) => {
        if (response.data) {
          setApprovedDayOffs(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8091/api/daysOff/deleteDayOff/${id}`)
      .then((response) => {
        if (response) {
          getApprovedDayOffs();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getApprovedDayOffs(), [currentEmployee]);

  return (
    <div className="container-fluid m-0">
      <div className="row mt-2">
        <div className="col-sm-8 ml-0 text-primary">
          <h5 className="mt-2">
            {approvedDayOffs && approvedDayOffs.length ? (
              <h5 className="text-dark">Approved Day Offs</h5>
            ) : (
              <h5 className="text-danger">No Approved Day Offs Found...</h5>
            )}
          </h5>
        </div>
        <div className="col-sm-4 text-right">
          <button
            className="btn btn-sm btn-outline-primary"
            data-toggle="modal"
            data-target="#addDayOff"
          >
            Add DayOff
          </button>
        </div>
      </div>
      <div className="row">
        {approvedDayOffs && approvedDayOffs.length !== 0 && (
          <>
            <table className="table table-sm mb-0 mt-3" id="child_table_id">
              <thead className="table-dark">
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Admin Note</th>
                  <th>Total Hours</th>
                  <th className="text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {approvedDayOffs.map((item, index) => (
                  <tr key={index}>
                    <td>{item.startDateOff}</td>
                    <td>{item.endDateOff}</td>
                    <td>{item.reason}</td>
                    <td>{item.adminNotes}</td>
                    <td>{item.totalHours}</td>
                    <td className="text-center">
                      <i
                        className="fas fa-trash fa-1/2x text-danger pr-3 pl-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(item.dayOfId)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <AddDayOffs
        currentEmployee={currentEmployee}
        getApprovedDayOffs={getApprovedDayOffs}
      />
    </div>
  );
}
