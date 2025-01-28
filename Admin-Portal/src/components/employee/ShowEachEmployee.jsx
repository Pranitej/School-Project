import React, { useState, useEffect } from "react";
import EmployeeDocuments from "./EmployeeDocuments";
import axios from "axios";

export default function ShowEachEmployee({ currentEmployee }) {
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    setEmployee(currentEmployee);
  }, [currentEmployee]);

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:8091/api/employees/updateEmployee/${id}`, employee)
      .then((response) => {
        if (!response.data) {
          alert("Something went wrong...");
        } else {
          // Optionally, perform any other actions upon successful update
        }
      })
      .catch((error) => {
        console.error("Error updating employee: ", error);
        alert("Error updating employee");
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:8091/api/employees/deleteEmployee/${currentEmployee.empId}`
      )
      .then((response) => response && alert("Employee deleted..."))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container-fluid mt-3 mb-5">
      <div className="card m-0 shadow">
        <div className="card-header bg-primary text-white">
          Employee Information
        </div>
        <div className="card-body p-2 m-0 text-dark">
          <div className="row mb-5 mt-3">
            <div className="col-sm-10 text-center">
              <img
                className="img-fluid rounded-circle"
                src={`http://localhost:8091/images/employees/${currentEmployee.pic}`}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td>
                    <strong>Emp ID:</strong>
                  </td>
                  <td>{currentEmployee.empId}</td>
                  <td>
                    <strong>Primary Phone:</strong>
                  </td>
                  <td>{currentEmployee.primaryPhone}</td>
                </tr>
                <tr>
                  <td>
                    <strong>First Name:</strong>
                  </td>
                  <td>{currentEmployee.firstName}</td>
                  <td>
                    <strong>Alternate Phone:</strong>
                  </td>
                  <td>{currentEmployee.alternatePhone}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Last Name:</strong>
                  </td>
                  <td>{currentEmployee.lastName}</td>
                  <td>
                    <strong>Contact Address:</strong>
                  </td>
                  <td>{currentEmployee.contactAddress}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{currentEmployee.email}</td>
                  <td>
                    <strong>About me:</strong>
                  </td>
                  <td>{currentEmployee.aboutMe}</td>
                </tr>
                <tr>
                  <td>
                    <strong>DOB:</strong>
                  </td>
                  <td>{currentEmployee.birthday}</td>
                  <td>
                    <strong>Job title:</strong>
                  </td>
                  <td>{currentEmployee.jobTitle}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Gender:</strong>
                  </td>
                  <td>{currentEmployee.gender}</td>
                  <td>
                    <strong>DL:</strong>
                  </td>
                  <td>{currentEmployee.dl}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Status:</strong>
                  </td>
                  <td>{currentEmployee.status}</td>
                  <td>
                    <strong>Join Date:</strong>
                  </td>
                  <td>{currentEmployee.joinDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <button
                type="button"
                className="btn btn-sm btn-info btn-rounded"
                data-toggle="modal"
                data-target="#employeeDocuments"
              >
                Documents
              </button>
              <EmployeeDocuments empId={currentEmployee.empId} />
            </div>
            <div className="col-sm-4">
              <button
                type="button"
                className="btn btn-sm btn-warning btn-rounded"
                data-toggle="modal"
                data-target="#editEmployee"
              >
                Edit
              </button>
              <div
                className="modal fade"
                id={"editEmployee"}
                tabindex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-lg modal-notify modal-info"
                  role="document"
                >
                  {/* Content */}
                  <div className="modal-content">
                    {/* Header */}
                    <div className="modal-header">
                      <p className="heading lead">Edit Employee</p>

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
                      {/* Body */}
                      {employee.firstName && (
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="">
                                <label htmlFor="firstName9">First Name:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="firstName9"
                                  name="firstName"
                                  value={employee.firstName}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="">
                                <label htmlFor="lastName9">Last Name:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastName9"
                                  name="lastName"
                                  value={employee.lastName}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="">
                                <select
                                  className="md-select colorful-select dropdown-primary"
                                  id="gender9"
                                  onChange={handleChange}
                                  value={employee.gender}
                                >
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </select>
                                <label className="mdb-main-label pull-left">
                                  Gender
                                </label>
                              </div>
                              <div className="">
                                <label htmlFor="contactAddress9">
                                  Contact Address:
                                </label>
                                <textarea
                                  rows="3"
                                  className="md-textarea form-control"
                                  id="contactAddress9"
                                  name="contactAddress"
                                  value={employee.contactAddress}
                                  onChange={handleChange}
                                ></textarea>
                              </div>
                              <div className="">
                                <label htmlFor="primaryPhone9">
                                  Primary Phone:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="primaryPhone9"
                                  name="primaryPhone"
                                  value={employee.primaryPhone}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="">
                                <label htmlFor="alternatePhone9">
                                  Alternate Phone:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="alternatePhone9"
                                  name="alternatePhone"
                                  value={employee.alternatePhone}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="">
                                <label htmlFor="email9">Email:</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="email9"
                                  name="email"
                                  value={employee.email}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="">
                                <label htmlFor="birthday9">Birthday:</label>
                                <input
                                  type="text"
                                  className="form-control datepicker"
                                  id="birthday9"
                                  name="birthday"
                                  value={employee.birthday}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="">
                                <label htmlFor="joinDate9">Join Date:</label>
                                <input
                                  type="date"
                                  className="form-control datepicker"
                                  id="joinDate9"
                                  name="joinDate"
                                  value={employee.joinDate}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="">
                                <select
                                  className="mdb-select colorful-select dropdown-primary"
                                  name="status"
                                  value={employee.status}
                                  id="status9"
                                  onChange={handleChange}
                                  required
                                >
                                  <option value="" disabled>
                                    Select status
                                  </option>
                                  <option value="EveryDay">EveryDay</option>
                                  <option value="Inactive">InActive</option>
                                  <option value="Substitue">Substitue</option>
                                </select>
                                <label className="mdb-main-label pull-left">
                                  Status
                                </label>
                              </div>
                              <div className="">
                                <label htmlFor="jobTitle9">Job Title:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="jobTitle9"
                                  name="jobTitle"
                                  value={employee.jobTitle}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="">
                                <label htmlFor="aboutMe9">About Me:</label>
                                <textarea
                                  className="md-textarea form-control"
                                  id="aboutMe9"
                                  name="aboutMe"
                                  value={employee.aboutMe}
                                  onChange={handleChange}
                                ></textarea>
                              </div>
                              <div className="">
                                <label htmlFor="dl9">DL:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="dl9"
                                  name="dl"
                                  value={employee.dl}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="modal-footer">
                        <button
                          type="submit"
                          className="btn btn-info"
                          onClick={() => handleEdit(currentEmployee.empId)}
                          data-dismiss="modal"
                        >
                          Edit Employee <i className="far fa-gem ml-1"></i>
                        </button>
                        <a
                          type="button"
                          className="btn btn-outline-danger waves-effect"
                          data-dismiss="modal"
                        >
                          Cancel
                        </a>
                      </div>
                    </form>
                  </div>
                  {/* Content */}
                </div>

                {/* Central Modal Large Info */}
              </div>
            </div>
            <div className="col-sm-4">
              <button
                type="button"
                className="btn btn-sm btn-danger btn-rounded"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
