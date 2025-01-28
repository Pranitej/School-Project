import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function AddLesson() {
  const [allLessons, setAllLessons] = useState(null);
  const [lessonCategory, setLessonCategory] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);

  const getAllLessons = () => {
    axios
      .get(`http://localhost:8091/api/lessons/getAllLessons`)
      .then((response) => {
        if (response.data) {
          setAllLessons(response.data);
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

  const handleAddLesson = () => {
    axios
      .post(`http://localhost:8091/api/lessons/addLesson`, {
        category: lessonCategory,
        lessonName,
        description: lessonDescription,
      })
      .then((response) => {
        if (response.data) {
          getAllLessons();
          setLessonCategory("");
          setLessonName("");
          setLessonDescription("");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleLessonDelete = (id) => {
    axios
      .delete(`http://localhost:8091/api/lessons/deleteLesson/${id}`)
      .then((response) => {
        if (response) {
          getAllLessons();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getAllLessons(), []);
  useEffect(() => getAllSubjects(), []);

  return (
    <div>
      <div
        className="modal fade"
        id="addLesson"
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
              <p className="heading lead">Add Lesson</p>

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
              <div className="modal-body pt-0">
                <div className="container mt-0">
                  <div className="row mt-3">
                    <div className="col-sm-4">
                      <label className="small">Category:</label>
                      <select
                        className="form-control form-control-sm"
                        value={lessonCategory}
                        onChange={(e) => setLessonCategory(e.target.value)}
                      >
                        <option value={""}>-- Select --</option>
                        {allSubjects &&
                          allSubjects.map((item, index) => (
                            <option value={item.subjectName} key={index}>
                              {item.subjectName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-sm-8">
                      <label className="small">Lesson Name:</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={lessonName}
                        onChange={(e) => setLessonName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mt-3 mb-4">
                    <div className="col-sm-12">
                      <label className="small">Lesson description:</label>
                      <textarea
                        rows="2"
                        className="form-control form-control-sm"
                        value={lessonDescription}
                        onChange={(e) => setLessonDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="card mdb-color darken-3 p-1 pt-1 pl-2 mb-1">
                    <h6 className="text-light fs-6 mt-1">Lessons</h6>
                  </div>
                  <div className="row m-2 small mt-3">
                    <div className="col-sm-3">Category</div>
                    <div className="col-sm-3">Name</div>
                    <div className="col-sm-5 ml-4 pl-5">Description</div>
                  </div>
                  <div style={{ overflowY: "auto", height: "200px" }}>
                    {allLessons &&
                      allLessons.map((item, index) => (
                        <div
                          className="card p-2 mb-2 m-2 mt-0 mb-0"
                          key={index}
                        >
                          <div className="row small">
                            <div className="col-sm-3">{item.category}</div>
                            <div className="col-sm-4">{item.lessonName}</div>
                            <div className="col-sm-4">{item.description}</div>
                            <div
                              className="col-sm-1"
                              onClick={() => handleLessonDelete(item.lessonId)}
                              style={{ cursor: "pointer" }}
                            >
                              <i className="fas fa-trash fa-1/2x text-danger"></i>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-info btn-sm"
                  onClick={() => handleAddLesson()}
                >
                  Add Lesson <i className="far fa-gem ml-1"></i>
                </button>
                <a
                  type="button"
                  className="btn btn-outline-danger btn-sm waves-effect"
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
