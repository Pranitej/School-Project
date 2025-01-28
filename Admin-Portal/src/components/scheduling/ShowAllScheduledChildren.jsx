import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShowAllScheduledChildren({ roomId, date }) {
  const [scheduledChildren, setScheduledChildren] = useState([]);

  const getScheduledChildren = () => {
    axios
      .get(
        `http://localhost:8091/api/child-schedules/getAllChildSchedulesByRoomIdAndDate/${roomId}/${date}`
      )
      .then((response) => {
        if (response.data) {
          setScheduledChildren(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getScheduledChildren(), [date, roomId]);

  return (
    <div>
      <div
        className="modal fade"
        id="scheduledChildren"
        tabindex="-1"
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
              <p className="heading lead">Scheduled Children</p>

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
              <div className="modal-body">
                <div className="child-list">
                  {scheduledChildren &&
                    scheduledChildren.map((child, index) => (
                      <div className="row ml-1 mr-3 child-item" key={index}>
                        <div
                          className="card p-3 bg-warning"
                          style={{ width: "100%", cursor: "pointer" }}
                        >
                          <h1>hello</h1>
                          {child.childId}
                          {/* <div className="row align-items-center">
                            <div className="col-sm-2">
                              <img
                                src={`http://localhost:8091/images/childrens/${child.childPic}`}
                                alt="children"
                                width={"50px"}
                                onError={(e) => {
                                  e.target.src =
                                    "https://via.placeholder.com/50";
                                }}
                              />
                            </div>
                            <div className="col-sm-7 mt-2">
                              <p>{`${child.firstName} ${child.lastName}`}</p>
                            </div>
                            <div className="col-sm-3 mt-2">
                              <p>{child.status}</p>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <a
                  type="button"
                  className="btn btn-outline-danger waves-effect"
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
