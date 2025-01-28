import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function AuthorizedPickupReports() {
  const [authorizedPickupsData, setAuthorizedPickupsData] = useState([]);
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState({
    showSerialNumber: true,
    showChildName: true,
    showPickupName: true,
    showPickupNumber: true,
    showRelationship: true,
    showEmail: true,
  });

  const getAuthorizedPickupsData = () => {
    axios
      .get(
        `http://localhost:8091/api/children/authorizedpickupsreport/${status}`
      )
      .then((response) => {
        if (response.data) {
          setAuthorizedPickupsData(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const showAllColumns = () =>
    setToggle({
      showSerialNumber: true,
      showChildName: true,
      showPickupName: true,
      showPickupNumber: true,
      showRelationship: true,
      showEmail: true,
    });

  useEffect(() => getAuthorizedPickupsData(), [status]);

  const filteredData = authorizedPickupsData.filter((item) => {
    const fullName =
      `${item.firstName} ${item.lastName} ${item.nickName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [];
    const tableRows = [];

    if (toggle.showSerialNumber) tableColumn.push("S.no");
    if (toggle.showChildName) tableColumn.push("Child Name");
    if (toggle.showPickupName) tableColumn.push("Pickup Name");
    if (toggle.showEmail) tableColumn.push("Email Address");
    if (toggle.showPickupNumber) tableColumn.push("Pickup Number");
    if (toggle.showRelationship) tableColumn.push("Relationship");

    filteredData.forEach((item, index) => {
      const rowData = [];
      if (toggle.showSerialNumber) rowData.push(index + 1);
      if (toggle.showChildName)
        rowData.push(`${item.firstName} ${item.lastName} (${item.nickName})`);
      if (toggle.showPickupName)
        rowData.push(`${item.pickupFirstName} ${item.pickupLastName}`);
      if (toggle.showEmail) rowData.push(item.email);
      if (toggle.showPickupNumber) rowData.push(item.primaryPhone);
      if (toggle.showRelationship) rowData.push(item.relationship);
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Authorized Pickups Report", 14, 15);
    doc.save("authorized_pickups_report.pdf");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item, index) => {
        const rowData = {};
        if (toggle.showSerialNumber) rowData["S.no"] = index + 1;
        if (toggle.showChildName)
          rowData[
            "Child Name"
          ] = `${item.firstName} ${item.lastName} (${item.nickName})`;
        if (toggle.showPickupName)
          rowData[
            "Pickup Name"
          ] = `${item.pickupFirstName} ${item.pickupLastName}`;
        if (toggle.showEmail) rowData["Email Address"] = item.email;
        if (toggle.showPickupNumber)
          rowData["Pickup Number"] = item.primaryPhone;
        if (toggle.showRelationship)
          rowData["Relationship"] = item.relationship;
        return rowData;
      })
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Authorized Pickups Report"
    );
    XLSX.writeFile(workbook, "authorized_pickups_report.xlsx");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-9">
          <h5 className="text-dark mt-2">
            <b>Authorized Pickups</b>
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
            <table
              className="table table-sm mb-0"
              id="authorized_pickups_table_id"
            >
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
                  {toggle.showPickupName && (
                    <th>
                      <div className="d-flex align-items-center">
                        Pickup Name
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showPickupName: false })
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
                  {toggle.showEmail && (
                    <th>
                      <div className="d-flex align-items-center">
                        Email Address
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showEmail: false })
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
                  {toggle.showPickupNumber && (
                    <th>
                      <div className="d-flex align-items-center">
                        Pickup Number
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showPickupNumber: false })
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
                  {toggle.showRelationship && (
                    <th>
                      <div className="d-flex align-items-center">
                        Relationship
                        <Link
                          className="ml-2 btn-sm p-0"
                          onClick={() =>
                            setToggle({ ...toggle, showRelationship: false })
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
                    {toggle.showChildName && (
                      <td>{`${item.firstName} ${item.lastName} (${item.nickName})`}</td>
                    )}
                    {toggle.showPickupName && (
                      <td>{`${item.pickupFirstName} ${item.pickupLastName}`}</td>
                    )}
                    {toggle.showEmail && <td>{item.email}</td>}
                    {toggle.showPickupNumber && <td>{item.primaryPhone}</td>}
                    {toggle.showRelationship && <td>{item.relationship}</td>}
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
