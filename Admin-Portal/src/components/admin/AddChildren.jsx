import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddChildren({ familyObj, handleAddChildCounter }) {
  const initialChildState = {
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
  };

  const [classNames, setClassNames] = useState([]);
  const [child, setChild] = useState(initialChildState);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setChild((prevChild) => ({
      ...prevChild,
      childPic: e.target.files[0].name,
    }));
    previewImage(e);
  };

  const previewImage = (event) => {
    const input = event.target;
    const output = document.getElementById("childpic01");
    output.src = URL.createObjectURL(input.files[0]);
  };

  const uploadImage = async (filename) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("n", 2);
      formData.append("filename", filename);

      axios
        .post(`http://localhost:8091/api/files/upload`, formData)
        .then((response) => {
          if (!response) {
            alert("Something went wrong...");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const childPicName = Date.now() + child.childPic;
    setChild((prevChild) => ({
      ...prevChild,
      childPic: childPicName,
    }));

    try {
      child.checkInCode = familyObj.checkInCode;
      child.familyName = familyObj.familyName;
      await axios.post("http://localhost:8091/api/children/addChild", child);
      handleAddChildCounter();
      uploadImage(childPicName);
      setChild(initialChildState); // Reset the form after submission
    } catch (error) {
      console.error("Error adding child:", error);
    }
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
        id="addChildModal"
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
              <p className="heading lead">Add Child</p>
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
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="childPic" className="small">
                      Child Picture:
                    </label>
                    <input
                      type="file"
                      id="childPic"
                      name="childPic"
                      onChange={handleFileChange}
                      className="form-control btn btn-outline-secondary btn-rounded pt-1"
                      data-smb-ripple-color="dark"
                    />
                  </div>
                  <div className="col-sm-6">
                    <img
                      id="childpic01"
                      className="img-fluid rounded-circle"
                      width="80px"
                      height="80px"
                      alt="Preview Photo"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-sm-4">
                    <label className="small">First Name:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="firstName01"
                      name="firstName"
                      value={child.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="small">Last Name:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="lastName01"
                      name="lastName"
                      value={child.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label className="small">Nick Name:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="nickName01"
                      name="nickName"
                      value={child.nickName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-sm-4">
                    <label className="small">Gender</label>
                    <select
                      className="form-control form-control-sm"
                      name="gender"
                      value={child.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div className="col-sm-4">
                    <label className="small">Birthday</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="birthDay01"
                      name="birthDay"
                      value={child.birthDay}
                      onChange={handleChange}
                    />
                  </div>
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
                      id="daysAttending01"
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
                  <div className="col-sm-6">
                    <label className="small">Enrollment Date:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="enrollmentDate01"
                      name="enrollmentDate"
                      value={child.enrollmentDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="small">Start Date:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="startDate01"
                      name="startDate"
                      value={child.startDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-sm-6">
                    <label className="small">Schedule:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="schedule01"
                      name="schedule"
                      value={child.schedule}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="small">Withdrawal Date:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="withdrawalDate01"
                      name="withdrawalDate"
                      value={child.withdrawalDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-sm-6">
                    <label className="small">Voucher Expiration Date:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="voucherExpDate01"
                      name="voucherExpDate"
                      value={child.voucherExpDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-sm-6">
                    <label className="small">Inactive Date:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="inactiveDate01"
                      name="inactiveDate"
                      value={child.inactiveDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-sm-12">
                    <label className="small">Parent Notes:</label>
                    <textarea
                      className="form-control form-control-sm"
                      id="parentNotes01"
                      name="parentNotes"
                      value={child.parentNotes}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-sm-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isDHS01"
                        name="isDHS"
                        checked={child.isDHS}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="isDHS01">
                        Is DHS
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary btn-md"
                  name="submitBtn"
                  data-dismiss="modal"
                >
                  Add Child
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-md"
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
