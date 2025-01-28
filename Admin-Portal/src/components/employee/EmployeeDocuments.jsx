import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

export default function EmployeeDocuments({ empId }) {
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState(null);
  const [employeeDocuments, setEmployeeDocuments] = useState(null);

  const getEmployeeDocuments = () => {
    axios
      .get(``)
      .then((response) => {
        if (response.data) {
          setEmployeeDocuments(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getEmployeeDocuments(), []);

  const uploadFile = (fileName) => {
    const formData = new FormData();
    formData.append("file", document);
    formData.append("n", 7);
    formData.append("filename", fileName);
    axios
      .post(`http://localhost:8091/api/files/upload`, formData)
      .then((response) => {
        if (response.data) {
          alert("Document uploaded...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddDocument = () => {
    const fileName = Date.now() + document.name;

    axios
      .post(
        `http://localhost:8091/api/employee-documents/addEmployeeDocument`,
        {
          empId,
          documentFile: fileName,
          uploadedBy: "employee",
          description,
          uploadedDate: new Date().toISOString().slice(0, 10),
        }
      )
      .then((response) => {
        if (response.data) {
          // getAllFamilyDocuments();
          uploadFile(fileName);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/employee-documents/deleteEmployeeDocument/${id}`
      )
      .then((response) => {
        if (response.data) {
          getEmployeeDocuments();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getExtension = (filename) => filename.split(".").pop();

  return (
    <div>
      <div
        className="modal fade"
        id="employeeDocuments"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-notify modal-info"
          role="document"
        >
          {/* Content */}
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <p className="heading lead">Add Employee Documents</p>

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

            <form className="form-floating">
              {/* Body */}
              <div className="model-body">
                <div className="container mt-3 mb-3">
                  <div className="col-sm-12">
                    <div className="">
                      <label htmlFor="pic9">Document File</label>
                      <input
                        type="file"
                        id="documentFile"
                        onChange={(e) => setDocument(e.target.files[0])}
                        className="btn btn-outline-secondary btn-rounded"
                        data-mdb-ripple-color="dark"
                      />
                    </div>
                  </div>
                  <div class="md-form m-3 mt-3">
                    <textarea
                      type="text"
                      class="md-textarea form-control"
                      rows="2"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    ></textarea>
                    <label for="form10">Add Description</label>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="card mdb-color darken-3 p-2 ml-3 mr-3">
                    <h4 className="text-light">Documents</h4>
                  </div>
                  <div style={{ overflowY: "auto", height: "300px" }}>
                    {employeeDocuments &&
                      employeeDocuments.map((document, index) => (
                        <div className="card m-2 mt-2 " key={index}>
                          <div className="row">
                            <div className="col-sm-2 justify-content-center d-flex align-items-center">
                              {getExtension(document.documentFile) ===
                                "pdf" && (
                                <a
                                  href={`http://localhost:8091/images/employeedocs/${document.documentFile}`}
                                  download
                                  className=""
                                >
                                  <img
                                    src="/icons/pdf-icon.png"
                                    alt="pdf"
                                    style={{ width: "50px" }}
                                  />
                                </a>
                              )}
                              {getExtension(document.documentFile) ===
                                "docx" && (
                                <a
                                  href={`http://localhost:8091/images/employeedocs/${document.documentFile}`}
                                  download
                                  className=""
                                >
                                  <img
                                    src="/icons/word-doc-icon.png"
                                    alt="docx"
                                    style={{ width: "50px" }}
                                  />
                                </a>
                              )}
                            </div>
                            <div className="col-sm-8 pt-3 pb-3">
                              {/* <div className="row pl-4">
                                    <h5>{document.documentFile}</h5>
                                  </div> */}
                              <div className="row pl-4">
                                <h6>{document.description}</h6>
                              </div>
                              <div className="row pl-4">
                                <small className="text-secondary">
                                  {document.uploadDate.slice(0, 10)}
                                </small>
                              </div>
                            </div>
                            <div className="col-sm-2 justify-content-center d-flex align-items-center">
                              <i
                                className="fas fa-trash fa-1/2x text-danger"
                                onClick={() => handleDelete(document.id)}
                              ></i>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-info"
                  data-dismiss="modal"
                  onClick={handleAddDocument}
                >
                  Add Employee Document <i className="far fa-gem ml-1"></i>
                </button>
                <a
                  type="button"
                  className="btn btn-outline-danger waves-effect"
                  data-dismiss="modal"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
          {/* Content */}
        </div>

        {/* Central Modal Large Info */}
      </div>
    </div>
  );
}
