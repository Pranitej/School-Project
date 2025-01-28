import axios from "axios";
import React, { useState } from "react";
import { data } from "../../App";
import { useContext } from "react";
import "./styles.css";

export default function OnlineParentOrGuardianInformation() {
  const [formData, setFormData] = useState({
    parentEmail: "",
    parentFirstName: "",
    parentLastName: "",
    parentRelation: "",
    parentPhone: "",
    parentEducationLevel: "",
    parentDegree: "",
    parentDriversLicense: "",
    secondaryParentRelation: "",
    secondaryParentFirstName: "",
    secondaryParentLastName: "",
    secondaryParentPhoneNumber: "",
    secondaryParentEmail: "",
    secondaryParentEducationalLevel: "",
    secondaryParentDegreeType: "",
    secondaryParentDriversLicense: "",
    doesStudentAttendChurchRegularly: "",
    nameOfChurch: "",
    pastorsName: "",
    signature: "Not Agreed",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post(
        `http://localhost:8091/api/online-parent-guardian-information/createEntry`,
        {
          ...formData,
          isSubmitted: "Yes",
          checkInCode,
        }
      )
      .then((response) => {
        if (response.data) {
          alert("Form Submitted...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Primary Parent/Guardian Information */}
      <div className="mb-3">
        <label htmlFor="parentEmail" className="form-label">
          Primary Parent/Guardian Email *
        </label>
        <input
          type="email"
          className="form-control"
          id="parentEmail"
          name="parentEmail"
          placeholder="example@example.com"
          value={formData.parentEmail}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="parentFirstName" className="form-label">
            Primary Parent/Guardian First Name *
          </label>
          <input
            type="text"
            className="form-control"
            id="parentFirstName"
            name="parentFirstName"
            placeholder="First Name"
            value={formData.parentFirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="parentLastName" className="form-label">
            Primary Parent/Guardian Last Name *
          </label>
          <input
            type="text"
            className="form-control"
            id="parentLastName"
            name="parentLastName"
            placeholder="Last Name"
            value={formData.parentLastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="parentRelation" className="form-label">
          Primary Parent/Guardian Relation to Student *
        </label>
        <select
          className="form-select"
          id="parentRelation"
          name="parentRelation"
          value={formData.parentRelation}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Please Select
          </option>
          <option value="mother">Mother</option>
          <option value="father">Father</option>
          <option value="guardian">Guardian</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="parentPhone" className="form-label">
          Primary Parent/Guardian Phone Number *
        </label>
        <input
          type="tel"
          className="form-control"
          id="parentPhone"
          name="parentPhone"
          placeholder="(000) 000-0000"
          value={formData.parentPhone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Primary Parent/Guardian Educational Level (choose one) *
        </label>
        <br />
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="parentEducationLevel"
            id="ged"
            value="ged"
            onChange={handleChange}
            required
          />
          <label className="form-check-label" htmlFor="ged">
            GED
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="parentEducationLevel"
            id="highSchool"
            value="highSchool"
            onChange={handleChange}
            required
          />
          <label className="form-check-label" htmlFor="highSchool">
            High School Diploma
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="parentEducationLevel"
            id="college"
            value="college"
            onChange={handleChange}
            required
          />
          <label className="form-check-label" htmlFor="college">
            College Degree (list type)
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="parentDegree" className="form-label">
          Parent/Guardian Degree Type (if applicable)
        </label>
        <input
          type="text"
          className="form-control"
          id="parentDegree"
          name="parentDegree"
          value={formData.parentDegree}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="parentDriversLicense" className="form-label">
          Parent/Guardian Driver's License #
        </label>
        <input
          type="text"
          className="form-control"
          id="parentDriversLicense"
          name="parentDriversLicense"
          value={formData.parentDriversLicense}
          onChange={handleChange}
        />
      </div>

      {/* Secondary Parent/Guardian Information */}
      <h4>Secondary Parent/Guardian Information:</h4>

      <div className="mb-3">
        <label htmlFor="secondaryParentRelation" className="form-label">
          Secondary Parent/Guardian Relation to Student
        </label>
        <select
          className="form-select"
          id="secondaryParentRelation"
          name="secondaryParentRelation"
          value={formData.secondaryParentRelation}
          onChange={handleChange}
        >
          <option value="">Please Select</option>
          <option value="parent">Parent</option>
          <option value="guardian">Guardian</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="secondaryParentFirstName" className="form-label">
            Secondary Parent/Guardian First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="secondaryParentFirstName"
            name="secondaryParentFirstName"
            value={formData.secondaryParentFirstName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="secondaryParentLastName" className="form-label">
            Secondary Parent/Guardian Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="secondaryParentLastName"
            name="secondaryParentLastName"
            value={formData.secondaryParentLastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="secondaryParentPhoneNumber" className="form-label">
          Secondary Parent/Guardian Phone Number
        </label>
        <input
          type="tel"
          className="form-control"
          id="secondaryParentPhoneNumber"
          name="secondaryParentPhoneNumber"
          placeholder="(000) 000-0000"
          value={formData.secondaryParentPhoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="secondaryParentEmail" className="form-label">
          Secondary Parent/Guardian Email
        </label>
        <input
          type="email"
          className="form-control"
          id="secondaryParentEmail"
          name="secondaryParentEmail"
          placeholder="example@example.com"
          value={formData.secondaryParentEmail}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Secondary Parent/Guardian Educational Level (choose one)
        </label>
        <br />
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="secondaryParentEducationalLevel"
            id="secondaryGED"
            value="GED"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="secondaryGED">
            GED
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="secondaryParentEducationalLevel"
            id="secondaryHighSchool"
            value="highSchool"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="secondaryHighSchool">
            High School Diploma
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="secondaryParentEducationalLevel"
            id="secondaryCollege"
            value="college"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="secondaryCollege">
            College Degree (list type)
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="secondaryParentDegreeType" className="form-label">
          Secondary Parent/Guardian Degree Type (if applicable)
        </label>
        <input
          type="text"
          className="form-control"
          id="secondaryParentDegreeType"
          name="secondaryParentDegreeType"
          value={formData.secondaryParentDegreeType}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="secondaryParentDriversLicense" className="form-label">
          Secondary Parent/Guardian Driver's License #
        </label>
        <input
          type="text"
          className="form-control"
          id="secondaryParentDriversLicense"
          name="secondaryParentDriversLicense"
          value={formData.secondaryParentDriversLicense}
          onChange={handleChange}
        />
      </div>

      {/* Church Information */}
      <h4>Church Information:</h4>

      <div className="mb-3">
        <label
          htmlFor="doesStudentAttendChurchRegularly"
          className="form-label"
        >
          Does the student attend church regularly?
        </label>
        <select
          className="form-select"
          id="doesStudentAttendChurchRegularly"
          name="doesStudentAttendChurchRegularly"
          value={formData.doesStudentAttendChurchRegularly}
          onChange={handleChange}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="nameOfChurch" className="form-label">
          Name of Church
        </label>
        <input
          type="text"
          className="form-control"
          id="nameOfChurch"
          name="nameOfChurch"
          value={formData.nameOfChurch}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="pastorsName" className="form-label">
          Pastor's Name
        </label>
        <input
          type="text"
          className="form-control"
          id="pastorsName"
          name="pastorsName"
          value={formData.pastorsName}
          onChange={handleChange}
        />
      </div>

      {/* Signature */}
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="skippedGrade"
          checked={formData.signature === "Agreed"}
          onChange={() => {
            setFormData({
              ...formData,
              signature:
                formData.signature === "Agreed" ? "Not Agreed" : "Agreed",
            });
          }}
        />
        <label className="form-check-label" htmlFor="skippedGrade">
          The Above provided information is correct and valid.
        </label>
      </div>
      <br />

      {/* Submit button */}
      <button type="submit" className="btn btn-primary btn-sm">
        Submit
      </button>
    </form>
  );
}
