import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function EditRoom({ id, fetchRoomData }) {
  const [roomName, setRoomName] = useState("");
  const [roomDetails, setRoomDetails] = useState("");
  const [status, setStatus] = useState("active");
  const [roomCapacity, setRoomCapacity] = useState(0);
  const [acceptableCapacity, setAcceptableCapacity] = useState(0);
  const [cribCheckReminders, setCribCheckReminders] = useState(0);
  const [faceToNameReminders, setFaceToNameReminders] = useState(0);
  const [roomSecurityCheck, setRoomSecurityCheck] = useState(0);

  useEffect(() => {
    window.$("#statusRoom").materialSelect();

    window.$(".datepicker").pickadate({
      // Escape any “rule” characters with an exclamation mark (!).
      format: "dd-mm-yyyy",
      formatSubmit: "yyyy/mm/dd",
      hiddenPrefix: "prefix__",
      hiddenSuffix: "__suffix",
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8091/api/rooms/getRoomById/${id}`)
      .then((response) => {
        if (response.data) {
          const roomData = response.data;
          setRoomName(roomData.roomName);
          setRoomDetails(roomData.roomDetails);
          setStatus(roomData.status);
          setRoomCapacity(roomData.roomCapacity);
          setAcceptableCapacity(roomData.acceptableCapacity);
          setCribCheckReminders(roomData.cribCheckReminders);
          setFaceToNameReminders(roomData.faceToNameReminders);
          setRoomSecurityCheck(roomData.roomSecurityCheck);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleEditRoom = () => {
    axios
      .put(`http://localhost:8091/api/rooms/updateRoom/${id}`, {
        roomName: roomName,
        roomDetails: roomDetails,
        status: status,
        roomCapacity: roomCapacity,
        acceptableCapacity: acceptableCapacity,
        cribCheckReminders: cribCheckReminders,
        faceToNameReminders: faceToNameReminders,
        roomSecurityCheck: roomSecurityCheck,
      })
      .then((response) => {
        if (response.data) {
          setRoomName("");
          setRoomDetails("");
          setStatus("active");
          setRoomCapacity(0);
          setAcceptableCapacity(0);
          setCribCheckReminders(0);
          setFaceToNameReminders(0);
          setRoomSecurityCheck(0);
          fetchRoomData();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteRoom = () => {
    axios
      .delete(`http://localhost:8091/api/rooms/deleteRoom/${id}`)
      .then((response) => {
        if (response) {
          fetchRoomData();
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
        id="editRoom"
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
              <p className="heading lead">Edit Room</p>
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
                <div className="row">
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="roomName">Room Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="roomName"
                        name="roomName"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="roomDetails">Room Details:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="roomDetails"
                        name="roomDetails"
                        value={roomDetails}
                        onChange={(e) => setRoomDetails(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <select
                        className="mdb-select colorful-select dropdown-primary"
                        name="status"
                        id="statusRoom"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="active" selected>
                          Active
                        </option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                      <label class="mdb-main-label pull-left">Status</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="roomCapacity8">Room Capacity:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="roomCapacity8"
                        name="roomCapacity"
                        value={roomCapacity}
                        onChange={(e) => setRoomCapacity(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="acceptableCapacity8">
                        Acceptable Capacity:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="acceptableCapacity8"
                        name="acceptableCapacity"
                        value={acceptableCapacity}
                        onChange={(e) => setAcceptableCapacity(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="cribCheckReminders8"
                          name="cribCheckReminders"
                          checked={cribCheckReminders}
                          onChange={(e) =>
                            setCribCheckReminders(e.target.value)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="cribCheckReminders8"
                        >
                          Crib Check Reminders
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="faceToNameReminders8"
                          name="faceToNameReminders"
                          checked={faceToNameReminders}
                          onChange={(e) =>
                            setFaceToNameReminders(e.target.value)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="faceToNameReminders8"
                        >
                          Face To Name Reminders
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="roomSecurityCheck8"
                          name="roomSecurityCheck"
                          checked={roomSecurityCheck}
                          onChange={(e) => setRoomSecurityCheck(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="roomSecurityCheck8"
                        >
                          Room Security Check
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteRoom()}
                  data-dismiss="modal"
                >
                  Delete Room <i className="fas fa-trash fa-1x"></i>
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-info"
                  onClick={() => handleEditRoom()}
                  data-dismiss="modal"
                >
                  Edit Room <i className="far fa-gem ml-1"></i>
                </button>
                <a
                  type="button"
                  className="btn btn-sm btn-outline-danger waves-effect"
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
