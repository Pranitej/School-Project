import axios from "axios";
import React, { useState, useContext } from "react";
import { data } from "../../../App";
import "./styles.css";

export default function SchoolPolicies() {
  const [formData, setFormData] = useState({
    enrollment: "",
    expulsions: "",
    refunds: "",
    schoolAttendance: "",
    testingRequirementsRecommendations: "",
    disagreeWithFCAStatementOfFaith: "",
    hasStudentBeenArrestedOrHeldForQuestioning: "",
    isStudentPregnantOrMotherFatherToChild: "",
    doesStudentVapeOrSmokeOrUseDrugs: "",
    hasStudentHadInoutSchoolSuspensionOrExpulsion: "",
    hasStudentBeenInSubstanceAbuseOrRehabilitationProgram: "",
    hasStudentEverBeenInvolvedInGangOrCult: "",
    isStudentMarried: "",
    isSubmitted: "No",
  });

  const checkInCode = useContext(data).parentData.checkInCode;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios
      .post(`http://localhost:8091/api/campus-school-policies/create`, {
        ...formData,
        isSubmitted: "Yes",
        checkInCode,
      })
      .then((response) => {
        if (response.data) {
          alert("Form Submitted...");
          console.log(response.data);
          setFormData({
            enrollment: "",
            expulsions: "",
            refunds: "",
            schoolAttendance: "",
            testingRequirementsRecommendations: "",
            disagreeWithFCAStatementOfFaith: "",
            hasStudentBeenArrestedOrHeldForQuestioning: "",
            isStudentPregnantOrMotherFatherToChild: "",
            doesStudentVapeOrSmokeOrUseDrugs: "",
            hasStudentHadInoutSchoolSuspensionOrExpulsion: "",
            hasStudentBeenInSubstanceAbuseOrRehabilitationProgram: "",
            hasStudentEverBeenInvolvedInGangOrCult: "",
            isStudentMarried: "",
            isSubmitted: "No",
          });
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <p>Please fill out the following policies and questions.</p>

      {/* Enrollment */}
      <div className="policy">
        <h4>ENROLLMENT</h4>
        <p>
          Enrollment is open year round. FCA recommends that students be
          enrolled no later than August 1st to avoid violation of state truancy
          laws. Enrollment begins when parents/legal guardians submit enrollment
          forms and required fees.
        </p>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="enrollment">
            Enrollment Policy:
          </label>
          <input
            type="text"
            className="form-control"
            id="enrollment"
            name="enrollment"
            value={formData.enrollment}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Expulsions */}
      <div className="policy">
        <h4>EXPULSIONS</h4>
        <p>
          FCA reserves the right to expel a student if the parent or student
          does not cooperate with the school or the educational process. This
          decision may be made at the sole discretion of the administration.
        </p>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="expulsions">
            Expulsion Policy:
          </label>
          <input
            type="text"
            className="form-control"
            id="expulsions"
            name="expulsions"
            value={formData.expulsions}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Refunds */}
      <div className="container">
        <h5>REFUNDS</h5>
        <p>
          All fees are non-refundable as they cover the cost to perform a
          service
        </p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="refunds"
            name="refunds"
            value={formData.refunds}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* School Attendance */}
      <div className="container">
        <h5>SCHOOL ATTENDANCE</h5>
        <p>
          Students are required to complete 180 days of school with a minimum of
          6.5 hours of instruction per day. Attendance days may only be recorded
          while the student is a registered member of FCA.
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

      {/* Testing Requirements */}
      <div className="container">
        <b>TESTING REQUIREMENTS AND RECOMMENDATIONS</b>
        <p>
          FCA provides Stanford Achievement Testing each year in the spring for
          3rd-12th grade students. Students home educating with FCA are not
          required to take an annual achievement test, although FCA recommends
          testing in grades 3, 6 and 9-12 and every year to aid in tracking
          annual progress. In order to graduate with an FCA approved diploma,
          students must meet the FCA credit requirements and obtain a qualifying
          score from one of the following test during the 11th or 12th grade.
          High school Stanford Achievement Test (minimum stanine score of 4);
          college entrance ACT (minimum score of 20); college entrance SAT
          (minimum score of 1030). All Campus and Online Academy students are
          required to take an annual achievement test with FCA.
        </p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="testingRequirementsRecommendations"
            name="testingRequirementsRecommendations"
            value={formData.testingRequirementsRecommendations}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 card p-3 m-2 mt-3 mb-5">
          FCA is a church-related school, self-described as a
          "non-denominational Christian school.' In order to avoid any
          misunderstandings about our biblical position and teachings, we state
          that FCA is a fundamental, evangelical, protestant Christian school.
          Although church affiliation is important, FCA is more concerned with
          the family's personal relationship with Jesus Christ. Our Statement of
          Faith is as follows: We believe the Bible to be the inspired,
          infallible, and supreme and final authority for all faith and life. We
          believe there is one God, eternally existent in three: Father, Son,
          and Holy Spirit. We believe in the Deity of our Lord Jesus Christ, in
          His virgin birth, in His sinless life, in His miracles, in His
          vicarious and atoning death through His blood, in His bodily
          resurrection, in His ascension to the right hand of the Father, and in
          His personal return in power and glory. We believe that man was
          created in the image of God but fell into sin and is, therefore, lost.
          We must truly be born again to be saved from our sins. We believe the
          ministry of the Holy Spirit is to convict men, indwell, guide,
          instruct, and empower the believer for godly living for service. We
          believe in the bodily resurrection of both the saved and the lost. The
          saved to everlasting blessedness and joy with the Lord, and the lost
          to judgment and everlasting punishment.
        </div>
      </div>

      {/* Behavior Questions */}
      <div className="container">
        <h2>Please answer the following questions:</h2>

        <div className="form-group">
          <label>
            Does your family disagree with FCA's Statement of Faith?
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
          <label>Does the student Vape, smoke or use drugs?</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="doesStudentVapeOrSmokeOrUseDrugsYes"
              name="doesStudentVapeOrSmokeOrUseDrugs"
              value="Yes"
              checked={formData.doesStudentVapeOrSmokeOrUseDrugs === "Yes"}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="doesStudentVapeOrSmokeOrUseDrugsYes"
            >
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="doesStudentVapeOrSmokeOrUseDrugsNo"
              name="doesStudentVapeOrSmokeOrUseDrugs"
              value="No"
              checked={formData.doesStudentVapeOrSmokeOrUseDrugs === "No"}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="doesStudentVapeOrSmokeOrUseDrugsNo"
            >
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
