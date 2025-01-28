import React from "react";
import ShowEachEmployee from "./ShowEachEmployee";
import Attendance from "./Attendance";
import ManageEmployee from "./ManageEmployee";
import EmployeeMessages from "./EmployeeMessages";

export default function ShowChildFamilyDetails({ currentEmployee }) {
  return (
    <>
      <div className="mt-2">
        {currentEmployee && (
          <div>
            <div className="row card">
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
                            Employee info
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
                            Manage
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
                          <div className="modal-body mb-0 p-0">
                            <ShowEachEmployee
                              currentEmployee={currentEmployee}
                            />
                          </div>
                        </div>

                        {/*Panel 2*/}
                        <div
                          className="tab-pane fade"
                          id="panel2"
                          role="tabpanel"
                        >
                          <div className="modal-body mb-0 p-0">
                            <Attendance currentEmployee={currentEmployee} />
                          </div>
                        </div>

                        {/*Panel 3*/}
                        <div
                          className="tab-pane fade"
                          id="panel3"
                          role="tabpanel"
                        >
                          <div className="modal-body mb-0 p-0">
                            <EmployeeMessages
                              currentEmployee={currentEmployee}
                            />
                          </div>
                        </div>

                        {/*Panel 4*/}
                        <div
                          className="tab-pane fade"
                          id="panel4"
                          role="tabpanel"
                        >
                          <div className="modal-body mb-0 p-0">
                            <ManageEmployee currentEmployee={currentEmployee} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
