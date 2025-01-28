import React, { useState, useEffect } from "react";
import axios from "axios";

function AddEmployee({ count, setCount }) {
  const [employeeName, setEmployeeName] = useState("");
  const [status, setStatus] = useState("");
  const [employee, setEmployee] = useState({
    empId: null,
    firstName: "",
    lastName: "",
    gender: "",
    contactAddress: "",
    primaryPhone: "",
    alternatePhone: "",
    email: "",
    pic: "",
    birthday: "",
    joinDate: "",
    status: "",
    jobTitle: "",
    aboutMe: "",
    dl: "",
  });

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setEmployee((prevChild) => ({
      ...prevChild,
      pic: e.target.files[0].name,
    }));
    previewImage(e);
  };

  const previewImage = (event) => {
    const input = event.target;
    const output = document.getElementById("emppic9");
    output.src = URL.createObjectURL(input.files[0]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadImage = async (filename) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("n", 5);
      formData.append("filename", filename);

      try {
        const response = await axios.post(
          "http://localhost:8091/api/files/upload",
          formData
        );

        if (response.status === 200) {
        } else {
          throw new Error("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No image selected.");
    }
  };

  const addEmployeeRecord = async (e) => {
    employee.pic = Date.now() + employee.pic;

    try {
      const response = await axios.post(
        "http://localhost:8091/api/employees/addEmployee",
        { ...employee, password: Date.now().toString().slice(-5) }
      );

      if (!response.status === 201) {
        throw new Error("Failed to add employee");
      }

      // Reset form fields after successful submission
      setEmployee({
        empId: null,
        firstName: "",
        lastName: "",
        gender: "",
        contactAddress: "",
        primaryPhone: "",
        alternatePhone: "",
        email: "",
        pic: "",
        birthday: "",
        joinDate: "",
        status: "",
        jobTitle: "",
        aboutMe: "",
        dl: "",
      });
      setFile(null);
      uploadImage(employee.pic);
      setCount((prev) => prev + 1);
      alert("Employee added successfully");
    } catch (error) {
      alert("Failed to add employee. Please try again.");
      console.error(error);
    }
  };

  let submitClick = (e) => {
    if (employee.status === "") {
      alert("Please select a status.");
      return;
    }
    addEmployeeRecord();
  };

  return (
    <div>
      <div
        className="modal fade"
        id="addEmployee"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-notify modal-info"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <p className="heading lead">Add Employee</p>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" className="white-text">
                  &times;
                </span>
              </button>
            </div>

            <form className="form-floating">
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <label htmlFor="pic9">Employee Picture:</label>
                      <input
                        type="file"
                        id="pic9"
                        name="pic"
                        onChange={handleFileChange}
                        className="btn btn-outline-secondary btn-rounded p-2"
                        data-mdb-ripple-color="dark"
                      />
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;Upload Employee Photo</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <img
                      id="emppic9"
                      className="img-fluid rounded-circle"
                      width="80px"
                      height="80px"
                      alt="Preview Photo"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor="firstName9">First Name:</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="firstName9"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName9">Last Name:</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="lastName9"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="gender9">Gender:</label>
                      <select
                        className="form-control form-control-sm"
                        id="gender9"
                        name="gender"
                        value={employee.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="primaryPhone9">Primary Phone:</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="primaryPhone9"
                        name="primaryPhone"
                        value={employee.primaryPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="alternatePhone9">Alternate Phone:</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="alternatePhone9"
                        name="alternatePhone"
                        value={employee.alternatePhone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="contactAddress9">Contact Address:</label>
                      <textarea
                        rows="3"
                        className="form-control form-control-sm"
                        id="contactAddress9"
                        name="contactAddress"
                        value={employee.contactAddress}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor="email9">Email:</label>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        id="email9"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="birthday9">Birthday:</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        id="birthday9"
                        name="birthday"
                        value={employee.birthday}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="joinDate9">Join Date:</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        id="joinDate9"
                        name="joinDate"
                        value={employee.joinDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="status9">Status:</label>
                      <select
                        className="form-control form-control-sm"
                        name="status"
                        id="status9"
                        value={employee.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="jobTitle9">Job Title:</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="jobTitle9"
                        name="jobTitle"
                        value={employee.jobTitle}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="aboutMe9">About Me:</label>
                      <textarea
                        className="form-control form-control-sm"
                        id="aboutMe9"
                        rows="3"
                        name="aboutMe"
                        value={employee.aboutMe}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="dl9">Driving License:</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="dl9"
                        name="dl"
                        value={employee.dl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitClick}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary waves-effect"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
