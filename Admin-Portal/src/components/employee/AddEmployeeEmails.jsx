import React, { useState } from "react";

export default function AddEmployeeEmails({
  selectedEmployees,
  setSelectedEmployees,
  unselectedEmployees,
  setUnselectedEmployees,
  setEmployeeEmailsString,
}) {
  const handleAddEmployee = (employee) => {
    const newList = unselectedEmployees.filter(
      (emp) => emp.empId !== employee.empId
    );
    setUnselectedEmployees(newList);
    setSelectedEmployees([...selectedEmployees, employee]);
  };

  const handleRemoveEmployee = (employee) => {
    const newSelectedList = selectedEmployees.filter(
      (emp) => emp.empId !== employee.empId
    );
    setSelectedEmployees(newSelectedList);
    setUnselectedEmployees([...unselectedEmployees, employee]);
  };

  const handleSubmit = () => {
    let emailsString = "";
    for (let index = 0; index < selectedEmployees.length; index++) {
      if (index === selectedEmployees.length - 1) {
        emailsString += selectedEmployees[index].email;
      } else {
        emailsString += selectedEmployees[index].email + ",";
      }
    }
    setEmployeeEmailsString(emailsString);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="addEmployees"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-notify modal-info"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <p className="heading lead">Add Employee Emails</p>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" className="white-text">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <h5 className="text-dark">Selected Employees</h5>
                </div>
              </div>
              {selectedEmployees && selectedEmployees.length > 0 ? (
                selectedEmployees.map((item, index) => (
                  <div className="card m-2" key={index}>
                    <div className="row p-2">
                      <div className="col-sm-2">
                        <img
                          src={`http://localhost:8091/images/employees/${item.pic}`}
                          width={"30px"}
                        />
                      </div>
                      <div className="col-sm-4">{`${item.firstName} ${item.lastName}`}</div>
                      <div className="col-sm-5">{`${item.email}`}</div>
                      <div
                        className="col-sm-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveEmployee(item)}
                      >
                        <i className="fas fa-trash fa-1/2x text-danger"></i>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-danger">No Employees Found...</p>
              )}
              <hr className="text-dark" />
              <div className="row">
                <div className="col-md-12">
                  <h5 className="text-dark">All Employees</h5>
                </div>
              </div>
              {unselectedEmployees && unselectedEmployees.length > 0 ? (
                unselectedEmployees.map((item, index) => (
                  <div className="card m-2" key={index}>
                    <div className="row p-2">
                      <div className="col-sm-2">
                        <img
                          src={`http://localhost:8091/images/employees/${item.pic}`}
                          width={"30px"}
                        />
                      </div>
                      <div className="col-sm-4">{`${item.firstName} ${item.lastName}`}</div>
                      <div className="col-sm-5">{`${item.email}`}</div>
                      <div
                        className="col-sm-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleAddEmployee(item)}
                      >
                        <i className="fas fa-plus fa-1/2x text-success"></i>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-danger">No Employees Found...</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-info btn-sm"
                data-dismiss="modal"
                onClick={() => handleSubmit()}
              >
                Add Employee Emails <i className="far fa-gem ml-1"></i>
              </button>
              <a
                type="button"
                className="btn btn-outline-danger waves-effect btn-sm"
                data-dismiss="modal"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
