import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EmployeeAttendance() {
  const [allEmployees, setAllEmployees] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const getAllEmployees = () => {
    axios
      .get(
        `http://localhost:8091/api/employee-schedules/getEmployeesByScheduleDate/${date}`
      )
      .then((response) => {
        if (response.data) {
          setAllEmployees(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getAllEmployees(), [date]);

  const handleCheckInTimeChange = (empId, time) => {
    const data = allEmployees;
    data.forEach((element) => {
      if (element.empId === empId) {
        element.checkInTime = time;
      }
    });
    setAllEmployees(data);
  };

  const handleCheckIn = (employee, status) => {
    if (status === "Status") {
      alert("Select a valid Option...");
      return;
    } else if (!employee.checkInTime && status !== "Absent") {
      alert("Please select the time...");
      return;
    }

    const data = {
      attendanceId: 0,
      empId: employee.empId,
      checkedIn: employee.checkInTime,
      status: status,
      attendDate: date,
      checkedOut: "",
      hours: "",
      note: "",
    };

    axios
      .post(
        `http://localhost:8091/api/employee-attendance/addEmployeeAttendance`,
        data
      )
      .then((response) => {
        if (response.data) {
          getAllEmployees();
          alert("Attendance added...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleCheckOutTimeChange = (empId, time) => {
    const data = allEmployees;
    data.forEach((element) => {
      if (element.empId === empId) {
        element.checkOutTime = time;
      }
    });
    setAllEmployees(data);
  };

  const handleCheckOut = (employee, status) => {
    if (status === "Status") {
      alert("Select a valid Option...");
      return;
    }

    const data = {
      attendanceId: 0,
      empId: employee.empId,
      checkedIn: employee.checkInTime,
      status: status,
      attendDate: date,
      checkedOut: employee.checkOutTime,
      hours: "",
      note: "",
    };

    axios
      .post(
        `http://localhost:8091/api/employee-attendance/addEmployeeAttendance`,
        data
      )
      .then((response) => {
        if (response.data) {
          getAllEmployees();
          alert("Attendance added...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div
        className="modal fade"
        id="employeeAttendance"
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
              <p className="heading lead">Add Employee Attendance</p>

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

            {/* Body */}
            <div className="modal-body p-0">
              <div className="modal-c-tabs p-0" style={{ width: "100%" }}>
                <ul
                  className="nav md-tabs tabs-2 light-blue darken-3 text-center m-0"
                  role="tablist"
                  style={{
                    borderRadius: "0",
                    backgroundColor: "brown",
                  }}
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#panel11"
                      role="tab"
                    >
                      Check-in
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#panel22"
                      role="tab"
                    >
                      Check-out
                    </a>
                  </li>
                </ul>

                <div className="tab-content pt-0">
                  {/* Panel 1 */}
                  <div
                    className="tab-pane fade in show active m-3 mt-0"
                    id="panel11"
                    role="tabpanel"
                  >
                    <div className="row mt-2 ml-0">
                      <div className="col-sm-4">
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div style={{ overflowY: "auto", height: "400px" }}>
                      {allEmployees &&
                        allEmployees.map((employee, index) => (
                          <div
                            className="card p-1 m-1 mt-3"
                            style={{ overflowX: "hidden" }}
                            key={index}
                          >
                            <div className="row align-items-center">
                              <div className="col-sm-2 pl-4">
                                <img
                                  src={`http://localhost:8091/images/employees/${employee.pic}`}
                                  alt="employee"
                                  width={"40px"}
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/50";
                                  }}
                                />
                              </div>
                              <div className="col-sm-4 mt-2">
                                <p>{`${employee.firstName} ${employee.lastName}`}</p>
                              </div>
                              <div className="col-sm-3 mt-0">
                                <input
                                  type="time"
                                  className="form-control form-control-sm"
                                  value={employee.checkInTime || null}
                                  onChange={(e) =>
                                    handleCheckInTimeChange(
                                      employee.empId,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-sm-3 mt-0">
                                <select
                                  className="form-control form-control-sm"
                                  id="gender01"
                                  value={employee.status || "Status"}
                                  onChange={(e) =>
                                    handleCheckIn(employee, e.target.value)
                                  }
                                >
                                  <option value="Status">-- Status --</option>
                                  <option value="Present">Present</option>
                                  <option value="Absent">Absent</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  {/* Panel 1 */}

                  {/*Panel 2*/}
                  <div className="tab-pane fade" id="panel22" role="tabpanel">
                    <div
                      className="tab-pane fade in show active m-3 mt-0"
                      id="panel22"
                      role="tabpanel"
                    >
                      <div className="col-sm-4">
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                      <div style={{ overflowY: "auto", height: "400px" }}>
                        {allEmployees &&
                          allEmployees.map((employee, index) => (
                            <div
                              className="card p-1 m-1  mt-3"
                              style={{ overflowX: "hidden" }}
                              key={index}
                            >
                              <div className="row align-items-center">
                                <div className="col-sm-2 pl-4">
                                  <img
                                    src={`http://localhost:8091/images/employees/${employee.pic}`}
                                    alt="employee"
                                    width={"40px"}
                                    onError={(e) => {
                                      e.target.src =
                                        "https://via.placeholder.com/50";
                                    }}
                                  />
                                </div>
                                <div className="col-sm-4 mt-2">
                                  <p>{`${employee.firstName} ${employee.lastName}`}</p>
                                </div>
                                <div className="col-sm-3 mt-0">
                                  <input
                                    type="time"
                                    className="form-control form-control-sm"
                                    value={employee.checkOutTime || null}
                                    onChange={(e) =>
                                      handleCheckOutTimeChange(
                                        employee.empId,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-sm-3 mt-0">
                                  <select
                                    className="form-control form-control-sm"
                                    // value={employee.status || "Status"}
                                    onChange={(e) =>
                                      handleCheckOut(employee, e.target.value)
                                    }
                                  >
                                    <option value="Status" selected>
                                      -- Status --
                                    </option>
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/* Panel 2 */}
                </div>
              </div>
              {/* <Attendance /> */}
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <a
                type="button"
                className="btn btn-outline-danger waves-effect"
                data-dismiss="modal"
              >
                Cancel
              </a>
            </div>
          </div>
          {/* Content */}
        </div>

        {/* Central Modal Large Info */}
      </div>
    </div>
  );
}
