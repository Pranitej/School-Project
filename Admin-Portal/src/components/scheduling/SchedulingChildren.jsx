import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SchedulingChildren({
  roomId,
  date,
  getAllRooms,
  getCount,
  allRoomsCount,
}) {
  const [scheduledChildren, setScheduledChildren] = useState(null);
  const [unScheduledChildren, setUnScheduledChildren] = useState(null);

  const getScheduledChildren = () => {
    axios
      .get(
        `http://localhost:8091/api/child-schedules/getChildRoomSchedulesByRoomIdAndScheduleDate/${roomId}/${date}`
      )
      .then((response) => {
        if (response.data) {
          setScheduledChildren(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .then((error) => console.error(error));
  };

  const getUnScheduledChildren = () => {
    axios
      .get(
        `http://localhost:8091/api/child-schedules/getUnScheduleChildrensByScheduleDateAndRoomId/${date}/${roomId}`
      )
      .then((response) => {
        if (response.data) {
          setUnScheduledChildren(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .then((error) => console.error(error));
  };

  const handleAddChildSchedule = (childId) => {
    axios
      .post(`http://localhost:8091/api/child-schedules/addChildSchedule`, {
        roomId,
        childId,
        scheduleDate: date,
      })
      .then((response) => {
        if (response.data) {
          getScheduledChildren();
          getUnScheduledChildren();
          getAllRooms();
          getCount();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleScheduledChildDelete = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/child-schedules/deleteChildSchedule/${id}`
      )
      .then((response) => {
        if (response) {
          getScheduledChildren();
          getUnScheduledChildren();
          getAllRooms();
          getCount();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getScheduledChildren(), [roomId, date, allRoomsCount]);
  useEffect(() => getUnScheduledChildren(), [roomId, date, allRoomsCount]);

  return (
    <div>
      <div
        className="modal fade"
        id="schedulingChildren"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-notify modal-info"
          role="document"
        >
          {/* Content */}
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <p className="heading lead">Scheduling Children</p>

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
              {/* Body */}
              <div
                className="modal-body"
                style={{ overflowY: "auto", height: "500px" }}
              >
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card mdb-color darken-3 p-0 pt-2 pl-3 ml-2 mr-0 text-light">
                      <h5>Scheduled Children</h5>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div>
                    {scheduledChildren && scheduledChildren.length > 0 && (
                      <div className="row p-3 pb-0 pl-4">
                        <div className="col-sm-2">{"Image"}</div>
                        <div className="col-sm-9">{"Name"}</div>
                        {/* <div className="col-sm-4">{"Title"}</div> */}
                      </div>
                    )}
                  </div>
                  {scheduledChildren && scheduledChildren.length > 0 ? (
                    scheduledChildren.map((item, index) => (
                      <div
                        className="card p-3 m-2"
                        style={{ width: "100%" }}
                        key={index}
                      >
                        <div className="row">
                          <div className="col-sm-2">
                            <img
                              className="img-fluid rounded-circle"
                              src={`http://localhost:8091/images/childrens/${item.childPic}`}
                              style={{ width: "30px", height: "30px" }}
                            />
                          </div>
                          <div className="col-sm-9">{`${item.firstName} ${item.lastName}`}</div>
                          {/* <div className="col-sm-4">{item.jobTitle}</div> */}
                          <div
                            className="col-sm-1"
                            onClick={() =>
                              handleScheduledChildDelete(item.scheduleId)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fas fa-trash fa-1/2x text-danger"></i>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-danger ml-4 mt-3">No data found</h5>
                  )}
                </div>

                <hr className="bg-secondary" />

                <div className="card mdb-color darken-3 p-0 pt-2 pl-3 ml-2 mr-0 text-light">
                  <h5>Unscheduled Children</h5>
                </div>
                <div className="">
                  {unScheduledChildren && unScheduledChildren.length > 0 && (
                    <div className="row p-3 pb-0 pl-4">
                      <div className="col-sm-2">{"Image"}</div>
                      <div className="col-sm-9">{"Name"}</div>
                      {/* <div className="col-sm-4">{"Title"}</div> */}
                    </div>
                  )}
                  {unScheduledChildren && unScheduledChildren.length > 0 ? (
                    unScheduledChildren.map((item, index) => (
                      <div
                        className="card p-3 m-2 mt-0"
                        style={{ width: "100%" }}
                        key={index}
                      >
                        <div className="row">
                          <div className="col-sm-2">
                            <img
                              className="img-fluid rounded-circle"
                              src={`http://localhost:8091/images/childrens/${item.childPic}`}
                              style={{ width: "30px", height: "30px" }}
                            />
                          </div>
                          <div className="col-sm-9">{`${item.firstName} ${item.lastName}`}</div>
                          {/* <div className="col-sm-4">{item.jobTitle}</div> */}
                          <div
                            className="col-sm-1"
                            onClick={() => handleAddChildSchedule(item.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fas fa-plus fa-1/2x text-success"></i>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-danger ml-3 mt-3">No data found</h5>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <a
                  type="button"
                  className="btn btn-outline-danger waves-effect btn-sm"
                  data-dismiss="modal"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
          {/* Content */}
        </div>

        {/* Central Modal Large Info */}
      </div>
    </div>
  );
}
