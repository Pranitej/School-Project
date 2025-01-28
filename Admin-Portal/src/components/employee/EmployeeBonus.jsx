import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import AddBonus from "./AddBonus";

export default function EmployeeBonus({ currentEmployee }) {
  const [approvedBonus, setApprovedBonus] = useState(null);

  const getApprovedBonus = () => {
    axios
      .get(
        `http://localhost:8091/api/employee-bonus/employee/${currentEmployee.empId}`
      )
      .then((response) => {
        if (response.data) {
          setApprovedBonus(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8091/api/employee-bonus/deleteBonus/${id}`)
      .then((response) => {
        if (response) {
          getApprovedBonus();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getApprovedBonus(), [currentEmployee]);

  return (
    <div className="container-fluid m-0">
      <div className="row mt-2">
        <div className="col-sm-8 ml-0 text-primary">
          <h5 className="mt-2">
            {approvedBonus && approvedBonus.length ? (
              <h5 className="text-dark">Approved Bonus</h5>
            ) : (
              <h5 className="text-danger">No Approved Bonus Found...</h5>
            )}
          </h5>
        </div>
        <div className="col-sm-4 text-right">
          <button
            className="btn btn-sm btn-outline-primary"
            data-toggle="modal"
            data-target="#addBonus"
          >
            Add Bonus
          </button>
        </div>
      </div>
      <div className="row">
        {approvedBonus && approvedBonus.length !== 0 && (
          <>
            <table className="table table-sm mb-0 mt-3" id="child_table_id">
              <thead className="table-dark">
                <tr>
                  <th>Bonus Date</th>
                  <th>Hours To Pay</th>
                  <th>Dollars To Pay</th>
                  <th>Reason</th>
                  <th>Admin Notes</th>
                  <th className="text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {approvedBonus.map((item, index) => (
                  <tr key={index}>
                    <td>{item.bonusDate}</td>
                    <td>{item.bonusHoursToPay}</td>
                    <td>$ {item.bonusDollarsToPay}</td>
                    <td>{item.bonusReason}</td>
                    <td>{item.adminNotes}</td>
                    <td className="text-center">
                      <i
                        className="fas fa-trash fa-1/2x text-danger pr-3 pl-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(item.bonusId)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <AddBonus
        currentEmployee={currentEmployee}
        getApprovedBonus={getApprovedBonus}
      />
    </div>
  );
}
