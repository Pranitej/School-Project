import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddRoom({ handleAddRoom }) {
  const [familyName, setFamilyName] = useState("");
  const [status, setStatus] = useState("");

  const [room, setRoom] = useState({
    roomName: "",
    roomDetails: "",
    status: "",
    roomCapacity: 0,
    acceptableCapacity: 0,
    cribCheckReminders: false,
    faceToNameReminders: false,
    roomSecurityCheck: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addRoomRecord = async (e) => {
    // e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8091/api/rooms/addRoom",
        room
      );

      if (!response.status === 201) {
        throw new Error("Failed to add room");
      }

      // Reset form fields after successful submission
      setRoom({
        roomName: "",
        roomDetails: "",
        status: "",
        roomCapacity: 0,
        acceptableCapacity: 0,
        cribCheckReminders: false,
        faceToNameReminders: false,
        roomSecurityCheck: false,
      });
      handleAddRoom();
      alert("Room added successfully");
    } catch (error) {
      console.error("Error adding room:", error.message);
      alert("Failed to add room. Please try again.");
    }
  };

  let submitClick = (e) => {
    if (room.status === "") {
      alert("Please select a status.");
      return;
    }
    addRoomRecord();
  };

  return (
    <div>
      <div
        className="modal fade"
        id="addRoom"
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
              <p className="heading lead">Add Room</p>

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
                        value={room.roomName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="">
                      <label htmlFor="roomDetails">Room Details:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="roomDetails"
                        name="roomDetails"
                        value={room.roomDetails}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="">
                      <label class="small">Status</label>
                      <select
                        className="form-control"
                        name="status"
                        id="statusRoom"
                        value={room.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          -select status-
                        </option>
                        <option value="Active" selected>
                          Active
                        </option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                      </select>
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
                        value={room.roomCapacity}
                        onChange={handleChange}
                        required
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
                        value={room.acceptableCapacity}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="cribCheckReminders8"
                          name="cribCheckReminders"
                          checked={room.cribCheckReminders}
                          onChange={handleChange}
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
                          checked={room.faceToNameReminders}
                          onChange={handleChange}
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
                          checked={room.roomSecurityCheck}
                          onChange={handleChange}
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
                  className="btn btn-info"
                  onClick={() => submitClick()}
                  data-dismiss="modal"
                >
                  Add Room <i className="far fa-gem ml-1"></i>
                </button>
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
