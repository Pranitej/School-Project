import React, { useState } from "react";
import EmployeeReservations from "./EmployeeReservations";
import EmployeeDayOffs from "./EmployeeDayOffs";
import EmployeePaidLeave from "./EmployeePaidLeave";
import EmployeeBonus from "./EmployeeBonus";
import EmployeeEmails from "./EmployeeEmails";
import SingleEmployeeMail from "./SingleEmployeeMail";

export default function ManageEmployee({ currentEmployee }) {
  const [title, setTitle] = useState("Schedules");
  const [showReservations, setShowReservations] = useState(true);
  const [showDayOff, setShowDayOff] = useState(false);
  const [showPaidLeave, setShowPaidLeave] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [showEmails, setShowEmails] = useState(false);

  const hideAllPanels = () => {
    setShowReservations(false);
    setShowDayOff(false);
    setShowPaidLeave(false);
    setShowBonus(false);
    setShowEmails(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 mt-3">
          <h5 className="text-danger">
            <b>{title}</b>
          </h5>
        </div>
        <div className="col-sm-9 text-right">
          <span className="p-3">
            <button
              className="btn btn-sm btn-purple btn-rounded"
              onClick={() => {
                hideAllPanels();
                setShowReservations(true);
                setTitle("Schedules");
              }}
            >
              Schedules
            </button>
            <button
              className="btn btn-sm btn-success btn-rounded"
              onClick={() => {
                hideAllPanels();
                setShowDayOff(true);
                setTitle("DayOffs");
              }}
            >
              DayOff
            </button>
            <button
              className="btn btn-sm btn-brown btn-rounded"
              onClick={() => {
                hideAllPanels();
                setShowPaidLeave(true);
                setTitle("Paid leaves");
              }}
            >
              Paid leave
            </button>
            <button
              className="btn btn-sm btn-primary btn-rounded"
              onClick={() => {
                hideAllPanels();
                setShowBonus(true);
                setTitle("Bonus");
              }}
            >
              Bonus
            </button>
            <button
              className="btn btn-sm btn-pink btn-rounded"
              onClick={() => {
                hideAllPanels();
                setShowEmails(true);
                setTitle("Email Portals");
              }}
            >
              Email
            </button>
            <button className="btn btn-sm btn-dark btn-rounded">
              Reservations
            </button>
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          {showReservations && (
            <EmployeeReservations currentEmployee={currentEmployee} />
          )}
          {showDayOff && <EmployeeDayOffs currentEmployee={currentEmployee} />}
          {showPaidLeave && (
            <EmployeePaidLeave currentEmployee={currentEmployee} />
          )}
          {showBonus && <EmployeeBonus currentEmployee={currentEmployee} />}
          {showEmails && (
            <SingleEmployeeMail currentEmployee={currentEmployee} />
          )}
        </div>
      </div>
    </div>
  );
}
