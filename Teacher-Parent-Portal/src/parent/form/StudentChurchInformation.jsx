import axios from "axios";
import React, { useState } from "react";
import { data } from "../../App";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentChurchInformationForm() {
  const [formData, setFormData] = useState({
    studentGoChurch: "",
    nameOfChurch: "",
    pasterName: "",
    phone: "",
    studentFullName: "",
    isSubmitted: false,
  });

  const navigate = useNavigate();

  const [previousRecords, setPreviousRecords] = useState([]);

  const checkInCode = useContext(data).parentData.checkInCode;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getPreviousRecords = () => {
    axios
      .get(`http://localhost:8091/api/church-info/checkin/${checkInCode}`)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          setPreviousRecords(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/church-info/deleteChurchInformation/${id}`
      )
      .then((response) => {
        if (response) {
          getPreviousRecords();
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
          getPreviousRecords();
          setFormData({
            studentGoChurch: "",
            nameOfChurch: "",
            pasterName: "",
            phone: "",
            isSubmitted: true,
            studentFullName: "",
          });
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getPreviousRecords(), [checkInCode]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12">
          {previousRecords && previousRecords.length !== 0 && (
            <div className="table-responsive mb-4">
              <table className="table table-sm mb-0" id="child_table_id">
                <thead className="table-dark">
                  <tr>
                    <th>Student Name</th>
                    <th>Church Name</th>
                    <th>Paster Name</th>
                    <th>Phone</th>
                    <th>Attend Church</th>
                    <th>Academic Year</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {previousRecords.map((item, index) => (
                    <tr key={index}>
                      <td>{item.studentFullName}</td>
                      <td>{item.nameOfChurch}</td>
                      <td>{item.pasterName}</td>
                      <td>{item.phone}</td>
                      <td>{item.studentGoChurch}</td>
                      <td>{item.academicYear}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            navigate(
                              `/parent/editStudentChurchInformationForm/${item.churchId}`
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.churchId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
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
  );
}

export default StudentChurchInformationForm;
