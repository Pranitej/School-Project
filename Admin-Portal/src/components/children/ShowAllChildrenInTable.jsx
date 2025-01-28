import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShowAllChildrenInTable() {
  const [allChildren, setAllChildren] = useState(null);

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

  useEffect(() => getAllChildren(), []);

  return (
    <div className="card p-2 mt-3 mr-2">
      {allChildren && allChildren.length > 0 ? (
        <div className="mt-2">
          <h3 className="text-danger">Children List:</h3>
          <div className="table-responsive mt-3">
            <table className="table table-sm mb-0" id="child_table_id">
              <thead className="table-dark">
                <tr>
                  <th>Photo</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Nick Name</th>
                  <th>Gender</th>
                  <th>Birthday</th>
                  <th>Class</th>
                  <th>Attending</th>
                  <th>Schedule</th>
                  <th>Status</th>
                  <th>Admitted On</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {allChildren.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <img
                        className="img-fluid rounded-circle"
                        src={`http://localhost:8091/images/childrens/${row.childPic}`}
                        style={{ width: "40px", height: "40px" }}
                      />
                    </td>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.nickName}</td>
                    <td>{row.gender}</td>
                    <td>{row.birthDay}</td>
                    <td>{row.studentClass}</td>
                    <td>{row.daysAttending}</td>
                    <td>{row.schedule}</td>
                    <td>{row.status}</td>
                    <td>{row.admissionDate}</td>
                    {/* <td>
                    <div className="gap-3">
                      <a
                        className="ml-3"
                        // style={{
                        //   position: "absolute",
                        //   right: 0,
                        //   top: "50%",
                        //   transform: "translateY(-50%)",
                        // }}
                        data-toggle="modal"
                        data-target={"#editEmployee" + row.empId}
                        onClick={() => getEmployeeData(row.empId)}
                      >
                        <img src="/icons/edit-icon.png" width={"20px"} />
                      </a>
                      <i
                        className="fas fa-trash fa-1/2x text-danger ml-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDelete(row.empId);
                        }}
                      ></i>
                    </div>
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <hr className="mt-0" />
          </div>
        </div>
      ) : (
        <h3 className="text-danger">No records found...</h3>
      )}
    </div>
  );
}
