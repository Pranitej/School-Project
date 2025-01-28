import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeAttendance from "./EmployeeAttendance";
import EmployeeEmails from "./EmployeeEmails";

export default function EmployeesInTable({
  handleDataUpdate,
  setCount,
  count,
}) {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(true);
  const [empId, setEmpId] = useState(0);
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

  useEffect(() => {
    axios
      .get("http://localhost:8091/api/employees/getAllEmployees")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [count, render]);

  useEffect(() => {
    if (data && data.length > 0) {
      window.$("#emp_table_id").DataTable();
    }
  }, [data, handleDataUpdate, render]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getEmployeeData = (id) => {
    axios
      .get(`http://localhost:8091/api/employees/getEmployeeById/${id}`)
      .then((response) =>
        response.data
          ? setEmployee(response.data)
          : alert("Something went wrong...")
      )
      .catch((error) => console.error(error));
  };

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:8091/api/employees/updateEmployee/${id}`, employee)
      .then((response) =>
        response.data ? setRender(!render) : alert("Something went wrong...")
      )
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    const result = true;
    if (result) {
      axios
        .delete(`http://localhost:8091/api/employees/deleteEmployee/${id}`)
        .then((response) => {
          response && setRender(!render);
          setCount((prev) => prev + 1);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="container-fluid card mt-3 p-2">
      <div className="row mb-2">
        <div className="col-sm-8 text-danger mt-2">
          <h5>
            <b>Employees List:</b>
          </h5>
        </div>
        <div className="col-sm-4 text-right">
          <button
            type="button"
            className="btn btn-sm btn-outline-success"
            data-toggle="modal"
            data-target="#emailPortal"
          >
            Email Portal
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            data-toggle="modal"
            data-target="#employeeAttendance"
          >
            Attendance
          </button>
        </div>
      </div>
      {data && data.length > 0 ? (
        <div className="table-responsive card p-2">
          <table className="table table-sm" id="emp_table_id">
            <thead className="table-dark">
              <tr>
                <th>Photo</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Contact Address</th>
                <th>Primary Phone</th>
                <th>Email</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Job Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.empId}>
                  <td>
                    <img
                      className="img-fluid rounded-circle"
                      src={`http://localhost:8091/images/employees/${row.pic}`}
                      style={{ width: "40px", height: "40px" }}
                    />
                  </td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.gender}</td>
                  <td>{row.contactAddress}</td>
                  <td>{row.primaryPhone}</td>
                  <td>{row.email}</td>
                  <td>{row.joinDate}</td>
                  <td>{row.status}</td>
                  <td>{row.jobTitle}</td>
                  <td>
                    <div className="gap-3">
                      <a
                        className="ml-3"
                        // style={{
                        //   position: "absolute",
                        //   right: 0,
                        //   top: "50%",
                        //   transform: "translateY(-50%)",
                        // }}
                        data-toggle="modal"
                        data-target={"#editEmployee" + row.empId}
                        onClick={() => getEmployeeData(row.empId)}
                      >
                        <img src="/icons/edit-icon.png" width={"20px"} />
                      </a>
                      <i
                        className="fas fa-trash fa-1/2x text-danger ml-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDelete(row.empId);
                        }}
                      ></i>
                    </div>
                    <div
                      className="modal fade"
                      id={"editEmployee" + row.empId}
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
                            {employee.firstName && (
                              <div className="modal-body">
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="">
                                      <label htmlFor="firstName9">
                                        First Name:
                                      </label>
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
                                      <label htmlFor="lastName9">
                                        Last Name:
                                      </label>
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
                                      <label class="">Gender</label>
                                      <select
                                        class="form-control"
                                        id="gender9"
                                        onChange={handleChange}
                                        value={employee.gender}
                                      >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                      </select>
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
                                      <label htmlFor="birthday9">
                                        Birthday:
                                      </label>
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
                                      <label htmlFor="joinDate9">
                                        Join Date:
                                      </label>
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
                                      <label class="">Status</label>
                                      <select
                                        className="form-control"
                                        name="status"
                                        value={employee.status}
                                        id="status9"
                                        onChange={handleChange}
                                        required
                                      >
                                        <option value="" disabled>
                                          Select status
                                        </option>
                                        <option value="Active">Active</option>
                                        <option value="Substitute">
                                          Substitute
                                        </option>
                                        <option value="Inactive">
                                          Inactive
                                        </option>
                                      </select>
                                    </div>
                                    <div className="">
                                      <label htmlFor="jobTitle9">
                                        Job Title:
                                      </label>
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
                                      <label htmlFor="aboutMe9">
                                        About Me:
                                      </label>
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
                            <div className="modal-footer">
                              <button
                                type="submit"
                                className="btn btn-info btn-sm"
                                onClick={() => handleEdit(row.empId)}
                                data-dismiss="modal"
                              >
                                Edit Employee{" "}
                                <i className="far fa-gem ml-1"></i>
                              </button>
                              <a
                                type="button"
                                className="btn btn-outline-danger waves-effect btn-sm"
                                data-dismiss="modal"
                              >
                                Cancel
                              </a>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <EmployeeAttendance />
          <EmployeeEmails />
        </div>
      ) : (
        <p>Employees list is empty...</p>
      )}
    </div>
  );
}
