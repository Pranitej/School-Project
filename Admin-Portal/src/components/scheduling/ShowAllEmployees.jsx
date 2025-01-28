import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowAllScheduledEmployees from "./ShowAllScheduledEmployees";

export default function ShowAllEmployees({
  roomId,
  date,
  getAllRooms,
  getCount,
}) {
  const [allEmployees, setAllEmployees] = useState(null);
  const [selectedChildren, setSelectedChildren] = useState([]);

  const getAllEmployees = () => {
    axios
      .get(`http://localhost:8091/api/employees/getAllEmployees`)
      .then((response) => {
        if (response.data) {
          setAllEmployees(response.data);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const handleClick = (child) => {
    let count = 0;
    selectedChildren.forEach((item) => {
      if (item.id === child.id) count++;
    });
    if (count === 0) {
      setSelectedChildren([...selectedChildren, child]);
    } else {
      setSelectedChildren(
        selectedChildren.filter((item) => item.id !== child.id)
      );
    }
  };

  const checkChildExist = (child) => {
    let count = 0;
    selectedChildren.forEach((item) => {
      if (item.id === child.id) count++;
    });
    return count > 0 ? true : false;
  };

  const handleAddChildren = () => {
    if (selectedChildren.length === 0) {
      alert("Please select at least one child to add.");
      return;
    }

    let selectedChildrenData = [];

    selectedChildren.forEach((child) => {
      selectedChildrenData.push({
        employeeId: child.empId,
        roomId,
        scheduleDate: date,
        scheduleId: 0,
      });
    });

    axios
      .post(
        "http://localhost:8091/api/employee-schedules/createSchedules/batch",
        selectedChildrenData
      )
      .then((response) => {
        if (response.data) {
          setSelectedChildren([]);
          getAllRooms();
          getCount();
          alert("Employees added to the schedule successfully!");
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
        id="showEmployees"
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
              <p className="heading lead">Displaying employees hello</p>

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
              <div className="modal-body">
                <div className="row mt-0 mb-2">
                  <div className="col-sm-12 ">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      data-toggle="modal"
                      data-target="#scheduledEmployees"
                    >
                      View Scheduled Employees
                    </button>
                  </div>
                </div>
                <div className="child-list">
                  {allEmployees &&
                    allEmployees.map((child, index) => (
                      <div
                        className="row ml-1 mr-3 child-item mt-2"
                        key={index}
                      >
                        {checkChildExist(child) ? (
                          <div
                            className="card p-3 bg-warning"
                            style={{ width: "100%", cursor: "pointer" }}
                            onClick={() => {
                              handleClick(child);
                            }}
                          >
                            <div className="row align-items-center">
                              <div className="col-sm-2">
                                <img
                                  src={`http://localhost:8091/images/employees/${child.pic}`}
                                  alt="children"
                                  width={"50px"}
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/50";
                                  }}
                                />
                              </div>
                              <div className="col-sm-7 mt-2">
                                <p>{`${child.firstName} ${child.lastName}`}</p>
                              </div>
                              <div className="col-sm-3 mt-2">
                                <p>{child.status}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="card p-3"
                            style={{ width: "100%", cursor: "pointer" }}
                            onClick={() => {
                              handleClick(child);
                            }}
                          >
                            <div className="row align-items-center">
                              <div className="col-sm-2">
                                <img
                                  src={`http://localhost:8091/images/employees/${child.pic}`}
                                  alt="children"
                                  width={"50px"}
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/50";
                                  }}
                                />
                              </div>
                              <div className="col-sm-7 mt-2">
                                <p>{`${child.firstName} ${child.lastName}`}</p>
                              </div>
                              <div className="col-sm-3 mt-2">
                                <p>{child.status}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleAddChildren}
                >
                  Add Selected Employees
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
      <ShowAllScheduledEmployees roomId={roomId} date={date} />
    </div>
  );
}
