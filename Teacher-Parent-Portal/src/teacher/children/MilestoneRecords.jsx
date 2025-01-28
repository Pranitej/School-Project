import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { data } from "../../App";

export default function MilestoneRecords() {
  const employee = useContext(data);
  const [records, setRecords] = useState([]);
  const [currentChildId, setCurrentChildId] = useState(-1);
  const [currentChild, setCurrentChild] = useState(null);
  const [allChildren, setAllChildren] = useState([]);

  const getAllChildren = () => {
    axios
      .get(`http://localhost:8091/api/children/getAllChildren`)
      .then((response) => {
        if (response.data) {
          setAllChildren(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getMilestoneRecordsByChildId = () => {
    currentChildId > -1 &&
      axios
        .get(
          `http://localhost:8091/api/student-progress/getStudentProgressByChildIdAndEmpId/${currentChildId}/${employee.employeeData.empId}`
        )
        .then((response) => {
          if (response.data) {
            setRecords(response.data);
          } else {
            alert("Something went wrong...");
          }
        })
        .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (currentChildId > -1) {
      for (let index = 0; index < allChildren.length; index++) {
        if (allChildren[index].id == currentChildId) {
          setCurrentChild(allChildren[index]);
          break;
        }
      }
    }
  }, [currentChildId]);

  useEffect(() => getAllChildren(), []);
  useEffect(() => getMilestoneRecordsByChildId(), [currentChildId]);

  return (
    <div className="container mt-4">
      <div className="col-sm-12 text-center">
        <h3>
          <b>Milestone Records</b>
        </h3>
      </div>
      <div className="card mt-4 p-3">
        <div className="row">
          <div className="col-sm-4">
            <div className="card p-2 mt-2" style={{ display: "flex" }}>
              <div className="item pl-3 pr-3">
                {currentChild ? (
                  <>
                    <img
                      id="childPic"
                      className="img-fluid rounded-circle"
                      src={`http://localhost:8091/images/childrens/${currentChild.childPic}`}
                      alt="ChildPicture"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <label htmlFor="childPic" className="ml-3 text-dark mt-2">
                      <b>{`${currentChild.firstName} ${currentChild.lastName}`}</b>
                    </label>
                  </>
                ) : (
                  <h6 className="pt-1 text-danger">
                    <b>No Child Selected...</b>
                  </h6>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <label className="small">Child</label>
            <select
              className="form-control form-control-sm"
              value={currentChildId}
              onChange={(e) => setCurrentChildId(e.target.value)}
            >
              <option value={-1} disabled>
                Select Child
              </option>
              {allChildren &&
                allChildren.map((item, index) => (
                  <option value={item.id} key={index}>
                    {`${item.firstName} ${item.lastName} (${item.nickName})`}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12">
            <div className="table-responsive mt-3">
              {allChildren && records && records.length > 0 ? (
                <>
                  <table className="table table-sm mb-0" id="child_table_id">
                    <thead className="table-dark">
                      <tr>
                        <th>Date</th>
                        <th>Class</th>
                        <th>Exam</th>
                        <th>Subject</th>
                        <th>Total</th>
                        <th>Scored</th>
                        <th>Grade</th>
                        <th>Result</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((item, index) => (
                        <tr key={index}>
                          <td>{item.progressDate}</td>
                          <td>{item.className}</td>
                          <td>{item.examName}</td>
                          <td>{item.subjectName}</td>
                          <td>{item.totalMarks}</td>
                          <td>{item.marksScored}</td>
                          <td>{item.grade}</td>
                          <td>{item.result}</td>
                          <td>{item.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <hr className="mt-0" />
                </>
              ) : (
                <h4 className="text-danger mt-3">No records found...</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
