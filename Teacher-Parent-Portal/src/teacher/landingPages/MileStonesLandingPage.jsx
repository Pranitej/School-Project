import React from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherLandingPage.css";

export default function MileStonesLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-12 text-center">
          <h3 className="font-weight-bold">Milestone Actions</h3>
        </div>
      </div>
      <div className="row mt-5 mb-5">
        <div className="col-sm-6 text-center">
          <div className="icon-area">
            <a
              className="btn-floating btn-lg hover darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/teacher/addMilestone")}
            >
              <i className="fas fa-plus d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">Add Milestone</b>
              <p className="mt-2">Add a Child Milestone.</p>
            </h6>
          </div>
        </div>
        <div className="col-sm-6 text-center">
          <div className="icon-area">
            <a
              className="btn-floating btn-lg hover darken-1 p-5 mb-4 d-inline-flex justify-content-center align-items-center"
              onClick={() => navigate("/teacher/milestoneRecords")}
            >
              <i className="fas fa-chart-pie d-flex justify-content-center"></i>
            </a>
            <h6>
              <b className="font-weight-bold">History</b>
              <p className="mt-2">View Child Milestone Records.</p>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
