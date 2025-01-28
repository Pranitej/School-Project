import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SingleEmployeeMail({ currentEmployee }) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSendEmail = () => {
    setEmail(currentEmployee.email);
    setSubject("");
    setBody("");

    axios
      .post(`http://localhost:8091/sendMail`, {
        toMail: email,
        subject,
        body,
      })
      .then((response) => {
        if (response.data) {
          alert("Email sent successfully");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setEmail(currentEmployee.email);
    setSubject("");
    setBody("");
  }, [currentEmployee]);

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-sm-6">
          <label className="small">Email Address</label>
          <input
            type="email"
            className="form-control form-control-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-sm-6">
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
      <div className="row mt-3">
        <div className="col-sm-12 text-right">
          <button
            className="btn btn-sm btn-info"
            onClick={() => handleSendEmail()}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
