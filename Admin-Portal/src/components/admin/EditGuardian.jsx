import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditGuardian({
  guardianId,
  handleShowGuardianCounter,
}) {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    pic: "",
    relationship: "",
    gender: "",
    primaryPhone: "",
    alternatePhone: "",
    email: "",
    homeAddress: "",
    city: "",
    state: "",
    zip: "",
    employer: "",
    clearances: "",
    DL: "",
    billing: false,
    activity: false,
    messages: false,
    documents: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData((prevParent) => ({
      ...prevParent,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchGuardianData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8091/api/guardians/getGuardianById/${guardianId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching guardian data:", error);
      }
    };
    fetchGuardianData();
  }, [guardianId]);

  const addGuardianRecord = async () => {
    console.log(data);
    try {
      await axios.post(
        "http://localhost:8091/api/guardians/saveGuardian",
        data
      );
      handleShowGuardianCounter();
    } catch (error) {
      console.error("Error updating Guardian:", error);
    }
  };

  let submitClick = () => {
    addGuardianRecord();
  };

  return (
    <div>
      <div
        className="modal fade"
        id="editGuardian"
        tabIndex="-1"
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
              <p className="heading lead">Edit Guardian</p>
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
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-6">
                  <label className="small">First Name:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="firstName4"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="small">Last Name:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="lastName4"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="small">Relationship:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="relationship"
                    value={data.relationship}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6">
                  <label class="small">Gender</label>
                  <select
                    class="form-control form-control-sm"
                    name="gender"
                    onChange={handleChange}
                    value={data.gender}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="col-sm-6 ">
                  <label className="small">Primary Phone:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="primaryPhone"
                    value={data.primaryPhone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 ">
                  <label className="small">Alternate Phone:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="alternatePhone"
                    value={data.alternatePhone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 ">
                  <label className="small">Email:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 ">
                  <label className="small">Home Address:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="homeAddress"
                    value={data.homeAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 ">
                  <label className="small">City:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 ">
                  <label className="small">State:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 ">
                  <label className="small">Zip:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="zip"
                    value={data.zip}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 ">
                  <label className="small">Employer:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="employer"
                    value={data.employer}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 ">
                  <label htmlFor="clearances4">Clearances:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="clearances"
                    value={data.clearances}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="small">DL:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="DL"
                    id="DL111"
                    value={data.DL}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 mt-3 form-check">
                  <div className=" md-outline">
                    <input
                      type="checkbox"
                      id="billing4"
                      className="form-check-input"
                      checked={data.billing}
                      onChange={(e) =>
                        setData((prevData) => ({
                          ...prevData,
                          billing: e.target.checked,
                        }))
                      }
                    />
                    <label className="form-check-label" htmlFor="billing4">
                      Billing
                    </label>
                  </div>
                </div>
                <div className="col-sm-6 mt-3 form-check">
                  <div className=" md-outline">
                    <input
                      type="checkbox"
                      id="activity4"
                      className="form-check-input"
                      checked={data.activity}
                      onChange={(e) =>
                        setData((prevData) => ({
                          ...prevData,
                          activity: e.target.checked,
                        }))
                      }
                    />
                    <label className="form-check-label" htmlFor="activity4">
                      Activity
                    </label>
                  </div>
                </div>
                <div className="col-sm-6 mt-3 form-check">
                  <input
                    type="checkbox"
                    id="messages4"
                    className="form-check-input"
                    checked={data.messages}
                    onChange={(e) =>
                      setData((prevData) => ({
                        ...prevData,
                        messages: e.target.checked,
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="messages4">
                    Messages
                  </label>
                </div>
                <div className="col-sm-6 mt-3 form-check">
                  <input
                    type="checkbox"
                    id="documents4"
                    className="form-check-input"
                    checked={data.documents}
                    onChange={(e) =>
                      setData((prevData) => ({
                        ...prevData,
                        documents: e.target.checked,
                      }))
                    }
                  />
                  <label className="form-check-label" htmlFor="documents4">
                    Documents
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm btn-info"
                onClick={() => submitClick()}
                data-dismiss="modal"
              >
                Update Guardian <i className="far fa-gem ml-1"></i>
              </button>
              <a
                type="button"
                className="btn btn-sm btn-outline-danger waves-effect"
                data-dismiss="modal"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
