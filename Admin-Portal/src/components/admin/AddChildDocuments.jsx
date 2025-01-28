import axios from "axios";
import React, { useState } from "react";

export default function AddChildDocuments({ childId, getAllChildDocuments }) {
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState(null);

  const uploadFile = (fileName) => {
    const formData = new FormData();
    formData.append("file", document);
    formData.append("n", 8);
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
      .post(`http://localhost:8091/api/child-documents/createChildDocument`, {
        documentFile: fileName,
        uploadedBy: "family",
        childId,
        description,
        id: 0,
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

  return (
    <div>
      <div
        className="modal fade"
        id="addChildDocuments"
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
              <p className="heading lead">Add Child Documents</p>

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
                      rows="3"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    ></textarea>
                    <label for="form10">Add Description</label>
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
                  Add Child Document <i className="far fa-gem ml-1"></i>
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
