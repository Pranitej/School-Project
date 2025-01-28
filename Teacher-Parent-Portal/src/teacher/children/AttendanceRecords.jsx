import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AttendanceRecords() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 8) + "01"
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [currentChildId, setCurrentChildId] = useState(-1);
  const [currentChild, setCurrentChild] = useState(null);
  const [records, setRecords] = useState([]);
  const [allChildren, setAllChildren] = useState([]);
  const [allRooms, setAllRooms] = useState([]);

  const getAllChildren = () => {
    axios
      .get(`http://localhost:8091/api/children/getAllChildren`)
      .then((response) => {
        if (response.data) {
          setAllChildren(response.data);
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

  const getAttendanceRecordsByDate = () => {
    currentChildId > -1 &&
      axios
        .get(
          `http://localhost:8091/api/child-attendance/getChildAttendanceBetweenDates/${currentChildId}/${startDate}/${endDate}`
        )
        .then((response) => {
          if (response.data) {
            setRecords(response.data);
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

  useEffect(() => {
    if (currentChildId < 0) {
      setCurrentChild(null);
    }
    for (let index = 0; index < allChildren.length; index++) {
      if (allChildren[index].id == currentChildId) {
        setCurrentChild(allChildren[index]);
        break;
      }
    }
  }, [currentChildId]);

  useEffect(
    () => getAttendanceRecordsByDate(),
    [currentChildId, startDate, endDate]
  );

  useEffect(() => getAllChildren(), []);
  useEffect(() => getAllRooms(), []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-12 text-center">
          <h3>
            <b>Attendance Records</b>
          </h3>
        </div>
      </div>
      <div className="card p-3 mt-4">
        <div className="row">
          <div className="col-sm-3">
            <div className="card p-2 mt-2" style={{ display: "flex" }}>
              <div className="row pl-3 pr-3">
                {currentChild ? (
                  <>
                    <img
                      id="childPic"
                      className="img-fluid rounded-circle"
                      src={`http://localhost:8091/images/childrens/${currentChild.childPic}`}
                      alt="ChildPicture"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <label htmlFor="childPic" className="ml-3 text-dark mt-2">
                      <b>{`${currentChild.firstName} ${currentChild.lastName}`}</b>
                    </label>
                  </>
                ) : (
                  <h6 className="pt-1 text-danger">
                    <b>No Child Selected...</b>
                  </h6>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <label className="small">Select Child</label>
            <select
              className="form-control form-control-sm"
              value={currentChildId}
              onChange={(e) => setCurrentChildId(e.target.value)}
            >
              <option value={-1}>Select Child</option>
              {allChildren &&
                allChildren.map((item, index) => (
                  <option value={item.id} key={index}>
                    {`${item.firstName} ${item.lastName}`}
                  </option>
                ))}
            </select>
          </div>
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
        <hr />
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive mt-3">
              {allChildren && records && records.length > 0 ? (
                <>
                  <table className="table table-sm mb-0" id="child_table_id">
                    <thead className="table-dark">
                      <tr>
                        <th>Attend Date</th>
                        <th>Room Name</th>
                        <th>Check In</th>
                        <th>Checked Out</th>
                        <th>Hours</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((row) => (
                        <tr key={row.attendanceId}>
                          <td>{row.attendDate}</td>
                          <td>{getRoomNameByRoomId(row.roomId)}</td>
                          <td>
                            {row.checkedIn
                              ? `${row.checkedIn} (${row.dropOff})`
                              : "-"}
                          </td>
                          <td>
                            {row.checkedOut
                              ? `${row.checkedOut} (${row.pickup})`
                              : "-"}
                          </td>
                          <td>{row.hours ? `${row.hours}hrs` : "-"}</td>
                          <td>
                            {row.status === "Present" ? (
                              <div className="text-success">Present</div>
                            ) : (
                              <div className="text-danger">Absent</div>
                            )}
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
    </div>
  );
}
