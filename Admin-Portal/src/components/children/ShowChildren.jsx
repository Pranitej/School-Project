import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShowChildren({ currentChild, setCurrentChild }) {
  const [allChildren, setAllChildren] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredChildren = allChildren.filter((child) =>
    `${child.firstName} ${child.lastName}`
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
                      // onChange={(e) => handleStatus(e)}
                      style={{ height: "35px" }}
                    >
                      <option value="All">All</option>
                      <option value="EveryDay">EveryDay</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Substitute">Substitute</option>
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
                        setCurrentChild(null);
                      }}
                    >
                      Show All Children
                    </button>
                  </td>
                </tr>

                {filteredChildren.length > 0 ? (
                  filteredChildren.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => setCurrentChild(item)}
                      style={{ cursor: "pointer" }}
                      className={
                        currentChild && currentChild.id === item.id
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
                      <h6 className="text-danger">No Children Found...</h6>
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
