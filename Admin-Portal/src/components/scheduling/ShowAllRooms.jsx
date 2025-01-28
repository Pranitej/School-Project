import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowAllEmployees from "./ShowAllEmployees";
import ShowAllChildren from "./ShowAllChildren";
import ScheduledData from "./ScheduledData";
import Attendance from "./Attendance";
import AddLesson from "./AddLesson";
import AddMeal from "./AddMeal";
import SchedulingLessons from "./SchedulingLessons";
import SchedulingMeals from "./SchedulingMeals";
import SchedulingEmployees from "./SchedulingEmployees";
import SchedulingChildren from "./SchedulingChildren";

export default function ShowAllRooms() {
  const [allRooms, setAllRooms] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [allRoomsCount, setAllRoomsCount] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const getAllRooms = () => {
    axios
      .get(`http://localhost:8091/api/rooms/getAllRooms`)
      .then((response) => {
        if (response.data) {
          setAllRooms(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getCount = () => {
    date &&
      axios
        .get(
          `http://localhost:8091/api/rooms/getAllRoomsScheduleCountByDate/${date}`
        )
        .then((response) => {
          if (response.data) {
            setAllRoomsCount(response.data);
          } else {
            alert("Something went wrong...");
          }
        })
        .catch((error) => console.error(error));
  };

  useEffect(() => getCount(), [date]);
  useEffect(() => getAllRooms(), []);

  const getEmployeesCount = (roomId) => {
    let count = 0;
    allRoomsCount &&
      allRoomsCount.forEach((room) => {
        if (room.roomId === roomId) {
          count = room.acceptableCapacity;
        }
      });
    return count;
  };

  const getChildrenCount = (roomId) => {
    let count = 0;
    allRoomsCount &&
      allRoomsCount.forEach((room) => {
        if (room.roomId === roomId) {
          count = room.roomCapacity;
        }
      });
    return count;
  };

  // useEffect(() => , [allRoomsCount]);

  return (
    <div className="container-fluid mt-2 mb-3">
      <div className="card m-2 p-2 mt-0">
        <div className="row">
          <div className="col-sm-4">
            <div className="ml-2 mt-1">
              <label className="">Select Date:</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-sm-8 text-right">
            <button
              type="button"
              className="btn btn-sm btn-green btn-rounded mt-3 mb-0 mr-2 mr-3"
              data-toggle="modal"
              data-target="#addLesson"
            >
              Lessons
            </button>
            <button
              type="button"
              className="btn btn-sm btn-purple btn-rounded mt-3 mb-0 mr-4"
              data-toggle="modal"
              data-target="#addMeal"
            >
              Meals
            </button>
          </div>
        </div>
        <div className="row p-2">
          {allRooms &&
            allRooms.map((item, index) => (
              <div className="col-md-4">
                <div className="card mt-3 p-3 pt-0">
                  <div className="row mb-2">
                    <div className="col-sm-6 mt-1">{`${index + 1}. ${
                      item.roomName
                    }`}</div>
                    <div className="col-sm-6 text-right">
                      <button
                        type="button"
                        className="btn btn-sm btn-dark btn-rounded mt-0 mb-0 mr-3"
                        data-toggle="modal"
                        data-target="#scheduledData"
                        onClick={() => setCurrentRoom(item.roomId)}
                      >
                        <i className="fas fa-eye fa-1x"></i>
                      </button>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div
                      className="card p-2 ml-2 mr-2 w-full"
                      style={{ width: "100%" }}
                    >
                      <div className="row pl-2 pr-2">
                        <div className="col-sm-6 mt-1">Employee</div>
                        <div className="col-sm-6 text-right">
                          <span className="mr-2">
                            {getEmployeesCount(item.roomId)}
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary btn-rounded mt-0 mb-0"
                            data-toggle="modal"
                            data-target="#schedulingEmployees"
                            onClick={() => setCurrentRoom(item.roomId)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div
                      className="card p-2 pr-0 ml-2 mr-2"
                      style={{ width: "100%" }}
                    >
                      <div className="row pl-2 pr-2 ">
                        <div className="col-sm-6 mt-1">Children</div>
                        <div className="col-sm-6 text-right">
                          <span className="mr-2">
                            {getChildrenCount(item.roomId)}
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary btn-rounded mt-0 mb-0"
                            data-toggle="modal"
                            data-target="#schedulingChildren"
                            onClick={() => setCurrentRoom(item.roomId)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-end">
                    <div className="mt-1 mb-0">
                      <a
                        type="button"
                        className="mt-5"
                        onClick={() => setCurrentRoom(item.roomId)}
                        data-toggle="modal"
                        data-target="#schedulingLessons"
                      >
                        <i
                          class="fas fa-chalkboard-teacher fa-1x mr-4 mt-3 mb-0 ml-3 text-success"
                          style={{ color: "#00ff00", scale: "1.5" }}
                        ></i>
                      </a>
                      <a
                        type="button"
                        className=""
                        onClick={() => setCurrentRoom(item.roomId)}
                        data-toggle="modal"
                        data-target="#schedulingMeals"
                      >
                        <i
                          class="fas fa-1x fas fa-utensils mr-4 mt-0 mb-0 ml-3 text-secondary"
                          style={{ color: "#00ff00", scale: "1.5" }}
                        ></i>
                      </a>
                      <a
                        type="button"
                        className="mr-3"
                        data-toggle="modal"
                        data-target="#attendance"
                        onClick={() => setCurrentRoom(item.roomId)}
                        style={{ alignSelf: "flex-end" }}
                      >
                        <i
                          class="fas fa-1x fa-clipboard-check mr-4 mt-0 mb-0 ml-3 text-warning"
                          style={{ color: "#00ff00", scale: "1.5" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {currentRoom && (
          <SchedulingEmployees
            roomId={currentRoom}
            date={date}
            getAllRooms={getAllRooms}
            getCount={getCount}
            allRoomsCount={allRoomsCount}
          />
        )}
        {currentRoom && (
          <SchedulingChildren
            roomId={currentRoom}
            date={date}
            getAllRooms={getAllRooms}
            getCount={getCount}
            allRoomsCount={allRoomsCount}
          />
        )}
        {currentRoom && (
          <ScheduledData
            date={date}
            roomId={currentRoom}
            getCount={getCount}
            allRoomsCount={allRoomsCount}
          />
        )}
        {currentRoom && (
          <Attendance
            date={date}
            roomId={currentRoom}
            allRoomsCount={allRoomsCount}
          />
        )}
        {currentRoom && (
          <SchedulingLessons
            date={date}
            roomId={currentRoom}
            getCount={getCount}
          />
        )}
        {currentRoom && (
          <SchedulingMeals
            date={date}
            roomId={currentRoom}
            getCount={getCount}
          />
        )}
        <AddLesson />
        <AddMeal />
      </div>
    </div>
  );
}
