import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ChildFamily() {
  const [allChildFamilyData, setAllChildFamilyData] = useState([]);
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState({
    showSerialNumber: true,
    showCheckInCode: true,
    showFamilyName: true,
    showChildName: true,
    showStatus: true,
    showGender: true,
    showAdmissionDate: true,
    showSchedule: true,
    showParentNote: true,
  });

  const getChildFamilyData = () => {
    axios
      .get(
        `http://localhost:8091/api/childFamilyReport/children/status/${status}`
      )
      .then((response) => {
        if (response.data) {
          setAllChildFamilyData(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const showAllColumns = () =>
    setToggle({
      showSerialNumber: true,
      showCheckInCode: true,
      showFamilyName: true,
      showChildName: true,
      showStatus: true,
      showGender: true,
      showAdmissionDate: true,
      showSchedule: true,
      showParentNote: true,
    });

  useEffect(() => getChildFamilyData(), [status]);

  // Filter data based on search query
  const filteredData = allChildFamilyData.filter((item) => {
    const fullName =
      `${item.firstName} ${item.lastName} ${item.nickName}`.toLowerCase();
    const familyName = item.familyName.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      familyName.includes(search.toLowerCase())
    );
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [];
    const tableRows = [];

    // Define table columns
    if (toggle.showSerialNumber) tableColumn.push("S.no");
    if (toggle.showCheckInCode) tableColumn.push("Check-In Code");
    if (toggle.showFamilyName) tableColumn.push("Family Name");
    if (toggle.showChildName) tableColumn.push("Child Name");
    if (toggle.showGender) tableColumn.push("Gender");
    if (toggle.showStatus) tableColumn.push("Status");
    if (toggle.showAdmissionDate) tableColumn.push("Admission Date");
    if (toggle.showSchedule) tableColumn.push("Schedule");
    if (toggle.showParentNote) tableColumn.push("Parent Note");

    // Populate table rows
    filteredData.forEach((item, index) => {
      const rowData = [];
      if (toggle.showSerialNumber) rowData.push(index + 1);
      if (toggle.showCheckInCode) rowData.push(item.checkInCode);
      if (toggle.showFamilyName) rowData.push(item.familyName);
      if (toggle.showChildName)
        rowData.push(`${item.firstName} ${item.lastName} (${item.nickName})`);
      if (toggle.showGender) rowData.push(item.gender);
      if (toggle.showStatus) rowData.push(item.status);
      if (toggle.showAdmissionDate) rowData.push(item.admissionDate);
      if (toggle.showSchedule) rowData.push(item.schedule);
      if (toggle.showParentNote) rowData.push(item.parentNotes);
      tableRows.push(rowData);
    });

    // Add table to the PDF
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Child-Family Report", 14, 15);
    doc.save("child_family_report.pdf");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item, index) => {
        const rowData = {};
        if (toggle.showSerialNumber) rowData["S.no"] = index + 1;
        if (toggle.showCheckInCode) rowData["Check-In Code"] = item.checkInCode;
        if (toggle.showFamilyName) rowData["Family Name"] = item.familyName;
        if (toggle.showChildName)
          rowData[
            "Child Name"
          ] = `${item.firstName} ${item.lastName} (${item.nickName})`;
        if (toggle.showGender) rowData["Gender"] = item.gender;
        if (toggle.showStatus) rowData["Status"] = item.status;
        if (toggle.showAdmissionDate)
          rowData["Admission Date"] = item.admissionDate;
        if (toggle.showSchedule) rowData["Schedule"] = item.schedule;
        if (toggle.showParentNote) rowData["Parent Note"] = item.parentNotes;
        return rowData;
      })
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Child-Family Report");
    XLSX.writeFile(workbook, "child_family_report.xlsx");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-9">
          <h5 className="text-dark mt-2">
            <b>Child-Family</b>
          </h5>
        </div>
        <div className="col-sm-3 text-right">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-sm-3">
          <select
            className="form-control form-control-sm mt-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
        <div className="col-sm-9 text-right">
          <button className="btn btn-sm btn-primary" onClick={downloadPDF}>
            Download PDF
          </button>
          <button className="btn btn-sm btn-success" onClick={downloadExcel}>
            Download Excel
          </button>
          <button className="btn btn-sm btn-brown">Info sheets</button>
          <button className="btn btn-sm btn-pink" onClick={showAllColumns}>
            Show All Columns
          </button>
        </div>
      </div>
      <div className="row mt-3"></div>
      <div className="row">
        <div className="col-sm-12">
          {filteredData && filteredData.length ? (
            <table className="table table-sm mb-0" id="child_table_id">
              <thead className="table-dark">
                <tr>
                  {toggle.showSerialNumber && (
                    <th>
                      <div className="d-flex align-items-center">
                        S.no
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showSerialNumber: false })
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="red-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            &times;
                          </span>
                        </Link>
                      </div>
                    </th>
                  )}
                  {toggle.showCheckInCode && (
                    <th>
                      <div className="d-flex align-items-center">
                        Check-In Code
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showCheckInCode: false })
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="red-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            &times;
                          </span>
                        </Link>
                      </div>
                    </th>
                  )}
                  {toggle.showFamilyName && (
                    <th>
                      <div className="d-flex align-items-center">
                        Family Name
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showFamilyName: false })
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="red-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            &times;
                          </span>
                        </Link>
                      </div>
                    </th>
                  )}
                  {toggle.showChildName && (
                    <th>
                      <div className="d-flex align-items-center">
                        Child Name
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showChildName: false })
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="red-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            &times;
                          </span>
                        </Link>
                      </div>
                    </th>
                  )}
                  {toggle.showGender && (
                    <th>
                      <div className="d-flex align-items-center">
                        Gender
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showGender: false })
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="red-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            &times;
                          </span>
                        </Link>
                      </div>
                    </th>
                  )}
                  {toggle.showStatus && (
                    <th>
                      <div className="d-flex align-items-center">
                        Status
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showStatus: false })
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="red-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            &times;
                          </span>
                        </Link>
                      </div>
                    </th>
                  )}
                  {toggle.showAdmissionDate && (
                    <th>
                      <div className="d-flex align-items-center">
                        Admission Date
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showAdmissionDate: false })
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="red-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            &times;
                          </span>
                        </Link>
                      </div>
                    </th>
                  )}
                  {toggle.showSchedule && (
                    <th>
                      <div className="d-flex align-items-center">
                        Schedule
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showSchedule: false })
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="red-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            &times;
                          </span>
                        </Link>
                      </div>
                    </th>
                  )}
                  {toggle.showParentNote && (
                    <th>
                      <div className="d-flex align-items-center">
                        Parent Note
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showParentNote: false })
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="red-text"
                            style={{ fontSize: "1.5rem" }}
                          >
                            &times;
                          </span>
                        </Link>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    {toggle.showSerialNumber && <td>{index + 1}</td>}
                    {toggle.showCheckInCode && <td>{item.checkInCode}</td>}
                    {toggle.showFamilyName && <td>{item.familyName}</td>}
                    {toggle.showChildName && (
                      <td>{`${item.firstName} ${item.lastName} (${item.nickName})`}</td>
                    )}
                    {toggle.showGender && <td>{item.gender}</td>}
                    {toggle.showStatus && <td>{item.status}</td>}
                    {toggle.showAdmissionDate && <td>{item.admissionDate}</td>}
                    {toggle.showSchedule && <td>{item.schedule}</td>}
                    {toggle.showParentNote && <td>{item.parentNotes}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5 className="text-danger mt-2">No records found...</h5>
          )}
        </div>
      </div>
    </div>
  );
}
