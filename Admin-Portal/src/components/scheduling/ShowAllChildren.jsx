import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowAllScheduledChildren from "./ShowAllScheduledChildren";

export default function ShowAllChildren({
  roomId,
  date,
  getAllRooms,
  getCount,
}) {
  const [allChildren, setAllChildren] = useState(null);
  const [selectedChildren, setSelectedChildren] = useState([]);

  useEffect(() => {
    const getAllChildren = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8091/api/children/getAllChildren"
        );
        if (response.data) {
          setAllChildren(response.data);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching children data:", error);
      }
    };

    getAllChildren();
  }, []);

  const handleAddChildren = () => {
    if (selectedChildren.length === 0) {
      alert("Please select at least one child to add.");
      return;
    }

    let selectedChildrenData = [];

    selectedChildren.forEach((child) => {
      selectedChildrenData.push({
        childId: child.id,
        roomId,
        scheduleDate: date,
        scheduleId: 0,
      });
    });

    axios
      .post(
        "http://localhost:8091/api/child-schedules/createSchedules/batch",
        selectedChildrenData
      )
      .then((response) => {
        if (response.data) {
          setSelectedChildren([]);
          getAllRooms();
          getCount();
          alert("Children  added to the schedule successfully!");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleClick = (child) => {
    let count = 0;
    selectedChildren.forEach((item) => {
      if (item.id === child.id) count++;
    });
    if (count === 0) {
      setSelectedChildren([...selectedChildren, child]);
    } else {
      setSelectedChildren(
        selectedChildren.filter((item) => item.id !== child.id)
      );
    }
  };

  const checkChildExist = (child) => {
    let count = 0;
    selectedChildren.forEach((item) => {
      if (item.id === child.id) count++;
    });
    return count > 0 ? true : false;
  };

  return (
    <div
      className="modal fade"
      id="showChildren"
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
            <p className="heading lead">Displaying Children</p>
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

          <div className="modal-body">
            <div className="row mt-0 mb-2">
              <div className="col-sm-12 ">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-toggle="modal"
                  data-target="#scheduledChildren"
                >
                  View Scheduled Children
                </button>
              </div>
            </div>
            <div className="child-list">
              {allChildren &&
                allChildren.map((child, index) => (
                  <div className="row ml-1 mr-3 child-item mt-2" key={index}>
                    {checkChildExist(child) ? (
                      <div
                        className="card p-3 bg-warning"
                        style={{ width: "100%", cursor: "pointer" }}
                        onClick={() => {
                          handleClick(child);
                        }}
                      >
                        <div className="row align-items-center">
                          <div className="col-sm-2">
                            <img
                              src={`http://localhost:8091/images/childrens/${child.childPic}`}
                              alt="children"
                              width={"50px"}
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/50";
                              }}
                            />
                          </div>
                          <div className="col-sm-7 mt-2">
                            <p>{`${child.firstName} ${child.lastName}`}</p>
                          </div>
                          <div className="col-sm-3 mt-2">
                            <p>{child.status}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="card p-3"
                        style={{ width: "100%", cursor: "pointer" }}
                        onClick={() => {
                          handleClick(child);
                        }}
                      >
                        <div className="row align-items-center">
                          <div className="col-sm-2">
                            <img
                              src={`http://localhost:8091/images/childrens/${child.childPic}`}
                              alt="children"
                              width={"50px"}
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/50";
                              }}
                            />
                          </div>
                          <div className="col-sm-7 mt-2">
                            <p>{`${child.firstName} ${child.lastName}`}</p>
                          </div>
                          <div className="col-sm-3 mt-2">
                            <p>{child.status}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAddChildren}
            >
              Add Selected Children
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm waves-effect"
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ShowAllScheduledChildren roomId={roomId} date={date} />
    </div>
  );
}
