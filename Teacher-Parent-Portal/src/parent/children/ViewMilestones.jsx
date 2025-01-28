import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewMilestones() {
  const { childId } = useParams();
  const [records, setRecords] = useState([]);
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
    axios
      .get(`http://localhost:8091/api/student-progress/child/${childId}`)
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
    for (let index = 0; index < allChildren.length; index++) {
      if (allChildren[index].id == childId) {
        setCurrentChild(allChildren[index]);
        break;
      }
    }
  }, [childId, records, allChildren]);

  useEffect(() => getAllChildren(), []);
  useEffect(() => getMilestoneRecordsByChildId(), [childId]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-12 text-center">
          <h3>
            <b>Milestone Records</b>
          </h3>
        </div>
      </div>
      {currentChild && records.length !== 0 ? (
        <div className="card p-4">
          <div className="row">
            <div className="col-md-6">
              <div className="card p-2 border-primary mt-0">
                <b style={{ fontWeight: "400" }}>
                  Student Name:
                  <span className="font-weight-bold">
                    {` ${currentChild.firstName} ${currentChild.lastName} (${currentChild.nickName})`}
                  </span>
                </b>
              </div>
            </div>
          </div>
          {records.map((item, index) => (
            <div className="card border-primary p-3">
              <div className="row" key={index}>
                <div className="col-sm-12">
                  <p className="m-0">
                    Class Name:
                    <b style={{ fontWeight: "500" }}>{` ${item.className}`}</b>
                  </p>
                  <p className="m-0">
                    Academic Year:
                    <b
                      style={{ fontWeight: "500" }}
                    >{` ${item.academicYear}`}</b>
                  </p>
                  <p className="m-0">
                    Semester:
                    <b style={{ fontWeight: "500" }}>{` ${item.semister}`}</b>
                  </p>
                </div>
                <div className="table-responsive mt-3">
                  <table className="table table-sm mb-0">
                    <thead className="table-primary">
                      <tr>
                        <th>Subject Name</th>
                        <th>Grade Letter</th>
                        <th>Grade Number</th>
                        <th>Progress Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.progressRecords.map((progress, index) => (
                        <tr key={index}>
                          <td>{progress.subjectName}</td>
                          <td>{progress.gradeLetter}</td>
                          <td>{progress.gradeNumber}</td>
                          <td>{progress.progressDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          <div className="col-sm-12">
            <div className="card p-4">
              <span className="text-danger">No records found...</span>
            </div>
          </div>
        </div>
      )}
      <div className="row p-5 m-5"></div>
    </div>
  );
}
