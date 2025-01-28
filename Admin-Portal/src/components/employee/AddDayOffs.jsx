import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AddDayOffs({ currentEmployee, getApprovedDayOffs }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [reason, setReason] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [dayOffAsPaid, setDayOffAsPaid] = useState(false);
  const [substituteNeeded, setSubstituteNeeded] = useState(false);
  const [substituteSecured, setSubstituteSecured] = useState(false);

  const handleAddDayOff = () => {
    axios
      .post(`http://localhost:8091/api/daysOff/createDayOff`, {
        empId: currentEmployee.empId,
        startDateOff: startDate,
        endDateOff: endDate,
        reason,
        isPaidOff: dayOffAsPaid,
        totalHours,
        isSubstituteNeeded: substituteNeeded,
        isSubstituteSecured: substituteSecured,
        adminNotes,
        approvedBy,
      })
      .then((response) => {
        if (response.data) {
          getApprovedDayOffs();
          resetData();
        } else {
          alert("Error adding day off...");
        }
      })
      .catch((error) => console.error(error));
  };

  const resetData = () => {
    setStartDate("");
    setEndDate("");
    setTotalHours(0);
    setReason("");
    setApprovedBy("");
    setAdminNotes("");
    setDayOffAsPaid(false);
    setSubstituteNeeded(false);
    setSubstituteSecured(false);
  };

  useEffect(() => resetData(), [currentEmployee]);

  return (
    <div>
      <div
        className="modal fade"
        id="addDayOff"
        tabIndex="-1"
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
              <p className="heading lead">Add DayOff</p>
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
                <div className="col-sm-4">
                  <label className="small">Start Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-sm-4">
                  <label className="small">End Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="col-sm-4">
                  <label className="small">Total Hours</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={totalHours}
                    onChange={(e) => setTotalHours(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-8">
                  <label className="small">Reason</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                <div className="col-sm-4">
                  <label className="small">Approved By</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={approvedBy}
                    onChange={(e) => setApprovedBy(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-12">
                  <label className="small">Admin Notes</label>
                  <textarea
                    rows="2"
                    className="form-control form-control-sm"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="dayOffAsPaid"
                      checked={dayOffAsPaid}
                      onChange={(e) => setDayOffAsPaid(e.target.checked)}
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="dayOffAsPaid"
                    >
                      Mark this dayOff as PAID
                    </label>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="substituteNeeded"
                      checked={substituteNeeded}
                      onChange={(e) => setSubstituteNeeded(e.target.checked)}
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="substituteNeeded"
                    >
                      Is substitute Needed?
                    </label>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="substituteSecured"
                      checked={substituteSecured}
                      onChange={(e) => setSubstituteSecured(e.target.checked)}
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="substituteSecured"
                    >
                      Is substitute Secured?
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-info btn-sm"
                data-dismiss="modal"
                onClick={() => handleAddDayOff()}
              >
                Add DayOff <i className="far fa-gem ml-1"></i>
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
    </div>
  );
}
