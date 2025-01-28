import axios from "axios";
import React from "react";
import { useState } from "react";
import { data } from "../../../App";
import { useContext } from "react";
import "./styles.css";

export default function CampusTransportationPermission() {
  const [formData, setFormData] = useState({
    signature: "Not Agreed",
    isSubmitted: "No",
  });

  const checkInCode = useContext(data).parentData.checkInCode;

  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:8091/api/campus-transportation-permission/create`,
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
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <p>
            At times it becomes necessary to use FCA school bus or private
            vehicles to transport students to and from Family Christian Academy
            activities. When this occurs, Family Christian Academy requires that
            the parent/guardian sign the FCA Transportation Permission Form.
          </p>
          <p>
            My student may be transported for, but not limited to, the following
            activities: transportation to the community center, park, nursing
            home, library, etc.
          </p>
          <p>
            My student may be transported via FCA school bus or private
            transportation vehicle via a staff member or parent-led carpool.
          </p>
          <p>
            By signing this form, I hereby release/allow Family Christian
            Academy, as well as its directors, officers, administrators,
            employees, or other agents from all liability or damages for any,
            and all injuries arising from the negligence of any of the above
            while traveling to this activity via private transportation vehicle
            or FCA school bus. You will be able to add more students after this
            form is submitted.
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-12">
          {/* Signature */}
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="signature"
              checked={formData.signature === "Agreed"}
              onChange={() => {
                setFormData({
                  ...formData,
                  signature:
                    formData.signature === "Agreed" ? "Not Agreed" : "Agreed",
                });
              }}
            />
            <label className="form-check-label" htmlFor="signature">
              I give FCA permission to request records for my student.
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-12">
          <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
