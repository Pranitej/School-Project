import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import AddPaidLeave from "./AddPaidLeave";

export default function EmployeePaidLeave({ currentEmployee }) {
  const [approvedPaidLeaves, setApprovedPaidLeaves] = useState(null);

  const getApprovedPaidLeaves = () => {
    axios
      .get(
        `http://localhost:8091/api/paidLeave/employee/${currentEmployee.empId}`
      )
      .then((response) => {
        if (response.data) {
          setApprovedPaidLeaves(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8091/api/paidLeave/deletePaidLeave/${id}`)
      .then((response) => {
        if (response) {
          getApprovedPaidLeaves();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getApprovedPaidLeaves(), [currentEmployee]);

  return (
    <div className="container-fluid m-0">
      <div className="row mt-2">
        <div className="col-sm-8 ml-0 text-primary">
          <h5 className="mt-2">
            {approvedPaidLeaves && approvedPaidLeaves.length ? (
              <h5 className="text-dark">Approved Paid Leaves</h5>
            ) : (
              <h5 className="text-danger">No Approved Paid Leaves Found...</h5>
            )}
          </h5>
        </div>
        <div className="col-sm-4 text-right">
          <button
            className="btn btn-sm btn-outline-primary"
            data-toggle="modal"
            data-target="#addPaidLeave"
          >
            Add Paid Leave
          </button>
        </div>
      </div>
      <div className="row">
        {approvedPaidLeaves && approvedPaidLeaves.length !== 0 && (
          <>
            <table className="table table-sm mb-0 mt-3" id="child_table_id">
              <thead className="table-dark">
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Admin Note</th>
                  <th>Hours To Pay</th>
                  <th>Dollars To Pay</th>
                  <th className="text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {approvedPaidLeaves.map((item, index) => (
                  <tr key={index}>
                    <td>{item.startDateOff}</td>
                    <td>{item.endDateOff}</td>
                    <td>{item.adminNotes}</td>
                    <td>{item.paidLeaveHoursToPay}</td>
                    <td>$ {item.paidLeaveDollarsToPay}</td>
                    <td className="text-center">
                      <i
                        className="fas fa-trash fa-1/2x text-danger pr-3 pl-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(item.payOffId)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <AddPaidLeave
        currentEmployee={currentEmployee}
        getApprovedPaidLeaves={getApprovedPaidLeaves}
      />
    </div>
  );
}
