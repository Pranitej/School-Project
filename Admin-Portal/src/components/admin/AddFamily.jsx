import axios from "axios";
import React, { useState } from "react";

export default function AddFamily({ handleAddFamily }) {
  const [familyName, setFamilyName] = useState("");
  const [status, setStatus] = useState("");
  const [educationType, setEducationType] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

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
          handleAddFamily();
          resetFormData();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div
        className="modal fade"
        id="addFamily"
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
              <p className="heading lead">Add Family</p>

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
                  <div className="col-sm-6">
                    <label for="familyName">Family Name:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="familyName"
                      value={familyName}
                      onChange={(e) => setFamilyName(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label for="status">Status:</label>
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
                    <label for="educationType">Education Type:</label>
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
                    <label for="email">Email:</label>
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
                    <label for="mobile">Mobile:</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label for="password">Password:</label>
                    <input
                      type="password"
                      class="form-control form-control-sm"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-info btn-sm"
                  onClick={() => handleAddFamilyRecord()}
                  data-dismiss="modal"
                >
                  Add Family <i className="far fa-gem ml-1"></i>
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
    </div>
  );
}
