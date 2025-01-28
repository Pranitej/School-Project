import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AdminNotes({ childId }) {
  const [notes, setNotes] = useState("");
  const [allNotes, setAllNotes] = useState(null);

  const getAllNotes = () => {
    axios
      .get(
        `http://localhost:8091/api/admin-notes/getAdminNotesByChildId/${childId}`
      )
      .then((response) => {
        if (response.data) {
          setAllNotes(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddNote = () => {
    axios
      .post("http://localhost:8091/api/admin-notes/addAdminNotes", {
        notesId: 0,
        childId,
        notes,
      })
      .then((response) => {
        if (response.data) {
          getAllNotes();
          setNotes("");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleNotesDelete = (id) => {
    axios
      .delete(`http://localhost:8091/api/admin-notes/deleteAdminNotes/${id}`)
      .then((response) => {
        if (response) {
          getAllNotes();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getAllNotes(), [childId]);

  return (
    <div>
      <div
        className="modal fade"
        id="adminNotes"
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
              <p className="heading lead">Admin Notes</p>

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
              <div className="modal-body pt-0">
                <div className="row">
                  <div className="col-sm-12">
                    <div class="md-form">
                      <textarea
                        type="text"
                        id="form10"
                        class="md-textarea form-control"
                        rows="3"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                      ></textarea>

                      <label for="form10">Add Admin Notes</label>
                    </div>
                  </div>
                </div>
                <div>
                  <div className=" card mdb-color darken-3 p-2">
                    <h4 className="text-light">Admin Notes</h4>
                  </div>
                  <div style={{ overflowY: "auto", height: "300px" }}>
                    {allNotes &&
                      allNotes.map((note, index) => (
                        <div className="card mt-2 p-3 m-1">
                          <div className="row mb-2" key={index}>
                            <div className="col-sm-10">
                              <div className="row">
                                <div className="col-sm-12">
                                  <h5 className="card-title">
                                    <b>{note.notes}</b>
                                  </h5>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12">
                                  <small className="card-text text-secondary">
                                    {note.dateCreated.slice(0, 10)}
                                  </small>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-2 text-right">
                              <i
                                className="fas fa-trash fa-1x text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleNotesDelete(note.notesId)}
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
                  className="btn btn-info btn-sm"
                  // data-dismiss="modal"
                  onClick={() => handleAddNote()}
                >
                  Add Notes <i className="far fa-gem ml-1"></i>
                </button>
                <a
                  type="button"
                  className="btn btn-outline-danger waves-effect btn-sm"
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
