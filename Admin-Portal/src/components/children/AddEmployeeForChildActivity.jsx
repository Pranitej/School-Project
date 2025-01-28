import React, { useState } from "react";

export default function AddEmployeeForChildActivity({
  setEmployeeIds,
  allEmployees,
}) {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [unselectedEmployees, setUnselectedEmployees] = useState(allEmployees);

  const handleAddEmployeeIds = () => {
    let ids = "";
    for (let index = 0; index < selectedEmployees.length; index++) {
      if (index === selectedEmployees.length - 1) {
        ids += selectedEmployees[index].empId;
      } else {
        ids += selectedEmployees[index].empId + ",";
      }
    }
    setEmployeeIds(ids);
  };

  const handleAddEmployee = (employee) => {
    setSelectedEmployees([...selectedEmployees, employee]);
    setUnselectedEmployees(
      unselectedEmployees.filter((e) => e.empId !== employee.empId)
    );
  };

  const handleEmployeeDelete = (employee) => {
    setSelectedEmployees(
      selectedEmployees.filter((e) => e.empId !== employee.empId)
    );
    setUnselectedEmployees([...unselectedEmployees, employee]);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="addEmployeesToChildActivityFeed"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-notify modal-info"
          role="document"
        >
          {/* Content */}
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <p className="heading lead">Add Employees</p>

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

            <form className="form-floating">
              {/* Body */}
              <div
                className="modal-body"
                style={{ overflowY: "auto", height: "500px" }}
              >
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card mdb-color darken-3 p-0 pt-2 pl-3 ml-2 mr-0 text-light">
                      <h5>Selected Employees</h5>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div>
                    {selectedEmployees && selectedEmployees.length > 0 && (
                      <div className="row p-3 pb-0 pl-4">
                        <div className="col-sm-2">{"Image"}</div>
                        <div className="col-sm-5">{"Name"}</div>
                        <div className="col-sm-4">{"Title"}</div>
                      </div>
                    )}
                  </div>
                  {selectedEmployees && selectedEmployees.length > 0 ? (
                    selectedEmployees.map((item, index) => (
                      <div
                        className="card p-3 m-2 mt-0"
                        style={{ width: "100%" }}
                        key={index}
                      >
                        <div className="row">
                          <div className="col-sm-2">
                            <img
                              className="img-fluid rounded-circle"
                              src={`http://localhost:8091/images/employees/${item.pic}`}
                              style={{ width: "30px", height: "30px" }}
                            />
                          </div>
                          <div className="col-sm-5">{`${item.firstName} ${item.lastName}`}</div>
                          <div className="col-sm-4">{item.jobTitle}</div>
                          <div
                            className="col-sm-1"
                            onClick={() => handleEmployeeDelete(item)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fas fa-trash fa-1/2x text-danger"></i>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-danger ml-4 mt-3">
                      No Employees found...
                    </h5>
                  )}
                </div>

                <hr className="bg-secondary" />

                <div className="card mdb-color darken-3 p-0 pt-2 pl-3 ml-2 mr-0 text-light">
                  <h5>All Employees</h5>
                </div>
                <div className="">
                  {unselectedEmployees && unselectedEmployees.length > 0 && (
                    <div className="row p-3 pb-0 pl-4">
                      <div className="col-sm-2">{"Image"}</div>
                      <div className="col-sm-5">{"Name"}</div>
                      <div className="col-sm-4">{"Title"}</div>
                    </div>
                  )}
                  {unselectedEmployees && unselectedEmployees.length > 0 ? (
                    unselectedEmployees.map((item, index) => (
                      <div
                        className="card p-3 m-2 mt-0"
                        style={{ width: "100%" }}
                        key={index}
                      >
                        <div className="row">
                          <div className="col-sm-2">
                            <img
                              className="img-fluid rounded-circle"
                              src={`http://localhost:8091/images/employees/${item.pic}`}
                              style={{ width: "30px", height: "30px" }}
                            />
                          </div>
                          <div className="col-sm-5">{`${item.firstName} ${item.lastName}`}</div>
                          <div className="col-sm-4">{item.jobTitle}</div>

                          <div
                            className="col-sm-1"
                            onClick={() => handleAddEmployee(item)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fas fa-plus fa-1/2x text-success"></i>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-danger ml-3 mt-3">
                      No Employees found...
                    </h5>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-info waves-effect btn-sm"
                  onClick={() => handleAddEmployeeIds()}
                  data-dismiss="modal"
                >
                  Add Employees <i className="far fa-gem ml-1"></i>
                </button>
                <a
                  type="button"
                  className="btn btn-outline-danger waves-effect btn-sm"
                  data-dismiss="modal"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
          {/* Content */}
        </div>

        {/* Central Modal Large Info */}
      </div>
    </div>
  );
}
