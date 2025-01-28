import React from "react";
import { useState } from "react";
import CampusStudentInformation from "./CampusStudentInformation";
import CampusPrimaryParentOrGuardianInformation from "./CampusPrimaryParentOrGuardianInformation";
import CampusSchoolPolicies from "./CampusSchoolPolicies";
import CampusStudentHistory from "./CampusStudentHistory";
import CampusParentAndStudentContract from "./CampusParentAndStudentContract";
import CampusParentGuardianPledge from "./CampusParentGuardianPledge";
import CampusInformationForRecordsRequest from "./CampusInformationForRecordsRequest";
import CampusTransportationPermission from "./CampusTransportationPermission";

export default function CampusEnrollForm() {
  const [schoolYear, setSchoolYear] = useState("24-25");
  const [program, setProgram] = useState("");

  const handleInputChange = (e) => {
    setProgram(e.target.value);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-sm-10">
          <h5 className="text-center font-weight-bold">
            FCA Campus Application
          </h5>
          <p className="text-center font-weight-bold">
            Thank you for submitting your application!
          </p>
          <p className="text-center">
            Upon successful review and acceptance, you will receive an
            acceptance letter via email. In conjunction with this notification,
            you will be provided with instructions on how to proceed with the
            tuition financial contract and the payment of a $225 acceptance fee.
            It is imperative that the fee is paid within 5 business days from
            the date of acceptance. Failure to complete the financial contract
            and submit the acceptance fee may lead to the cancellation of
            enrollment, potentially resulting in truancy charges from the state.
          </p>

          {/* School Year Selection  */}
          <div className="col-sm-4 mb-3">
            <label for="schoolYear" className="form-label">
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

          <div className="col-sm-12 mb-3">
            <label className="form-label">
              Please select the program you are applying for
            </label>
            <br />
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="program"
                id="5 Days"
                value="5 Days"
                checked={program === "5 Days"}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="5 Days">
                5 Days
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="program"
                id="2 Days"
                value="2 Days"
                checked={program === "2 Days"}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="2 Days">
                2 Days
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="program"
                id="2 Days + Fine Arts Friday"
                value="2 Days + Fine Arts Friday"
                checked={program === "2 Days + Fine Arts Friday"}
                onChange={handleInputChange}
              />
              <label
                className="form-check-label"
                htmlFor="2 Days + Fine Arts Friday"
              >
                2 Days + Fine Arts Friday
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="program"
                id="Fine Arts Friday Only"
                value="Fine Arts Friday Only"
                checked={program === "Fine Arts Friday Only"}
                onChange={handleInputChange}
              />
              <label
                className="form-check-label"
                htmlFor="Fine Arts Friday Only"
              >
                Fine Arts Friday Only
              </label>
            </div>
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
                    data-bs-target="#CampusPrimaryParentOrGuardianInformation"
                    aria-expanded="false"
                    aria-controls="CampusPrimaryParentOrGuardianInformation"
                  >
                    Primary Parent/Guardian Information
                  </button>
                </h2>
                <div
                  id="CampusPrimaryParentOrGuardianInformation"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <CampusPrimaryParentOrGuardianInformation />
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
                    data-bs-target="#CampusSchoolPolicies"
                    aria-expanded="false"
                    aria-controls="CampusSchoolPolicies"
                  >
                    School Policies
                  </button>
                </h2>
                <div
                  id="CampusSchoolPolicies"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <CampusSchoolPolicies />
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
                    data-bs-target="#CampusStudentHistory"
                    aria-expanded="false"
                    aria-controls="CampusStudentHistory"
                  >
                    Student History
                  </button>
                </h2>
                <div
                  id="CampusStudentHistory"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <CampusStudentHistory />
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
                    data-bs-target="#CampusParentAndStudentContract"
                    aria-expanded="false"
                    aria-controls="CampusParentAndStudentContract"
                  >
                    Parent and Student Contract
                  </button>
                </h2>
                <div
                  id="CampusParentAndStudentContract"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <CampusParentAndStudentContract />
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
                    data-bs-target="#CampusParentGuardianPledge"
                    aria-expanded="false"
                    aria-controls="CampusParentGuardianPledge"
                  >
                    Campus Parent Guardian Pledge
                  </button>
                </h2>
                <div
                  id="CampusParentGuardianPledge"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <CampusParentGuardianPledge />
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
                    data-bs-target="#CampusInformationForRecordsRequest"
                    aria-expanded="false"
                    aria-controls="CampusInformationForRecordsRequest"
                  >
                    Information For Records Request
                  </button>
                </h2>
                <div
                  id="CampusInformationForRecordsRequest"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <CampusInformationForRecordsRequest />
                  </div>
                </div>
              </div>

              {/* item-8 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed font-weight-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#CampusTransportationPermission"
                    aria-expanded="false"
                    aria-controls="CampusTransportationPermission"
                  >
                    Transportation Permission
                  </button>
                </h2>
                <div
                  id="CampusTransportationPermission"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div className="accordion-body">
                    <CampusTransportationPermission />
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
