import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddFamilyNotes({ familyObj }) {
  const [note, setNote] = useState("");
  const [allNotes, setAllNotes] = useState(null);

  const getAllNotes = () => {
    familyObj &&
      axios
        .get(
          `http://localhost:8091/api/family-notes/getFamilyNotesByCheckInCode/${familyObj.checkInCode}`
        )
        .then((response) => {
          if (response.data) {
            setAllNotes(response.data);
          }
        })
        .catch((error) => console.error(error));
  };

  useEffect(() => getAllNotes(), [familyObj]);

  const handleAddNote = () => {
    axios
      .post("http://localhost:8091/api/family-notes/addFamilyNotes", {
        notesId: 0,
        checkInCode: familyObj.checkInCode,
        notes: note,
      })
      .then((response) => {
        if (response.data) {
          getAllNotes();
          setNote("");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div
      className="modal fade"
      id="addFamilyNotes"
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
            <p className="heading lead">Add Family Notes</p>

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
            <div className="modal-body">
              <div class="md-form">
                <textarea
                  type="text"
                  id="form10"
                  class="md-textarea form-control"
                  rows="3"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                ></textarea>

                <label for="form10">Add Family Notes</label>
              </div>

              {
                <div>
                  <div className=" card mdb-color darken-3 p-2">
                    <h4 className="text-light">Family Notes</h4>
                  </div>
                  <div style={{ overflowY: "auto", height: "300px" }}>
                    {allNotes &&
                      allNotes.map((note, index) => (
                        <div className="card mt-2 p-3">
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
                              <i className="fas fa-trash fa-1x text-danger"></i>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              }
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info waves-effect"
                onClick={() => handleAddNote()}
                // data-dismiss="modal"
              >
                Add Notes <i className="far fa-gem ml-1"></i>
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
  );
}
