import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddEmergencyContact({
  contactId,
  handleShowContactCounter,
}) {
  const [data, setData] = useState({
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
    const fetchContactData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8091/api/emergency-contacts/getEmergencyContactById/${contactId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching guardian data:", error);
      }
    };
    fetchContactData();
  }, [contactId]);

  const handleSubmit = async (e) => {
    //e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8091/api/emergency-contacts/addEmergencyContact",
        data
      );
      handleShowContactCounter();
    } catch (error) {
      console.error("Error adding EmergencyContact:", error);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="editEmergencyContactModal"
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
              <p className="heading lead">Edit Emergency Contact</p>
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
                      <label htmlFor="firstName7">First Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName7"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="lastName7">Last Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName7"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="relationship7">Relationship:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="relationship7"
                        name="relationShip"
                        value={data.relationShip}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="primaryPhone7">Primary Phone:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="primaryPhone7"
                        name="primaryPhone"
                        value={data.primaryPhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="alternatePhone7">Alternate Phone:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="alternatePhone7"
                        name="alternatePhone"
                        value={data.alternatePhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="email7">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email7"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="homeAddress7">Home Address:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="homeAddress7"
                        name="homeAddress"
                        value={data.homeAddress}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="city7">City:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city7"
                        name="city"
                        value={data.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="state7">State:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state7"
                        name="state"
                        value={data.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label htmlFor="zip7">ZIP:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip7"
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
                        id="isReceiveEmailsTexts7"
                        name="isReceiveEmailsTexts"
                        checked={data.isReceiveEmailsTexts}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isReceiveEmailsTexts7"
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
                        id="isAuthorizedPickup7"
                        name="isAuthorizedPickup"
                        checked={data.isAuthorizedPickup}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isAuthorizedPickup7"
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
                        id="billing7"
                        name="billing"
                        checked={data.billing}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="billing7">
                        Billing
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="activity7"
                        name="activity"
                        checked={data.activity}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="activity7">
                        Activity
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="messages7"
                        name="messages"
                        checked={data.messages}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="messages7">
                        Messages
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="documents7"
                        name="documents"
                        checked={data.documents}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="documents7">
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
                  onClick={() => handleSubmit()}
                >
                  Add Emergency
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
