import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ChildReservations({ childId, childData }) {
  const [childName, setChildName] = useState(
    `${childData.firstName} ${childData.lastName}`
  );
  const [className, setClassName] = useState("");
  const [allClasses, setAllClasses] = useState(null);
  const [roomNumber, setRoomNumber] = useState("");
  const [allRooms, setAllRooms] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [futureReservations, setFutureReservations] = useState(null);
  const [pastReservations, setPastReservations] = useState(null);

  const getCurrentDate = () => new Date().toISOString().slice(0, 10);

  const getPastReservationsByChildId = () => {
    axios
      .get(
        `http://localhost:8091/api/child-reservations/findByChildIdAndReservationDateBefore/${childId}/${getCurrentDate()}`
      )
      .then((response) => {
        if (response.data) {
          setPastReservations(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getAllCurrentAndFutureReservationsByChildId = () => {
    axios
      .get(
        `http://localhost:8091/api/child-reservations/findByChildIdAndReservationDateAfter/${childId}/${getCurrentDate()}`
      )
      .then((response) => {
        if (response.data) {
          setFutureReservations(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getAllClasses = () => {
    axios
      .get(`http://localhost:8091/api/classnames/getAllClassNames`)
      .then((response) => {
        if (response.data) {
          setAllClasses(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getAllRooms = () => {
    axios
      .get(`http://localhost:8091/api/rooms/getAllRooms`)
      .then((response) => {
        if (response.data) {
          setAllRooms(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddReservation = () => {
    axios
      .post(
        `http://localhost:8091/api/child-reservations/addChildReservation`,
        {
          childId,
          childName,
          className,
          reservationDate: date,
          startTime,
          endTime,
          roomId: roomNumber,
        }
      )
      .then((response) => {
        if (response.data) {
          setClassName("");
          setRoomNumber("");
          setDate("");
          setStartTime("");
          setEndTime("");
          alert("Reservation added...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setChildName(`${childData.firstName} ${childData.lastName}`);
  }, [childData]);

  useEffect(() => getAllClasses(), []);
  useEffect(() => getAllRooms(), []);
  useEffect(() => getAllCurrentAndFutureReservationsByChildId(), []);
  useEffect(() => getPastReservationsByChildId(), []);

  return (
    <div
      className="modal fade"
      id="childReservations"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg modal-notify modal-info"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading lead">Child Reservations</p>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" className="white-text">
                &times;
              </span>
            </button>
          </div>

          <form className="form-floating">
            <div className="modal-body p-0" style={{ height: "550px" }}>
              <div className="modal-c-tabs p-0" style={{ width: "100%" }}>
                <ul
                  className="nav md-tabs tabs-2 light-blue darken-3 text-center m-0"
                  role="tablist"
                  style={{ borderRadius: "0", backgroundColor: "brown" }}
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#panel1111"
                      role="tab"
                      onClick={() =>
                        getAllCurrentAndFutureReservationsByChildId()
                      }
                    >
                      Active Reservations
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#panel2222"
                      role="tab"
                      onClick={() => getPastReservationsByChildId()}
                    >
                      History
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#panel3333"
                      role="tab"
                    >
                      Add Reservation
                    </a>
                  </li>
                </ul>

                <div className="tab-content pt-0">
                  {/* Panel 1 */}
                  <div
                    className="tab-pane fade show active m-3 mt-0 text-dark"
                    id="panel1111"
                    role="tabpanel"
                  >
                    <div>
                      <div className="ml-3">
                        {futureReservations && futureReservations.length > 0 ? (
                          <div className="row">
                            <div className="col-sm-2">RoomID</div>
                            <div className="col-sm-3">ClassName</div>
                            <div className="col-sm-3">ReservationDate</div>
                            <div className="col-sm-2">StartTime</div>
                            <div className="col-sm-2">EndTime</div>
                          </div>
                        ) : (
                          <h3 className="text-danger">No Records Found...</h3>
                        )}
                      </div>
                      {futureReservations &&
                        futureReservations.map((item, index) => (
                          <div
                            className="card ml-0 p-3 m-2 mt-0"
                            style={{ width: "100%" }}
                            key={index}
                          >
                            <div className="row">
                              <div className="col-sm-2">{item.roomId}</div>
                              <div className="col-sm-3">{item.className}</div>
                              <div className="col-sm-3">
                                {item.reservationDate}
                              </div>
                              <div className="col-sm-2">{item.startTime}</div>
                              <div className="col-sm-2">{item.endTime}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/*Panel 2*/}
                  <div className="tab-pane fade" id="panel2222" role="tabpanel">
                    <div
                      className="tab-pane fade show m-3 mt-0"
                      id="panel2222"
                      role="tabpanel"
                    >
                      <div className="text-dark">
                        <div className="ml-3">
                          {pastReservations && pastReservations.length > 0 ? (
                            <div className="row">
                              <div className="col-sm-2">RoomID</div>
                              <div className="col-sm-3">ClassName</div>
                              <div className="col-sm-3">ReservationDate</div>
                              <div className="col-sm-2">StartTime</div>
                              <div className="col-sm-2">EndTime</div>
                            </div>
                          ) : (
                            <h3 className="text-danger">No Records Found...</h3>
                          )}
                        </div>
                        {pastReservations &&
                          pastReservations.map((item, index) => (
                            <div
                              className="card ml-0 p-3 m-2 mt-0"
                              style={{ width: "100%" }}
                              key={index}
                            >
                              <div className="row">
                                <div className="col-sm-2">{item.roomId}</div>
                                <div className="col-sm-3">{item.className}</div>
                                <div className="col-sm-3">
                                  {item.reservationDate}
                                </div>
                                <div className="col-sm-2">{item.startTime}</div>
                                <div className="col-sm-2">{item.endTime}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Panel 3 */}
                  <div className="tab-pane fade" id="panel3333" role="tabpanel">
                    <div
                      className="tab-pane fade show m-3 mt-0"
                      id="panel3333"
                      role="tabpanel"
                    >
                      <div className="form-group">
                        <label htmlFor="childName">Child Name:</label>
                        <input
                          type="text"
                          id="childName"
                          value={childName + ` (${childData.nickName})`}
                          disabled
                          className="form-control"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="className">Class Name:</label>
                        <select
                          className="form-control"
                          id="className"
                          value={className}
                          onChange={(e) => setClassName(e.target.value)}
                          style={{ height: "35px" }}
                        >
                          <option value="">-- Select Class --</option>
                          {allClasses &&
                            allClasses.map((item, index) => (
                              <option key={index} value={item.className}>
                                {item.className}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="mt-3">
                        <label htmlFor="roomNumber">Room Number:</label>
                        <select
                          className="form-control"
                          id="roomNumber"
                          value={roomNumber}
                          onChange={(e) => setRoomNumber(e.target.value)}
                          style={{ height: "35px" }}
                        >
                          <option value="">-- Select Room --</option>
                          {allRooms &&
                            allRooms.map((item, index) => (
                              <option key={index} value={item.roomId}>
                                {`${index + 1}. ${item.roomName}`}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="mt-3 form-group">
                        <label htmlFor="date">Reservation date:</label>
                        <input
                          type="date"
                          id="date"
                          className="form-control"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                      <div className="mt-3">
                        <div className="row mb-0">
                          <div className="col-sm-4">
                            <label htmlFor="startTime">Start Time:</label>
                            <input
                              type="time"
                              id="startTime"
                              className="form-control"
                              value={startTime}
                              onChange={(e) => setStartTime(e.target.value)}
                            />
                          </div>
                          <div className="col-sm-4">
                            <label htmlFor="endTime">End Time:</label>
                            <input
                              type="time"
                              id="endTime"
                              className="form-control"
                              value={endTime}
                              onChange={(e) => setEndTime(e.target.value)}
                            />
                          </div>
                          <div className="col-sm-4 mt-2 text-right">
                            <button
                              type="button"
                              className="btn btn-sm pt-2 pb-2 btn-info waves-effect mt-4"
                              onClick={() => handleAddReservation()}
                            >
                              Add Reservation
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <div className="mt-4 text-right"></div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm btn-outline-danger waves-effect mr-3"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
