import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SchedulingEmployees({
  roomId,
  date,
  getAllRooms,
  getCount,
  allRoomsCount,
}) {
  const [scheduledEmployees, setScheduledEmployees] = useState(null);
  const [unScheduledEmployees, setUnScheduledEmployees] = useState(null);
  const [_, setRender] = useState(null);

  const getScheduledEmployees = () => {
    axios
      .get(
        `http://localhost:8091/api/employee-schedules/getAllEmployeesDTOSchedulesByRoomIdAndDate/${roomId}/${date}`
      )
      .then((response) => {
        if (response.data) {
          setScheduledEmployees(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getUnScheduledEmployees = () => {
    axios
      .get(
        `http://localhost:8091/api/employee-schedules/findUnScheduledEmployeesByScheduleDateAndRoomId/${date}/${roomId}`
      )
      .then((response) => {
        if (response.data) {
          let data = response.data;
          for (let index = 0; index < data.length; index++) {
            data[index].startTime = "";
            data[index].endTime = "";
          }
          setUnScheduledEmployees(data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddEmployeeSchedule = (employee) => {
    if (!employee.startTime || !employee.endTime) {
      alert("Invalid form data...");
      return;
    }

    axios
      .post(`http://localhost:8091/api/employee-schedules/addSchedule`, {
        roomId,
        employeeId: employee.empId,
        scheduleDate: date,
        startTime: employee.startTime,
        endTime: employee.endTime,
      })
      .then((response) => {
        if (response.data) {
          getScheduledEmployees();
          getUnScheduledEmployees();
          getAllRooms();
          getCount();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleScheduledEmployeeDelete = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/employee-schedules/deleteSchedule/${id}`
      )
      .then((response) => {
        if (response) {
          getScheduledEmployees();
          getUnScheduledEmployees();
          getAllRooms();
          getCount();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleStartTimeChange = (employee, value) => {
    let data = unScheduledEmployees;
    for (let index = 0; index < data.length; index++) {
      if (employee.empId === data[index].empId) {
        data[index].startTime = value;
      }
    }
    setUnScheduledEmployees(data);
    setRender(Date.now()); // To render the component on change
  };

  const handleEndTimeChange = (employee, value) => {
    let data = unScheduledEmployees;
    for (let index = 0; index < data.length; index++) {
      if (employee.empId === data[index].empId) {
        data[index].endTime = value;
      }
    }
    setUnScheduledEmployees(data);
    setRender(Date.now()); // To render the component on change
  };

  useEffect(() => getScheduledEmployees(), [roomId, date, allRoomsCount]);
  useEffect(() => getUnScheduledEmployees(), [roomId, date, allRoomsCount]);

  return (
    <div>
      <div
        className="modal fade"
        id="schedulingEmployees"
        tabIndex="-1"
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
              <p className="heading lead">Scheduling employees</p>

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
                      <h5>Scheduled Employees</h5>
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <div>
                    {scheduledEmployees && scheduledEmployees.length > 0 && (
                      <div className="row p-2 pb-0 pl-4">
                        <div className="col-sm-1 small">{"Pic"}</div>
                        <div className="col-sm-4 small">{"Name"}</div>
                        <div className="col-sm-2 small">{"Title"}</div>
                        <div className="col-sm-2 small pl-4">Start Time</div>
                        <div className="col-sm-2 small pl-4">{"End Time"}</div>
                      </div>
                    )}
                  </div>
                  {scheduledEmployees && scheduledEmployees.length > 0 ? (
                    scheduledEmployees.map((item, index) => (
                      <div
                        className="card p-2 m-2 mt-1"
                        style={{ width: "100%" }}
                        key={index}
                      >
                        <div className="row">
                          <div className="col-sm-1">
                            <img
                              className="img-fluid rounded-circle"
                              src={`http://localhost:8091/images/employees/${item.pic}`}
                              style={{ width: "30px", height: "30px" }}
                            />
                          </div>
                          <div className="col-sm-4 small mt-1">{`${item.firstName} ${item.lastName}`}</div>
                          <div className="col-sm-2 small mt-1">
                            {item.jobTitle}
                          </div>
                          <div className="col-sm-2 small mt-1 pl-4">
                            {item.startTime}
                          </div>
                          <div className="col-sm-2 small mt-1 pl-4">
                            {item.endTime}
                          </div>
                          <div
                            className="col-sm-1"
                            onClick={() =>
                              handleScheduledEmployeeDelete(item.scheduleId)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fas fa-trash fa-1/2x text-danger"></i>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-danger ml-4 mt-3">No data found</h5>
                  )}
                </div>

                <hr className="bg-secondary" />

                <div className="card mdb-color darken-3 p-0 pt-2 pl-3 ml-2 mr-0 text-light">
                  <h5>Unscheduled Employees</h5>
                </div>
                <div className="mt-1">
                  {unScheduledEmployees && unScheduledEmployees.length > 0 && (
                    <div className="row p-2 pb-0 pl-4">
                      <div className="col-sm-1 small">{"Pic"}</div>
                      <div className="col-sm-4 small">{"Name"}</div>
                      <div className="col-sm-2 small">{"Title"}</div>
                      <div className="col-sm-2 small pl-4">{"Start Time"}</div>
                      <div className="col-sm-2 small pl-4">{"End Time"}</div>
                    </div>
                  )}
                  {unScheduledEmployees && unScheduledEmployees.length > 0 ? (
                    unScheduledEmployees.map((item, index) => (
                      <div
                        className="card p-2 m-2 mt-1"
                        style={{ width: "100%" }}
                        key={index}
                      >
                        <div className="row">
                          <div className="col-sm-1">
                            <img
                              className="img-fluid rounded-circle"
                              src={`http://localhost:8091/images/employees/${item.pic}`}
                              style={{ width: "30px", height: "30px" }}
                            />
                          </div>
                          <div className="col-sm-4 small mt-1">{`${item.firstName} ${item.lastName}`}</div>
                          <div className="col-sm-2 small mt-1">
                            {item.jobTitle}
                          </div>
                          <div className="col-sm-2">
                            <input
                              type="time"
                              className="form-control form-control-sm"
                              value={item.startTime}
                              onChange={(e) => {
                                handleStartTimeChange(item, e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-sm-2">
                            <input
                              type="time"
                              className="form-control form-control-sm"
                              value={item.endTime}
                              onChange={(e) => {
                                handleEndTimeChange(item, e.target.value);
                              }}
                            />
                          </div>
                          <div
                            className="col-sm-1"
                            onClick={() => handleAddEmployeeSchedule(item)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fas fa-plus fa-1/2x text-success"></i>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-danger ml-3 mt-3">No data found</h5>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
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
