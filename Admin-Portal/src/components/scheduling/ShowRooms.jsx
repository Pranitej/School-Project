import React, { useEffect, useState } from "react";
import EditRoom from "./EditRoom";

export default function ShowRooms({
  handleDataUpdate,
  showAllRooms,
  setShowAllRooms,
}) {
  const [data, setData] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");

  const handleRowClick = (room) => {
    setCurrentRoom(room);
    handleDataUpdate(room);
    setShowAllRooms(false);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const fetchRoomData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8091/api/rooms/getAllRoomsByStatus/${status}`
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
    fetchRoomData();
  }, [status]);

  useEffect(() => {
    if (showAllRooms) {
      setCurrentRoom(null);
    }
  }, [showAllRooms]);

  const filteredData = data.filter((room) =>
    room.roomName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="card m-1" style={{ borderRight: "10px" }}>
        <div className="card-body">
          <table className="table-sm" cellSpacing="0" width="100%">
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
                    className="form-control form-control-sm mb-2"
                    value={status}
                    onChange={(e) => handleStatus(e)}
                    style={{ height: "35px" }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <button
                    className="btn btn-sm btn-primary ml-0"
                    style={{ width: "100%" }}
                    onClick={() => {
                      !showAllRooms && setShowAllRooms(!showAllRooms);
                      setCurrentRoom(null);
                    }}
                  >
                    All Rooms
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((room, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(room)}
                    className={
                      currentRoom && currentRoom.roomId === room.roomId
                        ? "selected"
                        : ""
                    }
                  >
                    <td
                      scope="row"
                      className="A"
                      style={{
                        fontSize: "small",
                        position: "relative",
                        cursor: "pointer",
                      }}
                    >
                      {room.roomName}
                      <a
                        className="ml-5 text-right pr-2"
                        style={{
                          position: "absolute",
                          right: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                        data-toggle="modal"
                        data-target="#editRoom"
                      >
                        <img src="/icons/edit-icon.png" width={"20px"} />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <h6 className="text-danger">No Rooms Found...</h6>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {currentRoom && (
        <EditRoom id={currentRoom.roomId} fetchRoomData={fetchRoomData} />
      )}
    </div>
  );
}
