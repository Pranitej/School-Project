import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AddEmployee from "./AddEmployee";
import ShowEmployees from "./ShowEmployees";
import ShowEmployeeDetails from "./ShowEmployeeDetails";
import EmployeesInTable from "./EmployeesInTable";

export default function EmployeeDashboard() {
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [allEmployees, setAllEmployees] = useState(null);
  const [status, setStatus] = useState("All");
  const [count, setCount] = useState(0);

  const getEmployeesByStatus = () => {
    axios
      .get(
        `http://localhost:8091/api/employees/getAllEmployeesByStatus/${status}`
      )
      .then((response) => {
        if (response.data) {
          setAllEmployees(response.data);
          setCurrentEmployee(null);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getEmployeesByStatus(), [status, count]);

  return (
    <div className="bg-white">
      <br></br>
      <div className="mt-5">
        <div className="row">
          <div className="col-sm-2 overflow-auto">
            <div className="row">
              <h5 className="text-primary text-center p-2 pl-5 mt-2">
                Employees
              </h5>
              <button
                type="button"
                className="btn btn-sm btn-dark btn-rounded"
                data-toggle="modal"
                data-target="#addEmployee"
                style={{ scale: "0.8" }}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <ShowEmployees
              currentEmployee={currentEmployee}
              setCurrentEmployee={setCurrentEmployee}
              allEmployees={allEmployees}
              status={status}
              setStatus={setStatus}
              getEmployeesByStatus={getEmployeesByStatus}
            />
          </div>
          <div className="col-sm-10 overflow-auto pr-3">
            {currentEmployee ? (
              <ShowEmployeeDetails
                currentEmployee={currentEmployee}
                setCurrentEmployee={setCurrentEmployee}
              />
            ) : (
              <EmployeesInTable setCount={setCount} count={count} />
            )}
          </div>
        </div>
        <AddEmployee setCount={setCount} count={count} />
      </div>
    </div>
  );
}
