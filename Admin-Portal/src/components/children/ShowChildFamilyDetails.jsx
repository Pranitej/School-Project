import React, { useState } from "react";
import AddGuardian from "../admin/AddGuardian";
import AddChildren from "../admin/AddChildren";
import ShowGuardians from "../admin/ShowGuardians";
import ShowChild from "./ShowChild";
import AddAuthorizedPickups from "../admin/AddAuthorizedPickups";
import ShowAuthorizedPickups from "../admin/ShowAuthorizedPickups";
import AddEmergencyContact from "../admin/AddEmergencyContact";
import ShowEmergencyContact from "../admin/ShowEmergencyContact";
import AddFamilyNotes from "../admin/AddFamilyNotes";
import AddFamilyDocuments from "../admin/FamilyDocuments";
import SendEmailToChild from "../admin/SendEmailToChild";
import ChildAttendance from "./ChildAttendance";
import ChildActivityFeed from "./ChildActivityFeed";
import ChildMessages from "./ChildMessages";

export default function ShowChildFamilyDetails({ familyObj, currentChild }) {
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

  const [addContactCounter, setAddContactCounter] = useState(0); // State variable to trigger re-render
  const handleAddContactCounter = () => {
    // Increment the counter
    setAddContactCounter((prevCounter) => prevCounter + 1);
  };

  const handleAddGuardian = () => {
    // Call this function when AddFamily component is executed
    // Update addFamilyCounter to trigger re-render of ShowFamilies component
    setAddGuardianCounter((prevCounter) => prevCounter + 1);
    setShowGuardian(true);
  };

  // Toggle function to toggle the state of ShowGuardian
  const toggleShowGuardian = () => {
    setShowGuardian(!ShowGuardian);
  };

  // Toggle function to toggle the state of ShowChildren
  const toggleShowChildren = () => {
    setShowChildren(!ShowChildren);
  };

  // Toggle function to toggle the state of ShowChildren
  const toggleAuthorizedPickups = () => {
    setAuthorizedPickups(!AuthorizedPickups);
  };

  // Toggle function to toggle the state of ShowChildren
  const toggleEmergencyContact = () => {
    setEmergencyContact(!EmergencyContact);
  };
  ////////////////////

  return (
    <>
      <div className="mt-2">
        {familyObj && (
          <div>
            <div className="row ">
              {/* Grid column */}
              <div className="col-md-12 mb-4">
                {/* Modal: Login & Register tabs */}
                <div className="cascading-modal" role="document">
                  {/* Content */}
                  <div className="modal-content">
                    {/* Modal cascading tabs */}
                    <div className="modal-c-tabs mt-3">
                      {/* Nav tabs */}
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
                            Child info
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#panel2"
                            role="tab"
                          >
                            Attendance
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#panel3"
                            role="tab"
                          >
                            Messages
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#panel4"
                            role="tab"
                          >
                            Activity Feed
                          </a>
                        </li>
                      </ul>

                      {/* Tab panels */}
                      <div className="tab-content">
                        {/* Panel 1 */}
                        <div
                          className="tab-pane fade in show active"
                          id="panel1"
                          role="tabpanel"
                        >
                          {/* Body */}
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
                                      currentChild={currentChild}
                                    />
                                  )}
                                </td>
                              </tr>
                            </table>
                          </div>
                          {/* Body */}
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

                          {/* Body */}
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

                          {/* Body */}
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
                        {/* Panel 1 */}

                        {/*Panel 2*/}
                        <div
                          className="tab-pane fade"
                          id="panel2"
                          role="tabpanel"
                        >
                          {/* Body */}
                          <div className="modal-body mb-0 p-0">
                            <ChildAttendance currentChild={currentChild} />
                          </div>
                          {/* Footer */}
                        </div>
                        {/* Panel 2 */}

                        {/*Panel 3*/}
                        <div
                          className="tab-pane fade"
                          id="panel3"
                          role="tabpanel"
                        >
                          {/* Body */}
                          <div className="modal-body mb-0 p-0">
                            <ChildMessages
                              currentChild={currentChild}
                              currentFamily={familyObj}
                            />
                          </div>
                          {/* Footer */}
                        </div>
                        {/* Panel 3 */}

                        {/*Panel 4*/}
                        <div
                          className="tab-pane fade"
                          id="panel4"
                          role="tabpanel"
                        >
                          {/* Body */}
                          <div className="modal-body mb-0 p-0">
                            <ChildActivityFeed currentChild={currentChild} />
                          </div>
                          {/* Footer */}
                        </div>
                        {/* Panel 4 */}
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                </div>
                {/* Modal: Login & Register tabs */}
              </div>
              {/* Grid column */}

              {/* Grid row */}
            </div>
          </div>
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
