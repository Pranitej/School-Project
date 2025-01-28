import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditChildren({ childId, handleShowChildCounter }) {
  const [classNames, setClassNames] = useState([]);
  const [child, setChild] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    childPic: "",
    gender: "",
    birthDay: "",
    checkInCode: "",
    familyName: "",
    studentClass: "",
    enrollmentDate: "",
    startDate: "",
    status: "",
    schedule: "",
    daysAttending: "",
    withdrawalDate: "",
    isDHS: false,
    parentNotes: "",
    inactiveDate: "",
    voucherExpDate: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log("check");

    if (type === "checkbox") {
      console.log(name, checked);
      setChild((prevChild) => ({
        ...prevChild,
        [name]: checked,
      }));
    } else if (type === "select-multiple") {
      const selectedValues = Array.from(e.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setChild((prevChild) => ({
        ...prevChild,
        [name]: selectedValues.toString(),
      }));
    } else {
      setChild((prevChild) => ({
        ...prevChild,
        [name]: value,
      }));
    }
  };

  const fetchChildData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8091/api/children/getChildById/${childId}`
      );
      setChild(response.data);
    } catch (error) {
      console.error("Error fetching guardian data:", error);
    }
  };

  useEffect(() => {
    fetchChildData();
  }, [childId]);

  const handleSubmit = () => {
    console.log(child);
    axios
      .post(`http://localhost:8091/api/children/addChild`, {
        ...child,
      })
      .then((response) => {
        if (response.data) {
          handleShowChildCounter();
          fetchChildData();
          alert("Child updated...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const fetchClassNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8091/api/classnames/getAllClassNames"
        );
        setClassNames(response.data);
      } catch (error) {
        console.error("Error fetching class names:", error);
      }
    };
    fetchClassNames();
  }, []);

  return (
    <div>
      <div
        className="modal fade"
        id="editChildModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-notify modal-warning"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <p className="heading lead">Update Child</p>
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
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-4">
                    <label className="small">First Name:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="firstName5"
                      value={child.firstName}
                      name="firstName"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="small">Last Name:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="lastName5"
                      value={child.lastName}
                      name="lastName"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="small">Nick Name:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="nickName5"
                      value={child.nickName}
                      name="nickName"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-sm-4">
                    <label class="small">Gender</label>
                    <select
                      class="form-control form-control-sm"
                      id="gender5"
                      onChange={(e) =>
                        setChild((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                      value={child.gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="col-sm-4">
                    <label class="small">Birthday</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="birthDay5"
                      value={child.birthDay}
                      name="birthDay"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="small">Schedule:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="schedule5"
                      value={child.schedule}
                      name="schedule"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-sm-6">
                    <label className="small">Student Class</label>
                    <select
                      className="form-control form-control-sm"
                      multiple
                      id="studentClass01"
                      name="studentClass"
                      value={child.studentClass.split(",")}
                      onChange={handleChange}
                    >
                      {classNames.map((classObj) => (
                        <option
                          key={classObj.classId}
                          value={classObj.className}
                        >
                          {classObj.className}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <label className="small">Days Attending:</label>
                    <select
                      className="form-control form-control-sm"
                      multiple
                      name="daysAttending"
                      value={child.daysAttending.split(",")}
                      onChange={handleChange}
                    >
                      <option value="MONDAY">MONDAY</option>
                      <option value="TUESDAY">TUESDAY</option>
                      <option value="WEDNESDAY">WEDNESDAY</option>
                      <option value="THURSDAY">THURSDAY</option>
                      <option value="FRIDAY">FRIDAY</option>
                    </select>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-sm-4">
                    <label className="small">Enrollment Date:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="enrollmentDate5"
                      value={child.enrollmentDate}
                      name="enrollmentDate"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="small">Start Date:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="startDate5"
                      value={child.startDate}
                      name="startDate"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="small">Withdrawal Date:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="withdrawalDate5"
                      name="withdrawalDate"
                      value={child.withdrawalDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-sm-4">
                    <label className="small">Status:</label>
                    <select
                      className="form-control form-control-sm"
                      name="status"
                      value={child.status}
                      onChange={handleChange}
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="InActive">InActive</option>
                      <option value="Withdraw">Withdraw</option>
                    </select>
                  </div>
                  <div className="col-sm-4">
                    <label className="small">Inactive Date:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="inactiveDate5"
                      name="inactiveDate"
                      value={child.inactiveDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="small">Voucher Expiry Date:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="voucherExpDate5"
                      name="voucherExpDate"
                      value={child.voucherExpDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-sm-12">
                    <label className="small">Parent Notes:</label>
                    <textarea
                      className="form-control form-control-sm"
                      id="parentNotes5"
                      name="parentNotes"
                      rows="3"
                      onChange={handleChange}
                      value={child.parentNotes}
                    ></textarea>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-sm-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isDHS012"
                        name="isDHS"
                        checked={child.isDHS}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="isDHS012">
                        Is DHS
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-info"
                  onClick={() => handleSubmit()}
                  data-dismiss="modal"
                >
                  Update Child
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger waves-effect"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
