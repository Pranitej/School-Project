import React, { useState } from "react";
import axios from "axios";

export default function AddGuardian({ familyObj, handleAddGuardianCounter }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pic, setPic] = useState("");
  const [relationship, setRelationship] = useState("");
  const [gender, setGender] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [employer, setEmployer] = useState("");
  const [clearances, setClearances] = useState("");
  const [DL, setDL] = useState("");
  const [billing, setBilling] = useState(false);
  const [activity, setActivity] = useState(false);
  const [messages, setMessages] = useState(false);
  const [documents, setDocuments] = useState(false);
  const [file, setFile] = useState(null);

  const previewImage = (event) => {
    const input = event.target;
    const output = document.getElementById("output1");
    output.src = URL.createObjectURL(input.files[0]);
  };

  const uploadImage = async (filename) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("n", 1);
      formData.append("filename", filename);
      try {
        const response = await fetch("http://localhost:8091/api/files/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
        } else {
          throw new Error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No image selected.");
    }
  };

  const addGuardianRecord = (filename) => {
    if (file) {
      axios
        .post(`http://localhost:8091/api/guardians/saveGuardian`, {
          firstName,
          lastName,
          pic: filename,
          relationship,
          gender,
          primaryPhone,
          alternatePhone,
          email,
          homeAddress,
          city,
          state,
          zip,
          DL,
          employer,
          clearances,
          billing,
          activity,
          messages,
          documents,
          checkInCode: familyObj.checkInCode,
          password: Date.now().toString().slice(-5),
        })
        .then((response) => {
          if (response.data) {
            resetForm();
            handleAddGuardianCounter();
            uploadImage(filename);
          } else {
            alert("Something went wrong...");
          }
        })
        .catch((error) => console.error(error));
    } else {
      alert("Select an image first...");
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPic("");
    setRelationship("");
    setGender("");
    setPrimaryPhone("");
    setAlternatePhone("");
    setEmail("");
    setHomeAddress("");
    setCity("");
    setState("");
    setZip("");
    setEmployer("");
    setClearances("");
    setDL("");
    setBilling(false);
    setActivity(false);
    setMessages(false);
    setDocuments(false);
    setFile(null);

    // Reset the image preview
    const output = document.getElementById("output1");
    if (output) output.src = "";
  };

  const submitClick = () => {
    const filename = Date.now() + pic;
    console.log({
      firstName,
      lastName,
      pic: filename,
      relationship,
      gender,
      primaryPhone,
      alternatePhone,
      email,
      homeAddress,
      city,
      state,
      zip,
      DL,
      employer,
      clearances,
      billing,
      activity,
      messages,
      documents,
      checkInCode: familyObj.checkInCode,
      password: Date.now().toString().slice(-5),
    });
    addGuardianRecord(filename);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="addGuardian"
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
              <p className="heading lead">Add Guardian</p>
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
                  <div className="col-sm-6">
                    <label className="small">Upload Guardian Photo</label>
                    <input
                      type="file"
                      id="file1"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setPic(e.target.files[0].name);
                        previewImage(e);
                      }}
                      className="btn btn-sm btn-outline-secondary btn-rounded"
                      data-mdb-ripple-color="dark"
                    />
                  </div>
                  <div className="col-sm-6">
                    <img
                      id="output1"
                      className="img-fluid rounded-circle"
                      width="80px"
                      height="80px"
                      alt="Preview Photo"
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6 ">
                    <label className="small">First Name:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="small">Last Name:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="small">Relationship:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="relationship"
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="small">Gender</label>
                    <select
                      className="form-control form-control-sm"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="col-sm-6 ">
                    <label className="small">Primary Phone:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="primaryPhone"
                      value={primaryPhone}
                      onChange={(e) => setPrimaryPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 ">
                    <label className="small">Alternate Phone:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="alternatePhone"
                      value={alternatePhone}
                      onChange={(e) => setAlternatePhone(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 ">
                    <label className="small">Email:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 ">
                    <label className="small">Home Address:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="homeAddress"
                      value={homeAddress}
                      onChange={(e) => setHomeAddress(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 ">
                    <label className="small">City:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 ">
                    <label className="small">State:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 ">
                    <label className="small">Zip:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 ">
                    <label className="small">Employer:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="employer"
                      value={employer}
                      onChange={(e) => setEmployer(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 ">
                    <label className="small">Clearances:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="clearances"
                      value={clearances}
                      onChange={(e) => setClearances(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="small">DL:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="DL"
                      value={DL}
                      onChange={(e) => setDL(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 form-check">
                    <div className="md-form">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="billing"
                        checked={billing}
                        onChange={(e) => setBilling(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="billing">
                        Billing
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-6  form-check">
                    <div className="md-form">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="activity"
                        checked={activity}
                        onChange={(e) => setActivity(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="activity">
                        Activity
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-6  form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="messages"
                      checked={messages}
                      onChange={(e) => setMessages(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="messages">
                      Messages
                    </label>
                  </div>
                  <div className="col-sm-6  form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="documents"
                      checked={documents}
                      onChange={(e) => setDocuments(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="documents">
                      Documents
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-info"
                  onClick={() => submitClick()}
                  data-dismiss="modal"
                >
                  Add Guardian <i className="far fa-gem ml-1"></i>
                </button>
                <a
                  type="button"
                  className="btn btn-sm btn-outline-danger waves-effect"
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
