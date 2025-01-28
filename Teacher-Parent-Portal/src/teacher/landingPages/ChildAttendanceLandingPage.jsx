import React from "react";
import "./TeacherLandingPage.css";
import { useNavigate } from "react-router-dom";

export default function ChildAttendanceLandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12 text-center">
            <h3 className="font-weight-bold"> Child Attendance Actions</h3>
          </div>
        </div>
        <div className="row mt-5 mb-5">
          <div className="col-sm-6 text-center">
            <div className="icon-area">
              <a
                className="btn-floating btn-lg hover darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
                onClick={() => navigate("/teacher/addChildAttendance")}
              >
                <i className="fas fa-fingerprint d-flex justify-content-center"></i>
              </a>
              <h6>
                <b className="font-weight-bold">Add Attendance</b>
                <p className="mt-2">Add Child Attendance.</p>
              </h6>
            </div>
          </div>
          <div className="col-sm-6 text-center">
            <div className="icon-area">
              <a
                className="btn-floating btn-lg hover darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
                onClick={() => navigate("/teacher/attendanceRecords")}
              >
                <i className="fas fa-chart-pie d-flex justify-content-center"></i>
              </a>
              <h6>
                <b className="font-weight-bold">History</b>
                <p className="mt-2">View Child Attendance Records.</p>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
