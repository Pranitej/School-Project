import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ChildRestrictions({ childId }) {
  const [allergyName, setAllergyName] = useState("");
  const [allergySeverity, setAllergySeverity] = useState("");
  const [allergyTreatment, setAllergyTreatment] = useState("");
  const [allergyList, setAllergyList] = useState(null);

  const [medicalConditionName, setMedicalConditionName] = useState("");
  const [medicalConditionSeverity, setMedicalConditionSeverity] = useState("");
  const [medicalConditionTreatment, setMedicalConditionTreatment] =
    useState("");
  const [medicalConditionList, setMedicalConditionList] = useState(null);

  const [dietaryName, setDietaryName] = useState("");
  const [dietarySeverity, setDietarySeverity] = useState("");
  const [dietaryTreatment, setDietaryTreatment] = useState("");
  const [dietaryList, setDietaryList] = useState(null);

  const getAllDietaryRestrictionsByChildId = () => {
    axios
      .get(
        `http://localhost:8091/api/dietary-restrictions/getAllDietaryRestrictionsByChildId/${childId}`
      )
      .then((response) => {
        if (response.data) {
          setDietaryList(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getAllChildMedicalConditionsByChildId = () => {
    axios
      .get(
        `http://localhost:8091/api/child-medical-conditions/getAllChildMedicalConditionsByChildId/${childId}`
      )
      .then((response) => {
        if (response.data) {
          setMedicalConditionList(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getAllAllergiesByChildId = () => {
    axios
      .get(
        `http://localhost:8091/api/allergies/getAllChildAllergiesByChildId/${childId}`
      )
      .then((response) => {
        if (response.data) {
          setAllergyList(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddDiet = () => {
    axios
      .post(
        `http://localhost:8091/api/dietary-restrictions/createDietaryRestriction`,
        {
          childId,
          dietaryName,
          dietaryLevel: dietarySeverity,
          dietaryTreatment,
        }
      )
      .then((response) => {
        if (response.data) {
          getAllDietaryRestrictionsByChildId();
          setDietaryName("");
          setDietarySeverity("");
          setDietaryTreatment("");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddMedicalCondition = () => {
    axios
      .post(
        `http://localhost:8091/api/child-medical-conditions/addMedicalCondition`,
        {
          childId,
          medicalConditionName,
          medicalConditionLevel: medicalConditionSeverity,
          medicalConditionTreatment,
        }
      )
      .then((response) => {
        if (response.data) {
          getAllChildMedicalConditionsByChildId();
          setMedicalConditionName("");
          setMedicalConditionSeverity("");
          setMedicalConditionTreatment("");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAddAllergy = () => {
    axios
      .post(`http://localhost:8091/api/allergies/addChildAllergy`, {
        childId,
        allergyName,
        allergyLevel: allergySeverity,
        allergyTreatment,
      })
      .then((response) => {
        if (response.data) {
          getAllAllergiesByChildId();
          setAllergyName("");
          setAllergySeverity("");
          setAllergyTreatment("");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleDietDelete = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/dietary-restrictions/deleteDietaryRestriction/${id}`
      )
      .then((response) => {
        if (response) {
          getAllDietaryRestrictionsByChildId();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleMedicalConditionDelete = (id) => {
    axios
      .delete(
        `http://localhost:8091/api/child-medical-conditions/deleteChildMedicalCondition/${id}`
      )
      .then((response) => {
        if (response) {
          getAllChildMedicalConditionsByChildId();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAllergyDelete = (id) => {
    axios
      .delete(`http://localhost:8091/api/allergies/deleteChildAllergy/${id}`)
      .then((response) => {
        if (response) {
          getAllAllergiesByChildId();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getAllAllergiesByChildId(), [childId]);
  useEffect(() => getAllChildMedicalConditionsByChildId(), [childId]);
  useEffect(() => getAllDietaryRestrictionsByChildId(), [childId]);

  return (
    <div>
      <div
        className="modal fade"
        id="childRestrictions"
        tabindex="-1"
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
              <p className="heading lead">Child Restrictions</p>

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
              <div className="modal-body p-0" style={{ height: "550px" }}>
                <div className="modal-c-tabs p-0" style={{ width: "100%" }}>
                  <ul
                    className="nav md-tabs tabs-2 light-blue darken-3 text-center m-0"
                    role="tablist"
                    style={{ borderRadius: "0", backgroundColor: "brown" }}
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#panel11"
                        role="tab"
                      >
                        Allergies
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#panel22"
                        role="tab"
                      >
                        Medical Conditions
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#panel33"
                        role="tab"
                      >
                        Dietary Restrictions
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content pt-0">
                    {/* Panel 1 */}
                    <div
                      className="tab-pane fade in show active m-3 mt-0 text-dark"
                      id="panel11"
                      role="tabpanel"
                    >
                      <div className="row">
                        <div className="col-sm-8">
                          <div className="form-group">
                            <label for="allergyName">Allergy Name:</label>
                            <input
                              type="text"
                              id="allergyName"
                              value={allergyName}
                              onChange={(e) => setAllergyName(e.target.value)}
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="">
                            <label for="allergySeverity">Severity:</label>
                            <select
                              className="form-control"
                              id="allergySeverity"
                              value={allergySeverity}
                              onChange={(e) =>
                                setAllergySeverity(e.target.value)
                              }
                            >
                              <option value="">-- Select Severity --</option>
                              <option value="Mild">Mild</option>
                              <option value="Moderate">Moderate</option>
                              <option value="Severe">Severe</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div class="">
                            <label for="allergyTreatment">
                              Allergy Treatment
                            </label>
                            <textarea
                              class="form-control"
                              rows="2"
                              value={allergyTreatment}
                              onChange={(e) =>
                                setAllergyTreatment(e.target.value)
                              }
                              id="allergyTreatment"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="row">
                          <div className="col-sm-9">
                            <div className="card mdb-color darken-3 p-0 pt-2 pl-3">
                              <h4 className="text-light">Allergy List</h4>
                            </div>
                          </div>
                          <div className="col-sm-3">
                            <button
                              type="button"
                              className="btn btn-sm btn-info waves-effect"
                              onClick={() => handleAddAllergy()}
                            >
                              Add Allergy
                            </button>
                          </div>
                        </div>
                        <div className="text-dark">
                          <div className="ml-3 mt-3">
                            {allergyList && allergyList.length > 0 ? (
                              <div className="row">
                                <div className="col-sm-3">Name</div>
                                <div className="col-sm-2">Severity</div>
                                <div className="col-sm-5">Treatment</div>
                                <div className="col-sm-2">Delete</div>
                              </div>
                            ) : (
                              <h5 className="text-danger mt-3">
                                No Records Found...
                              </h5>
                            )}
                          </div>
                          <div style={{ height: "180px", overflowY: "auto" }}>
                            {allergyList &&
                              allergyList.map((item, index) => (
                                <div
                                  className="card ml-0 p-2 m-2 mt-0"
                                  style={{ width: "auto" }}
                                  key={index}
                                >
                                  <div className="row">
                                    <div className="col-sm-3">
                                      {item.allergyName}
                                    </div>
                                    <div className="col-sm-2">
                                      {item.allergyLevel}
                                    </div>
                                    <div className="col-sm-5">
                                      {item.allergyTreatment}
                                    </div>
                                    <div className="col-sm-2">
                                      <div className="col-sm-2 justify-content-center d-flex align-items-center">
                                        <i
                                          className="fas fa-trash fa-1/2x text-danger mt-1"
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            handleAllergyDelete(item.allergyId)
                                          }
                                        ></i>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*Panel 2*/}
                    <div className="tab-pane fade" id="panel22" role="tabpanel">
                      <div
                        className="tab-pane fade in show active m-3 mt-0"
                        id="panel22"
                        role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-sm-8">
                            <div className="form-group">
                              <label for="medicalConditionName">Name:</label>
                              <input
                                type="text"
                                id="medicalConditionName"
                                value={medicalConditionName}
                                onChange={(e) =>
                                  setMedicalConditionName(e.target.value)
                                }
                                class="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="">
                              <label for="medicalConditionSeverity">
                                Severity:
                              </label>
                              <select
                                className="form-control"
                                id="medicalConditionSeverity"
                                value={medicalConditionSeverity}
                                onChange={(e) =>
                                  setMedicalConditionSeverity(e.target.value)
                                }
                              >
                                <option value="">-- Select Severity --</option>
                                <option value="Mild">Mild</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Severe">Severe</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div class="">
                              <label for="medicalConditionTreatment">
                                Treatment
                              </label>
                              <textarea
                                class="form-control"
                                rows="2"
                                value={medicalConditionTreatment}
                                onChange={(e) =>
                                  setMedicalConditionTreatment(e.target.value)
                                }
                                id="medicalConditionTreatment"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="row">
                            <div className="col-sm-9">
                              <div className="card mdb-color darken-3 p-0 pt-2 pl-3">
                                <h4 className="text-light">
                                  Medical Condition List
                                </h4>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <button
                                type="button"
                                className="btn btn-sm btn-info waves-effect"
                                onClick={() => handleAddMedicalCondition()}
                              >
                                Add Condition
                              </button>
                            </div>
                          </div>
                          <div className="text-dark">
                            <div className="ml-3 mt-3">
                              {medicalConditionList &&
                              medicalConditionList.length > 0 ? (
                                <div className="row">
                                  <div className="col-sm-3">Name</div>
                                  <div className="col-sm-2">Severity</div>
                                  <div className="col-sm-5">Treatment</div>
                                  <div className="col-sm-2">Delete</div>
                                </div>
                              ) : (
                                <h5 className="text-danger mt-3">
                                  No Records Found...
                                </h5>
                              )}
                            </div>
                            <div style={{ height: "180px", overflowY: "auto" }}>
                              {medicalConditionList &&
                                medicalConditionList.map((item, index) => (
                                  <div
                                    className="card ml-0 p-2 m-2 mt-0"
                                    style={{ width: "auto" }}
                                    key={index}
                                  >
                                    <div className="row">
                                      <div className="col-sm-3">
                                        {item.medicalConditionName}
                                      </div>
                                      <div className="col-sm-2">
                                        {item.medicalConditionLevel}
                                      </div>
                                      <div className="col-sm-5">
                                        {item.medicalConditionTreatment}
                                      </div>
                                      <div className="col-sm-2">
                                        <div className="col-sm-2 justify-content-center d-flex align-items-center">
                                          <i
                                            className="fas fa-trash fa-1/2x text-danger mt-1"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              handleMedicalConditionDelete(
                                                item.medicalId
                                              )
                                            }
                                          ></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Panel 3 */}
                    <div className="tab-pane fade" id="panel33" role="tabpanel">
                      <div
                        className="tab-pane fade in show active m-3 mt-0"
                        id="panel33"
                        role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-sm-8">
                            <div className="form-group">
                              <label for="dietaryName">Name:</label>
                              <input
                                type="text"
                                id="dietaryName"
                                value={dietaryName}
                                onChange={(e) => setDietaryName(e.target.value)}
                                class="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="">
                              <label for="dietarySeverity">Severity:</label>
                              <select
                                className="form-control"
                                id="dietarySeverity"
                                value={dietarySeverity}
                                onChange={(e) =>
                                  setDietarySeverity(e.target.value)
                                }
                              >
                                <option value="">-- Select Severity --</option>
                                <option value="Mild">Mild</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Severe">Severe</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div class="">
                              <label for="dietaryTreatment">Treatment</label>
                              <textarea
                                class="form-control"
                                rows="2"
                                value={dietaryTreatment}
                                onChange={(e) =>
                                  setDietaryTreatment(e.target.value)
                                }
                                id="dietaryTreatment"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="row">
                            <div className="col-sm-9">
                              <div className="card mdb-color darken-3 p-0 pt-2 pl-3">
                                <h4 className="text-light">Dietary List</h4>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <button
                                type="button"
                                className="btn btn-sm btn-info waves-effect"
                                onClick={() => handleAddDiet()}
                              >
                                Add Diet
                              </button>
                            </div>
                          </div>
                          <div className="text-dark">
                            <div className="ml-3 mt-3">
                              {dietaryList && dietaryList.length > 0 ? (
                                <div className="row">
                                  <div className="col-sm-3">Name</div>
                                  <div className="col-sm-2">Severity</div>
                                  <div className="col-sm-5">Treatment</div>
                                  <div className="col-sm-2">Delete</div>
                                </div>
                              ) : (
                                <h5 className="text-danger mt-3">
                                  No Records Found...
                                </h5>
                              )}
                            </div>
                            <div style={{ height: "180px", overflowY: "auto" }}>
                              {dietaryList &&
                                dietaryList.map((item, index) => (
                                  <div
                                    className="card ml-0 p-2 m-2 mt-0"
                                    style={{ width: "auto" }}
                                    key={index}
                                  >
                                    <div className="row">
                                      <div className="col-sm-3">
                                        {item.dietaryName}
                                      </div>
                                      <div className="col-sm-2">
                                        {item.dietaryLevel}
                                      </div>
                                      <div className="col-sm-5">
                                        {item.dietaryTreatment}
                                      </div>
                                      <div className="col-sm-2">
                                        <div className="col-sm-2 justify-content-center d-flex align-items-center">
                                          <i
                                            className="fas fa-trash fa-1/2x text-danger mt-1"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              handleDietDelete(item.dietaryId)
                                            }
                                          ></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
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
          {/* Content */}
        </div>

        {/* Central Modal Large Info */}
      </div>
    </div>
  );
}
