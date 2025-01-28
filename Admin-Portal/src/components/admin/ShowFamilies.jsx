import React, { useEffect, useState } from "react";

export default function ShowFamilies({ handleDataUpdate }) {
  const [data, setData] = useState([]);
  const [currentFamily, setCurrentFamily] = useState(null);
  const [search, setSearch] = useState("");

  const handleRowClick = (family) => {
    setCurrentFamily(family);
    handleDataUpdate(family);
  };

  const fetchFamilyData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8091/api/families/getAllFamilies"
      );
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFamilyData();
  }, []);

  const filteredData = data.filter((family) =>
    family.familyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <table
            id="#table_id"
            className="table-sm"
            cellSpacing="0"
            width="100%"
          >
            <thead>
              <tr>
                <th>
                  <input
                    type="search"
                    className="form-control form-control-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((family, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(family)}
                    className={
                      currentFamily
                        ? currentFamily.checkInCode === family.checkInCode
                          ? "selected"
                          : ""
                        : ""
                    }
                    style={{ cursor: "pointer", border: "10px" }}
                  >
                    <td scope="row" className="A" style={{ fontSize: "small" }}>
                      {family.familyName}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <h6 className="text-danger">No Families Found...</h6>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
