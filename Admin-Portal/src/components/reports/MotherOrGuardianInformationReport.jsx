import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

const MotherOrGuardianInformationReport = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState({
    showSerialNumber: true,
    showCheckInCode: true,
    showRelationshipToChild: true,
    showName: true,
    showPhone: true,
    showEmail: true,
    showMailingAddress: true,
    showCity: true,
    showCountry: true,
    showState: true,
    showZipCode: true,
    showEducationLevel: true,
    showCollegeDegreeName: true,
    showPlaceOfEmployment: true,
    showOccupation: true,
    showDriverLicense: true,
    showIsSubmitted: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8091/api/mother-or-guardian/getAll"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const showAllColumns = () =>
    setToggle({
      showSerialNumber: true,
      showCheckInCode: true,
      showRelationshipToChild: true,
      showName: true,
      showPhone: true,
      showEmail: true,
      showMailingAddress: true,
      showCity: true,
      showCountry: true,
      showState: true,
      showZipCode: true,
      showEducationLevel: true,
      showCollegeDegreeName: true,
      showPlaceOfEmployment: true,
      showOccupation: true,
      showDriverLicense: true,
      showIsSubmitted: true,
    });

  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [];
    const tableRows = [];

    // Define table columns based on toggle settings
    if (toggle.showSerialNumber) tableColumn.push("S.no");
    if (toggle.showCheckInCode) tableColumn.push("Check-In Code");
    if (toggle.showRelationshipToChild)
      tableColumn.push("Relationship To Child");
    if (toggle.showName) tableColumn.push("Name");
    if (toggle.showPhone) tableColumn.push("Phone");
    if (toggle.showEmail) tableColumn.push("Email");
    if (toggle.showMailingAddress) tableColumn.push("Mailing Address");
    if (toggle.showCity) tableColumn.push("City");
    if (toggle.showCountry) tableColumn.push("Country");
    if (toggle.showState) tableColumn.push("State");
    if (toggle.showZipCode) tableColumn.push("Zip Code");
    if (toggle.showEducationLevel) tableColumn.push("Education Level");
    if (toggle.showCollegeDegreeName) tableColumn.push("College Degree Name");
    if (toggle.showPlaceOfEmployment) tableColumn.push("Place Of Employment");
    if (toggle.showOccupation) tableColumn.push("Occupation");
    if (toggle.showDriverLicense) tableColumn.push("Driver License");
    if (toggle.showIsSubmitted) tableColumn.push("Submitted");

    // Populate table rows based on the filtered data and toggle settings
    filteredData.forEach((item, index) => {
      const rowData = [];
      if (toggle.showSerialNumber) rowData.push(index + 1);
      if (toggle.showCheckInCode) rowData.push(item.checkInCode);
      if (toggle.showRelationshipToChild)
        rowData.push(item.relationshipToChild);
      if (toggle.showName) rowData.push(item.name);
      if (toggle.showPhone) rowData.push(item.phone);
      if (toggle.showEmail) rowData.push(item.email);
      if (toggle.showMailingAddress) rowData.push(item.mailingAddress);
      if (toggle.showCity) rowData.push(item.city);
      if (toggle.showCountry) rowData.push(item.country);
      if (toggle.showState) rowData.push(item.state);
      if (toggle.showZipCode) rowData.push(item.zipCode);
      if (toggle.showEducationLevel) rowData.push(item.educationLevel);
      if (toggle.showCollegeDegreeName) rowData.push(item.collegeDegreeName);
      if (toggle.showPlaceOfEmployment) rowData.push(item.placeOfEmployment);
      if (toggle.showOccupation) rowData.push(item.occupation);
      if (toggle.showDriverLicense) rowData.push(item.driverLicense);
      if (toggle.showIsSubmitted) rowData.push(item.isSubmitted);
      tableRows.push(rowData);
    });

    // Add table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // Add title to the PDF
    doc.text("Mother or Guardian Information Report", 14, 15);

    // Save the PDF
    doc.save("mother_or_guardian_information.pdf");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item, index) => {
        const rowData = {};
        if (toggle.showSerialNumber) rowData["S.no"] = index + 1;
        if (toggle.showCheckInCode) rowData["Check-In Code"] = item.checkInCode;
        if (toggle.showRelationshipToChild)
          rowData["Relationship To Child"] = item.relationshipToChild;
        if (toggle.showName) rowData["Name"] = item.name;
        if (toggle.showPhone) rowData["Phone"] = item.phone;
        if (toggle.showEmail) rowData["Email"] = item.email;
        if (toggle.showMailingAddress)
          rowData["Mailing Address"] = item.mailingAddress;
        if (toggle.showCity) rowData["City"] = item.city;
        if (toggle.showCountry) rowData["Country"] = item.country;
        if (toggle.showState) rowData["State"] = item.state;
        if (toggle.showZipCode) rowData["Zip Code"] = item.zipCode;
        if (toggle.showEducationLevel)
          rowData["Education Level"] = item.educationLevel;
        if (toggle.showCollegeDegreeName)
          rowData["College Degree Name"] = item.collegeDegreeName;
        if (toggle.showPlaceOfEmployment)
          rowData["Place Of Employment"] = item.placeOfEmployment;
        if (toggle.showOccupation) rowData["Occupation"] = item.occupation;
        if (toggle.showDriverLicense)
          rowData["Driver License"] = item.driverLicense;
        if (toggle.showIsSubmitted) rowData["Submitted"] = item.isSubmitted;
        return rowData;
      })
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Mother or Guardian Information"
    );
    XLSX.writeFile(workbook, "mother_or_guardian_information.xlsx");
  };

  return (
    <div className="container">
      <h4>Mother or Guardian Information Report</h4>
      <div className="row">
        <div className="col-sm-3">
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control form-control-sm"
          />
        </div>
        <div className="col-sm-9 text-right">
          <button className="btn btn-sm btn-pink" onClick={showAllColumns}>
            Show All Columns
          </button>
          <button className="btn btn-primary btn-sm" onClick={downloadExcel}>
            Export to Excel
          </button>
          <button className="btn btn-success ml-2 btn-sm" onClick={exportPDF}>
            Export to PDF
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-sm mb-0" id="student_information_form">
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
              {toggle.showRelationshipToChild && (
                <th>
                  <div className="d-flex align-items-center">
                    Relationship To Child
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showRelationshipToChild: false })
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
              {toggle.showName && (
                <th>
                  <div className="d-flex align-items-center">
                    Name
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() => setToggle({ ...toggle, showName: false })}
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
              {toggle.showPhone && (
                <th>
                  <div className="d-flex align-items-center">
                    Phone
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() => setToggle({ ...toggle, showPhone: false })}
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
                    Email
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() => setToggle({ ...toggle, showEmail: false })}
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
              {toggle.showMailingAddress && (
                <th>
                  Mailing Address
                  <Link
                    className="ml-2 btn-sm p-0"
                    onClick={() =>
                      setToggle({ ...toggle, showMailingAddress: false })
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
                </th>
              )}
              {toggle.showCity && (
                <th>
                  City
                  <Link
                    className="ml-2 btn-sm p-0"
                    onClick={() => setToggle({ ...toggle, showCity: false })}
                  >
                    <span
                      aria-hidden="true"
                      className="red-text"
                      style={{ fontSize: "1.5rem" }}
                    >
                      &times;
                    </span>
                  </Link>
                </th>
              )}
              {toggle.showCountry && (
                <th>
                  Country
                  <Link
                    className="ml-2 btn-sm p-0"
                    onClick={() => setToggle({ ...toggle, showCountry: false })}
                  >
                    <span
                      aria-hidden="true"
                      className="red-text"
                      style={{ fontSize: "1.5rem" }}
                    >
                      &times;
                    </span>
                  </Link>
                </th>
              )}
              {toggle.showState && (
                <th>
                  State
                  <Link
                    className="ml-2 btn-sm p-0"
                    onClick={() => setToggle({ ...toggle, showState: false })}
                  >
                    <span
                      aria-hidden="true"
                      className="red-text"
                      style={{ fontSize: "1.5rem" }}
                    >
                      &times;
                    </span>
                  </Link>
                </th>
              )}
              {toggle.showZipCode && (
                <th>
                  Zip Code
                  <Link
                    className="ml-2 btn-sm p-0"
                    onClick={() => setToggle({ ...toggle, showZipCode: false })}
                  >
                    <span
                      aria-hidden="true"
                      className="red-text"
                      style={{ fontSize: "1.5rem" }}
                    >
                      &times;
                    </span>
                  </Link>
                </th>
              )}
              {toggle.showEducationLevel && (
                <th>
                  Education Level
                  <Link
                    className="ml-2 btn-sm p-0"
                    onClick={() =>
                      setToggle({ ...toggle, showEducationLevel: false })
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
                </th>
              )}
              {toggle.showCollegeDegreeName && (
                <th>
                  College Degree Name
                  <Link
                    className="ml-2 btn-sm p-0"
                    onClick={() =>
                      setToggle({ ...toggle, showCollegeDegreeName: false })
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
                </th>
              )}
              {toggle.showPlaceOfEmployment && (
                <th>
                  Place Of Employment
                  <Link
                    className="ml-2 btn-sm p-0"
                    onClick={() =>
                      setToggle({ ...toggle, showPlaceOfEmployment: false })
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
                </th>
              )}
              {toggle.showOccupation && (
                <th>
                  Occupation
                  <Link
                    className="ml-2 btn-sm p-0"
                    onClick={() =>
                      setToggle({ ...toggle, showOccupation: false })
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
                </th>
              )}
              {toggle.showDriverLicense && (
                <th>
                  Driver License
                  <Link
                    className="ml-2 btn-sm p-0"
                    onClick={() =>
                      setToggle({ ...toggle, showDriverLicense: false })
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
                </th>
              )}
              {toggle.showIsSubmitted && (
                <th>
                  Submitted
                  <Link
                    className="ml-2 btn-sm p-0"
                    onClick={() =>
                      setToggle({ ...toggle, showIsSubmitted: false })
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
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.mid}>
                {toggle.showSerialNumber && <td>{index + 1}</td>}
                {toggle.showCheckInCode && <td>{item.checkInCode}</td>}
                {toggle.showRelationshipToChild && (
                  <td>{item.relationshipToChild}</td>
                )}
                {toggle.showName && <td>{item.name}</td>}
                {toggle.showPhone && <td>{item.phone}</td>}
                {toggle.showEmail && <td>{item.email}</td>}
                {toggle.showMailingAddress && <td>{item.mailingAddress}</td>}
                {toggle.showCity && <td>{item.city}</td>}
                {toggle.showCountry && <td>{item.country}</td>}
                {toggle.showState && <td>{item.state}</td>}
                {toggle.showZipCode && <td>{item.zipCode}</td>}
                {toggle.showEducationLevel && <td>{item.educationLevel}</td>}
                {toggle.showCollegeDegreeName && (
                  <td>{item.collegeDegreeName}</td>
                )}
                {toggle.showPlaceOfEmployment && (
                  <td>{item.placeOfEmployment}</td>
                )}
                {toggle.showOccupation && <td>{item.occupation}</td>}
                {toggle.showDriverLicense && <td>{item.driverLicense}</td>}
                {toggle.showIsSubmitted && <td>{item.isSubmitted}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MotherOrGuardianInformationReport;
