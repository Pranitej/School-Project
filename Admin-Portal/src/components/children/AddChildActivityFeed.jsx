import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import AddEmployeeForChildActivity from "./AddEmployeeForChildActivity";

export default function AddChildActivityFeed({
  currentChild,
  getChildActivityFeeds,
  allEmployees,
}) {
  const [activityType, setActivityType] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("");
  const [file, setFile] = useState(null);
  const [mealType, setMealType] = useState("Food");
  const [whichMeal, setWhichMeal] = useState("");
  const [bottleType, setBottleType] = useState("");
  const [foodConsumed, setFoodConsumed] = useState("");
  const [bottleConsumed, setBottleConsumed] = useState("");
  const [mealNote, setMealNote] = useState("");
  const [employeeIds, setEmployeeIds] = useState("");
  const [displaySelectedEmployeeNames, setDisplaySelectedEmployeeNames] =
    useState("");

  const getEmployeeNameByEmployeeId = (empId) => {
    for (let index = 0; index < allEmployees.length; index++) {
      if (allEmployees[index].empId === empId) {
        return `${allEmployees[index].firstName} ${allEmployees[index].lastName}`;
      }
    }
  };

  const getDisplayEmployeeNamesByEmployeeIds = () => {
    if (allEmployees && employeeIds) {
      let empIdsArray = employeeIds.split(",").map(Number);
      let employeeNames = "";
      for (let index = 0; index < empIdsArray.length; index++) {
        if (empIdsArray.length === index + 1) {
          employeeNames += getEmployeeNameByEmployeeId(empIdsArray[index]);
        } else {
          employeeNames +=
            getEmployeeNameByEmployeeId(empIdsArray[index]) + ", ";
        }
      }
      setDisplaySelectedEmployeeNames(employeeNames);
    }
  };

  const uploadFile = (fileName) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("n", 9);
    formData.append("filename", fileName);
    axios
      .post(`http://localhost:8091/api/files/upload`, formData)
      .then((response) => {
        if (response.data) {
          setActivityType("");
          setTime("");
          setFile(null);
          setMealType("Food");
          setWhichMeal("");
          setBottleType("");
          setFoodConsumed("");
          setBottleConsumed("");
          setMealNote("");
          setEmployeeIds("");
          setDisplaySelectedEmployeeNames("");
          alert("Activity uploaded...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const addChildActivityFeed = () => {
    let data;
    const fileName = Date.now() + file.name;
    if (mealType === "Food") {
      data = {
        childId: currentChild.id,
        activityType,
        timeOfActivity: time,
        dateOfActivity: date,
        mealType,
        whichMeal,
        howMuchConsumed: foodConsumed,
        mealNotes: mealNote,
        activityImage: fileName,
        staffIds: employeeIds,
      };
    } else {
      data = {
        childId: currentChild.id,
        activityType,
        timeOfActivity: time,
        dateOfActivity: date,
        mealType,
        whichMeal: bottleType,
        howMuchConsumed: bottleConsumed,
        mealNotes: mealNote,
        activityImage: fileName,
        staffIds: employeeIds,
      };
    }

    axios
      .post(
        `http://localhost:8091/api/child-activities/createChildActivity`,
        data
      )
      .then((response) => {
        if (response.data) {
          uploadFile(fileName);
          getChildActivityFeeds();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddChildActivityFeed = () => {
    if (!activityType) {
      alert("Please select a valid activity type.");
      return;
    } else if (!time) {
      alert("Please select a valid time.");
      return;
    }

    if (mealType === "Food") {
      if (!whichMeal) {
        alert("Which meal is not selected...");
        return;
      } else if (!foodConsumed) {
        alert("Meal consumed is not selected...");
        return;
      }
    } else {
      if (!bottleType) {
        alert("Bottle Type is not selected...");
        return;
      } else if (!bottleConsumed) {
        alert("Meal consumed is not selected...");
        return;
      }
    }

    if (!employeeIds) {
      alert("No Employees were selected...");
      return;
    }

    if (!mealNote) {
      alert("Meal Note is not provided...");
      return;
    }
    addChildActivityFeed();
  };

  useEffect(() => getDisplayEmployeeNamesByEmployeeIds(), [employeeIds]);

  return (
    <div>
      <div
        className="modal fade"
        id="addActivity"
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
              <p className="heading lead">Add Activity</p>

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
                <div className="row">
                  <div className="col-sm-4 pl-3">
                    <div className="card p-2" style={{ display: "flex" }}>
                      <div className="row pl-3 pr-3">
                        <img
                          id="childPic"
                          className="img-fluid rounded-circle"
                          src={`http://localhost:8091/images/childrens/${currentChild.childPic}`}
                          alt="ChildPicture"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <label
                          htmlFor="childPic"
                          className="ml-3 text-dark mt-2"
                        >
                          <b>{`${currentChild.firstName} ${currentChild.lastName}`}</b>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-8 mt-2 text-right">
                    {/* <label htmlFor="attachment">File:</label> */}
                    <input
                      type="file"
                      id="attachment"
                      value={file ? file.fileName : ""}
                      onChange={(e) => setFile(e.target.files[0])}
                      className="btn btn-outline-success p-1 pl-2 w-full m-0"
                      data-mdb-ripple-color="dark"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-sm-4">
                    <label className="small">Activity Type:</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) => {
                        setActivityType(e.target.value);
                      }}
                      value={activityType}
                    >
                      <option value="">-- Select --</option>
                      <option value="Photo">Photo</option>
                      <option value="Video">Video</option>
                      <option value="Meal">Meal</option>
                      <option value="Nap">Nap</option>
                      <option value="Remainder">Remainder</option>
                      <option value="Potty">Potty</option>
                      <option value="Meds">Meds</option>
                      <option value="Incident">Incident</option>
                      <option value="Curriculum">Curriculum</option>
                      <option value="Art">Art</option>
                      <option value="Temperature">Temperature</option>
                      <option value="Mood">Mood</option>
                      <option value="Health Check">Health Check</option>
                      <option value="Message">Message</option>
                      <option value="First Day Report">First Day Report</option>
                      <option value="Face To Me">Face To Me</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="col-sm-4">
                    <label className="small">Activity Date:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="small">Time:</label>
                    <input
                      type="time"
                      className="form-control form-control-sm"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-sm-4">
                    <label className="small">Meal Type:</label>
                    <select
                      className="form-control form-control-sm"
                      onChange={(e) => {
                        setMealType(e.target.value);
                      }}
                      value={mealType}
                    >
                      <option value="Food">Food</option>
                      <option value="Bottle">Bottle</option>
                    </select>
                  </div>
                  <div className="col-sm-4">
                    {mealType === "Food" ? (
                      <>
                        <label className="small">Which Meal:</label>
                        <select
                          className="form-control form-control-sm"
                          onChange={(e) => {
                            setWhichMeal(e.target.value);
                          }}
                          value={whichMeal}
                        >
                          <option value="">-- Select --</option>
                          <option value="AM Snack">AM Snack</option>
                          <option value="Breakfast">Breakfast</option>
                          <option value="Fluids">Fluids</option>
                          <option value="Lunch">Lunch</option>
                          <option value="PM Snack">PM Snack</option>
                        </select>
                      </>
                    ) : (
                      <>
                        <label className="small">Bottle Type:</label>
                        <select
                          className="form-control form-control-sm"
                          onChange={(e) => {
                            setBottleType(e.target.value);
                          }}
                          value={bottleType}
                        >
                          <option value="">-- Select --</option>
                          <option value="Breast Milk">Breast Milk</option>
                          <option value="Formula">Formula</option>
                        </select>
                      </>
                    )}
                  </div>
                  <div className="col-sm-4">
                    {mealType === "Food" ? (
                      <>
                        <label className="small">Meal Consumed:</label>
                        <select
                          className="form-control form-control-sm"
                          onChange={(e) => {
                            setFoodConsumed(e.target.value);
                          }}
                          value={foodConsumed}
                        >
                          <option value="">-- Select --</option>
                          <option value="None">None</option>
                          <option value="Some">Some</option>
                          <option value="Half">Half</option>
                          <option value="Most">Most</option>
                          <option value="All">All</option>
                        </select>
                      </>
                    ) : (
                      <>
                        <label className="small">Meal Consumed:</label>
                        <select
                          className="form-control form-control-sm"
                          onChange={(e) => {
                            setBottleConsumed(e.target.value);
                          }}
                          value={bottleConsumed}
                        >
                          <option value="">-- Select --</option>
                          <option value="2 OZ">2 OZ</option>
                          <option value="4 OZ">4 OZ</option>
                          <option value="6 OZ">6 OZ</option>
                          <option value="8 OZ">8 OZ</option>
                          <option value="Other">Other</option>
                        </select>
                      </>
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div
                    className="col-sm-12"
                    style={{ display: "flex", width: "100%" }}
                  >
                    <div className="" style={{ width: "100%" }}>
                      <label className="small">Selected Employees:</label>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        value={
                          displaySelectedEmployeeNames ||
                          "No Employees were selected..."
                        }
                        disabled
                      />
                    </div>
                    <div className="text-right">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-purple btn-rouded mt-3 mb-0 mr-0 ml-4"
                        data-toggle="modal"
                        data-target="#addEmployeesToChildActivityFeed"
                      >
                        Add Employees
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-sm-12">
                    <label className="small">Meal Note:</label>
                    <textarea
                      rows={2}
                      className="form-control form-control-sm"
                      value={mealNote}
                      onChange={(e) => setMealNote(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-info btn-sm"
                  data-dismiss="modal"
                  onClick={() => handleAddChildActivityFeed()}
                >
                  Add Activity <i className="far fa-gem ml-1"></i>
                </button>
                <a
                  type="button"
                  className="btn btn-sm btn-outline-danger waves-effect"
                  data-dismiss="modal"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      {allEmployees && (
        <AddEmployeeForChildActivity
          allEmployees={allEmployees}
          setEmployeeIds={setEmployeeIds}
        />
      )}
    </div>
  );
}
