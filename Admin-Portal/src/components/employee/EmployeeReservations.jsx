import axios from "axios";
import React, { useEffect, useState } from "react";

export default function EmployeeReservations({ currentEmployee }) {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 8) + "01"
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [scheduleRecords, setScheduleRecords] = useState(null);
  const [allRooms, setAllRooms] = useState(null);

  const getScheduleRecordsByDate = () => {
    axios
      .get(
        `http://localhost:8091/api/employee-schedules/getByEmployeeIdAndScheduleDateBetween/${currentEmployee.empId}/${startDate}/${endDate}`
      )
      .then((response) => {
        if (response.data) {
          setScheduleRecords(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

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

  const getRoomNameByRoomId = (id) => {
    for (let index = 0; index < allRooms.length; index++) {
      if (allRooms[index].roomId === id) {
        return allRooms[index].roomName;
      }
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/employee-schedules/deleteSchedule/${id}`
      )
      .then((response) => {
        if (response) {
          getScheduleRecordsByDate();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(
    () => getScheduleRecordsByDate(),
    [startDate, endDate, currentEmployee]
  );

  useEffect(() => getAllRooms(), []);

  return (
    <div className="container-fluid mt-0">
      <div className="row mt-3">
        <div className="col-sm-3">
          <label className="small">Start Date:</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </div>
        <div className="col-sm-3">
          <label className="small">End Date:</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="table-responsive mt-3">
            {allRooms && scheduleRecords && scheduleRecords.length !== 0 ? (
              <>
                <table className="table table-sm mb-0" id="child_table_id">
                  <thead className="table-dark">
                    <tr>
                      <th>Schedule Date</th>
                      <th>Room Name</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th className="text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleRecords.map((row) => (
                      <tr key={row.scheduleId}>
                        <td>{row.scheduleDate}</td>
                        <td>{getRoomNameByRoomId(row.roomId)}</td>
                        <td>{row.startTime}</td>
                        <td>{row.endTime}</td>
                        <td className="text-center">
                          <i
                            className="fas fa-trash fa-1/2x text-danger pr-3 pl-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(row.scheduleId)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr className="mt-0" />
              </>
            ) : (
              <h4 className="text-danger mt-3">No records found...</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
