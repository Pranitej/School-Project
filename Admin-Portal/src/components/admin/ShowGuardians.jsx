import React, { useEffect, useState } from "react";
import axios from "axios";
import AddGuardian from "./AddGuardian";
import EditGuardian from "./EditGuardian";
export default function ShowGuardians({
  familyObj,
  addGuardianCounter,
  handleAddGuardianCounter,
}) {
  const [data, setData] = useState(null);
  const [guardianId, setGuardianId] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const [editpicId, setEditPicId] = useState(null);
  let [pic, setPic] = useState("");

  //////////////////////////////////////
  const [file, setFile] = useState(null);

  const uploadImage = async (filename) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      {
        /* Here file is the parameter name in the spring boot end point /upload if you give other than file then it give bad request error   */
      }
      formData.append("n", 1);
      formData.append("filename", filename);

      try {
        const response = await fetch("http://localhost:8091/api/files/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          //const data = await response.json();
          console.log("Image uploaded successfully:");
          // Handle success
        } else {
          throw new Error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle error
      }
    } else {
      console.error("No image selected.");
      // Handle no image selected
    }
  };

  const previewImage = (event) => {
    const input = event.target;
    const output = document.getElementById("sg_file11");
    output.src = URL.createObjectURL(input.files[0]);
  };

  ////////////////////////
  const showModalDialog = (id) => {
    setGuardianId(id);
    console.log("GI: ", guardianId);
  };
  const [showGuardianCounter, setShowGuardianCounter] = useState(0); // State variable to trigger re-render
  const handleShowGuardianCounter = () => {
    // Increment the counter
    setShowGuardianCounter((prevCounter) => prevCounter + 1);
  };
  ///////////////////

  console.log("ShowGuardians() rendered...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("checkIcode====" + familyObj.checkInCode);
        const response = await fetch(
          "http://localhost:8091/api/guardians/getGuardianByCheckInCode/" +
            familyObj.checkInCode
        );
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [addGuardianCounter, showGuardianCounter, familyObj]);

  const handleDelete = (id) => {
    // Store the ID of the record to be deleted
    console.log("id=" + id);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    axios
      .delete(
        "http://localhost:8091/api/guardians/deleteGuardianById/" + deleteId
      )
      .then((response) => {
        if (response.status === 200) {
          // Remove deleted record from UI
          //console.log("AAA deleteId: " + deleteId +"  id=" + id);
          setData(data.filter((record) => record.guardianId !== deleteId));
          console.log("Record deleted successfully");
        } else {
          console.error("Failed to d  elete record");
        }
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
    // Reset deleteId after deletion
    setDeleteId(null);
  };

  const cancelDelete = () => {
    // Reset deleteId if cancellation
    setDeleteId(null);
  };

  ///////////////////////

  const handleEditPic = (id) => {
    // Store the ID of the record to be deleted
    console.log("id=" + id);
    setEditPicId(id);
  };

  const confirmEdit = (obj) => {
    const filename = Date.now() + pic;
    obj.pic = filename;
    axios
      .post("http://localhost:8091/api/guardians/saveGuardian", obj)
      .then((response) => {
        if (response.status === 201) {
          // Remove deleted record from UI
          //console.log("AAA deleteId: " + deleteId +"  id=" + id);
          uploadImage(filename);
          console.log("image uploaded successfully");
        } else {
          console.error("Failed to upload image");
        }
      })
      .catch((error) => {
        console.error("Error uploaded image:", error);
      });
    // Reset deleteId after deletion
    setDeleteId(null);
  };

  const cancelEdit = () => {
    // Reset deleteId if cancellation
    setEditPicId(null);
  };

  return (
    <div>
      <div className="">
        <table id="" className="table table-sm " cellSpacing="0" width="100%">
          <thead></thead>
          <tbody>
            {data &&
              data.map((guardian, index) => (
                <tr>
                  <td
                    scope="row"
                    className="card mt-2"
                    style={{ fontSize: "small" }}
                  >
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="container">
                          <table className="table table-sm">
                            <tbody>
                              <tr>
                                <th colSpan={2}>
                                  <img
                                    title="click to upload image"
                                    onClick={() =>
                                      handleEditPic(guardian.guardianId)
                                    }
                                    className="img-fluid rounded-circle"
                                    id="sg_file11"
                                    src={`http://localhost:8091/images/guardians/${guardian.pic}`}
                                    style={{ width: "80px", height: "80px" }}
                                  />
                                  <br></br>

                                  {editpicId && (
                                    <div>
                                      <h6 className="text-danger">
                                        <b>Upload new pic?</b>
                                      </h6>
                                      <div className="">
                                        <input
                                          type="file"
                                          id="sg_file1"
                                          onChange={(e) => {
                                            setFile(e.target.files[0]);
                                            setPic(e.target.files[0].name);
                                            previewImage(e);
                                          }}
                                          className="btn btn-outline-secondary btn-rounded"
                                          data-mdb-ripple-color="dark"
                                        />
                                        <span>
                                          &nbsp;&nbsp;&nbsp;&nbsp;Upload
                                          Guardian Photo
                                        </span>
                                      </div>
                                      <button
                                        className="btn btn-sm btn-success btn-outline btn-rounded"
                                        onClick={() => confirmEdit(guardian)}
                                      >
                                        Yes
                                      </button>
                                      <button
                                        className="btn btn-sm btn-secondary btn-outline btn-rounded"
                                        onClick={cancelEdit}
                                      >
                                        No
                                      </button>
                                    </div>
                                  )}
                                </th>
                              </tr>
                              <tr>
                                <th scope="row">Name</th>
                                <td>
                                  <b>
                                    {guardian.firstName} {guardian.lastName}
                                  </b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Relationship</th>
                                <td>
                                  <b>{guardian.relationship}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Gender</th>
                                <td>
                                  <b>{guardian.gender}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Primary Phone</th>
                                <td>
                                  <b>{guardian.primaryPhone}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Alternate Phone</th>
                                <td>
                                  <b>{guardian.alternatePhone}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Email</th>
                                <td>
                                  <b>{guardian.email}</b>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="container">
                          <table className="table table-sm">
                            <tbody>
                              <tr>
                                <th scope="row">Home Address</th>
                                <td>
                                  <b>{guardian.homeAddress}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">City</th>
                                <td>
                                  <b>{guardian.city}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">State</th>
                                <td>
                                  <b>{guardian.state}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Zip</th>
                                <td>
                                  <b>{guardian.zip}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Employer</th>
                                <td>
                                  <b>{guardian.employer}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Clearances</th>
                                <td>
                                  <b>{guardian.clearances}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">DL</th>
                                <td>
                                  <b>{guardian.DL}</b>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* <p><b>Check-In Code:</b> {guardian.checkInCode}</p> */}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="billingCheckbox"
                            checked={guardian.billing}
                            disabled
                          />
                          <label
                            className="form-check-label"
                            htmlFor="billingCheckbox"
                          >
                            <b className="text-primary">Billing</b>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="activityCheckbox"
                            checked={guardian.activity}
                            disabled
                          />
                          <label
                            className="form-check-label"
                            htmlFor="activityCheckbox"
                          >
                            <b className="text-primary">Activity</b>
                          </label>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="messagesCheckbox"
                            checked={guardian.messages}
                            disabled
                          />
                          <label
                            className="form-check-label"
                            htmlFor="messagesCheckbox"
                          >
                            <b className="text-primary">Messages</b>
                          </label>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="documentsCheckbox"
                            checked={guardian.documents}
                            disabled
                          />
                          <label
                            className="form-check-label"
                            htmlFor="documentsCheckbox"
                          >
                            <b className="text-primary">Documents</b>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-4">
                        <hr />
                        <button
                          onClick={() => handleDelete(guardian.guardianId)}
                          className="btn btn-danger btn-sm btn-rounded btn-outline"
                        >
                          Delete
                        </button>
                        {deleteId && (
                          <div>
                            <h6 className="text-danger">
                              <b>
                                Are you sure you want to delete this guardian
                                record?
                              </b>
                            </h6>
                            <button
                              className="btn btn-sm btn-success btn-outline btn-rounded"
                              onClick={confirmDelete}
                            >
                              Yes
                            </button>
                            <button
                              className="btn btn-sm btn-secondary btn-outline btn-rounded"
                              onClick={cancelDelete}
                            >
                              No
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="col-sm-4">
                        <hr />
                        <button
                          onClick={() => showModalDialog(guardian.guardianId)}
                          data-toggle="modal"
                          data-target="#editGuardian"
                          className="btn btn-sm btn-dark btn-rounded btn-outline"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <EditGuardian
        guardianId={guardianId}
        handleShowGuardianCounter={handleShowGuardianCounter}
      />
    </div>
  );
}
