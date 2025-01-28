import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Classes() {
  const [_, setRender] = useState(Date.now());
  const [className, setClassName] = useState("");
  const [allClasses, setAllClasses] = useState([]);
  const [showButton, setShowButton] = useState(false);

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

  const handleAddClass = () => {
    axios
      .post(`http://localhost:8091/api/classnames/addClassName`, { className })
      .then((response) => {
        if (response.data) {
          setClassName("");
          getAllClasses();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSaveButton = (id) => {
    axios
      .put(
        `http://localhost:8091/api/classnames/updateClassName/${id}`,
        findClassById(id)
      )
      .then((response) => {
        if (response.data) {
          getAllClasses();
          setShowButton(false);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteClass = (id) => {
    axios
      .delete(`http://localhost:8091/api/classnames/deleteClassName/${id}`)
      .then((response) => {
        if (response) {
          getAllClasses();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const findClassById = (id) => {
    for (let index = 0; index < allClasses.length; index++) {
      if (allClasses[index].classId === id) {
        return allClasses[index];
      }
    }
  };

  const handleClassNameChange = (value, id) => {
    const temp = allClasses;
    for (let index = 0; index < temp.length; index++) {
      if (temp[index].classId === id) {
        temp[index].className = value;
      }
    }
    setAllClasses(temp);
    setRender(Date.now());
  };

  useEffect(() => getAllClasses(), []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-10">
          <label className="small">Add Class</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>
        <div className="col-sm-2 mt-4 d-flex align-items-center text-right">
          <button className="btn btn-sm btn-pink mr-0" onClick={handleAddClass}>
            Add Class
          </button>
        </div>
      </div>
      <hr />
      <div className="row mt-3">
        <div className="col-sm-12 text-center">
          <h3>All Classes</h3>
        </div>
      </div>
      <div className="row mt-3">
        {allClasses && allClasses.length ? (
          allClasses.map((item, index) => (
            <div className="col-sm-4" key={index}>
              <div className="row card p-2 pt-3 pb-3 m-2">
                <div className="col-md-12">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <label className="small">{`Class Name-${
                      index + 1
                    }:`}</label>
                    <span>
                      <i
                        className="fas fa-trash fa-1x text-danger ml-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteClass(item.classId)}
                      ></i>
                    </span>
                  </div>

                  <input
                    type="text"
                    value={item.className}
                    className="form-control form-control-sm"
                    onChange={(e) => {
                      handleClassNameChange(e.target.value, item.classId);
                      setShowButton(true);
                    }}
                  />
                </div>
                <div className="col-md-12 text-right mt-2">
                  {showButton && (
                    <button
                      className="btn btn-sm btn-primary mr-0"
                      onClick={() => handleSaveButton(item.classId)}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-danger mt-3">No classes Found...</h5>
        )}
      </div>
    </div>
  );
}
