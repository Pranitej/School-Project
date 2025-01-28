import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AddChildAttendance() {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [allRooms, setAllRooms] = useState([]);
  const [_, setCurrentRoom] = useState(null);
  const [currentRoomId, setCurrentRoomId] = useState(-1);
  const [scheduledChildren, setScheduledChildren] = useState([]);
  const [currentChildId, setCurrentChildId] = useState(-1);
  const [currentChild, setCurrentChild] = useState(null);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickup, setPickup] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [previousAttendance, setPreviousAttendance] = useState(null);

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

  const getScheduledChildren = () => {
    currentRoomId > -1
      ? axios
          .get(
            `http://localhost:8091/api/child-schedules/getChildRoomSchedulesByRoomIdAndScheduleDate/${currentRoomId}/${currentDate}`
          )
          .then((response) => {
            if (response.data) {
              setScheduledChildren(response.data);
            } else {
              alert("Something went wrong...");
            }
          })
          .catch((error) => console.error(error))
      : setScheduledChildren([]);
  };

  const getPreviousAttendance = () => {
    currentChildId > -1 &&
      axios
        .get(
          `http://localhost:8091/api/child-attendance/getChildAttendanceBetweenDates/${currentChildId}/${currentDate}/${currentDate}`
        )
        .then((response) => {
          if (response.data) {
            setPreviousAttendance(
              response.data.length ? response.data[0] : null
            );
            if (response.data.length && response.data[0]) {
              setCheckInTime(response.data[0].checkedIn);
              setCheckOutTime(response.data[0].checkedOut);
              setDropOff(response.data[0].dropOff);
              setPickup(response.data[0].pickup);
              setNote(response.data[0].note);
              setStatus(response.data[0].status);
            } else {
              setCheckInTime("");
              setCheckOutTime("");
              setDropOff("");
              setPickup("");
              setNote("");
              setStatus("");
            }
          } else {
            alert("Something went wrong...");
          }
        })
        .catch((error) => console.error(error));
  };

  const handleAddAttendance = () => {
    const data = currentChildId > -1 && {
      attendanceId: previousAttendance ? previousAttendance.attendanceId : -1,
      childId: currentChildId,
      attendDate: currentDate,
      roomId: currentRoomId,
      checkedIn: checkInTime,
      checkedOut: checkOutTime,
      hours: null,
      dropOff,
      pickup: dropOff === "Absent" ? "Absent" : pickup,
      status,
      note,
    };

    currentChildId > -1
      ? axios
          .post(
            `http://localhost:8091/api/child-attendance/addChildAttendance`,
            data
          )
          .then((response) => {
            if (response.data) {
              getPreviousAttendance();
              alert("Attendance added...");
            } else {
              alert("Something went wrong...");
            }
          })
          .catch((error) => console.error(error))
      : alert("Select a child first...");
  };

  const getRoomDataByRoomId = (id) => {
    if (currentRoomId > -1) {
      for (let index = 0; index < allRooms.length; index++) {
        if (allRooms[index].roomId === id) {
          return allRooms[index];
        }
      }
    }
  };

  const getChildDataByChildId = () => {
    if (currentChildId && currentChildId > -1) {
      for (let index = 0; index < scheduledChildren.length; index++) {
        if (scheduledChildren[index].childId == currentChildId) {
          return scheduledChildren[index];
        }
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (scheduledChildren && !scheduledChildren.length) {
      setCurrentChild(null);
      setCurrentChildId(-1);
    }
  }, [scheduledChildren]);

  useEffect(() => getPreviousAttendance(), [currentChildId]);
  useEffect(() => setCurrentChild(getChildDataByChildId()), [currentChildId]);
  useEffect(() => getScheduledChildren(), [currentRoomId]);
  useEffect(() => getAllRooms(), []);
  useEffect(
    () => setCurrentRoom(getRoomDataByRoomId(currentRoomId)),
    [currentRoomId]
  );

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-sm-12 text-center">
          <h3 className="text-dark">
            <b>Add Child Attendance</b>
          </h3>
        </div>
      </div>
      <div className="card p-3 mt-3">
        <div className="row">
          <div className="col-sm-4">
            <label className="small">Room:</label>
            <select
              className="form-control form-control-sm"
              value={currentRoomId}
              onChange={(e) => {
                setCurrentRoomId(e.target.value);
              }}
            >
              <option value="-1">Select Room</option>
              {allRooms &&
                allRooms.map((item, index) => (
                  <option value={item.roomId} key={index}>
                    {item.roomName}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-sm-4">
            <label className="small">Child:</label>
            <select
              className="form-control form-control-sm"
              value={currentChildId}
              onChange={(e) => {
                setCurrentChildId(e.target.value);
              }}
            >
              <option value="-1">Select Child</option>
              {scheduledChildren &&
                scheduledChildren.map((item, index) => (
                  <option value={item.childId} key={index}>
                    {`${item.firstName} ${item.lastName}`}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-sm-4">
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
        </div>
        <div className="row mt-3">
          <div className="col-sm-4">
            <label className="small">Date:</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={currentDate}
              disabled
            />
          </div>
          <div className="col-sm-4">
            <label className="small">CheckInTime:</label>
            <input
              type="time"
              className="form-control form-control-sm"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <label className="small">CheckOutTime:</label>
            <input
              type="time"
              className="form-control form-control-sm"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-4">
            <label className="small">DropOff</label>
            <select
              className="form-control form-control-sm"
              value={dropOff}
              onChange={(e) => setDropOff(e.target.value)}
            >
              {currentChild && currentChild.dropOffs ? (
                currentChild.dropOffs.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))
              ) : (
                <option value="--select--">--select--</option>
              )}
            </select>
          </div>
          <div className="col-sm-4">
            <label className="small">Pickup</label>
            <select
              className="form-control form-control-sm"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            >
              {/* <option value="">Select Pickup</option> */}
              {currentChild && currentChild.dropOffs ? (
                currentChild.dropOffs.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))
              ) : (
                <option value="--select--">--select--</option>
              )}
            </select>
          </div>
          <div className="col-sm-4">
            <label className="small">Status</label>
            <select
              className="form-control form-control-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent" className="text-danger">
                Absent
              </option>
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12">
            <label className="small">Note</label>
            <textarea
              className="form-control form-control-sm"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="2"
            ></textarea>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleAddAttendance}
            >
              Add Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
