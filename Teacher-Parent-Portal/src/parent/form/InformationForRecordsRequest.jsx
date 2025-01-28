import React, { useState } from "react";
import { data } from "../../App";
import { useContext } from "react";
import axios from "axios";
import "./styles.css";

export default function InformationForRecordsRequest() {
  const [formData, setFormData] = useState({
    schoolName: "",
    streetAddress: "",
    streetAddressLine2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    schoolEmail: "",
    schoolFax: "",
    schoolPhoneNumber: "",
    studentSignature: "Sign Done...",
  });
  const [date, setDate] = useState("");

  const checkInCode = useContext(data).parentData.checkInCode;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post(`http://localhost:8091/api/records-request/create`, {
        ...formData,
        isSubmitted: "Yes",
        checkInCode,
        date,
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
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="mb-3">
            <label htmlFor="schoolName" className="form-label">
              Name of the last school attended
            </label>
            <input
              type="text"
              className="form-control"
              id="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="streetAddress" className="form-label">
              Street Address
            </label>
            <input
              type="text"
              className="form-control"
              id="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="streetAddressLine2" className="form-label">
              Street Address Line 2
            </label>
            <input
              type="text"
              className="form-control"
              id="streetAddressLine2"
              value={formData.streetAddressLine2}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="stateProvince" className="form-label">
                State/Province
              </label>
              <input
                type="text"
                className="form-control"
                id="stateProvince"
                value={formData.stateProvince}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="postalCode" className="form-label">
              Postal/Zip Code
            </label>
            <input
              type="text"
              className="form-control"
              id="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="schoolEmail" className="form-label">
              Email of last school attended
            </label>
            <input
              type="email"
              className="form-control"
              id="schoolEmail"
              value={formData.schoolEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="schoolFax" className="form-label">
              School fax number
            </label>
            <input
              type="tel"
              className="form-control"
              id="schoolFax"
              value={formData.schoolFax}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="schoolPhoneNumber" className="form-label">
              School phone number
            </label>
            <input
              type="tel"
              className="form-control"
              id="schoolPhoneNumber"
              value={formData.schoolPhoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="container mt-2 mb-3">
              {/* Signature */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="studentSignature"
                  checked={formData.studentSignature === "Agreed"}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      studentSignature:
                        formData.studentSignature === "Agreed"
                          ? "Not Agreed"
                          : "Agreed",
                    });
                  }}
                />
                <label className="form-check-label" htmlFor="studentSignature">
                  I give FCA permission to request records for my student.
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="date4" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date4"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-sm btn-primary mt-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
