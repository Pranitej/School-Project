import React from "react";
import "./TeacherLandingPage.css";
import { useNavigate } from "react-router-dom";

export default function ChildLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-12 text-center">
          <h3 className="font-weight-bold"> Child Actions</h3>
        </div>
      </div>
      <div className="row mt-5 mb-5">
        <div className="col-sm-6 text-center">
          <div className="icon-area">
            <a
              className="btn-floating btn-lg hover darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/teacher/ChildAttendanceLandingPage")}
            >
              <i className="fas fa-fingerprint d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Attendance</b>
              <p className="mt-2">View Attendance, Add Attendance.</p>
            </h6>
          </div>
        </div>
        <div className="col-sm-6 text-center">
          <div className="icon-area">
            <a
              className="btn-floating btn-lg hover darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/teacher/mileStonesLandingPage")}
            >
              <i className="fas fa-star d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Milestones</b>
              <p className="mt-2">View Milestones, make changes.</p>
            </h6>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 text-center">
          <div className="icon-area ">
            <a
              className="btn-floating btn-lg hover darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/teacher/addActivity")}
            >
              <i className="far fa-calendar-plus d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Add Activity</b>
              <p className="mt-2">Add Child Activity.</p>
            </h6>
          </div>
        </div>
        <div className="col-sm-6 text-center">
          <div className="icon-area">
            <a
              className="btn-floating btn-lg hover darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/teacher/showActivities")}
            >
              <i className="fas fa-chart-line d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">View Activities</b>
              <p className="mt-2">View Activities, make changes.</p>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
