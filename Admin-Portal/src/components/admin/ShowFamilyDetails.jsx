import React, { useState, useEffect } from "react";
import AddGuardian from "./AddGuardian";
import AddChildren from "./AddChildren";
import ShowGuardians from "./ShowGuardians";
import ShowChild from "./ShowChild";
import AddAuthorizedPickups from "./AddAuthorizedPickups";
import ShowAuthorizedPickups from "./ShowAuthorizedPickups";
import AddEmergencyContact from "./AddEmergencyContact";
import ShowEmergencyContact from "./ShowEmergencyContact";
import AddFamilyNotes from "./AddFamilyNotes";
import AddFamilyDocuments from "./FamilyDocuments";
import SendEmailToChild from "./SendEmailToChild";

export default function ShowFamilyDetails({ familyObj }) {
  const statusClassName =
    familyObj && familyObj.status === "Active" ? "active" : "inactive";
  const [ShowGuardian, setShowGuardian] = useState(true);
  const [ShowChildren, setShowChildren] = useState(true);
  const [AuthorizedPickups, setAuthorizedPickups] = useState(true);
  const [EmergencyContact, setEmergencyContact] = useState(true);

  const [addGuardianCounter, setAddGuardianCounter] = useState(0);

  const handleAddGuardianCounter = () => {
    setAddGuardianCounter((prevCounter) => prevCounter + 1);
  };

  const [addChildCounter, setAddChildCounter] = useState(0);

  const handleAddChildCounter = () => {
    setAddChildCounter((prevCounter) => prevCounter + 1);
  };

  const [addPickupCounter, setAddPickupCounter] = useState(0);

  const handleAddPickupCounter = () => {
    setAddPickupCounter((prevCounter) => prevCounter + 1);
  };

  const [addContactCounter, setAddContactCounter] = useState(0);

  const handleAddContactCounter = () => {
    setAddContactCounter((prevCounter) => prevCounter + 1);
  };

  const handleAddGuardian = () => {
    setAddGuardianCounter((prevCounter) => prevCounter + 1);
    setShowGuardian(true);
  };

  const toggleShowGuardian = () => {
    setShowGuardian(!ShowGuardian);
  };

  const toggleShowChildren = () => {
    setShowChildren(!ShowChildren);
  };

  const toggleAuthorizedPickups = () => {
    setAuthorizedPickups(!AuthorizedPickups);
  };

  const toggleEmergencyContact = () => {
    setEmergencyContact(!EmergencyContact);
  };

  return (
    <>
      <div className="car">
        {familyObj ? (
          <div>
            <div className="row">
              <div className="col-sm-4">
                <h6>
                  <b className="text-primary">{familyObj.familyName} Family</b>
                </h6>

                <h6>
                  Status :{" "}
                  <span className={statusClassName}>
                    <b>
                      {familyObj.status === "Active" ? "Active" : "Inactive"}
                    </b>
                  </span>{" "}
                </h6>
                <h6>
                  CheckInCode :{" "}
                  <span className={statusClassName}>
                    <b>{familyObj.checkInCode}</b>
                  </span>
                </h6>
              </div>

              <div className="col-sm-8">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary btn-rounded"
                  data-toggle="modal"
                  data-target="#addFamilyNotes"
                >
                  Notes
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-sm btn-info btn-rounded"
                  data-toggle="modal"
                  data-target="#addFamilyDocuments"
                >
                  Documents
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-success btn-rounded"
                  data-toggle="modal"
                  data-target="#sendEmail"
                >
                  Email
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-warning btn-rounded"
                  data-toggle="modal"
                  data-target="#addFamily"
                >
                  Send Parent Portal Invites
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="cascading-modal" role="document">
                  <div className="modal-content">
                    <div className="modal-c-tabs mt-3">
                      <ul
                        className="nav md-tabs tabs-2 light-blue darken-3 text-center"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#panel1"
                            role="tab"
                          >
                            <i className="fas fa-info mr-1"></i>
                            FAMILY INFO
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#panel2"
                            role="tab"
                          >
                            <i className="fas fa-print mr-1"></i>
                            BILLING
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div
                          className="tab-pane fade in show active"
                          id="panel1"
                          role="tabpanel"
                        >
                          <div className="mb-1">
                            <table className="table table-sm">
                              <tr className="bg-info">
                                <td>
                                  <b className="text-white">Guardians</b>{" "}
                                  &nbsp;&nbsp;&nbsp;
                                  <span
                                    className=""
                                    onClick={toggleShowGuardian}
                                  >
                                    {ShowGuardian ? (
                                      <>
                                        <i className="fas fa-eye-slash fa-1x"></i>
                                      </>
                                    ) : (
                                      <>
                                        <i className="fas fa-eye fa-1x"></i>
                                      </>
                                    )}
                                  </span>
                                </td>
                                <td align="right">
                                  <a
                                    data-toggle="modal"
                                    data-target="#addGuardian"
                                  >
                                    <i
                                      className="fas fa-plus mr-1"
                                      style={{ color: "white" }}
                                    ></i>
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2}>
                                  {ShowGuardian && (
                                    <ShowGuardians
                                      familyObj={familyObj}
                                      addGuardianCounter={addGuardianCounter}
                                    />
                                  )}
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div className="mb-1">
                            <table className="table table-sm">
                              <tr className="bg-warning">
                                <td>
                                  <b className="text-white">Children</b>{" "}
                                  &nbsp;&nbsp;&nbsp;
                                  <span
                                    className=""
                                    onClick={toggleShowChildren}
                                  >
                                    {ShowChildren ? (
                                      <>
                                        <i className="fas fa-eye-slash fa-1x"></i>
                                      </>
                                    ) : (
                                      <>
                                        <i className="fas fa-eye fa-1x"></i>
                                      </>
                                    )}
                                  </span>
                                </td>
                                <td align="right">
                                  <a
                                    data-toggle="modal"
                                    data-target="#addChildModal"
                                  >
                                    <i
                                      className="fas fa-plus mr-1"
                                      style={{ color: "white" }}
                                    ></i>
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2}>
                                  {ShowChildren && (
                                    <ShowChild
                                      familyObj={familyObj}
                                      addChildCounter={addChildCounter}
                                    />
                                  )}
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div className="mb-1">
                            <table className="table table-sm">
                              <tr className="bg-success">
                                <td>
                                  <b className="text-white">
                                    AddAuthorizedPickups
                                  </b>{" "}
                                  &nbsp;&nbsp;&nbsp;
                                  <span
                                    className=""
                                    onClick={toggleAuthorizedPickups}
                                  >
                                    {AuthorizedPickups ? (
                                      <>
                                        <i className="fas fa-eye-slash fa-1x"></i>
                                      </>
                                    ) : (
                                      <>
                                        <i className="fas fa-eye fa-1x"></i>
                                      </>
                                    )}
                                  </span>
                                </td>
                                <td align="right">
                                  <a
                                    data-toggle="modal"
                                    data-target="#addAuthorizedPickupsModal"
                                  >
                                    <i
                                      className="fas fa-plus mr-1"
                                      style={{ color: "white" }}
                                    ></i>
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2}>
                                  {AuthorizedPickups && (
                                    <ShowAuthorizedPickups
                                      familyObj={familyObj}
                                      addPickupCounter={addPickupCounter}
                                    />
                                  )}
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div className="mb-1">
                            <table className="table table-sm">
                              <tr className="bg-secondary">
                                <td>
                                  <b className="text-white">EmergencyContact</b>{" "}
                                  &nbsp;&nbsp;&nbsp;
                                  <span
                                    className=""
                                    onClick={toggleEmergencyContact}
                                  >
                                    {EmergencyContact ? (
                                      <>
                                        <i className="fas fa-eye-slash fa-1x"></i>
                                      </>
                                    ) : (
                                      <>
                                        <i className="fas fa-eye fa-1x"></i>
                                      </>
                                    )}
                                  </span>
                                </td>
                                <td align="right">
                                  <a
                                    data-toggle="modal"
                                    data-target="#addEmergencyContactModal"
                                  >
                                    <i
                                      className="fas fa-plus mr-1"
                                      style={{ color: "white" }}
                                    ></i>
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2}>
                                  {EmergencyContact && (
                                    <ShowEmergencyContact
                                      familyObj={familyObj}
                                      addContactCounter={addContactCounter}
                                    />
                                  )}
                                </td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="panel2"
                          role="tabpanel"
                        >
                          <div className="modal-body">
                            <div className="md-form form-sm">
                              <i className="fas fa-envelope prefix"></i>
                              <input
                                type="text"
                                id="form13"
                                className="form-control form-control-sm"
                              />
                              <label for="form13">Your email</label>
                            </div>
                            <div className="md-form form-sm">
                              <i className="fas fa-lock prefix"></i>
                              <input
                                type="password"
                                id="form144"
                                className="form-control form-control-sm"
                              />
                              <label for="form144">Your password</label>
                            </div>
                            <div className="md-form form-sm">
                              <i className="fas fa-lock prefix"></i>
                              <input
                                type="password"
                                id="form15"
                                className="form-control form-control-sm"
                              />
                              <label for="form15">Repeat password</label>
                            </div>
                            <div className="text-center form-sm mt-2">
                              <button className="btn btn-info">
                                Sign up{" "}
                                <i className="fas fa-sign-in-alt ml-1"></i>
                              </button>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <div className="options text-right">
                              <p className="pt-1">
                                Already have an account?{" "}
                                <a href="#" className="blue-text">
                                  Log In
                                </a>
                              </p>
                            </div>
                            <button
                              type="button"
                              className="btn btn-outline-info waves-effect ml-auto"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h4 className="text-danger mt-3">No family was selected...</h4>
        )}
      </div>
      <AddGuardian
        familyObj={familyObj}
        handleAddGuardianCounter={handleAddGuardianCounter}
      />
      <AddChildren
        familyObj={familyObj}
        handleAddChildCounter={handleAddChildCounter}
      />
      <AddAuthorizedPickups
        familyObj={familyObj}
        handleAddPickupCounter={handleAddPickupCounter}
      />
      <AddEmergencyContact
        familyObj={familyObj}
        handleAddContactCounter={handleAddContactCounter}
      />
      {familyObj && <AddFamilyNotes familyObj={familyObj} />}
      {familyObj && <AddFamilyDocuments familyObj={familyObj} />}
      {familyObj && <SendEmailToChild familyObj={familyObj} />}
    </>
  );
}
