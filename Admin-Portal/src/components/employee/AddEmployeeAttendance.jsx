import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Attendance from "./Attendance";

export default function AddEmployeeAttendance({
  currentEmployee,
  getAttendanceRecordsByDate,
}) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [previousAttendance, setPreviousAttendance] = useState(null);
  const [status, setStatus] = useState("Status");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [note, setNote] = useState("");

  const getPreviousAttendance = () => {
    axios
      .get(
        `http://localhost:8091/api/employee-attendance/getEmployeeAttendanceBetweenDates/${currentEmployee.empId}/${date}/${date}`
      )
      .then((response) => {
        if (response.data && response.data.length === 0) {
          setPreviousAttendance(null);
          setStatus("Status");
          setCheckInTime("");
          setCheckOutTime("");
          setNote("");
        } else {
          setPreviousAttendance(response.data[0]);
          setStatus(response.data[0].status);
          setCheckInTime(response.data[0].checkedIn);
          setCheckOutTime(response.data[0].checkedOut);
          setNote(response.data[0].note);
        }
      });
  };

  const handleAddEmployeeAttendance = () => {
    axios
      .post(
        `http://localhost:8091/api/employee-attendance/addEmployeeAttendance`,
        {
          attendanceId: previousAttendance
            ? previousAttendance.attendanceId
            : null,
          empId: currentEmployee.empId,
          attendDate: date,
          checkedIn: checkInTime,
          checkedOut: checkOutTime,
          status,
          note,
        }
      )
      .then((response) => {
        if (response.data) {
          getAttendanceRecordsByDate();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getPreviousAttendance(), [currentEmployee, date]);

  return (
    <div>
      <div
        className="modal fade"
        id="addEmployeeAttendance"
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
              <p className="heading lead">Add Employee Attendance</p>
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
                <div className="col-sm-6">
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
                <div className="col-sm-6">
                  <label className="small">Status:</label>
                  <select
                    className="form-control form-control-sm"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Status" selected>
                      -- Status --
                    </option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6">
                  <label className="small">CheckInTime:</label>
                  <input
                    type="time"
                    className="form-control form-control-sm"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
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
                onClick={() => handleAddEmployeeAttendance()}
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
        </div>
      </div>
    </div>
  );
}
