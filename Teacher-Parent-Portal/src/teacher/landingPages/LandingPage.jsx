import React from "react";
import "./TeacherLandingPage.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-12 text-center">
          <h3 className="font-weight-bold">Actions</h3>
        </div>
      </div>
      <div className="row mt-5 mb-5">
        <div className="col-sm-6 text-center">
          <div className="icon-area">
            <a
              className="btn-floating btn-lg hover darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/teacher/profile")}
            >
              <i className="fas fa-user d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Profile</b>
              <p className="mt-2">View Profile, make changes.</p>
            </h6>
          </div>
        </div>
        <div className="col-sm-6 text-center">
          <div className="icon-area">
            <a
              className="btn-floating btn-lg hover darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/teacher/schedules")}
            >
              <i className="fas fa-clipboard-list d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Schedules</b>
              <p className="mt-2">View Schedules, make changes.</p>
            </h6>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 text-center">
          <div className="icon-area ">
            <a
              className="btn-floating btn-lg hover darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/teacher/childActions")}
            >
              <i className="fas fa-child d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Children</b>
              <p className="mt-2">View Children, make changes.</p>
            </h6>
          </div>
        </div>
        <div className="col-sm-6 text-center">
          <div className="icon-area">
            <a
              className="btn-floating btn-lg hover darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/teacher/teacherAttendance")}
            >
              <i className="fas fa-fingerprint d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Teacher Attendance</b>
              <p className="mt-2">View Teacher Attendance.</p>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
