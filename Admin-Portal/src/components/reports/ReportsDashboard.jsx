import React, { useState } from "react";
import ReportsList from "./ReportsList";
import CheckInCodeReport from "./CheckInCodeReport";
import ChildFamily from "./ChildFamily";
import EmergencyContactsReport from "./EmergencyContactsReport";
import AuthorizedPickupReports from "./AuthorizedPickupReports";
import StudentInformationForm from "./StudentInformationForm";
import MotherOrGuardianInformationReport from "./MotherOrGuardianInformationReport";

export default function ReportsDashboard() {
  const [currentReport, setCurrentReport] = useState("");
  const [reportsList, _] = useState([
    {
      name: "Check-In Code",
      component: <CheckInCodeReport />,
    },
    {
      name: "Child-Family",
      component: <ChildFamily />,
    },
    {
      name: "Emergency Contacts",
      component: <EmergencyContactsReport />,
    },
    {
      name: "Authorized Pickups",
      component: <AuthorizedPickupReports />,
    },
    {
      name: "Student Information Form",
      component: <StudentInformationForm />,
    },
    {
      name: "Mother/Guardian Information",
      component: <MotherOrGuardianInformationReport />,
    },
  ]);

  return (
    <div className="container-fluid mt-5">
      <div className="row mt-5 p-2">
        <div className="col-sm-2 overflow-auto text-center border-2 border-right border-dark">
          <h5 className="text-primary p-1 mt-3">Reports</h5>
          <ReportsList
            currentReport={currentReport}
            setCurrentReport={setCurrentReport}
            reportsList={reportsList}
          />
        </div>
        <div className="col-sm-10 mt-3">
          {currentReport ? (
            <div className="card p-3">
              {reportsList.map((item, index) => (
                <div key={index}>
                  {item.name === currentReport && item.component}
                </div>
              ))}
            </div>
          ) : (
            <h5 className="text-danger mt-3">No Report is selected...</h5>
          )}
        </div>
      </div>
    </div>
  );
}
