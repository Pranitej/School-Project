import axios from "axios";
import React, { useState } from "react";
import { data } from "../../../App";
import { useContext } from "react";
import "./styles.css";

export default function CampusParentOrGuardianInformationForm() {
  const [formData, setFormData] = useState({
    parentEmail: "",
    parentFirstName: "",
    parentLastName: "",
    parentStreet1: "",
    parentStreet2: "",
    parentCity: "",
    parentState: "",
    parentZipCode: "",
    parentEducationLevel: "",
    parentPlaceOfEmployment: "",
    parentOccupation: "",
    parentDriversLicense: "",
    secondaryParentFirstName: "",
    secondaryParentLastName: "",
    secondaryParentPhoneNumber: "",
    secondaryParentStreet1: "",
    secondaryParentStreet2: "",
    secondaryParentCity: "",
    secondaryParentState: "",
    secondaryParentZipCode: "",
    secondaryParentEducationalLevel: "",
    secondaryParentPlaceOfEmployment: "",
    secondaryParentOccupation: "",
    secondaryParentDriversLicense: "",
    doesStudentAttendChurchRegularly: "",
    nameOfChurch: "",
    pastorsName: "",
    pastorsPhone: "",
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
    axios
      .post(`http://localhost:8091/api/campus-parent-guardian-info/create`, {
        ...formData,
        isSubmitted: "Yes",
        checkInCode,
      })
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
        <label htmlFor="parentStreet1" className="form-label">
          Primary Parent/Guardian Address Line 1 *
        </label>
        <input
          type="text"
          className="form-control"
          id="parentStreet1"
          name="parentStreet1"
          value={formData.parentStreet1}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="parentStreet2" className="form-label">
          Primary Parent/Guardian Address Line 2
        </label>
        <input
          type="text"
          className="form-control"
          id="parentStreet2"
          name="parentStreet2"
          value={formData.parentStreet2}
          onChange={handleChange}
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="parentCity" className="form-label">
            Primary Parent/Guardian City *
          </label>
          <input
            type="text"
            className="form-control"
            id="parentCity"
            name="parentCity"
            value={formData.parentCity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="parentState" className="form-label">
            Primary Parent/Guardian State *
          </label>
          <input
            type="text"
            className="form-control"
            id="parentState"
            name="parentState"
            value={formData.parentState}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="parentZipCode" className="form-label">
          Primary Parent/Guardian Zip Code *
        </label>
        <input
          type="text"
          className="form-control"
          id="parentZipCode"
          name="parentZipCode"
          value={formData.parentZipCode}
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
            checked={formData.parentEducationLevel === "ged"}
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
            checked={formData.parentEducationLevel === "highSchool"}
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
            checked={formData.parentEducationLevel === "college"}
            onChange={handleChange}
            required
          />
          <label className="form-check-label" htmlFor="college">
            College Degree (list type)
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="parentPlaceOfEmployment" className="form-label">
          Primary Parent/Guardian Place of Employment *
        </label>
        <input
          type="text"
          className="form-control"
          id="parentPlaceOfEmployment"
          name="parentPlaceOfEmployment"
          value={formData.parentPlaceOfEmployment}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="parentOccupation" className="form-label">
          Primary Parent/Guardian Occupation *
        </label>
        <input
          type="text"
          className="form-control"
          id="parentOccupation"
          name="parentOccupation"
          value={formData.parentOccupation}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="parentDriversLicense" className="form-label">
          Primary Parent/Guardian Driver's License *
        </label>
        <input
          type="text"
          className="form-control"
          id="parentDriversLicense"
          name="parentDriversLicense"
          value={formData.parentDriversLicense}
          onChange={handleChange}
          required
        />
      </div>

      {/* Secondary Parent/Guardian Information */}
      <h4>Secondary Parent/Guardian Information:</h4>
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
          value={formData.secondaryParentPhoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="secondaryParentStreet1" className="form-label">
          Secondary Parent/Guardian Address Line 1
        </label>
        <input
          type="text"
          className="form-control"
          id="secondaryParentStreet1"
          name="secondaryParentStreet1"
          value={formData.secondaryParentStreet1}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="secondaryParentStreet2" className="form-label">
          Secondary Parent/Guardian Address Line 2
        </label>
        <input
          type="text"
          className="form-control"
          id="secondaryParentStreet2"
          name="secondaryParentStreet2"
          value={formData.secondaryParentStreet2}
          onChange={handleChange}
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="secondaryParentCity" className="form-label">
            Secondary Parent/Guardian City
          </label>
          <input
            type="text"
            className="form-control"
            id="secondaryParentCity"
            name="secondaryParentCity"
            value={formData.secondaryParentCity}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="secondaryParentState" className="form-label">
            Secondary Parent/Guardian State
          </label>
          <input
            type="text"
            className="form-control"
            id="secondaryParentState"
            name="secondaryParentState"
            value={formData.secondaryParentState}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="secondaryParentZipCode" className="form-label">
          Secondary Parent/Guardian Zip Code
        </label>
        <input
          type="text"
          className="form-control"
          id="secondaryParentZipCode"
          name="secondaryParentZipCode"
          value={formData.secondaryParentZipCode}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Secondary Parent/Guardian Educational Level (choose one) *
        </label>
        <br />
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="secondaryParentEducationalLevel"
            id="secondaryParentEducationalLevelGED"
            value="ged"
            onChange={handleChange}
            checked={formData.secondaryParentEducationalLevel === "ged"}
            required
          />
          <label
            className="form-check-label"
            htmlFor="secondaryParentEducationalLevelGED"
          >
            GED
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="secondaryParentEducationalLevel"
            id="secondaryParentEducationalLevelHighSchool"
            value="highSchool"
            onChange={handleChange}
            checked={formData.secondaryParentEducationalLevel === "highSchool"}
            required
          />
          <label
            className="form-check-label"
            htmlFor="secondaryParentEducationalLevelHighSchool"
          >
            High School Diploma
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="secondaryParentEducationalLevel"
            id="secondaryParentEducationalLevelCollege"
            value="college"
            checked={formData.secondaryParentEducationalLevel === "college"}
            onChange={handleChange}
            required
          />
          <label
            className="form-check-label"
            htmlFor="secondaryParentEducationalLevelCollege"
          >
            College Degree (list type)
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label
          htmlFor="secondaryParentPlaceOfEmployment"
          className="form-label"
        >
          Secondary Parent/Guardian Place of Employment
        </label>
        <input
          type="text"
          className="form-control"
          id="secondaryParentPlaceOfEmployment"
          name="secondaryParentPlaceOfEmployment"
          value={formData.secondaryParentPlaceOfEmployment}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="secondaryParentOccupation" className="form-label">
          Secondary Parent/Guardian Occupation
        </label>
        <input
          type="text"
          className="form-control"
          id="secondaryParentOccupation"
          name="secondaryParentOccupation"
          value={formData.secondaryParentOccupation}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="secondaryParentDriversLicense" className="form-label">
          Secondary Parent/Guardian Driver's License
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
          Does the student attend church regularly? *
        </label>
        <select
          className="form-control"
          id="doesStudentAttendChurchRegularly"
          name="doesStudentAttendChurchRegularly"
          value={formData.doesStudentAttendChurchRegularly}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
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

      <div className="mb-3">
        <label htmlFor="pastorsPhone" className="form-label">
          Pastor's Phone Number
        </label>
        <input
          type="tel"
          className="form-control"
          id="pastorsPhone"
          name="pastorsPhone"
          value={formData.pastorsPhone}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-sm">
        Submit
      </button>
    </form>
  );
}
