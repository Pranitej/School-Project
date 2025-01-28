import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function StudentInformationForm() {
  const [allStudentForms, setAllStudentForms] = useState([]);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState({
    showSerialNumber: true,
    showCheckInCode: true,
    showEnrollmentType: true,
    showSchoolYear: true,
    showGradeLevel: true,
    showGender: true,
    showPrimaryTeacher: true,
    showIepDocumentsStudHave: true,
    showGraduationParticipation: true,
    showDualEnrollment: true,
    showNameOfProgram: true,
    showCity: true,
    showState: true,
    showStudentFirstName: true,
    showStudentMiddleName: true,
    showStudentLastName: true,
    showDateOfBirth: true,
    showSocialSecurityNo: true,
    showStudentResidentAddress: true,
    showStudentResidentCity: true,
    showStudentResidentCountry: true,
    showStudentResidentState: true,
    showStudentResidentZipCode: true,
    showIsSubmitted: true,
  });

  const getStudentForms = () => {
    axios
      .get("http://localhost:8091/api/students-information/getAllStudentForms")
      .then((response) => {
        if (response.data) {
          setAllStudentForms(response.data);
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
      showEnrollmentType: true,
      showSchoolYear: true,
      showGradeLevel: true,
      showGender: true,
      showPrimaryTeacher: true,
      showIepDocumentsStudHave: true,
      showGraduationParticipation: true,
      showDualEnrollment: true,
      showNameOfProgram: true,
      showCity: true,
      showState: true,
      showStudentFirstName: true,
      showStudentMiddleName: true,
      showStudentLastName: true,
      showDateOfBirth: true,
      showSocialSecurityNo: true,
      showStudentResidentAddress: true,
      showStudentResidentCity: true,
      showStudentResidentCountry: true,
      showStudentResidentState: true,
      showStudentResidentZipCode: true,
      showIsSubmitted: true,
    });

  useEffect(() => getStudentForms(), []);

  // Filter data based on search query
  const filteredData = allStudentForms.filter((item) => {
    const fullName =
      `${item.studentFirstName} ${item.studentMiddleName} ${item.studentLastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [];
    const tableRows = [];

    // Define table columns
    if (toggle.showSerialNumber) tableColumn.push("S.no");
    if (toggle.showCheckInCode) tableColumn.push("Check-In Code");
    if (toggle.showEnrollmentType) tableColumn.push("Enrollment Type");
    if (toggle.showSchoolYear) tableColumn.push("School Year");
    if (toggle.showGradeLevel) tableColumn.push("Grade Level");
    if (toggle.showGender) tableColumn.push("Gender");
    if (toggle.showPrimaryTeacher) tableColumn.push("Primary Teacher");
    if (toggle.showIepDocumentsStudHave) tableColumn.push("IEP Documents");
    if (toggle.showGraduationParticipation)
      tableColumn.push("Graduation Participation");
    if (toggle.showDualEnrollment) tableColumn.push("Dual Enrollment");
    if (toggle.showNameOfProgram) tableColumn.push("Name of Program");
    if (toggle.showCity) tableColumn.push("City");
    if (toggle.showState) tableColumn.push("State");
    if (toggle.showStudentFirstName) tableColumn.push("First Name");
    if (toggle.showStudentMiddleName) tableColumn.push("Middle Name");
    if (toggle.showStudentLastName) tableColumn.push("Last Name");
    if (toggle.showDateOfBirth) tableColumn.push("Date of Birth");
    if (toggle.showSocialSecurityNo) tableColumn.push("Social Security No.");
    if (toggle.showStudentResidentAddress) tableColumn.push("Resident Address");
    if (toggle.showStudentResidentCity) tableColumn.push("Resident City");
    if (toggle.showStudentResidentCountry) tableColumn.push("Resident Country");
    if (toggle.showStudentResidentState) tableColumn.push("Resident State");
    if (toggle.showStudentResidentZipCode)
      tableColumn.push("Resident Zip Code");
    if (toggle.showIsSubmitted) tableColumn.push("Submitted");

    // Populate table rows
    filteredData.forEach((item, index) => {
      const rowData = [];
      if (toggle.showSerialNumber) rowData.push(index + 1);
      if (toggle.showCheckInCode) rowData.push(item.checkInCode);
      if (toggle.showEnrollmentType) rowData.push(item.enrollmentType);
      if (toggle.showSchoolYear) rowData.push(item.schoolYear);
      if (toggle.showGradeLevel) rowData.push(item.gradeLevel);
      if (toggle.showGender) rowData.push(item.gender);
      if (toggle.showPrimaryTeacher) rowData.push(item.primaryTeacher);
      if (toggle.showIepDocumentsStudHave)
        rowData.push(item.iepDocumentsStudHave);
      if (toggle.showGraduationParticipation)
        rowData.push(item.graduationParticipation);
      if (toggle.showDualEnrollment) rowData.push(item.dualEnrollment);
      if (toggle.showNameOfProgram) rowData.push(item.nameOfProgram);
      if (toggle.showCity) rowData.push(item.city);
      if (toggle.showState) rowData.push(item.state);
      if (toggle.showStudentFirstName) rowData.push(item.studentFirstName);
      if (toggle.showStudentMiddleName) rowData.push(item.studentMiddleName);
      if (toggle.showStudentLastName) rowData.push(item.studentLastName);
      if (toggle.showDateOfBirth) rowData.push(item.dateOfBirth);
      if (toggle.showSocialSecurityNo) rowData.push(item.socialSecurityNo);
      if (toggle.showStudentResidentAddress)
        rowData.push(item.studentResidentAddress);
      if (toggle.showStudentResidentCity)
        rowData.push(item.studentResidentCity);
      if (toggle.showStudentResidentCountry)
        rowData.push(item.studentResidentCountry);
      if (toggle.showStudentResidentState)
        rowData.push(item.studentResidentState);
      if (toggle.showStudentResidentZipCode)
        rowData.push(item.studentResidentZipCode);
      if (toggle.showIsSubmitted) rowData.push(item.isSubmitted);
      tableRows.push(rowData);
    });

    // Add table to the PDF
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Student Information Form Report", 14, 15);
    doc.save("student_information_report.pdf");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item, index) => {
        const rowData = {};
        if (toggle.showSerialNumber) rowData["S.no"] = index + 1;
        if (toggle.showCheckInCode) rowData["Check-In Code"] = item.checkInCode;
        if (toggle.showEnrollmentType)
          rowData["Enrollment Type"] = item.enrollmentType;
        if (toggle.showSchoolYear) rowData["School Year"] = item.schoolYear;
        if (toggle.showGradeLevel) rowData["Grade Level"] = item.gradeLevel;
        if (toggle.showGender) rowData["Gender"] = item.gender;
        if (toggle.showPrimaryTeacher)
          rowData["Primary Teacher"] = item.primaryTeacher;
        if (toggle.showIepDocumentsStudHave)
          rowData["IEP Documents"] = item.iepDocumentsStudHave;
        if (toggle.showGraduationParticipation)
          rowData["Graduation Participation"] = item.graduationParticipation;
        if (toggle.showDualEnrollment)
          rowData["Dual Enrollment"] = item.dualEnrollment;
        if (toggle.showNameOfProgram)
          rowData["Name of Program"] = item.nameOfProgram;
        if (toggle.showCity) rowData["City"] = item.city;
        if (toggle.showState) rowData["State"] = item.state;
        if (toggle.showStudentFirstName)
          rowData["First Name"] = item.studentFirstName;
        if (toggle.showStudentMiddleName)
          rowData["Middle Name"] = item.studentMiddleName;
        if (toggle.showStudentLastName)
          rowData["Last Name"] = item.studentLastName;
        if (toggle.showDateOfBirth) rowData["Date of Birth"] = item.dateOfBirth;
        if (toggle.showSocialSecurityNo)
          rowData["Social Security No."] = item.socialSecurityNo;
        if (toggle.showStudentResidentAddress)
          rowData["Resident Address"] = item.studentResidentAddress;
        if (toggle.showStudentResidentCity)
          rowData["Resident City"] = item.studentResidentCity;
        if (toggle.showStudentResidentCountry)
          rowData["Resident Country"] = item.studentResidentCountry;
        if (toggle.showStudentResidentState)
          rowData["Resident State"] = item.studentResidentState;
        if (toggle.showStudentResidentZipCode)
          rowData["Resident Zip Code"] = item.studentResidentZipCode;
        if (toggle.showIsSubmitted) rowData["Submitted"] = item.isSubmitted;
        return rowData;
      })
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Information");
    XLSX.writeFile(workbook, "student_information_report.xlsx");
  };

  return (
    <div className="container-fluid">
      <h4 className="m-3">Student Information Forms</h4>
      <div className="row">
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search by student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-sm-9 text-right">
          <button className="btn btn-sm btn-primary" onClick={showAllColumns}>
            Show All Columns
          </button>
          <button className="btn btn-sm btn-success" onClick={downloadPDF}>
            Export to PDF
          </button>
          <button className="btn btn-sm btn-pink" onClick={downloadExcel}>
            Export to Excel
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
              {toggle.showEnrollmentType && (
                <th>
                  <div className="d-flex align-items-center">
                    Enrollment Type
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showEnrollmentType: false })
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
              {toggle.showSchoolYear && (
                <th>
                  <div className="d-flex align-items-center">
                    School Year
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showSchoolYear: false })
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
              {toggle.showGradeLevel && (
                <th>
                  <div className="d-flex align-items-center">
                    Grade Level
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showGradeLevel: false })
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
              {toggle.showPrimaryTeacher && (
                <th>
                  <div className="d-flex align-items-center">
                    Primary Teacher
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showPrimaryTeacher: false })
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
              {toggle.showIepDocumentsStudHave && (
                <th>
                  <div className="d-flex align-items-center">
                    IEP Documents
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({
                          ...toggle,
                          showIepDocumentsStudHave: false,
                        })
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
              {toggle.showGraduationParticipation && (
                <th>
                  <div className="d-flex align-items-center">
                    Graduation Participation
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({
                          ...toggle,
                          showGraduationParticipation: false,
                        })
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
              {toggle.showDualEnrollment && (
                <th>
                  <div className="d-flex align-items-center">
                    Dual Enrollment
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showDualEnrollment: false })
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
              {toggle.showNameOfProgram && (
                <th>
                  <div className="d-flex align-items-center">
                    Name of Program
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showNameOfProgram: false })
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
              {toggle.showCity && (
                <th>
                  <div className="d-flex align-items-center">
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
                  </div>
                </th>
              )}
              {toggle.showState && (
                <th>
                  <div className="d-flex align-items-center">
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
                  </div>
                </th>
              )}
              {toggle.showStudentFirstName && (
                <th>
                  <div className="d-flex align-items-center">
                    First Name
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showStudentFirstName: false })
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
              {toggle.showStudentMiddleName && (
                <th>
                  <div className="d-flex align-items-center">
                    Middle Name
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showStudentMiddleName: false })
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
              {toggle.showStudentLastName && (
                <th>
                  <div className="d-flex align-items-center">
                    Last Name
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showStudentLastName: false })
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
              {toggle.showDateOfBirth && (
                <th>
                  <div className="d-flex align-items-center">
                    Date of Birth
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showDateOfBirth: false })
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
              {toggle.showSocialSecurityNo && (
                <th>
                  <div className="d-flex align-items-center">
                    Social Security No.
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showSocialSecurityNo: false })
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
              {toggle.showStudentResidentAddress && (
                <th>
                  <div className="d-flex align-items-center">
                    Resident Address
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({
                          ...toggle,
                          showStudentResidentAddress: false,
                        })
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
              {toggle.showStudentResidentCity && (
                <th>
                  <div className="d-flex align-items-center">
                    Resident City
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({ ...toggle, showStudentResidentCity: false })
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
              {toggle.showStudentResidentCountry && (
                <th>
                  <div className="d-flex align-items-center">
                    Resident Country
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({
                          ...toggle,
                          showStudentResidentCountry: false,
                        })
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
              {toggle.showStudentResidentState && (
                <th>
                  <div className="d-flex align-items-center">
                    Resident State
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({
                          ...toggle,
                          showStudentResidentState: false,
                        })
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
              {toggle.showStudentResidentZipCode && (
                <th>
                  <div className="d-flex align-items-center">
                    Resident Zip Code
                    <Link
                      className="ml-2 btn-sm p-0"
                      onClick={() =>
                        setToggle({
                          ...toggle,
                          showStudentResidentZipCode: false,
                        })
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
              {toggle.showIsSubmitted && (
                <th>
                  <div className="d-flex align-items-center">
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
                {toggle.showEnrollmentType && <td>{item.enrollmentType}</td>}
                {toggle.showSchoolYear && <td>{item.schoolYear}</td>}
                {toggle.showGradeLevel && <td>{item.gradeLevel}</td>}
                {toggle.showGender && <td>{item.gender}</td>}
                {toggle.showPrimaryTeacher && <td>{item.primaryTeacher}</td>}
                {toggle.showIepDocumentsStudHave && (
                  <td>{item.iepDocumentsStudHave}</td>
                )}
                {toggle.showGraduationParticipation && (
                  <td>{item.graduationParticipation}</td>
                )}
                {toggle.showDualEnrollment && <td>{item.dualEnrollment}</td>}
                {toggle.showNameOfProgram && <td>{item.nameOfProgram}</td>}
                {toggle.showCity && <td>{item.city}</td>}
                {toggle.showState && <td>{item.state}</td>}
                {toggle.showStudentFirstName && (
                  <td>{item.studentFirstName}</td>
                )}
                {toggle.showStudentMiddleName && (
                  <td>{item.studentMiddleName}</td>
                )}
                {toggle.showStudentLastName && <td>{item.studentLastName}</td>}
                {toggle.showDateOfBirth && <td>{item.dateOfBirth}</td>}
                {toggle.showSocialSecurityNo && (
                  <td>{item.socialSecurityNo}</td>
                )}
                {toggle.showStudentResidentAddress && (
                  <td>{item.studentResidentAddress}</td>
                )}
                {toggle.showStudentResidentCity && (
                  <td>{item.studentResidentCity}</td>
                )}
                {toggle.showStudentResidentCountry && (
                  <td>{item.studentResidentCountry}</td>
                )}
                {toggle.showStudentResidentState && (
                  <td>{item.studentResidentState}</td>
                )}
                {toggle.showStudentResidentZipCode && (
                  <td>{item.studentResidentZipCode}</td>
                )}
                {toggle.showIsSubmitted && <td>{item.isSubmitted}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
