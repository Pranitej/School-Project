import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { data } from "../../App";

export default function AddMilestone() {
  const employee = useContext(data);
  const [allChildren, setAllChildren] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [currentChildId, setCurrentChildId] = useState(-1);
  const [currentChild, setCurrentChild] = useState(null);
  const [currentSemester, setCurrentSemester] = useState("");
  const [currentSubject, setCurrentSubject] = useState("");
  const [currentClass, setCurrentClass] = useState("");
  const [gradeLetter, setGradeLetter] = useState("");
  const [gradeNumber, setGradeNumber] = useState("");

  const getAllChildren = () => {
    axios
      .get(`http://localhost:8091/api/children/getAllChildren`)
      .then((response) => {
        if (response.data) {
          setAllChildren(response.data);
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

  const getAllSubjects = () => {
    axios
      .get(`http://localhost:8091/api/subjects/getAllSubjects`)
      .then((response) => {
        if (response.data) {
          setAllSubjects(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddMilestone = () => {
    if (currentChildId > -1 && currentSemester && currentSubject) {
      axios
        .post(
          `http://localhost:8091/api/student-progress/createStudentProgress`,
          {
            childId: currentChildId,
            className: currentChild.studentClass,
            semister: currentSemester,
            subjectName: currentSubject,
            gradeLetter,
            gradeNumber,
            empId: employee.employeeData.empId,
            progressDate: new Date().toISOString().slice(0, 10),
            className: currentClass,
          }
        )
        .then((response) => {
          if (response.data) {
            alert("Milestone added successfully...");
            resetData();
          } else {
            alert("Something went wrong...");
          }
        })
        .catch((error) => console.error(error));
    } else {
      alert("Invalid form data...");
    }
  };

  const resetData = () => {
    setCurrentChildId(-1);
    setCurrentChild(null);
    setCurrentSemester("");
    setCurrentSubject("");
    setGradeLetter("");
    setGradeNumber("");
    setCurrentClass("");
  };

  useEffect(() => getAllChildren(), []);
  useEffect(() => getAllSubjects(), []);
  useEffect(() => getAllClasses(), []);

  useEffect(() => {
    if (currentChildId > -1) {
      for (let index = 0; index < allChildren.length; index++) {
        if (allChildren[index].id == currentChildId) {
          setCurrentChild(allChildren[index]);
          break;
        }
      }
    }
  }, [currentChildId]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-12 text-center">
          <h3>
            <b>Add Milestone</b>
          </h3>
        </div>
      </div>
      <div className="card mt-4 p-3">
        <div className="row">
          <div className="col-sm-4">
            <div className="card p-2 mt-2" style={{ display: "flex" }}>
              <div className="row pl-3 pr-3">
                {currentChild ? (
                  <div style={{ display: "flex" }}>
                    <img
                      id="childPic"
                      className="img-fluid rounded-circle"
                      src={`http://localhost:8091/images/childrens/${currentChild.childPic}`}
                      alt="ChildPicture"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <label htmlFor="childPic" className="ml-3 text-dark mt-2">
                      <b>{`${currentChild.firstName} ${currentChild.lastName}`}</b>
                    </label>
                  </div>
                ) : (
                  <h6 className="pt-1 text-danger">
                    <b>No Child Selected...</b>
                  </h6>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <label className="small">Child</label>
            <select
              className="form-control form-control-sm"
              value={currentChildId}
              onChange={(e) => setCurrentChildId(e.target.value)}
            >
              <option value={-1} disabled>
                Select Child
              </option>
              {allChildren &&
                allChildren.map((item, index) => (
                  <option value={item.id} key={index}>
                    {`${item.firstName} ${item.lastName} (${item.nickName})`}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-sm-4">
            <label className="small">Semester</label>
            <select
              className="form-control form-control-sm"
              value={currentSemester}
              onChange={(e) => setCurrentSemester(e.target.value)}
            >
              <option value="" disabled>
                Select Semester
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-3">
            <label className="small">Subject</label>
            <select
              className="form-control form-control-sm"
              value={currentSubject}
              onChange={(e) => setCurrentSubject(e.target.value)}
            >
              <option value="" disabled>
                Select Subject
              </option>
              {allSubjects &&
                allSubjects.map((item, index) => (
                  <option value={item.subjectName} key={index}>
                    {item.subjectName}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-sm-3">
            <label className="small">Class</label>
            <select
              className="form-control form-control-sm"
              value={currentClass}
              onChange={(e) => setCurrentClass(e.target.value)}
            >
              <option value="" disabled>
                Select Class
              </option>
              {allClasses &&
                allClasses.map((item, index) => (
                  <option value={item.className} key={index}>
                    {item.className}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-sm-3">
            <label className="small">Grade Letter</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={gradeLetter}
              onChange={(e) => setGradeLetter(e.target.value)}
            />
          </div>
          <div className="col-sm-3">
            <label className="small">Grade Number</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={gradeNumber}
              onChange={(e) => setGradeNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-12">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleAddMilestone}
            >
              Add Milestone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
