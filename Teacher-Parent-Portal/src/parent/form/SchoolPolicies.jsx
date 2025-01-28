import axios from "axios";
import React, { useState } from "react";
import { data } from "../../App";
import { useContext } from "react";

export default function SchoolPolicies() {
  const [formData, setFormData] = useState({
    enrollmentInitials: "",
    expulsionsInitials: "",
    homeEducation: "",
    refundsAll: "",
    schoolAttendance: "",
    testingRequirementsRecomm: "",
    disagreeWithFCAStatementOfFaith: "",
    hasStudentBeenArrestedOrHeldForQuestioning: "",
    isStudentPregnantOrMotherFatherToChild: "",
    doesStudentSmokeOrUseDrugs: "",
    hasStudentHadInoutSchoolSuspensionOrExpulsion: "",
    hasStudentBeenInSubstanceAbuseOrRehabilitationProgram: "",
    hasStudentEverBeenInvolvedInGangOrCult: "",
    isStudentMarried: "",
    date: "",
    signature: "Sign done...",
  });

  const checkInCode = useContext(data).parentData.checkInCode;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("object");

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios
      .post(`http://localhost:8091/api/school-policies/createPolicy`, {
        ...formData,
        isSubmitted: "Yes",
        checkInCode,
      })
      .then((response) => {
        if (response.data) {
          alert("Form Submitted...");
          setFormData({
            enrollmentInitials: "",
            expulsionsInitials: "",
            homeEducation: "",
            refundsAll: "",
            schoolAttendance: "",
            testingRequirementsRecomm: "",
            disagreeWithFCAStatementOfFaith: "",
            hasStudentBeenArrestedOrHeldForQuestioning: "",
            isStudentPregnantOrMotherFatherToChild: "",
            doesStudentSmokeOrUseDrugs: "",
            hasStudentHadInoutSchoolSuspensionOrExpulsion: "",
            hasStudentBeenInSubstanceAbuseOrRehabilitationProgram: "",
            hasStudentEverBeenInvolvedInGangOrCult: "",
            isStudentMarried: "",
            date: "",
            signature: "Sign done...",
          });
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <p>
        Please read each of the following then place your initials to indicate
        you've read each policy.
      </p>
      <div class="form-group">
        <label for="date">Date</label>
        <input
          type="date"
          class="form-control"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="policy">
        <h4>ENROLLMENT</h4>
        <p>
          Enrollment is open year round. FCA recommends that students be
          enrolled before March 31st to qualify for the Early Bird enrollment
          offer and no later than August 1st to avoid violation of state truancy
          laws.
        </p>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="enrollmentInitials">
            Initials:
          </label>
          <input
            type="text"
            className="form-control"
            id="enrollmentInitials"
            name="enrollmentInitials"
            size="2"
            value={formData.enrollmentInitials}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="policy">
        <h4>EXPULSIONS</h4>
        <p>
          FCA reserves the right to expel a student if the parent or student
          does not cooperate with the school or the educational process.
        </p>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="expulsionsInitials">
            Initials:
          </label>
          <input
            type="text"
            className="form-control"
            id="expulsionsInitials"
            name="expulsionsInitials"
            size="2"
            value={formData.expulsionsInitials}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="container">
        <h2>Home Education Reporting Requirements</h2>
        <p>
          Each home educating family must submit an Attendance and Progress
          Report twice annually, for the first and second semester.
        </p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="homeEducation"
            name="homeEducation"
            value={formData.homeEducation}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="container">
        <h5>REFUNDS</h5>
        <p>All fees are non-refundable.</p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="refundsAll"
            name="refundsAll"
            value={formData.refundsAll}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="container">
        <h5>SCHOOL ATTENDANCE</h5>
        <p>
          Students are required to complete 180 days of school with a minimum of
          4 hours of instruction per day.
        </p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="schoolAttendance"
            name="schoolAttendance"
            value={formData.schoolAttendance}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="container">
        <h5>TESTING REQUIREMENTS AND RECOMMENDATIONS</h5>
        <p>
          FCA provides Stanford Achievement Testing each year in the spring for
          K-12th grade students.
        </p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="testingRequirementsRecomm"
            name="testingRequirementsRecomm"
            value={formData.testingRequirementsRecomm}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="container">
        <h2>Please answer each of the following questions:</h2>

        <div className="form-group">
          <label>
            Does your family DISAGREE with FCA's Statement of faith?
          </label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="disagreeWithFCAStatementOfFaithYes"
              name="disagreeWithFCAStatementOfFaith"
              value="Yes"
              checked={formData.disagreeWithFCAStatementOfFaith === "Yes"}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="disagreeWithFCAStatementOfFaithYes"
            >
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="disagreeWithFCAStatementOfFaithNo"
              name="disagreeWithFCAStatementOfFaith"
              value="No"
              checked={formData.disagreeWithFCAStatementOfFaith === "No"}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="disagreeWithFCAStatementOfFaithNo"
            >
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Has student been arrested or held for questioning?</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="hasStudentBeenArrestedYes"
              name="hasStudentBeenArrestedOrHeldForQuestioning"
              value="Yes"
              checked={
                formData.hasStudentBeenArrestedOrHeldForQuestioning === "Yes"
              }
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="hasStudentBeenArrestedYes"
            >
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="hasStudentBeenArrestedNo"
              name="hasStudentBeenArrestedOrHeldForQuestioning"
              value="No"
              checked={
                formData.hasStudentBeenArrestedOrHeldForQuestioning === "No"
              }
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="hasStudentBeenArrestedNo"
            >
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Is the student pregnant or mother/father to a child?</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="isStudentPregnantYes"
              name="isStudentPregnantOrMotherFatherToChild"
              value="Yes"
              checked={
                formData.isStudentPregnantOrMotherFatherToChild === "Yes"
              }
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isStudentPregnantYes">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="isStudentPregnantNo"
              name="isStudentPregnantOrMotherFatherToChild"
              value="No"
              checked={formData.isStudentPregnantOrMotherFatherToChild === "No"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isStudentPregnantNo">
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Does the student smoke or use drugs?</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="doesStudentSmokeYes"
              name="doesStudentSmokeOrUseDrugs"
              value="Yes"
              checked={formData.doesStudentSmokeOrUseDrugs === "Yes"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="doesStudentSmokeYes">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="doesStudentSmokeNo"
              name="doesStudentSmokeOrUseDrugs"
              value="No"
              checked={formData.doesStudentSmokeOrUseDrugs === "No"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="doesStudentSmokeNo">
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>
            Has the student had in-school or out-of-school suspension/expulsion?
          </label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="hasStudentHadSuspensionYes"
              name="hasStudentHadInoutSchoolSuspensionOrExpulsion"
              value="Yes"
              checked={
                formData.hasStudentHadInoutSchoolSuspensionOrExpulsion === "Yes"
              }
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="hasStudentHadSuspensionYes"
            >
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="hasStudentHadSuspensionNo"
              name="hasStudentHadInoutSchoolSuspensionOrExpulsion"
              value="No"
              checked={
                formData.hasStudentHadInoutSchoolSuspensionOrExpulsion === "No"
              }
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="hasStudentHadSuspensionNo"
            >
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>
            Has the student been in a substance abuse/rehabilitation program?
          </label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="hasStudentBeenInRehabYes"
              name="hasStudentBeenInSubstanceAbuseOrRehabilitationProgram"
              value="Yes"
              checked={
                formData.hasStudentBeenInSubstanceAbuseOrRehabilitationProgram ===
                "Yes"
              }
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="hasStudentBeenInRehabYes"
            >
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="hasStudentBeenInRehabNo"
              name="hasStudentBeenInSubstanceAbuseOrRehabilitationProgram"
              value="No"
              checked={
                formData.hasStudentBeenInSubstanceAbuseOrRehabilitationProgram ===
                "No"
              }
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="hasStudentBeenInRehabNo"
            >
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Has the student ever been involved in a gang or cult?</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="hasStudentBeenInGangYes"
              name="hasStudentEverBeenInvolvedInGangOrCult"
              value="Yes"
              checked={
                formData.hasStudentEverBeenInvolvedInGangOrCult === "Yes"
              }
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="hasStudentBeenInGangYes"
            >
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="hasStudentBeenInGangNo"
              name="hasStudentEverBeenInvolvedInGangOrCult"
              value="No"
              checked={formData.hasStudentEverBeenInvolvedInGangOrCult === "No"}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="hasStudentBeenInGangNo"
            >
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Is the student married?</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="isStudentMarriedYes"
              name="isStudentMarried"
              value="Yes"
              checked={formData.isStudentMarried === "Yes"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isStudentMarriedYes">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="isStudentMarriedNo"
              name="isStudentMarried"
              value="No"
              checked={formData.isStudentMarried === "No"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isStudentMarriedNo">
              No
            </label>
          </div>
          {/* <div class="form-group">
            <label for="signature">Signature *</label>
            <canvas id="signatureCanvas" width="300" height="100"></canvas>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              onclick="clearCanvas()"
            >
              Clear
            </button>
          </div> */}
          <div className="row">
            <div className="col-sm-6">
              <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
