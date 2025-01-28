import React, { useEffect, useState } from "react";
import AddChildActivityFeed from "./AddChildActivityFeed";
import axios from "axios";

export default function ChildActivityFeed({ currentChild }) {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 8) + "01"
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [activityFilter, setActivityFilter] = useState("All");
  const [allChildActivities, setAllChildActivities] = useState(null);
  const [allEmployees, setAllEmployees] = useState(null);
  const getAllEmployees = () => {
    axios
      .get(`http://localhost:8091/api/employees/getAllEmployees`)
      .then((response) => {
        if (response.data) {
          setAllEmployees(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => getAllEmployees(), []);

  const getChildActivityFeeds = () => {
    axios
      .get(
        `http://localhost:8091/api/child-activities/findByChildIdAndActivityTypeAndDateOfActivityBetween/${currentChild.id}/${activityFilter}/${startDate}/${endDate}`
      )
      .then((response) => {
        if (response.data) {
          setAllChildActivities(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getEmployeeNameByEmployeeId = (empId) => {
    if (allEmployees) {
      for (let index = 0; index < allEmployees.length; index++) {
        if (allEmployees[index].empId === empId) {
          return `${allEmployees[index].firstName} ${allEmployees[index].lastName}`;
        }
      }
    }
  };

  const getDisplayEmployeeNamesByEmployeeIds = (ids) => {
    let empIdsArray = ids.split(",").map(Number);
    let employeeNames = "";
    for (let index = 0; index < empIdsArray.length; index++) {
      if (empIdsArray.length === index + 1) {
        employeeNames += "~ " + getEmployeeNameByEmployeeId(empIdsArray[index]);
      } else if (index === 0) {
        employeeNames +=
          "~ " + getEmployeeNameByEmployeeId(empIdsArray[index]) + "\n";
      } else {
        employeeNames +=
          "~ " + getEmployeeNameByEmployeeId(empIdsArray[index]) + "\n";
      }
    }
    return employeeNames;
  };

  useEffect(
    () => getChildActivityFeeds(),
    [currentChild, startDate, endDate, activityFilter]
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
          <label className="small">Activity Filter:</label>
          <select
            className="form-control form-control-sm"
            onChange={(e) => {
              setActivityFilter(e.target.value);
            }}
            value={activityFilter}
          >
            <option value="All">All</option>
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
        <div className="col-sm-3">
          <label className="small">Start Date:</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </div>
        <div className="col-sm-3">
          <label className="small">End Date:</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
        <div className="col-sm-3 text-right">
          <button
            type="button"
            className="btn btn-md btn-purple btn-rounded mt-3 mb-0 mr-2 mr-3"
            data-toggle="modal"
            data-target="#addActivity"
          >
            Add Activity
          </button>
        </div>
      </div>
      <div className="row mt-3">
        {allChildActivities && allChildActivities.length > 0 ? (
          allChildActivities.map((item, index) => (
            <div className="col-sm-4 mb-3" key={index}>
              <div class="card ">
                <div class="card-header bg-white">
                  <div className="row">
                    <div className="col-sm-3">
                      <img
                        className="img-fluid rounded-circle"
                        src={`http://localhost:8091/images/childrens/${currentChild.childPic}`}
                        style={{
                          width: "40px",
                          height: "40px",
                          aspectRatio: "1/1",
                        }}
                      />
                    </div>
                    <div className="col-sm-9">
                      <b>{`${currentChild.firstName} ${currentChild.lastName}`}</b>
                      <p className="m-0 p-0 small">{item.activityType}</p>
                    </div>
                  </div>
                </div>
                <div class="card-body text-center">
                  <img
                    className="img-fluid"
                    src={`http://localhost:8091/images/childActivities/${item.activityImage}`}
                    style={{ width: "350px", aspectRatio: "5/4" }}
                  />
                  <div className="text-left mt-3">
                    <small className="text-dark mt-3">{item.mealNotes}</small>
                  </div>
                </div>
                <div class="card-footer text-muted">
                  <div className="row">
                    <div className="col-sm-5">
                      <small>{`${item.timeOfActivity}, ${item.dateOfActivity}`}</small>
                    </div>
                    <div className="col-sm-7 text-right">
                      <pre
                        className="small text-grey mb-0"
                        style={{ overflow: "hidden" }}
                      >
                        {getDisplayEmployeeNamesByEmployeeIds(item.staffIds)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-danger ml-3 mt-3">No Records Found...</h5>
        )}
      </div>
      <AddChildActivityFeed
        currentChild={currentChild}
        getChildActivityFeeds={getChildActivityFeeds}
        allEmployees={allEmployees}
      />
    </div>
  );
}
