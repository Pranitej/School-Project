import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Attendance({ date, roomId, allRoomsCount }) {
  const [checkInTime, setCheckInTime] = useState(getCurrentTimeString());
  const [scheduledChildren, setScheduledChildren] = useState(null);

  function getCurrentTimeString() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const getChildren = () => {
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

  useEffect(() => getChildren(), [date, roomId, allRoomsCount]);

  useEffect(() => {
    window.$("#gender019").materialSelect();
    window.$("#studentClass01").materialSelect();
    window.$("#daysAttending01").materialSelect();

    window.$(".datepicker").pickadate({
      // Escape any “rule” characters with an exclamation mark (!).
      format: "dd-mm-yyyy",
      formatSubmit: "yyyy/mm/dd",
      hiddenPrefix: "prefix__",
      hiddenSuffix: "__suffix",
    });
  }, []);

  const handleCheckIn = (child, pickUpName, checkInTime) => {
    if (pickUpName === "--select--") {
      alert("Select a valid option...");
      return;
    }

    const data = {
      attendanceId: 0,
      childId: child.childId,
      attendDate: date,
      roomId,
      checkedIn: checkInTime,
      checkedOut: null,
      hours: null,
      dropOff: pickUpName === "Absent" ? "Absent" : pickUpName,
      pickup: null,
      status: pickUpName === "Absent" ? "Absent" : "Present",
      note: null,
    };
    axios
      .post(
        `http://localhost:8091/api/child-attendance/addChildAttendance`,
        data
      )
      .then((response) => {
        if (response.data) {
          getChildren();
          setCheckInTime(Date.now());
          alert("Attendance added...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleCheckOut = (child, pickUpName, checkInTime, checkOutTime) => {
    if (pickUpName === "--select--") {
      alert("Select a valid option...");
      return;
    }

    const data = {
      attendanceId: 0,
      childId: child.childId,
      attendDate: date,
      roomId,
      checkedIn: checkInTime,
      checkedOut: checkOutTime,
      hours: null,
      dropOff: pickUpName === "Absent" ? "Absent" : pickUpName,
      pickup: pickUpName === "Absent" ? "Absent" : pickUpName,
      status: pickUpName === "Absent" ? "Absent" : "Present",
      note: null,
    };

    axios
      .post(
        `http://localhost:8091/api/child-attendance/addChildAttendance`,
        data
      )
      .then((response) => {
        if (response.data) {
          setCheckInTime(Date.now());
          alert("Attendance added...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleCheckInTimeChange = (childId, time) => {
    const data = scheduledChildren;
    data.forEach((element) => {
      if (element.childId === childId) {
        element.checkInTime = time;
      }
    });
    setScheduledChildren(data);
    setCheckInTime(Date.now()); //this statement is used for rending the component to effect time control
  };

  const handleCheckOutTimeChange = (childId, time) => {
    const data = scheduledChildren;
    data.forEach((element) => {
      if (element.childId === childId) {
        element.checkOutTime = time;
      }
    });
    setScheduledChildren(data);
    setCheckInTime(Date.now()); //this statement is used for rending the component to effect time control
  };

  return (
    <div>
      <div
        className="modal fade"
        id="attendance"
        tabindex="-1"
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
              <p className="heading lead">Children Attendance</p>

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
              <div className="modal-body p-0">
                <div className="modal-c-tabs p-0" style={{ width: "100%" }}>
                  <ul
                    className="nav md-tabs tabs-2 light-blue darken-3 text-center m-0"
                    role="tablist"
                    style={{ borderRadius: "0", backgroundColor: "brown" }}
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#panel1"
                        role="tab"
                      >
                        Check-in
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#panel2"
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
                      id="panel1"
                      role="tabpanel"
                    >
                      <div className="row mt-2 ml-2">
                        <div className="col-sm-5 mb-0">
                          <p className="text-dark mb-0">
                            <b>Child Name</b>
                          </p>
                        </div>
                        <div className="col-sm-3">
                          <p className="text-dark mb-0">
                            <b>Check In</b>
                          </p>
                        </div>
                        <div className="col-sm-4">
                          <p className="text-dark mb-0">
                            <b>Select DropOffs</b>
                          </p>
                        </div>
                      </div>
                      <div style={{ overflowY: "auto", height: "400px" }}>
                        {scheduledChildren &&
                          scheduledChildren.map((child, index) => (
                            <div
                              className="card p-1 pl-3 pr-3 m-1 mt-2"
                              // style={{ width: "100%" }}
                              key={index}
                            >
                              <div className="row align-items-center">
                                <div className="col-sm-1">
                                  <img
                                    src={`http://localhost:8091/images/childrens/${child.childPic}`}
                                    alt="children"
                                    width={"40px"}
                                    onError={(e) => {
                                      e.target.src =
                                        "https://via.placeholder.com/50";
                                    }}
                                  />
                                </div>
                                <div className="col-sm-4 mt-2">
                                  <p className="small pl-1">{`${child.firstName} ${child.lastName}`}</p>
                                </div>
                                <div className="col-sm-3">
                                  <input
                                    type="time"
                                    className="form-control form-control-sm"
                                    value={child.checkInTime || null}
                                    onChange={(e) =>
                                      handleCheckInTimeChange(
                                        child.childId,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-sm-4">
                                  <select
                                    className="form-control form-control-sm"
                                    id="gender01"
                                    // value={child && child.dropOffs[0]}
                                    onChange={(e) =>
                                      handleCheckIn(
                                        child,
                                        e.target.value,
                                        child.checkInTime
                                      )
                                    }
                                  >
                                    {child &&
                                      child.dropOffs.map((pickup, index) => (
                                        <option value={pickup} key={index}>
                                          {pickup}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    {/* Panel 1 */}

                    {/*Panel 2*/}
                    <div className="tab-pane fade" id="panel2" role="tabpanel">
                      <div
                        className="tab-pane fade in show active m-3 mt-0"
                        id="panel1"
                        role="tabpanel"
                      >
                        <div className="row mt-2 ml-2">
                          <div className="col-sm-5">
                            <p className="text-dark mb-0">
                              <b>Child Name</b>
                            </p>
                          </div>
                          <div className="col-sm-3">
                            <p className="text-dark mb-0">
                              <b>Check Out</b>
                            </p>
                          </div>
                          <div className="col-sm-4">
                            <p className="text-dark mb-0">
                              <b>Select Pickups</b>
                            </p>
                          </div>
                        </div>
                        <div style={{ overflowY: "auto", height: "400px" }}>
                          {scheduledChildren &&
                            scheduledChildren.map((child, index) => (
                              <div
                                className="card p-1 pl-3 pr-3 m-1 mt-2"
                                // style={{ width: "100%" }}
                                key={index}
                              >
                                <div className="row align-items-center">
                                  <div className="col-sm-1">
                                    <img
                                      src={`http://localhost:8091/images/childrens/${child.childPic}`}
                                      alt="children"
                                      width={"40px"}
                                      onError={(e) => {
                                        e.target.src =
                                          "https://via.placeholder.com/50";
                                      }}
                                    />
                                  </div>
                                  <div className="col-sm-4 mt-2">
                                    <p className="small pl-1">{`${child.firstName} ${child.lastName}`}</p>
                                  </div>
                                  <div className="col-sm-3">
                                    <input
                                      type="time"
                                      className="form-control form-control-sm"
                                      value={child.checkOutTime || null}
                                      onChange={(e) =>
                                        handleCheckOutTimeChange(
                                          child.childId,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-4">
                                    <select
                                      className="form-control form-control-sm"
                                      id="gender01"
                                      onChange={(e) =>
                                        handleCheckOut(
                                          child,
                                          e.target.value,
                                          child.checkInTime,
                                          child.checkOutTime
                                        )
                                      }
                                    >
                                      {child &&
                                        child.dropOffs.map((pickup, index) => (
                                          <option value={pickup} key={index}>
                                            {pickup}
                                          </option>
                                        ))}
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
              </div>
              <div className="modal-footer">
                <a
                  type="button"
                  className="btn btn-outline-danger waves-effect"
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
