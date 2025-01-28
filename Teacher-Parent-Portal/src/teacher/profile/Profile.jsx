import React from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { data } from "../../App";

export default function Profile() {
  const employeeActions = useContext(data);
  const [employee, setEmployee] = useState(employeeActions.employeeData);

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8091/api/employees/updateEmployee/${employeeActions.employeeData.empId}`,
        employee
      )
      .then((response) => {
        if (response.data) {
          alert("Employee updated...");
          setEmployee(response.data);
          employeeActions.setEmployeeData(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  return employee ? (
    <div className="container mt-4 mb-5">
      <div className="row mt-2">
        <div className="col-sm-12 text-center">
          <h3 className="text-dark">Profile</h3>
        </div>
      </div>
      <div className="card p-4 pt-3 mt-3 mb-5">
        <div className="row mt-2 mb-2">
          <div className="col-sm-12 text-center">
            <img
              className="img-fluid rounded-circle"
              src={`http://localhost:8091/images/employees/${employee.pic}`}
              style={{ width: "100px", height: "100px" }}
              alt="Employee Picture"
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-6">
            <label className="small">First Name:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={employee.firstName}
              onChange={(e) =>
                setEmployee({ ...employee, firstName: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label className="small">Last Name:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={employee.lastName}
              onChange={(e) =>
                setEmployee({ ...employee, lastName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-6">
            <label className="small">Gender</label>
            <select
              className="form-control form-control-sm"
              onChange={(e) =>
                setEmployee({ ...employee, gender: e.target.value })
              }
              value={employee.gender}
            >
              <option value="select">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="col-sm-6">
            <label className="small">Birthday:</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={employee.birthday}
              onChange={(e) =>
                setEmployee({ ...employee, birthday: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-6">
            <label className="small">Primary Phone:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={employee.primaryPhone}
              onChange={(e) =>
                setEmployee({ ...employee, primaryPhone: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label className="small">Alternate Phone:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={employee.alternatePhone}
              onChange={(e) =>
                setEmployee({ ...employee, alternatePhone: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-6">
            <label className="small">Email:</label>
            <input
              type="email"
              className="form-control form-control-sm"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label className="small">Status</label>
            <select
              className="form-control form-control-sm"
              name="status"
              value={employee.status}
              onChange={(e) =>
                setEmployee({ ...employee, status: e.target.value })
              }
            >
              <option value="">Select status</option>
              <option value="EveryDay">EveryDay</option>
              <option value="Inactive">InActive</option>
              <option value="Substitute">Substitute</option>
            </select>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-6">
            <label className="small">Join Date:</label>
            <input
              type="date"
              className="form-control form-control-sm"
              value={employee.joinDate}
              onChange={(e) =>
                setEmployee({ ...employee, joinDate: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label className="small">Job Title:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={employee.jobTitle}
              onChange={(e) =>
                setEmployee({ ...employee, jobTitle: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-6">
            <label className="small">DL:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={employee.dl}
              onChange={(e) => setEmployee({ ...employee, dl: e.target.value })}
            />
          </div>
          <div className="col-sm-6">
            <label className="small">Password:</label>
            <input
              type="password"
              className="form-control form-control-sm"
              value={employee.password}
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-6">
            <label className="small">Contact Address:</label>
            <textarea
              rows="2"
              className="form-control form-control-sm"
              value={employee.contactAddress}
              onChange={(e) =>
                setEmployee({ ...employee, contactAddress: e.target.value })
              }
            ></textarea>
          </div>
          <div className="col-sm-6">
            <label className="small">About Me:</label>
            <textarea
              className="form-control form-control-sm"
              value={employee.aboutMe}
              onChange={(e) =>
                setEmployee({ ...employee, aboutMe: e.target.value })
              }
            ></textarea>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6">
            <button className="btn btn-sm btn-primary" onClick={handleUpdate}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-5 mb-5 p-5"></div>
    </div>
  ) : (
    <h5 className="text-danger">Something went wrong...</h5>
  );
}
