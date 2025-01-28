import React, { useState } from "react";
import CampusStudentInformation from "./CampusStudentInformation";
import OnlineParentOrGuardianInformation from "./OnlineParentOrGuardianInformation";
import SchoolPolicies from "./SchoolPolicies";
import StudentHistory from "./StudentHistory";
import ParentAndStudentContract from "./ParentAndStudentContract";
import ParentOrGuardianPledge from "./ParentOrGuardianPledge";
import InformationForRecordsRequest from "./InformationForRecordsRequest";
import "./styles.css";

export default function FCAOnlineCurriculumApplication() {
  const [schoolYear, setSchoolYear] = useState("24-25");

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-sm-10">
          <h5 className="text-center font-weight-bold">
            FCA Online Curriculum Application
          </h5>
          <p className="text-center font-weight-bold">APPLY FOR ENROLLMENT</p>
          <p className="text-center">
            Complete the online application and submit proper fees. FCA will
            request records from your child’s previous school. Familiarize
            yourself with FCA's <a href="#">Policies and Procedures</a>.
          </p>
          <p className="text-center">Thank you for registering!</p>
          {/* School Year Selection  */}
          <div className="col-sm-4 mb-3">
            <label for="schoolYear" className="form-label font-weight-bold">
              School Year
            </label>
            <select
              className="form-select"
              id="schoolYear"
              value={schoolYear}
              onChange={(e) => setSchoolYear(e.target.value)}
            >
              <option value={"24-25"}>24-25</option>
              <option value={"23-24"}>23-24</option>
              <option value={"22-23"}>22-23</option>
            </select>
          </div>
          <div className="col-sm-12">
            <div className="accordion mb-3" id="studentInfoAccordion">
              {/* item-1 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed font-weight-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#studentInformation"
                    aria-expanded="false"
                    aria-controls="studentInformation"
                  >
                    Student Information
                  </button>
                </h2>
                <div
                  id="studentInformation"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <CampusStudentInformation />
                  </div>
                </div>
              </div>

              {/* item-2 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed font-weight-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#ParentOrGuardianInformation2"
                    aria-expanded="false"
                    aria-controls="ParentOrGuardianInformation2"
                  >
                    Parent/Guardian Information
                  </button>
                </h2>
                <div
                  id="ParentOrGuardianInformation2"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <OnlineParentOrGuardianInformation />
                  </div>
                </div>
              </div>

              {/* item-3 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed font-weight-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#schoolPolicies3"
                    aria-expanded="false"
                    aria-controls="schoolPolicies3"
                  >
                    School Policies
                  </button>
                </h2>
                <div
                  id="schoolPolicies3"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <SchoolPolicies />
                  </div>
                </div>
              </div>

              {/* item-4 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed font-weight-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#StudentHistory4"
                    aria-expanded="false"
                    aria-controls="StudentHistory4"
                  >
                    Student History
                  </button>
                </h2>
                <div
                  id="StudentHistory4"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <StudentHistory />
                  </div>
                </div>
              </div>

              {/* item-5 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed font-weight-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#ParentAndStudentContract5"
                    aria-expanded="false"
                    aria-controls="ParentAndStudentContract5"
                  >
                    Parent And Student Contract
                  </button>
                </h2>
                <div
                  id="ParentAndStudentContract5"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <ParentAndStudentContract />
                  </div>
                </div>
              </div>

              {/* item-6 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed font-weight-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#ParentOrGuardianPledge6"
                    aria-expanded="false"
                    aria-controls="ParentOrGuardianPledge6"
                  >
                    Parent/Guardian Pledge
                  </button>
                </h2>
                <div
                  id="ParentOrGuardianPledge6"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <ParentOrGuardianPledge />
                  </div>
                </div>
              </div>

              {/* item-7 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed font-weight-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#InformationForRecordsRequest7"
                    aria-expanded="false"
                    aria-controls="InformationForRecordsRequest7"
                  >
                    Information For Records Request
                  </button>
                </h2>
                <div
                  id="InformationForRecordsRequest7"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <InformationForRecordsRequest />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
