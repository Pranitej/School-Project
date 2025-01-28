import axios from "axios";
import React, { useState } from "react";
import { data } from "../../App";
import { useContext } from "react";
import "./styles.css";

export default function ParentOrGuardianPledge() {
  const [formData, setFormData] = useState({
    primaryParentGuardianName: "",
    primaryParentGuardianSignature: "Not Agreed",
    secondaryParentGuardianName: "",
    secondaryParentGuardianSignature: "Not Agreed",
    elementaryStudentName: "",
    elementaryStudentSignature: "Not Agreed",
    middleHighSchoolStudentName: "",
    middleHighSchoolStudentSignature: "Not Agreed",
    date1: "",
    date2: "",
    date3: "",
  });

  const checkInCode = useContext(data).parentData.checkInCode;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8091/api/parent-guardian-pledge/createOrUpdatePledge`,
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

  // Clear canvas function
  const clearCanvas = (canvasId) => {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>
                Primary Parent/Guardian Printed Name.*
                <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                id="primaryParentGuardianName"
                value={formData.primaryParentGuardianName}
                onChange={handleChange}
                required
              />
              <small>Type "NA" if not applicable.</small>
            </div>
          </div>

          <div className="row">
            <div className="container mt-3 mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="primaryParentGuardianSignature"
                  checked={formData.primaryParentGuardianSignature === "Agreed"}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      primaryParentGuardianSignature:
                        formData.primaryParentGuardianSignature === "Agreed"
                          ? "Not Agreed"
                          : "Agreed",
                    });
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="primaryParentGuardianSignature"
                >
                  The above-provided information is correct and valid for
                  Primary Parent/Guardian.
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <p>
                Secondary Parent/Guardian Printed Name.*
                <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                id="secondaryParentGuardianName"
                value={formData.secondaryParentGuardianName}
                onChange={handleChange}
                required
              />
              <small>Type "NA" if not applicable.</small>
            </div>
          </div>

          <div className="row">
            <div className="container mt-3 mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="secondaryParentGuardianSignature"
                  checked={
                    formData.secondaryParentGuardianSignature === "Agreed"
                  }
                  onChange={() => {
                    setFormData({
                      ...formData,
                      secondaryParentGuardianSignature:
                        formData.secondaryParentGuardianSignature === "Agreed"
                          ? "Not Agreed"
                          : "Agreed",
                    });
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="secondaryParentGuardianSignature"
                >
                  The above-provided information is correct and valid for
                  Secondary Parent/Guardian.
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="date1" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date1"
                  value={formData.date1}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <h5 className="mt-3">Elementary Student Pledge</h5>
          <hr />

          <div className="row">
            <div className="col-md-12">
              <p>
                Student's Printed Name.*<span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                id="elementaryStudentName"
                value={formData.elementaryStudentName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="container mt-3 mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="elementaryStudentSignature"
                  checked={formData.elementaryStudentSignature === "Agreed"}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      elementaryStudentSignature:
                        formData.elementaryStudentSignature === "Agreed"
                          ? "Not Agreed"
                          : "Agreed",
                    });
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="elementaryStudentSignature"
                >
                  The above-provided information is correct and valid for
                  Elementary Student data.
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="date2" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date2"
                  value={formData.date2}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <h5 className="mt-3">Middle School & High School Pledge</h5>
          <hr />

          <div className="row">
            <div className="col-md-12">
              <p>
                Student's Printed Name.*<span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                id="middleHighSchoolStudentName"
                value={formData.middleHighSchoolStudentName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="container mt-3 mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="middleHighSchoolStudentSignature"
                  checked={
                    formData.middleHighSchoolStudentSignature === "Agreed"
                  }
                  onChange={() => {
                    setFormData({
                      ...formData,
                      middleHighSchoolStudentSignature:
                        formData.middleHighSchoolStudentSignature === "Agreed"
                          ? "Not Agreed"
                          : "Agreed",
                    });
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="middleHighSchoolStudentSignature"
                >
                  The above-provided information is correct and valid for Middle
                  High School Student data.
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="date3" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date3"
                  value={formData.date3}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary btn-sm">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
