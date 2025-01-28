import React, { useState } from "react";
import ShowRooms from "./ShowRooms";
import Addroom from "./AddRoom";
import ShowRoomDetails from "./ShowRoomDetails";
import ShowAllRooms from "./ShowAllRooms";

export default function SchedulingDashboard() {
  const [roomObj, setRoomObj] = useState(null);
  const [addRoomCounter, setAddRoomCounter] = useState(0); // State variable to trigger re-render
  const [showAllRooms, setShowAllRooms] = useState(true);

  const handleDataUpdate = (data) => {
    setRoomObj(data);
  };

  const handleAddRoom = () => {
    setAddRoomCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <div className="bg-white">
      <br></br>
      <div className="mt-5">
        <div className="row">
          <div className="col-sm-2 m-0 p-0 overflow-auto">
            <div className="row">
              <div className="col-sm-7">
                <h5 className="text-primary ml-5 mt-2">Rooms</h5>
              </div>
              <div className="col-sm-4">
                <button
                  type="button"
                  className="btn btn-sm btn-dark btn-rounded"
                  data-toggle="modal"
                  data-target="#addRoom"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <ShowRooms
              key={addRoomCounter}
              roomObj={roomObj}
              handleDataUpdate={handleDataUpdate}
              showAllRooms={showAllRooms}
              setShowAllRooms={setShowAllRooms}
            />
          </div>
          <div className="col-sm-10 overflow-auto p-0">
            {showAllRooms ? (
              <ShowAllRooms />
            ) : (
              <ShowRoomDetails
                roomObj={roomObj}
                handleDataUpdate={handleDataUpdate}
              />
            )}
          </div>
        </div>
        <Addroom handleAddRoom={handleAddRoom} />
      </div>
    </div>
  );
}
