import axios from "axios";
import React, { useState } from "react";
import { data } from "../../App";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function EditStudentChurchInformationForm() {
  const [formData, setFormData] = useState({
    studentGoChurch: "",
    nameOfChurch: "",
    pasterName: "",
    phone: "",
    studentFullName: "",
    isSubmitted: false,
  });

  const { id } = useParams();

  const checkInCode = useContext(data).parentData.checkInCode;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getPreviousRecord = () => {
    axios
      .get(
        `http://localhost:8091/api/church-info/getChurchInformationById/${id}`
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
      .post(`http://localhost:8091/api/church-info/createChurchInformation`, {
        ...formData,
        isSubmitted: true,
        checkInCode,
      })
      .then((response) => {
        if (response.data) {
          alert("Form submitted...");
          getPreviousRecord();
          // setFormData({
          //   studentGoChurch: "",
          //   nameOfChurch: "",
          //   pasterName: "",
          //   phone: "",
          //   isSubmitted: true,
          //   studentFullName: "",
          // });
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getPreviousRecord(), [checkInCode]);

  return (
    <div className="container mt-4">
      <h3 className="text-center">Edit Student Church Information</h3>
      <div className="card p-4">
        <form onSubmit={handleSubmit}>
          {/* Student Go Church (Radio Buttons) */}
          <div className="mb-3">
            <label className="form-label">Do you go to church?</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="yes"
                name="studentGoChurch"
                value="Yes"
                onChange={handleChange}
                checked={formData.studentGoChurch === "Yes"}
              />
              <label htmlFor="yes" className="form-check-label ms-2">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="no"
                name="studentGoChurch"
                value="No"
                onChange={handleChange}
                checked={formData.studentGoChurch === "No"}
              />
              <label htmlFor="no" className="form-check-label ms-2">
                No
              </label>
            </div>
          </div>

          {/* Name of Student */}
          <div className="mb-3">
            <label htmlFor="studentFullName" className="form-label">
              Student Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentFullName"
              name="studentFullName"
              value={formData.studentFullName}
              onChange={handleChange}
            />
          </div>

          {/* Name of Church */}
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

          {/* Paster Name */}
          <div className="mb-3">
            <label htmlFor="pasterName" className="form-label">
              Paster's Name
            </label>
            <input
              type="text"
              className="form-control"
              id="pasterName"
              name="pasterName"
              value={formData.pasterName}
              onChange={handleChange}
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
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary btn-sm">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStudentChurchInformationForm;
