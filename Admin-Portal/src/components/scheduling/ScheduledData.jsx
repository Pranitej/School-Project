import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function ScheduledData({
  roomId,
  date,
  getCount,
  allRoomsCount,
}) {
  const [scheduledChildren, setScheduledChildren] = useState(null);
  const [scheduledEmployees, setScheduledEmployees] = useState(null);

  const getScheduledChildren = () => {
    axios
      .get(
        `http://localhost:8091/api/child-schedules/getChildRoomSchedulesByRoomIdAndScheduleDate/${roomId}/${date}`
      )
      .then((response) => {
        if (response.data) {
          setScheduledChildren(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

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

  useEffect(() => {
    getScheduledEmployees();
  }, [date, roomId, allRoomsCount]);

  useEffect(() => {
    getScheduledChildren();
  }, [date, roomId, allRoomsCount]);

  const handleEmployeeDelete = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/employee-schedules/deleteSchedule/${id}`
      )
      .then((response) => {
        if (response) {
          getScheduledEmployees();
          getCount();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleChildrenDelete = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/child-schedules/deleteChildSchedule/${id}`
      )
      .then((response) => {
        if (response) {
          getScheduledChildren();
          getCount();
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
        id="scheduledData"
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
              <p className="heading lead">Scheduled Data</p>

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
                <h6 className="text-primary">Scheduled Employees</h6>
                <div className="row">
                  <div className="col-sm-12">
                    {scheduledEmployees && scheduledEmployees.length > 0 && (
                      <div className="row p-2 pb-0 pl-4">
                        <div className="col-sm-1 small">Pic</div>
                        <div className="col-sm-4 small">Name</div>
                        <div className="col-sm-2 small">Title</div>
                        <div className="col-sm-2 small ">Start Time</div>
                        <div className="col-sm-2 small pl-3">End Time</div>
                      </div>
                    )}
                  </div>
                  {scheduledEmployees && scheduledEmployees.length > 0 ? (
                    scheduledEmployees.map((employee, index) => (
                      <div
                        className="card p-2 pl-4 m-2"
                        style={{ width: "100%" }}
                        key={index}
                      >
                        <div className="row align-items-center">
                          <div className="col-sm-1">
                            <img
                              src={`http://localhost:8091/images/employees/${employee.pic}`}
                              alt="children"
                              width={"30px"}
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/50";
                              }}
                            />
                          </div>
                          <div className="col-sm-4 mt-0 small">
                            {`${employee.firstName} ${employee.lastName}`}
                          </div>
                          <div className="col-sm-2 mt-0 small">
                            {employee.jobTitle}
                          </div>
                          <div className="col-sm-2 mt-0 small">
                            {employee.startTime}
                          </div>
                          <div className="col-sm-2 mt-0 small">
                            {employee.endTime}
                          </div>
                          <div
                            className="col-sm-1"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleEmployeeDelete(employee.scheduleId)
                            }
                          >
                            <i className="fas fa-trash fa-1x text-danger"></i>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-danger ml-3 mt-3">No data found</h5>
                  )}
                </div>

                <hr />
                <h6 className="text-primary">Scheduled Children</h6>
                <div className="row">
                  <div className="col-sm-12">
                    {scheduledEmployees && scheduledEmployees.length > 0 && (
                      <div className="row p-2 pb-0 pl-4">
                        <div className="col-sm-1 small">Pic</div>
                        <div className="col-sm-4 small">Name</div>
                        <div className="col-sm-3 small">Status</div>
                        <div className="col-sm-3 small">Student Class</div>
                      </div>
                    )}
                  </div>
                  {scheduledChildren && scheduledChildren.length > 0 ? (
                    scheduledChildren.map((child, index) => (
                      <div
                        className="card p-2 pl-4 m-2"
                        style={{ width: "100%" }}
                        key={index}
                      >
                        <div className="row align-items-center">
                          <div className="col-sm-1">
                            <img
                              src={`http://localhost:8091/images/childrens/${child.childPic}`}
                              alt="children"
                              width={"30px"}
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/50";
                              }}
                            />
                          </div>
                          <div className="col-sm-4 mt-0 small">
                            {`${child.firstName} ${child.lastName}`}
                          </div>
                          <div className="col-sm-3 mt-0 small">
                            {child.status}
                          </div>
                          <div className="col-sm-3 mt-0 small">
                            {child.studentClass}
                          </div>
                          <div
                            className="col-sm-1"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleChildrenDelete(child.scheduleId)
                            }
                          >
                            <i className="fas fa-trash fa-1x text-danger"></i>
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
