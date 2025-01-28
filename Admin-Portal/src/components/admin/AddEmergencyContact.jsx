import React, { useState } from "react";
import axios from "axios";

export default function AddEmergencyContact({
  familyObj,
  handleAddContactCounter,
}) {
  const [data, setData] = useState({
    emergencyId: "",
    checkInCode: "",
    familyName: "",
    pic: "",
    firstName: "",
    lastName: "",
    relationShip: "",
    primaryPhone: "",
    alternatePhone: "",
    email: "",
    homeAddress: "",
    city: "",
    state: "",
    zip: "",
    isReceiveEmailsTexts: false,
    isAuthorizedPickup: false,
    billing: false,
    activity: false,
    messages: false,
    documents: false,
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevParent) => ({
      ...prevParent,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setData((prevChild) => ({
      ...prevChild,
      pic: e.target.files[0].name,
    }));
    previewImage(e);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setData((prevParent) => ({
      ...prevParent,
      [name]: checked,
    }));
  };

  const previewImage = (event) => {
    const input = event.target;
    const output = document.getElementById("contactpic1");
    output.src = URL.createObjectURL(input.files[0]);
  };

  const uploadImage = async (filename) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("n", 4);
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    data.checkInCode = familyObj.checkInCode;
    data.familyName = familyObj.familyName;
    data.pic = Date.now() + data.pic;

    try {
      await axios.post(
        "http://localhost:8091/api/emergency-contacts/addEmergencyContact",
        data
      );
      await uploadImage(data.pic);
      handleAddContactCounter();
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error adding EmergencyContact:", error);
    }
  };

  const resetForm = () => {
    setData({
      emergencyId: "",
      checkInCode: "",
      familyName: "",
      pic: "",
      firstName: "",
      lastName: "",
      relationShip: "",
      primaryPhone: "",
      alternatePhone: "",
      email: "",
      homeAddress: "",
      city: "",
      state: "",
      zip: "",
      isReceiveEmailsTexts: false,
      isAuthorizedPickup: false,
      billing: false,
      activity: false,
      messages: false,
      documents: false,
    });
    setFile(null);
    const output = document.getElementById("contactpic1");
    if (output) output.src = "";
  };

  return (
    <div>
      <div
        className="modal fade"
        id="addEmergencyContactModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-notify modal-primary"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <p className="heading lead">Add Emergency Contact</p>
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
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="contactpic2">
                        Emergency Contact Picture:
                      </label>
                      <input
                        type="file"
                        id="contactpic2"
                        name="contactpic2"
                        onChange={handleFileChange}
                        className="btn btn-outline-secondary btn-sm btn-rounded"
                        data-mdb-ripple-color="dark"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <img
                      id="contactpic1"
                      className="img-fluid rounded-circle"
                      width="80px"
                      height="80px"
                      alt="Preview Photo"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="firstName2">First Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName2"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="lastName2">Last Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName2"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="relationship2">Relationship:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="relationship2"
                        name="relationShip"
                        value={data.relationShip}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="primaryPhone2">Primary Phone:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="primaryPhone2"
                        name="primaryPhone"
                        value={data.primaryPhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="alternatePhone2">Alternate Phone:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="alternatePhone2"
                        name="alternatePhone"
                        value={data.alternatePhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="email2">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email2"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="homeAddress2">Home Address:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="homeAddress2"
                        name="homeAddress"
                        value={data.homeAddress}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="city2">City:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city2"
                        name="city"
                        value={data.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="state2">State:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state2"
                        name="state"
                        value={data.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form">
                      <label htmlFor="zip2">ZIP:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip2"
                        name="zip"
                        value={data.zip}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isReceiveEmailsTexts2"
                        name="isReceiveEmailsTexts"
                        checked={data.isReceiveEmailsTexts}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isReceiveEmailsTexts2"
                      >
                        Receive Emails/Texts
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isAuthorizedPickup2"
                        name="isAuthorizedPickup"
                        checked={data.isAuthorizedPickup}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isAuthorizedPickup2"
                      >
                        Authorized Pickup
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="billing2"
                        name="billing"
                        checked={data.billing}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="billing2">
                        Billing
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="activity2"
                        name="activity"
                        checked={data.activity}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="activity2">
                        Activity
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="messages2"
                        name="messages"
                        checked={data.messages}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="messages2">
                        Messages
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="documents2"
                        name="documents"
                        checked={data.documents}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="documents2">
                        Documents
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-sm btn-primary"
                  data-dismiss="modal"
                >
                  Add Emergency
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger waves-effect"
                  data-dismiss="modal"
                  onClick={resetForm}
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
