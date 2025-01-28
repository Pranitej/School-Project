import axios from "axios";
import React, { useEffect, useState } from "react";
import { data } from "../../App";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditStudentInformation = () => {
  const [formData, setFormData] = useState({
    enrollmentType: "",
    schoolYear: "",
    gradeLevel: "",
    gender: "",
    primaryTeacher: "",
    iepDocumentsStudHave: "",
    graduationParticipation: "",
    dualEnrollment: "",
    nameOfProgram: "",
    city: "",
    state: "",
    studentFirstName: "",
    studentMiddleName: "",
    studentLastName: "",
    dateOfBirth: "",
    socialSecurityNo: "",
    studentResidentAddress: "",
    studentResidentCity: "",
    studentResidentCountry: "",
    studentResidentState: "",
    studentResidentZipCode: "",
    isSubmitted: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const checkInCode = useContext(data).parentData.checkInCode;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getPreviousRecord = () => {
    axios
      .get(
        `http://localhost:8091/api/students-information/getStudentFormById/${id}`
      )
      .then((response) => {
        if (response.data) {
          setFormData(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8091/api/students-information/createStudentForm`,
        { ...formData, isSubmitted: true, checkInCode }
      )
      .then((response) => {
        if (response.data) {
          alert("Form submitted...");
          getPreviousRecord();
          // setFormData({
          //   enrollmentType: "",
          //   schoolYear: "",
          //   gradeLevel: "",
          //   gender: "",
          //   primaryTeacher: "",
          //   iepDocumentsStudHave: "",
          //   graduationParticipation: "",
          //   dualEnrollment: "",
          //   nameOfProgram: "",
          //   city: "",
          //   state: "",
          //   studentFirstName: "",
          //   studentMiddleName: "",
          //   studentLastName: "",
          //   dateOfBirth: "",
          //   socialSecurityNo: "",
          //   studentResidentAddress: "",
          //   studentResidentCity: "",
          //   studentResidentCountry: "",
          //   studentResidentState: "",
          //   studentResidentZipCode: "",
          //   isSubmitted: true,
          // });
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getPreviousRecord(), [id, checkInCode]);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Edit Student Information</h2>
      <div className="card p-5 mb-5">
        <form onSubmit={handleSubmit}>
          {/* Enrollment Type */}
          <div className="mb-3">
            <label className="form-label">Enrollment Type</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="reEnrollment"
                name="enrollmentType"
                value="Re-Enrollment"
                onChange={handleChange}
                checked={formData.enrollmentType === "Re-Enrollment"}
              />
              <label className="form-check-label" htmlFor="reEnrollment">
                Re-Enrollment
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="newStudent"
                name="enrollmentType"
                value="New Student"
                onChange={handleChange}
                checked={formData.enrollmentType === "New Student"}
              />
              <label className="form-check-label" htmlFor="newStudent">
                New Student
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="returningStudent"
                name="enrollmentType"
                value="Returning Student"
                onChange={handleChange}
                checked={formData.enrollmentType === "Returning Student"}
              />
              <label className="form-check-label" htmlFor="returningStudent">
                Returning Student
              </label>
            </div>
          </div>

          {/* School Year */}
          <div className="mb-3">
            <label htmlFor="schoolYear" className="form-label">
              School Year
            </label>
            <input
              type="number"
              className="form-control"
              id="schoolYear"
              name="schoolYear"
              value={formData.schoolYear}
              onChange={handleChange}
            />
          </div>

          {/* Grade Level */}
          <div className="mb-3">
            <label htmlFor="gradeLevel" className="form-label">
              Grade Level
            </label>
            <input
              type="text"
              className="form-control"
              id="gradeLevel"
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="male"
                name="gender"
                value="Male"
                onChange={handleChange}
                checked={formData.gender === "Male"}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="female"
                name="gender"
                value="Female"
                onChange={handleChange}
                checked={formData.gender === "Female"}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>

          {/* Primary Teacher */}
          <div className="mb-3">
            <label className="form-label">Primary Teacher</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="mother"
                name="primaryTeacher"
                value="Mother"
                onChange={handleChange}
                checked={formData.primaryTeacher === "Mother"}
              />
              <label className="form-check-label" htmlFor="mother">
                Mother
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="father"
                name="primaryTeacher"
                value="Father"
                onChange={handleChange}
                checked={formData.primaryTeacher === "Father"}
              />
              <label className="form-check-label" htmlFor="father">
                Father
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="legalGuardian"
                name="primaryTeacher"
                value="Legal Guardian"
                onChange={handleChange}
                checked={formData.primaryTeacher === "Legal Guardian"}
              />
              <label className="form-check-label" htmlFor="legalGuardian">
                Legal Guardian
              </label>
            </div>
          </div>

          {/* IEP Documents */}
          <div className="mb-3">
            <label className="form-label">IEP Documents Student Have</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="iepYes"
                name="iepDocumentsStudHave"
                value="Yes"
                onChange={handleChange}
                checked={formData.iepDocumentsStudHave === "Yes"}
              />
              <label className="form-check-label" htmlFor="iepYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="iepNo"
                name="iepDocumentsStudHave"
                value="No"
                onChange={handleChange}
                checked={formData.iepDocumentsStudHave === "No"}
              />
              <label className="form-check-label" htmlFor="iepNo">
                No
              </label>
            </div>
          </div>

          {/* Graduation Participation */}
          <div className="mb-3">
            <label className="form-label">Graduation Participation</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="kindergarten"
                name="graduationParticipation"
                value="Kindergarten Ceremony"
                onChange={handleChange}
                checked={
                  formData.graduationParticipation === "Kindergarten Ceremony"
                }
              />
              <label className="form-check-label" htmlFor="kindergarten">
                Kindergarten Ceremony
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="grade8"
                name="graduationParticipation"
                value="8th Grade Ceremony"
                onChange={handleChange}
                checked={
                  formData.graduationParticipation === "8th Grade Ceremony"
                }
              />
              <label className="form-check-label" htmlFor="grade8">
                8th Grade Ceremony
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="senior"
                name="graduationParticipation"
                value="Senior Ceremony"
                onChange={handleChange}
                checked={formData.graduationParticipation === "Senior Ceremony"}
              />
              <label className="form-check-label" htmlFor="senior">
                Senior Ceremony
              </label>
            </div>
          </div>

          {/* Dual Enrollment */}
          <div className="mb-3">
            <label className="form-label">Dual Enrollment</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="dualYes"
                name="dualEnrollment"
                value="Yes"
                onChange={handleChange}
                checked={formData.dualEnrollment === "Yes"}
              />
              <label className="form-check-label" htmlFor="dualYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="dualNo"
                name="dualEnrollment"
                value="No"
                onChange={handleChange}
                checked={formData.dualEnrollment === "No"}
              />
              <label className="form-check-label" htmlFor="dualNo">
                No
              </label>
            </div>
          </div>

          {/* Name of Program */}
          <div className="mb-3">
            <label htmlFor="nameOfProgram" className="form-label">
              Name of Program
            </label>
            <input
              type="text"
              className="form-control"
              id="nameOfProgram"
              name="nameOfProgram"
              value={formData.nameOfProgram}
              onChange={handleChange}
            />
          </div>

          {/* City */}
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          {/* State */}
          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          {/* Student First Name */}
          <div className="mb-3">
            <label htmlFor="studentFirstName" className="form-label">
              Student First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentFirstName"
              name="studentFirstName"
              value={formData.studentFirstName}
              onChange={handleChange}
            />
          </div>

          {/* Student Middle Name */}
          <div className="mb-3">
            <label htmlFor="studentMiddleName" className="form-label">
              Student Middle Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentMiddleName"
              name="studentMiddleName"
              value={formData.studentMiddleName}
              onChange={handleChange}
            />
          </div>

          {/* Student Last Name */}
          <div className="mb-3">
            <label htmlFor="studentLastName" className="form-label">
              Student Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentLastName"
              name="studentLastName"
              value={formData.studentLastName}
              onChange={handleChange}
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          {/* Social Security Number */}
          <div className="mb-3">
            <label htmlFor="socialSecurityNo" className="form-label">
              Social Security Number
            </label>
            <input
              type="text"
              className="form-control"
              id="socialSecurityNo"
              name="socialSecurityNo"
              value={formData.socialSecurityNo}
              onChange={handleChange}
            />
          </div>

          {/* Student Resident Address */}
          <div className="mb-3">
            <label htmlFor="studentResidentAddress" className="form-label">
              Student Resident Address
            </label>
            <textarea
              className="form-control"
              id="studentResidentAddress"
              name="studentResidentAddress"
              rows="3"
              value={formData.studentResidentAddress}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Student Resident City */}
          <div className="mb-3">
            <label htmlFor="studentResidentCity" className="form-label">
              Student Resident City
            </label>
            <input
              type="text"
              className="form-control"
              id="studentResidentCity"
              name="studentResidentCity"
              value={formData.studentResidentCity}
              onChange={handleChange}
            />
          </div>

          {/* Student Resident Country */}
          <div className="mb-3">
            <label htmlFor="studentResidentCountry" className="form-label">
              Student Resident Country
            </label>
            <input
              type="text"
              className="form-control"
              id="studentResidentCountry"
              name="studentResidentCountry"
              value={formData.studentResidentCountry}
              onChange={handleChange}
            />
          </div>

          {/* Student Resident State */}
          <div className="mb-3">
            <label htmlFor="studentResidentState" className="form-label">
              Student Resident State
            </label>
            <input
              type="text"
              className="form-control"
              id="studentResidentState"
              name="studentResidentState"
              value={formData.studentResidentState}
              onChange={handleChange}
            />
          </div>

          {/* Student Resident Zip Code */}
          <div className="mb-4">
            <label htmlFor="studentResidentZipCode" className="form-label">
              Student Resident Zip Code
            </label>
            <input
              type="text"
              className="form-control"
              id="studentResidentZipCode"
              name="studentResidentZipCode"
              value={formData.studentResidentZipCode}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            Submit
          </button>
        </form>
      </div>
      <div className="m-5 p-5"></div>
    </div>
  );
};

export default EditStudentInformation;
