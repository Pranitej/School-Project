import React, { useEffect, useState } from "react";
import axios from "axios";
import AddEmployeeEmails from "./AddEmployeeEmails";

export default function EmployeeEmails() {
  const [employeeEmailsString, setEmployeeEmailsString] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [allEmployees, setAllEmployees] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [unselectedEmployees, setUnselectedEmployees] = useState(allEmployees);

  const getAllEmployees = () => {
    axios
      .get(`http://localhost:8091/api/employees/getAllEmployees`)
      .then((response) => {
        if (response.data) {
          setAllEmployees(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = () => {
    getAllEmployees();
    setSubject("");
    setBody("");
    setEmployeeEmailsString("");
    setSelectedEmployees([]);
    setUnselectedEmployees(allEmployees);

    axios
      .post(`http://localhost:8091/sendMultipleMails`, {
        toMail: employeeEmailsString,
        subject,
        body,
      })
      .then((response) => {
        if (response.data) {
          alert("Emails sent successfully...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!allEmployees) {
      getAllEmployees();
    }
  }, []);

  useEffect(() => {
    allEmployees && setUnselectedEmployees(allEmployees);
  }, [allEmployees]);

  return (
    <div className="container-fluid">
      <div
        className="modal fade"
        id="emailPortal"
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
              <p className="heading lead">Email Portal</p>
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
                <div className="col-md-9">
                  <label className="small">Emails</label>
                  <textarea
                    className="form-control form-control-sm"
                    rows="1"
                    value={employeeEmailsString}
                    onChange={(e) => setEmployeeEmailsString(e.target.value)}
                  ></textarea>
                </div>
                <div className="col-md-3 text-center align-items-center d-flex">
                  <button
                    className="btn btn-sm btn-primary"
                    data-toggle="modal"
                    data-target="#addEmployees"
                  >
                    Add Employees
                  </button>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <label className="small">Subject</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <label className="small">Body</label>
                  <textarea
                    className="form-control form-control-sm"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows="10"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-info btn-sm"
                data-dismiss="modal"
                onClick={() => handleSubmit()}
              >
                Send Mails <i className="far fa-gem ml-1"></i>
              </button>
              <a
                type="button"
                className="btn btn-outline-danger waves-effect btn-sm"
                data-dismiss="modal"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
      {allEmployees && (
        <AddEmployeeEmails
          setEmployeeEmailsString={setEmployeeEmailsString}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
          unselectedEmployees={unselectedEmployees}
          setUnselectedEmployees={setUnselectedEmployees}
        />
      )}
    </div>
  );
}
