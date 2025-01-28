import React, { useState } from "react";
import axios from "axios";
import { data } from "../../../App";
import { useContext } from "react";
import "./styles.css";

export default function CampusStudentInformation() {
  const [formData, setFormData] = useState({
    enrollmentType: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    ssn: "",
    grade: "",
    gender: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    county: "",
    isSubmitted: "No",
  });

  const { checkInCode } = useContext(data).parentData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:8091/api/campus-students-information-form3/create`,
        {
          ...formData,
          checkInCode,
          isSubmitted: "Yes",
        }
      )
      .then((response) => {
        if (response.data) {
          alert("Form Submitted...");
          setFormData({
            enrollmentType: "",
            firstName: "",
            middleName: "",
            lastName: "",
            dateOfBirth: "",
            ssn: "",
            grade: "",
            gender: "",
            address: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            county: "",
            isSubmitted: "Yes",
          });
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">SELECT ONE</label>
        <br />
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="enrollmentType"
            id="reEnrollment"
            value="reEnrollment"
            checked={formData.enrollmentType === "reEnrollment"}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="reEnrollment">
            Re-Enrollment (enrolled last year)
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="enrollmentType"
            id="newStudent"
            value="newStudent"
            checked={formData.enrollmentType === "newStudent"}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="newStudent">
            New Student (Never Been Enrolled)
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="enrollmentType"
            id="returningStudent"
            value="returningStudent"
            checked={formData.enrollmentType === "returningStudent"}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="returningStudent">
            Returning Student (previously enrolled, transferred out and back in)
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          Student First Name
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter first name"
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="middleName" className="form-label">
          Student Middle Name
        </label>
        <input
          type="text"
          className="form-control"
          id="middleName"
          name="middleName"
          value={formData.middleName}
          placeholder="Enter middle name"
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Student Last Name *
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter last name"
          required
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="dateOfBirth" className="form-label">
          DOB *
        </label>
        <input
          type="date"
          className="form-control"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          required
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="ssn" className="form-label">
          Student SSN *
        </label>
        <input
          type="text"
          className="form-control"
          id="ssn"
          name="ssn"
          value={formData.ssn}
          placeholder="Enter SSN"
          required
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="grade" className="form-label">
          Grade Level*
        </label>
        <select
          className="form-select"
          id="grade"
          name="grade"
          value={formData.grade}
          required
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Please Select
          </option>
          <option value="PreK">PreK</option>
          <option value="K">K</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Gender *</label>
        <br />
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="male"
            value="male"
            checked={formData.gender === "male"}
            required
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="male">
            Male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="female"
            value="female"
            checked={formData.gender === "female"}
            required
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Student Home Address (where student resides) *
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={formData.address}
          placeholder="Street Address"
          required
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="address2"
          name="address2"
          value={formData.address2}
          placeholder="Street Address Line 2"
          onChange={handleInputChange}
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            placeholder="City"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={formData.state}
            placeholder="State / Province"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            id="zip"
            name="zip"
            value={formData.zip}
            placeholder="Postal / Zip Code"
            required
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="county" className="form-label">
          County *
        </label>
        <select
          className="form-select"
          id="county"
          name="county"
          value={formData.county}
          required
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Please Select
          </option>
          <option value="Anderson">Anderson</option>
          <option value="Bedford">Bedford</option>
          <option value="Benton">Benton</option>
          <option value="Bledsoe">Bledsoe</option>
          <option value="Blount">Blount</option>
          <option value="Bradley">Bradley</option>
          <option value="Campbell">Campbell</option>
          <option value="Cannon">Cannon</option>
          <option value="Carroll">Carroll</option>
          <option value="Carter">Carter</option>
          <option value="Cheatham">Cheatham</option>
          <option value="Chester">Chester</option>
          <option value="Claiborne">Claiborne</option>
          <option value="Clay">Clay</option>
          <option value="Cocke">Cocke</option>
          <option value="Coffee">Coffee</option>
          <option value="Crockett">Crockett</option>
          <option value="Cumberland">Cumberland</option>
          <option value="Davidson">Davidson</option>
          <option value="DeKalb">DeKalb</option>
          <option value="Decatur">Decatur</option>
          <option value="Dickson">Dickson</option>
          <option value="Dyer">Dyer</option>
          <option value="Fayette">Fayette</option>
          <option value="Fentress">Fentress</option>
          <option value="Franklin">Franklin</option>
          <option value="Gibson">Gibson</option>
          <option value="Giles">Giles</option>
          <option value="Grainger">Grainger</option>
          <option value="Greene">Greene</option>
          <option value="Grundy">Grundy</option>
          <option value="Hamblen">Hamblen</option>
          <option value="Hamilton">Hamilton</option>
          <option value="Hancock">Hancock</option>
          <option value="Hardeman">Hardeman</option>
          <option value="Hardin">Hardin</option>
          <option value="Hawkins">Hawkins</option>
          <option value="Haywood">Haywood</option>
          <option value="Henderson">Henderson</option>
          <option value="Henry">Henry</option>
          <option value="Hickman">Hickman</option>
          <option value="Houston">Houston</option>
          <option value="Humphreys">Humphreys</option>
          <option value="Jackson">Jackson</option>
          <option value="Jefferson">Jefferson</option>
          <option value="Johnson">Johnson</option>
          <option value="Knox">Knox</option>
          <option value="Lake">Lake</option>
          <option value="Lauderdale">Lauderdale</option>
          <option value="Lawrence">Lawrence</option>
          <option value="Lewis">Lewis</option>
          <option value="Lincoln">Lincoln</option>
          <option value="Loudon">Loudon</option>
          <option value="Macon">Macon</option>
          <option value="Madison">Madison</option>
          <option value="Marion">Marion</option>
          <option value="Marshall">Marshall</option>
          <option value="Maury">Maury</option>
          <option value="McMinn">McMinn</option>
          <option value="McNairy">McNairy</option>
          <option value="Meigs">Meigs</option>
          <option value="Monroe">Monroe</option>
          <option value="Montgomery">Montgomery</option>
          <option value="Moore">Moore</option>
          <option value="Morgan">Morgan</option>
          <option value="Obion">Obion</option>
          <option value="Overton">Overton</option>
          <option value="Perry">Perry</option>
          <option value="Pickett">Pickett</option>
          <option value="Polk">Polk</option>
          <option value="Putnam">Putnam</option>
          <option value="Rhea">Rhea</option>
          <option value="Roane">Roane</option>
          <option value="Robertson">Robertson</option>
          <option value="Rutherford">Rutherford</option>
          <option value="Scott">Scott</option>
          <option value="Sequatchie">Sequatchie</option>
          <option value="Sevier">Sevier</option>
          <option value="Shelby">Shelby</option>
          <option value="Smith">Smith</option>
          <option value="Stewart">Stewart</option>
          <option value="Sullivan">Sullivan</option>
          <option value="Sumner">Sumner</option>
          <option value="Tipton">Tipton</option>
          <option value="Trousdale">Trousdale</option>
          <option value="Unicoi">Unicoi</option>
          <option value="Union">Union</option>
          <option value="Van Buren">Van Buren</option>
          <option value="Warren">Warren</option>
          <option value="Washington">Washington</option>
          <option value="Wayne">Wayne</option>
          <option value="Weakley">Weakley</option>
          <option value="White">White</option>
          <option value="Williamson">Williamson</option>
          <option value="Wilson">Wilson</option>
          <option value="NOT LISTED HERE">NOT LISTED HERE</option>
        </select>
        <label
          className="form-sub-label"
          htmlFor="county"
          style={{ minHeight: "13px" }}
        >
          If not listed, select "Not Listed Here"
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-sm">
        Submit
      </button>
    </form>
  );
}
