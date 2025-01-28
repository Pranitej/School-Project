import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AddChildAttendance({
  currentChild,
  getAttendanceRecordsByDate,
}) {
  const [previousAttendance, setPreviousAttendance] = useState(null);
  const [allRooms, setAllRooms] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [dropOff, setDropOff] = useState("");
  const [pickup, setPickup] = useState("");
  const [authorizedPickups, setAuthorizedPickups] = useState(null);
  const [note, setNote] = useState("");

  const getPreviousAttendance = () => {
    axios
      .get(
        `http://localhost:8091/api/child-attendance/getChildAttendanceBetweenDates/${currentChild.id}/${date}/${date}`
      )
      .then((response) => {
        if (response.data) {
          setPreviousAttendance(response.data.length ? response.data[0] : null);
          if (response.data.length && response.data[0]) {
            setCheckInTime(response.data[0].checkedIn);
            setCheckOutTime(response.data[0].checkedOut);
            setRoomId(response.data[0].roomId);
            setDropOff(response.data[0].dropOff);
            setPickup(response.data[0].pickup);
            setNote(response.data[0].note);
          } else {
            setCheckInTime("");
            setCheckOutTime("");
            setRoomId(null);
            setDropOff("");
            setPickup("");
            setNote("");
          }
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getChildScheduledRoomId = () => {
    axios
      .get(
        `http://localhost:8091/api/child-schedules/getChildScheduleByChildIdAndScheduleDate/${currentChild.id}/${date}`
      )
      .then((response) => {
        if (response.data) {
          setRoomId(response.data.roomId);
        } else {
          setRoomId(null);
        }
      })
      .catch((error) => console.error(error));
  };

  const getAuthorizedPickups = () => {
    axios
      .get(
        `http://localhost:8091/api/authorized-pickups/getAuthorizedPickupsByCheckInCode/${currentChild.checkInCode}`
      )
      .then((response) => {
        if (response.data) {
          setAuthorizedPickups(response.data);
        } else {
          setAuthorizedPickups(null);
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

  const addChildAttendance = () => {
    const data = {
      attendanceId: previousAttendance ? previousAttendance.attendanceId : -1,
      childId: currentChild.id,
      attendDate: date,
      roomId,
      checkedIn: checkInTime,
      checkedOut: checkOutTime,
      hours: null,
      dropOff,
      pickup: dropOff === "Absent" ? "Absent" : pickup,
      status: dropOff === "Absent" ? "Absent" : "Present",
      note,
    };

    axios
      .post(
        `http://localhost:8091/api/child-attendance/addChildAttendance`,
        data
      )
      .then((response) => {
        if (response.data) {
          getAttendanceRecordsByDate();
          alert("Attendance added...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddChildAttendance = () => {
    if (checkInTime === "") {
      alert("CheckIn Time Not selected");
    } else if (checkOutTime === "") {
      alert("CheckOut Time Not selected");
    } else if (!roomId) {
      alert("Child Not Scheduled");
    } else if (dropOff === "") {
      alert("DropOff Not selected");
    } else if (pickup === "") {
      alert("Pickup Not selected");
    } else {
      addChildAttendance();
    }
  };

  const getRoomNameByRoomId = (id) => {
    if (allRooms) {
      for (let index = 0; index < allRooms.length; index++) {
        if (allRooms[index].roomId === id) {
          return allRooms[index].roomName;
        }
      }
    }
  };

  useEffect(() => getAllRooms(), []);
  useEffect(() => getAuthorizedPickups(), [currentChild]);
  useEffect(() => getPreviousAttendance(), [date, currentChild]);
  useEffect(() => getChildScheduledRoomId(), [date, currentChild]);

  return (
    <div>
      <div
        className="modal fade"
        id="addAttendance"
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
              <p className="heading lead">Add Attendance</p>

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
            {/* Body */}
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-4">
                  <label className="small">Date:</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
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
                  <label className="small">Room:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    // onChange={() => {}}
                    value={
                      roomId
                        ? getRoomNameByRoomId(roomId)
                        : "Child Not Scheduled"
                    }
                    disabled
                  />
                </div>
                <div className="col-sm-4">
                  <label className="small">Drop Off:</label>
                  <select
                    className="form-control form-control-sm"
                    onChange={(e) => {
                      setDropOff(e.target.value);
                    }}
                    value={dropOff}
                  >
                    <option value="">-- Select --</option>
                    {authorizedPickups &&
                      authorizedPickups.map((item, index) => (
                        <option
                          key={index}
                          value={`${item.firstName} ${item.lastName}`}
                        >{`${item.firstName} ${item.lastName}`}</option>
                      ))}
                    <option className="text-danger" value="Absent">
                      Absent
                    </option>
                  </select>
                </div>
                <div className="col-sm-4">
                  <label className="small">Pickup:</label>
                  <select
                    className="form-control form-control-sm"
                    onChange={(e) => {
                      setPickup(e.target.value);
                    }}
                    value={dropOff === "Absent" ? "Absent" : pickup}
                    disabled={dropOff === "Absent"}
                  >
                    <option value="">-- Select --</option>
                    {authorizedPickups &&
                      authorizedPickups.map((item, index) => (
                        <option
                          key={index}
                          value={`${item.firstName} ${item.lastName}`}
                        >{`${item.firstName} ${item.lastName}`}</option>
                      ))}
                    <option className="text-danger" value="Absent">
                      Absent
                    </option>
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <label className="small">Note:</label>
                  <textarea
                    className="form-control form-control-sm"
                    rows="3"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="submit"
                className="btn-sm btn btn-info"
                data-dismiss="modal"
                onClick={() => handleAddChildAttendance()}
              >
                Add Attendance
              </button>
              <a
                type="button"
                className="btn btn-sm btn-outline-danger waves-effect"
                data-dismiss="modal"
              >
                Cancel
              </a>
            </div>
          </div>
          {/* Content */}
        </div>

        {/* Central Modal Large Info */}
      </div>
    </div>
  );
}
