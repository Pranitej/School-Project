import React, { useEffect, useState } from "react";
import axios from "axios";
import SchedulingEmployees from "./SchedulingEmployees";
import SchedulingChildren from "./SchedulingChildren";
import SchedulingLessons from "./SchedulingLessons";
import SchedulingMeals from "./SchedulingMeals";
import Attendance from "./Attendance";

export default function ShowRoomDetails({ roomObj, handleDataUpdate }) {
  const allRoomsCount = 0;
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [scheduledChildren, setScheduledChildren] = useState(null);
  const [scheduledEmployees, setScheduledEmployees] = useState(null);
  const [scheduledLessons, setScheduledLessons] = useState(null);
  const [scheduledMeals, setScheduledMeals] = useState(null);

  const getScheduledChildren = () => {
    axios
      .get(
        `http://localhost:8091/api/child-schedules/getChildRoomSchedulesByRoomIdAndScheduleDate/${roomObj.roomId}/${date}`
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
        `http://localhost:8091/api/employee-schedules/getAllEmployeesDTOSchedulesByRoomIdAndDate/${roomObj.roomId}/${date}`
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

  const getScheduledLessons = () => {
    axios
      .get(
        `http://localhost:8091/api/schedule-room-lessons/getScheduleLessonsDetails/${roomObj.roomId}/${date}`
      )
      .then((response) => {
        if (response.data) {
          setScheduledLessons(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getScheduledMeals = () => {
    axios
      .get(
        `http://localhost:8091/api/schedule-room-meals/getScheduleMealDetails/${roomObj.roomId}/${date}`
      )
      .then((response) => {
        if (response.data) {
          setScheduledMeals(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getAllRooms = () => {};

  const getCount = () => {
    getScheduledChildren();
    getScheduledEmployees();
    getScheduledLessons();
    getScheduledMeals();
  };

  useEffect(() => date && getScheduledChildren(), [roomObj, date]);
  useEffect(() => date && getScheduledEmployees(), [roomObj, date]);
  useEffect(() => date && getScheduledLessons(), [roomObj, date]);
  useEffect(() => date && getScheduledMeals(), [roomObj, date]);

  return (
    <div className="container-fluid m-0">
      <div className="row">
        <div className="col-md-12">
          <div className="card m-2 p-2">
            <div className="row">
              <div className="col-sm-6">
                <div className="card-header bg-dark" style={{ color: "white" }}>
                  {roomObj.roomName}'s Details
                </div>
              </div>
              <div className="col-sm-6">
                {/* <label htmlFor="">Select Date:</label> */}
                <input
                  type="date"
                  className="form-control p-1 mt-1"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-2"></div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-6">
                <div className="card m-2 p-2">
                  <div className="p-2" style={{ background: "#5DADE2" }}>
                    <div className="row">
                      <div className="col-sm-8 pt-1" style={{ color: "white" }}>
                        Scheduled Employees
                      </div>
                      <div className="col-sm-4 text-right">
                        <button
                          type="button"
                          className="btn btn-sm text-right btn-rounded mt-0 mb-0"
                          style={{ background: "#336BFF" }}
                          data-toggle="modal"
                          data-target="#schedulingEmployees"
                          // onClick={() => setCurrentRoom(item.roomId)}
                        >
                          <i className="fas fa-plus text-white"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body"
                    style={{ overflowY: "auto", height: "200px" }}
                  >
                    <div className="row m-0">
                      {scheduledEmployees && scheduledEmployees.length > 0 ? (
                        scheduledEmployees.map((employee, index) => (
                          <div
                            className="card p-0 pl-4 m-1"
                            style={{ width: "100%" }}
                            key={index}
                          >
                            <div className="row align-items-center">
                              <div className="col-sm-2">
                                <img
                                  src={`http://localhost:8091/images/employees/${employee.pic}`}
                                  alt="children"
                                  width={"30px"}
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/50";
                                  }}
                                />
                              </div>
                              <div className="col-sm-10 mt-2">
                                <p className="mt-1">{`${employee.firstName} ${employee.lastName}`}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h5 className="text-danger ml-3 mt-3">No data found</h5>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card m-2 p-2">
                  <div className="p-2" style={{ background: "#8DCA74" }}>
                    <div className="row">
                      <div className="col-sm-6 pt-1" style={{ color: "white" }}>
                        Scheduled Children
                      </div>
                      <div className="col-sm-6 text-right">
                        <button
                          type="button"
                          className="btn btn-sm btn-rounded mt-0 mb-0 mr-2"
                          style={{ background: "#273746" }}
                          data-toggle="modal"
                          data-target="#attendance"
                        >
                          <i
                            class="fas fa-1x fa-clipboard-check mr-0 mt-0 mb-0 ml-0 text-light"
                            style={{ color: "#00ff00", scale: "1.5" }}
                          ></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm text-right btn-rounded mt-0 mb-0"
                          data-toggle="modal"
                          style={{ background: "#256404" }}
                          data-target="#schedulingChildren"
                          // onClick={() => setCurrentRoom(item.roomId)}
                        >
                          <i className="fas fa-plus text-white"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body"
                    style={{ overflowY: "auto", height: "200px" }}
                  >
                    <div className="row m-0">
                      {scheduledChildren && scheduledChildren.length > 0 ? (
                        scheduledChildren.map((item, index) => (
                          <div
                            className="card p-0 pl-4 m-1"
                            style={{ width: "100%" }}
                            key={index}
                          >
                            <div className="row align-items-center">
                              <div className="col-sm-2">
                                <img
                                  src={`http://localhost:8091/images/childrens/${item.childPic}`}
                                  alt="children"
                                  width={"30px"}
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/50";
                                  }}
                                />
                              </div>
                              <div className="col-sm-10 mt-2">
                                <p className="mt-1">{`${item.firstName} ${item.lastName}`}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h5 className="text-danger ml-3 mt-3">No data found</h5>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="card m-2 p-2">
                  <div className="p-2" style={{ background: "#F0B27A" }}>
                    <div className="row">
                      <div className="col-sm-8 pt-1" style={{ color: "white" }}>
                        Scheduled Lessons
                      </div>
                      <div className="col-sm-4 text-right">
                        <button
                          type="button"
                          className="btn btn-sm  text-right btn-rounded mt-0 mb-0"
                          data-toggle="modal"
                          style={{ background: "#D35400" }}
                          data-target="#schedulingLessons"
                        >
                          <i className="fas fa-plus text-white"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body"
                    style={{ overflowY: "auto", height: "200px" }}
                  >
                    <div className="row m-0">
                      {scheduledLessons && scheduledLessons.length > 0 ? (
                        scheduledLessons.map((item, index) => (
                          <div
                            className="card p-0 pl-4 m-1"
                            style={{ width: "100%" }}
                            key={index}
                          >
                            <div className="row align-items-center">
                              <div className="col-sm-3 mt-1">
                                <p className="mt-1 mb-2">{item.category}</p>
                              </div>
                              <div className="col-sm-4 mt-1">
                                <p className="mt-1 mb-2">{item.lessonName}</p>
                              </div>
                              <div className="col-sm-5 mt-1">
                                <p className="mt-1 mb-2">{item.description}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h5 className="text-danger ml-3 mt-3">No data found</h5>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card m-2 p-2">
                  <div className="p-2" style={{ background: "#C39BD3" }}>
                    <div className="row">
                      <div className="col-sm-8 pt-1" style={{ color: "white" }}>
                        Scheduled Meals
                      </div>
                      <div className="col-sm-4 text-right">
                        <button
                          type="button"
                          className="btn btn-sm btn-purple text-right btn-rounded mt-0 mb-0"
                          data-toggle="modal"
                          data-target="#schedulingMeals"
                          // onClick={() => setCurrentRoom(item.roomId)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-body"
                    style={{ overflowY: "auto", height: "200px" }}
                  >
                    <div className="row m-0">
                      {scheduledMeals && scheduledMeals.length > 0 ? (
                        scheduledMeals.map((item, index) => (
                          <div
                            className="card p-0 pl-4 m-1"
                            style={{ width: "100%" }}
                            key={index}
                          >
                            <div className="row align-items-center">
                              <div className="col-sm-3 mt-1">
                                <p className="mt-1 mb-2">{item.mealType}</p>
                              </div>
                              <div className="col-sm-4 mt-1">
                                <p className="mt-1 mb-2">{item.mealName}</p>
                              </div>
                              <div className="col-sm-5 mt-1">
                                <p className="mt-1 mb-2">{item.description}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h5 className="text-danger ml-3 mt-3">No data found</h5>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {roomObj.roomId && (
        <SchedulingEmployees
          roomId={roomObj.roomId}
          date={date}
          getAllRooms={getAllRooms}
          getCount={getCount}
          allRoomsCount={allRoomsCount}
        />
      )}

      {roomObj.roomId && (
        <SchedulingChildren
          roomId={roomObj.roomId}
          date={date}
          getAllRooms={getAllRooms}
          getCount={getCount}
          allRoomsCount={allRoomsCount}
        />
      )}
      {roomObj.roomId && (
        <SchedulingLessons
          date={date}
          roomId={roomObj.roomId}
          getCount={getCount}
        />
      )}
      {roomObj.roomId && (
        <SchedulingMeals
          date={date}
          roomId={roomObj.roomId}
          getCount={getCount}
        />
      )}
      {roomObj.roomId && (
        <Attendance
          date={date}
          roomId={roomObj.roomId}
          allRoomsCount={allRoomsCount}
        />
      )}
    </div>
  );
}
