import React, { useState } from "react";
import axios from "axios";

export default function AddAuthorizedPickups({
  familyObj,
  handleAddPickupCounter,
}) {
  const [parent, setParent] = useState({
    checkInCode: "",
    firstName: "",
    lastName: "",
    pic: "",
    driverLicense: "",
    relationship: "",
    email: "",
    primaryPhone: "",
    homeAddress: "",
    city: "",
    state: "",
    zip: "",
    dateOfBirth: "",
    isEmergencyContact: false,
    billing: false,
    activity: false,
    messages: false,
    documents: false,
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParent((prevParent) => ({
      ...prevParent,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setParent((prevParent) => ({
      ...prevParent,
      pic: e.target.files[0].name,
    }));
    previewImage(e);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setParent((prevParent) => ({
      ...prevParent,
      [name]: checked,
    }));
  };

  const previewImage = (event) => {
    const input = event.target;
    const output = document.getElementById("authpic1");
    output.src = URL.createObjectURL(input.files[0]);
  };

  const uploadImage = async (filename) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("n", 3);
      formData.append("filename", filename);

      axios
        .post(`http://localhost:8091/api/files/upload`, formData)
        .then((response) => {
          if (response.data) {
            resetForm();
            setFile(null);
          } else {
            alert("Something went wrong...");
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.error("No image selected.");
    }
  };

  const resetForm = () => {
    setParent({
      checkInCode: "",
      firstName: "",
      lastName: "",
      pic: "",
      driverLicense: "",
      relationship: "",
      email: "",
      primaryPhone: "",
      homeAddress: "",
      city: "",
      state: "",
      zip: "",
      dateOfBirth: "",
      isEmergencyContact: false,
      billing: false,
      activity: false,
      messages: false,
      documents: false,
    });
    const output = document.getElementById("authpic1");
    if (output) output.src = "";
  };

  const handleSubmit = () => {
    if (parent.pic) {
      parent.checkInCode = familyObj.checkInCode;
      parent.pic = Date.now() + parent.pic;

      axios
        .post(
          `http://localhost:8091/api/authorized-pickups/addAuthorizedPickups`,
          parent
        )
        .then((response) => {
          if (response.data) {
            handleAddPickupCounter();
            uploadImage(parent.pic);
          } else {
            alert("Something went wrong...");
          }
        })
        .catch((error) => console.error(error));
    } else {
      alert("Please select an image...");
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="addAuthorizedPickupsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-notify modal-success"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <p className="heading lead">Authorized Pickups</p>
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
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <div className="">
                      <label className="small" htmlFor="authpic">
                        Authorized Pickup Picture:
                      </label>
                      <input
                        type="file"
                        id="authpic"
                        name="authpic"
                        onChange={handleFileChange}
                        className="btn btn-sm btn-outline-secondary btn-rounded"
                        data-mdb-ripple-color="dark"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <img
                      id="authpic1"
                      className="img-fluid rounded-circle"
                      width="80px"
                      height="80px"
                      alt="Preview Photo"
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <label className="small" htmlFor="firstName1">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="firstName1"
                      name="firstName"
                      onChange={handleChange}
                      value={parent.firstName}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small" htmlFor="lastName1">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="lastName1"
                      name="lastName"
                      onChange={handleChange}
                      value={parent.lastName}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small" htmlFor="driverLicense1">
                      Driver License:
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="driverLicense1"
                      name="driverLicense"
                      onChange={handleChange}
                      value={parent.driverLicense}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small" htmlFor="relationship1">
                      Relationship:
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="relationship1"
                      name="relationship"
                      onChange={handleChange}
                      value={parent.relationship}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small" htmlFor="email1">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="email1"
                      name="email"
                      onChange={handleChange}
                      value={parent.email}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small" htmlFor="primaryPhone1">
                      Primary Phone:
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-sm"
                      id="primaryPhone1"
                      name="primaryPhone"
                      onChange={handleChange}
                      value={parent.primaryPhone}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small" htmlFor="homeAddress1">
                      Home Address:
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="homeAddress1"
                      name="homeAddress"
                      onChange={handleChange}
                      value={parent.homeAddress}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small" htmlFor="city1">
                      City:
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="city1"
                      name="city"
                      onChange={handleChange}
                      value={parent.city}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small" htmlFor="state1">
                      State:
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="state1"
                      name="state"
                      onChange={handleChange}
                      value={parent.state}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small" htmlFor="zip1">
                      ZIP:
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="zip1"
                      name="zip"
                      onChange={handleChange}
                      value={parent.zip}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="small" htmlFor="dateOfBirth1">
                      Date of Birth:
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-sm "
                      id="dateOfBirth1"
                      name="dateOfBirth"
                      onChange={handleChange}
                      value={parent.dateOfBirth}
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <div className="md-form form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isEmergencyContact1"
                        name="isEmergencyContact"
                        onChange={handleCheckboxChange}
                        checked={parent.isEmergencyContact}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isEmergencyContact1"
                      >
                        Is Emergency Contact
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mt-0">
                    <div className="md-form form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="billing1"
                        name="billing"
                        onChange={handleCheckboxChange}
                        checked={parent.billing}
                      />
                      <label className="form-check-label" htmlFor="billing1">
                        Billing
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mt-0">
                    <div className="md-form form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="activity1"
                        name="activity"
                        onChange={handleCheckboxChange}
                        checked={parent.activity}
                      />
                      <label className="form-check-label" htmlFor="activity1">
                        Activity
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mt-0">
                    <div className="md-form form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="messages1"
                        name="messages"
                        onChange={handleCheckboxChange}
                        checked={parent.messages}
                      />
                      <label className="form-check-label" htmlFor="messages1">
                        Messages
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mt-0">
                    <div className="md-form form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="documents1"
                        name="documents"
                        onChange={handleCheckboxChange}
                        checked={parent.documents}
                      />
                      <label className="form-check-label" htmlFor="documents1">
                        Documents
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  data-dismiss="modal"
                  onClick={() => handleSubmit()}
                >
                  Add Authorized Pickups
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger waves-effect"
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
