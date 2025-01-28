import React from "react";
import "./ParentLandingPage.css";
import { useNavigate } from "react-router-dom";

export default function FormsLandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container mb-5">
        <div className="row mt-5">
          <div className="col-sm-12 text-center">
            <h3 className="font-weight-bold">Forms</h3>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-sm-6 text-center">
            <div className="icon-area">
              <a
                className="btn-floating btn-lg hover1 darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
                onClick={() => navigate("/parent/newEnrollHomeEdForm")}
              >
                <i class="fas fa-file-contract"></i>
              </a>
              <h6>
                <b className="font-weight-bold">
                  New Enroll/Re-Enroll - Home Ed. Umbrella Only
                </b>
                <p className="mt-2">View Form, Add Form.</p>
              </h6>
            </div>
          </div>
          <div className="col-sm-6 text-center">
            <div className="icon-area">
              <a
                className="btn-floating btn-lg hover1 darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
                onClick={() =>
                  navigate("/parent/FCAOnlineCurriculumApplication")
                }
              >
                <i class="fas fa-file-contract"></i>
              </a>
              <h6>
                <b className="font-weight-bold">
                  Enroll/Re-Enroll - Online Curriculum
                </b>
                <p className="mt-2">View Form, Add Form.</p>
              </h6>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-sm-6 text-center">
            <div className="icon-area">
              <a
                className="btn-floating btn-lg hover1 darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
                onClick={() => navigate("/parent/campusEnrollForm")}
              >
                <i class="fas fa-file-contract"></i>
              </a>
              <h6>
                <b className="font-weight-bold">Enroll/Re-Enroll - Campus</b>
                <p className="mt-2">View Form, Add Form.</p>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
