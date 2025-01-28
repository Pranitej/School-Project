import React, { useState } from "react";

export default function ShowEmployees({
  currentEmployee,
  setCurrentEmployee,
  setStatus,
  allEmployees,
  status,
}) {
  const [search, setSearch] = useState("");

  const filteredEmployees =
    allEmployees &&
    allEmployees.filter((employee) =>
      `${employee.firstName} ${employee.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div>
      <div className="table-list-search">
        <div className="card">
          <div className="card-body">
            <table
              className="table table-sm"
              id="emp1"
              cellSpacing="0"
              width="100%"
            >
              <thead>
                <tr>
                  <th>
                    <input
                      type="search"
                      className="form-control form-control-sm mb-2"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search"
                    />
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                      style={{ height: "35px" }}
                    >
                      <option value="All">All</option>
                      <option value="Active">Active</option>
                      <option value="Substitute">Substitute</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => {
                        setCurrentEmployee(null);
                      }}
                    >
                      Show All Employees
                    </button>
                  </td>
                </tr>
                {filteredEmployees && filteredEmployees.length !== 0 ? (
                  filteredEmployees.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => setCurrentEmployee(item)}
                      style={{ cursor: "pointer" }}
                      className={
                        currentEmployee && currentEmployee.empId === item.empId
                          ? "selected"
                          : ""
                      }
                    >
                      <td
                        scope="row"
                        className="A"
                        style={{ fontSize: "small" }}
                      >
                        {item.firstName + " " + item.lastName}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <h6 className="text-danger">No Employees Found...</h6>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
