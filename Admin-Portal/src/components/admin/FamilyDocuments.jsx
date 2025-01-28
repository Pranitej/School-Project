import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AddFamilyDocument from "./AddFamilyDocument";

export default function FamilyDocuments({ familyObj }) {
  const [documentType, setDocumentType] = useState("family");
  const [allDocuments, setAllDocuments] = useState(null);
  const [familyDocuments, setFamilyDocuments] = useState([]);
  const [schoolDocuments, setSchoolDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [search, setSearch] = useState("");

  const getAllFamilyDocuments = () => {
    axios
      .get(
        `http://localhost:8091/api/family-documents/getFamilyDocumentsByCheckInCode/${familyObj.checkInCode}`
      )
      .then((response) => {
        if (response.data) {
          setAllDocuments(response.data);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/family-documents/deleteFamilyDocument/${id}`
      )
      .then((response) => {
        if (response) {
          getAllFamilyDocuments();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getAllFamilyDocuments(), [familyObj]);

  useEffect(() => {
    if (documentType === "school") {
      setFilteredDocuments(
        schoolDocuments.filter((document) =>
          document.description.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredDocuments(
        familyDocuments.filter((document) =>
          document.description.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  useEffect(() => {
    if (documentType === "school") {
      setFilteredDocuments(schoolDocuments);
    } else {
      setFilteredDocuments(familyDocuments);
    }
  }, [documentType]);

  useEffect(() => {
    if (allDocuments) {
      setFamilyDocuments(
        allDocuments.filter((document) => document.uploadedBy === "family")
      );
      setSchoolDocuments(
        allDocuments.filter((document) => document.uploadedBy === "school")
      );
      setFilteredDocuments(
        allDocuments.filter((document) => document.uploadedBy === "family")
      );
    }
  }, [allDocuments]);

  useEffect(() => {
    window.$("#documentType").materialSelect();
    window.$("#status9").materialSelect();

    window.$(".datepicker").pickadate({
      // Escape any “rule” characters with an exclamation mark (!).
      format: "dd-mm-yyyy",
      formatSubmit: "yyyy/mm/dd",
      hiddenPrefix: "prefix__",
      hiddenSuffix: "__suffix",
    });
  }, []);

  const getExtension = (filename) => filename.split(".").pop();

  return (
    <div>
      <div
        className="modal fade"
        id="addFamilyDocuments"
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
              <p className="heading lead">Add Family Documents</p>

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
                <div className="container mt-1 mb-3">
                  <div className="row">
                    <div className="col-sm-9">
                      <div className="md-form">
                        <select
                          class="mdb-select colorful-select dropdown-primary"
                          id="documentType"
                          onChange={(e) => setDocumentType(e.target.value)}
                          value={documentType}
                        >
                          <option value="family">Family</option>
                          <option value="school">School</option>
                        </select>
                        <label class="mdb-main-label pull-left">
                          Document Type
                        </label>
                      </div>
                    </div>
                    {documentType === "family" && (
                      <div className="col-sm-3">
                        <button
                          className="btn btn-sm btn-primary mt-4"
                          type="button"
                          data-toggle="modal"
                          data-target="#addFamilyDocument"
                        >
                          Add Document
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="md-form">
                        <label htmlFor="search">Search</label>
                        <input
                          type="text"
                          className="form-control"
                          id="search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <div className="card mdb-color darken-3 p-2">
                        <h4 className="text-light">Documents</h4>
                      </div>
                      <div style={{ overflowY: "auto", height: "300px" }}>
                        {filteredDocuments &&
                          filteredDocuments.map((document, index) => (
                            <div className="card m-2 mt-2 " key={index}>
                              <div className="row">
                                <div className="col-sm-2 justify-content-center d-flex align-items-center">
                                  {getExtension(document.documentFile) ===
                                    "pdf" && (
                                    <a
                                      href={`http://localhost:8091/images/familydocs/${document.documentFile}`}
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
                                      href={`http://localhost:8091/images/familydocs/${document.documentFile}`}
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
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                {/* <button
                  type="submit"
                  className="btn btn-info"
                  data-dismiss="modal"
                >
                  Add Family Document <i className="far fa-gem ml-1"></i>
                </button> */}
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
        {familyObj && (
          <AddFamilyDocument
            familyObj={familyObj}
            getAllFamilyDocuments={getAllFamilyDocuments}
          />
        )}
        {/* Central Modal Large Info */}
      </div>
    </div>
  );
}
