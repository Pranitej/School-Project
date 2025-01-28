import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function AddPaidLeave({
  currentEmployee,
  getApprovedPaidLeaves,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [hoursToPay, setHoursToPay] = useState(0);
  const [dollarsToPay, setDollarsToPay] = useState(0);
  const [substituteNeeded, setSubstituteNeeded] = useState(false);
  const [substituteSecured, setSubstituteSecured] = useState(false);

  const handleAddPaidLeave = () => {
    axios
      .post(`http://localhost:8091/api/paidLeave/createPaidLeave`, {
        empId: currentEmployee.empId,
        startDateOff: startDate,
        endDateOff: endDate,
        reasonOff: reason,
        approvedBy,
        adminNotes,
        paidLeaveHoursToPay: hoursToPay,
        paidLeaveDollarsToPay: dollarsToPay,
        isSubstituteNeeded: substituteNeeded,
        isSubstituteSecured: substituteSecured,
      })
      .then((response) => {
        if (response.data) {
          getApprovedPaidLeaves();
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
    setReason("");
    setApprovedBy("");
    setAdminNotes("");
    setHoursToPay(0);
    setDollarsToPay(0);
    setSubstituteNeeded(false);
    setSubstituteSecured(false);
  };

  useEffect(() => resetData(), [currentEmployee]);

  return (
    <div>
      <div
        className="modal fade"
        id="addPaidLeave"
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
              <p className="heading lead">Add Paid Leave</p>
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
                <div className="col-sm-6">
                  <label className="small">Start Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="small">End Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6">
                  <label className="small">Reason</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
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
                <div className="col-sm-6">
                  <label className="small">Hours To Pay</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={hoursToPay}
                    onChange={(e) => setHoursToPay(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="small">Dollars To Pay</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={dollarsToPay}
                    onChange={(e) => setDollarsToPay(e.target.value)}
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
                <div className="col-sm-6">
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
                <div className="col-sm-6">
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
                onClick={() => handleAddPaidLeave()}
              >
                Add Paid Leave <i className="far fa-gem ml-1"></i>
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
