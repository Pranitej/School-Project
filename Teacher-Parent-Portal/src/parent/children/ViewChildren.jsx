import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { data } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewChildren() {
  const checkInCode = useContext(data).parentData.checkInCode;
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);

  const getChildrenByCheckInCode = () => {
    axios
      .get(
        `http://localhost:8091/api/children/getChildrenByCheckInCode/${checkInCode}`
      )
      .then((response) => {
        if (response.data) {
          setChildren(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getChildrenByCheckInCode(), [checkInCode]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-12 text-center">
          <h3>
            <b>View Children</b>
          </h3>
        </div>
      </div>
      <div className="card p-3 mt-4">
        <div className="row">
          {children.map((item, index) => (
            <div className="col-sm-4" key={index}>
              <div className="card shadow-lg border-dark mt-0">
                <div className="text-center m-3">
                  <img
                    className="img-fluid rounded-circle"
                    src={`http://localhost:8091/images/childrens/${item.childPic}`}
                    style={{ width: "100px", height: "100px" }}
                    alt="Child Picture"
                  />
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-sm mb-0">
                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td>:</td>
                          <td className="font-weight-bold m-0">
                            {` ${item.firstName} ${item.lastName} (${item.nickName})`}
                          </td>
                        </tr>
                        <tr>
                          <td>Class</td>
                          <td>:</td>
                          <td className="font-weight-bold m-0">
                            {item.studentClass}
                          </td>
                        </tr>
                        <tr>
                          <td>Status</td>
                          <td>:</td>
                          <td className="font-weight-bold m-0">
                            {item.status}
                          </td>
                        </tr>
                        <tr>
                          <td>Admission Date</td>
                          <td>:</td>
                          <td className="font-weight-bold m-0">
                            {item.admissionDate}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-12">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          navigate(`/parent/viewAttendance/${item.id}`)
                        }
                      >
                        Attendance
                      </button>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          navigate(`/parent/childActivities/${item.id}`)
                        }
                      >
                        Activity
                      </button>
                      <button
                        className="btn btn-sm btn-pink"
                        onClick={() =>
                          navigate(`/parent/viewMilestones/${item.id}`)
                        }
                      >
                        Milestones
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() =>
                          navigate(`/parent/childDocuments/${item.id}`)
                        }
                      >
                        Documents
                      </button>
                      <button
                        className="btn btn-sm btn-brown"
                        onClick={() =>
                          navigate(`/parent/childMessages/${item.id}`)
                        }
                      >
                        Messages
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
