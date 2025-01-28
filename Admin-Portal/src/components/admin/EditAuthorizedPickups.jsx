import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditAuthorizedPickups({
  authorizedPickupId,
  handleShowAuthorizedPickupCounter,
}) {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",

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
    billing: true,
    activity: false,
    messages: false,
    documents: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevParent) => ({
      ...prevParent,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setData((prevParent) => ({
      ...prevParent,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const fetchAuthorizedData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8091/api/authorized-pickups/getAuthorizedPickupsById/${authorizedPickupId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error authorized guardian data:", error);
      }
    };
    fetchAuthorizedData();
  }, [authorizedPickupId]);

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:8091/api/authorized-pickups/addAuthorizedPickups",
        data
      );
      handleShowAuthorizedPickupCounter();
    } catch (error) {
      console.error("Error adding addAuthorizedPickups:", error);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="editAuthorizedPickupsModal"
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
              <p className="heading lead">Edit Authorized Pickups</p>
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
                      <label htmlFor="firstName6">First Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName6"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="lastName6">Last Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName6"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="driverLicense6">Driver License:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="driverLicense6"
                        name="driverLicense"
                        value={data.driverLicense}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="relationship6">Relationship:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="relationship6"
                        name="relationship"
                        value={data.relationship}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="email6">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email6"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="primaryPhone6">Primary Phone:</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="primaryPhone6"
                        name="primaryPhone"
                        value={data.primaryPhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="homeAddress6">Home Address:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="homeAddress6"
                        name="homeAddress"
                        value={data.homeAddress}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="city6">City:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city6"
                        name="city"
                        value={data.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="state6">State:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state6"
                        name="state"
                        value={data.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="zip6">ZIP:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip6"
                        name="zip"
                        value={data.zip}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="dateOfBirth6">Date of Birth:</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth6"
                        name="dateOfBirth"
                        value={data.dateOfBirth}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mt-4 pt-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isEmergencyContact6"
                        name="isEmergencyContact"
                        checked={data.isEmergencyContact}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isEmergencyContact6"
                      >
                        Is Emergency Contact
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className=" form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="billing6"
                        name="billing"
                        checked={data.billing}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="billing6">
                        Billing
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className=" form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="activity6"
                        name="activity"
                        checked={data.activity}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="activity6">
                        Activity
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <div className=" form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="messages6"
                        name="messages"
                        checked={data.messages}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="messages6">
                        Messages
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <div className=" form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="documents6"
                        name="documents"
                        checked={data.documents}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="documents6">
                        Documents
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-sm btn-success"
                  data-dismiss="modal"
                  onClick={() => handleSubmit()}
                >
                  Update AuthorizedPickups
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
