import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function AddMeal() {
  const [allMeals, setAllMeals] = useState(null);
  const [mealCategory, setMealCategory] = useState("");
  const [mealName, setMealName] = useState("");
  const [mealDescription, setMealDescription] = useState("");

  const getAllMeals = () => {
    axios
      .get(`http://localhost:8091/api/meals/getAllMeals`)
      .then((response) => {
        if (response.data) {
          setAllMeals(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddMeal = () => {
    axios
      .post(`http://localhost:8091/api/meals`, {
        mealType: mealCategory,
        mealName,
        description: mealDescription,
      })
      .then((response) => {
        if (response.data) {
          getAllMeals();
          setMealCategory("");
          setMealName("");
          setMealDescription("");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleMealDelete = (id) => {
    axios
      .delete(`http://localhost:8091/api/meals/${id}`)
      .then((response) => {
        if (response) {
          getAllMeals();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getAllMeals(), []);

  return (
    <div>
      <div
        className="modal fade"
        id="addMeal"
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
              <p className="heading lead">Add Meal</p>

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
                  <div className="row">
                    <div className="col-sm-4 mt-5">
                      <select
                        className="form-control"
                        value={mealCategory}
                        onChange={(e) => setMealCategory(e.target.value)}
                        style={{ height: "35px" }}
                      >
                        <option value={""}>-- Select --</option>
                        <option value="AM Snack">AM Snack</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Fluids">Fluids</option>
                        <option value="Lunch">Lunch</option>
                        <option value="PM Snack">PM Snack</option>
                      </select>
                    </div>
                    <div className="col-sm-8 mt-3">
                      <div className="md-form">
                        <label htmlFor="firstName9">Meal Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={mealName}
                          onChange={(e) => setMealName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="md-form">
                        <label htmlFor="contactAddress9">
                          Meal description:
                        </label>
                        <textarea
                          rows="1"
                          className="md-textarea form-control"
                          value={mealDescription}
                          onChange={(e) => setMealDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="card mdb-color darken-3 p-1 pt-2 pl-2 mb-3">
                    <h5 className="text-light fs-6 mt-1">Meals</h5>
                  </div>
                  <div className="row m-2">
                    <div className="col-sm-3">Category</div>
                    <div className="col-sm-3">Name</div>
                    <div className="col-sm-5 ml-4 pl-5">Description</div>
                  </div>
                  <div style={{ overflowY: "auto", height: "200px" }}>
                    {allMeals &&
                      allMeals.map((item, index) => (
                        <div className="card p-3 mb-3 m-2" key={index}>
                          <div className="row">
                            <div className="col-sm-3">{item.mealType}</div>
                            <div className="col-sm-4">{item.mealName}</div>
                            <div className="col-sm-4">{item.description}</div>
                            <div
                              className="col-sm-1"
                              onClick={() => handleMealDelete(item.mealId)}
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
                  onClick={() => handleAddMeal()}
                >
                  Add Meal <i className="far fa-gem ml-1"></i>
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
