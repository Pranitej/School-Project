import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ChildDocuments() {
  const { id } = useParams();
  const [allDocuments, setAllDocuments] = useState([]);
  const [document, setDocument] = useState(null);
  const [description, setDescription] = useState("");

  const getAllChildDocuments = () => {
    axios
      .get(
        `http://localhost:8091/api/child-documents/getChildDocumentsByChildId/${id}`
      )
      .then((response) => {
        if (response.data) {
          setAllDocuments(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const uploadFile = (fileName) => {
    const formData = new FormData();
    formData.append("file", document);
    formData.append("n", 8);
    formData.append("filename", fileName);
    axios
      .post(`http://localhost:8091/api/files/upload`, formData)
      .then((response) => {
        if (response.data) {
          setDescription("");
          setDocument(null);
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
      .post(`http://localhost:8091/api/child-documents/createChildDocument`, {
        documentFile: fileName,
        uploadedBy: "family",
        childId: id,
        description,
      })
      .then((response) => {
        if (response.data) {
          getAllChildDocuments();
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
        `http://localhost:8091/api/child-documents/deleteChildDocument/${id}`
      )
      .then((response) => {
        if (response) {
          getAllChildDocuments();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getExtension = (filename) => filename.split(".").pop();

  useEffect(() => getAllChildDocuments(), [id]);

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-sm-12 text-center">
          <h3>
            <b className="text-primary">Child Documents</b>
          </h3>
        </div>
      </div>
      <div className="card p-3 mt-3">
        <div className="row">
          <div className="col-sm-7">
            <label className="small">Document Description</label>
            <input
              type="text"
              class="form-control form-control-sm"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className="col-sm-5 mt-3 text-right">
            <label className="small">Document File</label>
            <input
              type="file"
              onChange={(e) => setDocument(e.target.files[0])}
              className="btn btn-outline-success p-1 pl-2 w-full m-2"
              data-mdb-ripple-color="dark"
            />
          </div>
          <div className="col-sm-12 mt-3">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleAddDocument}
            >
              Add Document
            </button>
          </div>
        </div>
        <hr className="bg-dark" />
        <div className="row">
          {allDocuments.length ? (
            allDocuments.map((document, index) => (
              <div className="col-md-6">
                <div className="card m-2 mt-2 p-1" key={index}>
                  <div className="row p-0">
                    <div className="col-sm-2 p-0 justify-content-center d-flex align-items-center">
                      {getExtension(document.documentFile) === "pdf" && (
                        <a
                          href={`http://localhost:8091/images/childDocs/${document.documentFile}`}
                          download
                          target="_blank"
                        >
                          <img
                            src="/icons/pdf-icon.png"
                            alt="pdf"
                            style={{ width: "40px" }}
                          />
                        </a>
                      )}
                      {getExtension(document.documentFile) === "docx" && (
                        <a
                          href={`http://localhost:8091/images/childDocs/${document.documentFile}`}
                          download
                          target="_blank"
                        >
                          <img
                            src="/icons/word-doc-icon.png"
                            alt="docx"
                            style={{ width: "40px" }}
                          />
                        </a>
                      )}
                    </div>
                    <div className="col-sm-8 p-1">
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
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(document.id)}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className="text-danger ml-3">No Child Documents found...</h4>
          )}
        </div>
      </div>
    </div>
  );
}
