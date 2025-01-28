import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ChildTop10Messages from "../children/ChildTop10Messages";
import "./ParentLandingPage.css";

export default function WelcomeLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container mb-5">
      <div className="row mt-5">
        <div className="col-sm-12 text-center">
          <h3 className="font-weight-bold">Dashboard</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div
            className="card p-1 m-3"
            style={{ height: "200px", overflowY: "auto" }}
          >
            <ChildTop10Messages />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 text-center border-1">
          <Link to="/parent/newEnrollHomeEdForm" className="text-primary">
            <h6 style={{ fontWeight: "500" }}>
              Enroll/Re-Enroll - Home Ed. Umbrella
            </h6>
          </Link>
        </div>
        <div className="col-sm-4 text-center">
          <Link
            to="/parent/FCAOnlineCurriculumApplication"
            className="text-primary"
          >
            <h6 style={{ fontWeight: "500" }}>
              Enroll/Re-Enroll - Online Curriculum
            </h6>
          </Link>
        </div>
        <div className="col-sm-4 text-center">
          <Link to="/parent/campusEnrollForm" className="text-primary">
            <h6 style={{ fontWeight: "500" }}>Enroll/Re-Enroll - Campus</h6>
          </Link>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-6 text-center">
          <div className="icon-area">
            <a
              className="btn-floating btn-lg hover1 darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/parent/profile")}
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
              className="btn-floating btn-lg hover1 darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/parent/viewChildren")}
            >
              <i className="fas fa-child d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Children</b>
              <p className="mt-2">View Children, make changes.</p>
            </h6>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-6 text-center">
          <div className="icon-area">
            <a
              className="btn-floating btn-lg hover1 darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/parent/viewAuthorizedPickups")}
            >
              <i className="fas fa-handshake d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Authorized Pickups</b>
              <p className="mt-2">View Authorized Pickups, make changes.</p>
            </h6>
          </div>
        </div>
        <div className="col-sm-6 text-center">
          <div className="icon-area">
            <a
              className="btn-floating btn-lg hover1 darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/parent/viewEmergencyContacts")}
            >
              <i className="fas fa-handshake d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Emergency Contact</b>
              <p className="mt-2">View Emergency Contact, make changes.</p>
            </h6>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-6 text-center">
          <div className="icon-area ">
            <a
              className="btn-floating btn-lg hover1 darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/parent/familyDocuments")}
            >
              <i className="fas fa-file-import d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Family Documents</b>
              <p className="mt-2">View Documents, make changes.</p>
            </h6>
          </div>
        </div>
        {/* <div className="col-sm-6 text-center">
          <div className="icon-area ">
            <a
              className="btn-floating btn-lg hover1 darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/parent/formsLandingPage")}
            >
              <i class="fas fa-file-contract"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Forms</b>
              <p className="mt-2">Add Forms, View Forms.</p>
            </h6>
          </div>
        </div> */}
      </div>
    </div>
  );
}
