import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function SchedulingMeals({ roomId, date, getCount }) {
  const [scheduledMeals, setScheduledMeals] = useState(null);
  const [unScheduledMeals, setUnScheduledMeals] = useState(null);
  const [category, setCategory] = useState("");

  const getScheduledMeals = () => {
    axios
      .get(
        `http://localhost:8091/api/schedule-room-meals/getScheduleMealDetails/${roomId}/${date}`
      )
      .then((response) => {
        if (response.data) {
          setScheduledMeals(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getUnScheduledMeals = () => {
    axios
      .get(
        `http://localhost:8091/api/schedule-room-meals/getUnScheduleMealDetails/${roomId}/${date}`
      )
      .then((response) => {
        if (response.data) {
          setUnScheduledMeals(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getScheduledMeals(), [date, roomId]);
  useEffect(() => getUnScheduledMeals(), [date, roomId]);

  const handleScheduledMealDelete = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/schedule-room-meals/deleteScheduleRoomMeals/${id}`
      )
      .then((response) => {
        if (response) {
          getScheduledMeals();
          getUnScheduledMeals();
          getCount();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddScheduleMeal = (mealId) => {
    axios
      .post(
        `http://localhost:8091/api/schedule-room-meals/addScheduleRoomMeals`,
        {
          roomId,
          mealId,
          mealDate: date,
        }
      )
      .then((response) => {
        if (response.data) {
          getScheduledMeals();
          getUnScheduledMeals();
          getCount();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div
        className="modal fade"
        id="schedulingMeals"
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
              <p className="heading lead">Scheduled Meals Data</p>

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
                className="modal-body pr-5"
                style={{ overflowY: "auto", height: "500px" }}
              >
                <div className="row">
                  <div className="col-sm-7">
                    <div className="card mdb-color darken-3 p-0 pt-2 pl-3 ml-2 mr-0 text-light">
                      <h5>Scheduled Meals</h5>
                    </div>
                  </div>
                  <div className="col-sm-5 mt-0 mb-3 text-right">
                    <select
                      className="form-control"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{ height: "35px" }}
                    >
                      <option value={""}>-- Select Category --</option>
                      <option value="All">All</option>
                      <option value="Art">Art</option>
                      <option value="Art & Cognitive Development">
                        Art & Cognitive Development
                      </option>
                      <option value="Circle Time">Circle Time</option>
                      <option value="Cognitive Development">
                        Cognitive Development
                      </option>
                      <option value="Creative Expression">
                        Creative Expression
                      </option>
                      <option value="Fine Motor">Fine Motor</option>
                      <option value="Gross Motor">Gross Motor</option>
                      <option value="Language & Lit.">Language & Lit.</option>
                      <option value="Language Development">
                        Language Development
                      </option>
                      <option value="Math/Numbers">Math/Numbers</option>
                      <option value="Math/Numbers & Math/Science">
                        Math/Numbers & Math/Science
                      </option>
                      <option value="Math/Science">Math/Science</option>
                      <option value="Music & Movement">Music & Movement</option>
                      <option value="Outdoor Exploration">
                        Outdoor Exploration
                      </option>
                      <option value="Physical">Physical</option>
                      <option value="Reading/Phonics">Reading/Phonics</option>
                      <option value="Religion">Religion</option>
                      <option value="Science">Science</option>
                      <option value="Sensory Exploration">
                        Sensory Exploration
                      </option>
                      <option value="September Lesson Plans">
                        September Lesson Plans
                      </option>
                      <option value="Sign Language">Sign Language</option>
                      <option value="Social/Emotional">Social/Emotional</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Special Activity">Special Activity</option>
                      <option value="Writing">Writing</option>
                    </select>
                  </div>
                </div>
                <div className="">
                  <div>
                    {scheduledMeals && scheduledMeals.length > 0 && (
                      <div className="row p-3 pl-4">
                        <div className="col-sm-3">{"Category"}</div>
                        <div className="col-sm-4">{"Meal Name"}</div>
                        <div className="col-sm-4">{"Description"}</div>
                        <div className="col-sm-1"></div>
                      </div>
                    )}
                  </div>
                  {scheduledMeals && scheduledMeals.length > 0 ? (
                    scheduledMeals.map((item, index) => (
                      <div
                        className="card p-3 m-2"
                        style={{ width: "100%" }}
                        key={index}
                      >
                        <div className="row">
                          <div className="col-sm-3">{item.mealType}</div>
                          <div className="col-sm-4">{item.mealName}</div>
                          <div className="col-sm-4">{item.description}</div>
                          <div className="col-sm-1">
                            <div
                              className="col-sm-1"
                              onClick={() =>
                                handleScheduledMealDelete(item.scheduleId)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <i className="fas fa-trash fa-1/2x text-danger"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-danger ml-3 mt-3">No data found</h5>
                  )}
                </div>
                <hr className="bg-secondary" />

                <div className="card mdb-color darken-3 p-0 pt-2 pl-3 ml-2 mr-0 text-light">
                  <h5>Unscheduled Meals</h5>
                </div>
                <div className="">
                  {unScheduledMeals && unScheduledMeals.length > 0 && (
                    <div className="row p-3 pb-0 pl-4">
                      <div className="col-sm-3">{"Category"}</div>
                      <div className="col-sm-4">{"Lesson Name"}</div>
                      <div className="col-sm-4">{"Description"}</div>
                    </div>
                  )}
                  {unScheduledMeals && unScheduledMeals.length > 0 ? (
                    unScheduledMeals.map((item, index) => (
                      <div
                        className="card p-3 m-2 mt-0"
                        style={{ width: "100%" }}
                        key={index}
                      >
                        <div className="row">
                          <div className="col-sm-3">{item.mealType}</div>
                          <div className="col-sm-4">{item.mealName}</div>
                          <div className="col-sm-4">{item.description}</div>
                          <div className="col-sm-1">
                            <div
                              className="col-sm-1"
                              onClick={() => handleAddScheduleMeal(item.mealId)}
                              style={{ cursor: "pointer" }}
                            >
                              <i className="fas fa-plus fa-1/2x text-success"></i>
                            </div>
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
