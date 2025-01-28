import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function AddBonus({ currentEmployee, getApprovedBonus }) {
  const [bonusDate, setBonusDate] = useState("");
  const [bonusReason, setBonusReason] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [bonusHoursToPay, setBonusHoursToPay] = useState(0);
  const [bonusDollarsToPay, setBonusDollarsToPay] = useState(0);

  const handleAddBonus = () => {
    axios
      .post(`http://localhost:8091/api/employee-bonus/createBonus`, {
        employeeId: currentEmployee.empId,
        bonusDate,
        bonusReason,
        adminNotes,
        bonusHoursToPay,
        bonusDollarsToPay,
      })
      .then((response) => {
        if (response.data) {
          getApprovedBonus();
          resetData();
        } else {
          alert("Error adding day off...");
        }
      })
      .catch((error) => console.error(error));
  };

  const resetData = () => {
    setBonusDate("");
    setBonusReason("");
    setAdminNotes("");
    setBonusHoursToPay(0);
    setBonusDollarsToPay(0);
  };

  useEffect(() => resetData(), [currentEmployee]);

  return (
    <div>
      <div
        className="modal fade"
        id="addBonus"
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
                  <label className="small">Bonus Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={bonusDate}
                    onChange={(e) => setBonusDate(e.target.value)}
                  />
                </div>
                <div className="col-sm-8">
                  <label className="small">Bonus Reason</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={bonusReason}
                    onChange={(e) => setBonusReason(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6">
                  <label className="small">Hours To Pay</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={bonusHoursToPay}
                    onChange={(e) => setBonusHoursToPay(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="small">Dollars To Pay</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={bonusDollarsToPay}
                    onChange={(e) => setBonusDollarsToPay(e.target.value)}
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
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-info btn-sm"
                data-dismiss="modal"
                onClick={() => handleAddBonus()}
              >
                Add Bonus <i className="far fa-gem ml-1"></i>
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
