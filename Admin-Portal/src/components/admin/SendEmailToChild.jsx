import React, { useState } from "react";
import axios from "axios";

export default function SendEmailToChild({ familyObj }) {
  const [emailId, setEmailId] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

  const handleSendEmail = () => {
    axios
      .post(`http://localhost:8091/sendMail`, {
        toMail: emailId,
        subject,
        body: message,
      })
      .then((response) => {
        if (response.data) {
          alert("Mail sent...");
          setEmailId("");
          setMessage("");
          setSubject("");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div
        className="modal fade"
        id="sendEmail"
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
              <p className="heading lead">Send Email</p>

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
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label for="emailId">Email ID:</label>
                      <input
                        type="text"
                        id="emailId"
                        value={emailId}
                        class="form-control"
                        onChange={(e) => setEmailId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 mt-0">
                    <label htmlFor="attachment">Attachment:</label>
                    <input
                      type="file"
                      id="attachment"
                      onChange={(e) => setAttachment(e.target.files[0])}
                      className="btn btn-outline-danger p-1 pl-2 w-full m-0"
                      data-mdb-ripple-color="dark"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label for="subject">Subject:</label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    class="form-control"
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="message">Message:</label>
                  <textarea
                    id="message"
                    rows="3"
                    class="form-control"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-sm-6"></div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-info btn-sm"
                  data-dismiss="modal"
                  onClick={() => handleSendEmail()}
                >
                  Send Email <i className="far fa-gem ml-1"></i>
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
