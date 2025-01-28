import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [familyName, setFamilyName] = useState("");
  const [status, setStatus] = useState("");
  const [educationType, setEducationType] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const resetFormData = () => {
    setFamilyName("");
    setStatus("");
    setEducationType("");
    setEmail("");
    setMobile("");
    setPassword("");
  };

  const handleAddFamilyRecord = () => {
    axios
      .post(`http://localhost:8091/api/families/addFamily`, {
        familyName,
        status,
        educationType,
        email,
        mobile,
        password,
        registerDate: new Date().toISOString().slice(0, 10),
      })
      .then((response) => {
        if (response.data) {
          resetFormData();
          alert("Registration successful...");
          navigate("/login");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="text-center">Register</h1>
        </div>
      </div>
      <div className="card mt-3 p-5">
        <div className="row">
          <div className="col-sm-6">
            <label className="small" for="familyName">
              Family Name:
            </label>
            <input
              type="text"
              class="form-control form-control-sm"
              id="familyName"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <label className="small" for="status">
              Status:
            </label>
            <select
              className="form-control form-control-sm"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">-- Status --</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6">
            <label className="small" for="educationType">
              Education Type:
            </label>
            <select
              className="form-control form-control-sm"
              id="educationType"
              value={educationType}
              onChange={(e) => setEducationType(e.target.value)}
              required
            >
              <option value="">-- Education Type --</option>
              <option value="Home Education">Home Education</option>
              <option value="Campus Education">Campus Education</option>
            </select>
          </div>
          <div className="col-sm-6">
            <label className="small" for="email">
              Email:
            </label>
            <input
              type="email"
              class="form-control form-control-sm"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6">
            <label className="small" for="mobile">
              Mobile:
            </label>
            <input
              type="text"
              class="form-control form-control-sm"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <label className="small" for="password">
              Password:
            </label>
            <input
              type="password"
              class="form-control form-control-sm"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleAddFamilyRecord}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
