import React, { useEffect, useState } from "react";
import axios from "axios";
import { data } from "../../App";
import { useContext } from "react";

function MotherOrGuardianForm() {
  const [formData, setFormData] = useState({
    relationshipToChild: "",
    name: "",
    phone: "",
    email: "",
    mailingAddress: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    educationLevel: "",
    collegeDegreeName: "",
    placeOfEmployment: "",
    occupation: "",
    driverLicense: "",
    isSubmitted: false,
  });

  const checkInCode = useContext(data).parentData.checkInCode;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getPreviousRecord = () => {
    axios
      .get(
        `http://localhost:8091/api/mother-or-guardian/getByCheckInCode/${checkInCode}`
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
      .post(`http://localhost:8091/api/mother-or-guardian/create`, {
        ...formData,
        isSubmitted: true,
        checkInCode,
        collegeDegreeName:
          formData.educationLevel === "College Degree"
            ? formData.collegeDegreeName
            : "nill",
      })
      .then((response) => {
        if (response.data) {
          alert("Form submitted...");
          getPreviousRecord();
          setFormData({
            relationshipToChild: "",
            name: "",
            phone: "",
            email: "",
            mailingAddress: "",
            city: "",
            country: "",
            state: "",
            zipCode: "",
            educationLevel: "",
            collegeDegreeName: "",
            placeOfEmployment: "",
            occupation: "",
            driverLicense: "",
            isSubmitted: true,
          });
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getPreviousRecord(), []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* Relationship to Child */}
        <div className="mb-3">
          <label className="form-label">Relationship to Child</label>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="mother1"
              name="relationshipToChild"
              value="Mother"
              onChange={handleChange}
              checked={formData.relationshipToChild === "Mother"}
            />
            <label htmlFor="mother1" className="form-check-label">
              Mother
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="guardian1"
              name="relationshipToChild"
              value="Guardian"
              onChange={handleChange}
              checked={formData.relationshipToChild === "Guardian"}
            />
            <label htmlFor="guardian1" className="form-check-label">
              Guardian
            </label>
          </div>
        </div>

        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mailing Address */}
        <div className="mb-3">
          <label htmlFor="mailingAddress" className="form-label">
            Mailing Address
          </label>
          <input
            type="text"
            className="form-control"
            id="mailingAddress"
            name="mailingAddress"
            value={formData.mailingAddress}
            onChange={handleChange}
            required
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
            required
          />
        </div>

        {/* Country */}
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
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
            required
          />
        </div>

        {/* Zip Code */}
        <div className="mb-3">
          <label htmlFor="zipCode" className="form-label">
            Zip Code
          </label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Education Level */}
        <div className="mb-3">
          <label className="form-label">Education Level</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="ged"
              name="educationLevel"
              value="GED"
              onChange={handleChange}
              checked={formData.educationLevel === "GED"}
            />
            <label htmlFor="ged" className="form-check-label ms-2">
              GED
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="highSchoolDiploma"
              name="educationLevel"
              value="High School Diploma"
              onChange={handleChange}
              checked={formData.educationLevel === "High School Diploma"}
            />
            <label
              htmlFor="highSchoolDiploma"
              className="form-check-label ms-2"
            >
              High School Diploma
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="collegeDegree"
              name="educationLevel"
              value="College Degree"
              onChange={handleChange}
              checked={formData.educationLevel === "College Degree"}
            />
            <label htmlFor="collegeDegree" className="form-check-label ms-2">
              College Degree
            </label>
          </div>
        </div>

        {/* College Degree Name */}
        {formData.educationLevel === "College Degree" && (
          <div className="mb-3">
            <label htmlFor="collegeDegreeName" className="form-label">
              College Degree Name (if college degree selected above)
            </label>
            <input
              type="text"
              className="form-control"
              id="collegeDegreeName"
              name="collegeDegreeName"
              value={formData.collegeDegreeName}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Place of Employment */}
        <div className="mb-3">
          <label htmlFor="placeOfEmployment" className="form-label">
            Place of Employment
          </label>
          <input
            type="text"
            className="form-control"
            id="placeOfEmployment"
            name="placeOfEmployment"
            value={formData.placeOfEmployment}
            onChange={handleChange}
          />
        </div>

        {/* Occupation */}
        <div className="mb-3">
          <label htmlFor="occupation" className="form-label">
            Occupation
          </label>
          <input
            type="text"
            className="form-control"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>

        {/* Driver License */}
        <div className="mb-3">
          <label htmlFor="driverLicense" className="form-label">
            Driver License
          </label>
          <input
            type="text"
            className="form-control"
            id="driverLicense"
            name="driverLicense"
            value={formData.driverLicense}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-sm btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default MotherOrGuardianForm;
