import axios from "axios";
import React, { useEffect, useState } from "react";
import { data } from "../../App";
import { useContext } from "react";

export default function Schedules() {
  const employee = useContext(data);

  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 8) + "01"
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [allSchedules, setAllSchedules] = useState([]);

  const getAllSchedulesByEmployeeId = () => {
    axios
      .get(
        `http://localhost:8091/api/employee-schedules/employee/${employee.employeeData.empId}/${startDate}/${endDate}`
      )
      .then((response) => {
        if (response.data) {
          setAllSchedules(response.data);
          console.log(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const deleteSchedule = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/employee-schedules/deleteSchedule/${id}`
      )
      .then((response) => {
        if (response) {
          getAllSchedulesByEmployeeId();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getAllSchedulesByEmployeeId(), [startDate, endDate]);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-sm-12 text-center">
          <h3>Schedules</h3>
        </div>
      </div>
      <hr />
      <div className="row mt-3">
        <div className="col-sm-3">
          <label className="small">Start Date</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-sm-3">
          <label className="small">End Date</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <hr className="mb-0" />
      <div className="row p-2 mt-2">
        <div className="col-sm-3">Date</div>
        <div className="col-sm-4">Room Name</div>
        <div className="col-sm-2">Start Time</div>
        <div className="col-sm-2">End Time</div>
        <div className="col-sm-1"></div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          {allSchedules && allSchedules.length > 0 ? (
            allSchedules.map((item, index) => (
              <div className="card mt-3" key={index}>
                <div className="row p-2">
                  <div className="col-3">{item.scheduleDate}</div>
                  <div className="col-4">{item.roomName}</div>
                  <div className="col-2">{item.startTime}</div>
                  <div className="col-2">{item.endTime}</div>
                  <div className="col-1">
                    <i
                      className="fas fa-trash text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteSchedule(item.scheduleId)}
                    ></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className="text-danger mt-3">No schedules found...</h4>
          )}
        </div>
      </div>
    </div>
  );
}
