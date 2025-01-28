import React, { useEffect, useState } from "react";
import axios from "axios";
import EditAuthorizedPickups from "./EditAuthorizedPickups";

export default function ShowAuthorizedPickups({ familyObj, addPickupCounter }) {
  const [data, setData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [authorizedPickupId, setAuthorizedPickupId] = useState(0);
  const [editpicId, setEditPicId] = useState(null);
  let [pic, setPic] = useState("");

  //////////////////////////////////////
  const [file, setFile] = useState(null);
  ////////////////////////
  const showModalDialog = (id) => {
    setAuthorizedPickupId(id);
    console.log("GI: ", authorizedPickupId);
  };
  const [showAuthorizedPickupCounter, setShowAuthorizedPickupCounter] =
    useState(0); // State variable to trigger re-render
  const handleShowAuthorizedPickupCounter = () => {
    // Increment the counter
    setShowAuthorizedPickupCounter((prevCounter) => prevCounter + 1);
  };
  ///////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8091/api/authorized-pickups/getAuthorizedPickupsByCheckInCode/" +
            familyObj.checkInCode
        );
        if (response.ok) {
          console.error("fetched data");
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
  }, [addPickupCounter, showAuthorizedPickupCounter]); // Add familyObj.checkInCode as dependency to re-fetch data when it changes

  const handleDelete = (id) => {
    setDeleteId(id);
  };
  const confirmEdit = (obj) => {
    const filename = Date.now() + pic;
    obj.pic = filename;
    axios
      .post(
        "http://localhost:8091/api/authorized-pickups/addAuthorizedPickups",
        obj
      )
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
  const uploadImage = async (filename) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      {
        /* Here file is the parameter name in the spring boot end point /upload if you give other than file then it give bad request error   */
      }
      formData.append("n", 3);
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
  const cancelEdit = () => {
    // Reset deleteId if cancellation
    setEditPicId(null);
  };
  const previewImage = (event) => {
    const input = event.target;
    const output = document.getElementById("sg_file1");
    output.src = URL.createObjectURL(input.files[0]);
  };
  const handleEditPic = (id) => {
    // Store the ID of the record to be deleted
    console.log("id=" + id);
    setEditPicId(id);
  };
  const confirmDelete = () => {
    axios
      .delete(
        "http://localhost:8091/api/authorized-pickups/deleteAuthorizedPickups/" +
          deleteId
      )
      .then((response) => {
        if (response.status === 200) {
          setData(data.filter((record) => record.authorizedId !== deleteId));
          console.log("Record deleted successfully");
        } else {
          console.error("Failed to delete record");
        }
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <div>
      <div className="">
        <table
          id="dt-material-checkbox"
          className="table-sm"
          cellSpacing="0"
          width="100%"
        >
          <tbody>
            {data &&
              data.map((guardian, index) => (
                <tr key={index}>
                  <td
                    scope="row"
                    className="card mt-2"
                    style={{ fontSize: "small" }}
                  >
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="container">
                          <table className="table">
                            <tbody>
                              <tr>
                                <th colSpan={2}>
                                  <img
                                    className="img-fluid rounded-circle"
                                    src={`http://localhost:8091/images/authpickups/${guardian.pic}`}
                                    id="sg_file1"
                                    style={{ width: "80px", height: "80px" }}
                                    onClick={() => {
                                      handleEditPic(guardian.authorizedId);
                                    }}
                                  />
                                  {editpicId && (
                                    <div>
                                      <h6 className="text-danger">
                                        <b>Upload new pic?</b>
                                      </h6>
                                      <div className="">
                                        <input
                                          type="file"
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
                              {/* Additional fields */}
                              <tr>
                                <th scope="row">Email</th>
                                <td>
                                  <b>{guardian.email}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Primary Phone</th>
                                <td>
                                  <b>{guardian.primaryPhone}</b>
                                </td>
                              </tr>
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
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="container">
                          <table className="table">
                            <tbody>
                              <tr>
                                <th scope="row">Driver License</th>
                                <td>
                                  <b>{guardian.driverLicense}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Date of Birth</th>
                                <td>
                                  <b>{guardian.dateOfBirth}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Is Emergency Contact</th>
                                <td>
                                  <b>
                                    {guardian.isEmergencyContact ? "Yes" : "No"}
                                  </b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Billing</th>
                                <td>
                                  <b>{guardian.billing ? "Yes" : "No"}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Activity</th>
                                <td>
                                  <b>{guardian.activity ? "Yes" : "No"}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Messages</th>
                                <td>
                                  <b>{guardian.messages ? "Yes" : "No"}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Documents</th>
                                <td>
                                  <b>{guardian.documents ? "Yes" : "No"}</b>
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
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        {/* Additional content if needed */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <hr />
                        <button
                          onClick={() => handleDelete(guardian.authorizedId)}
                          className="btn btn-sm btn-danger btn-rounded btn-outline"
                        >
                          Delete
                        </button>
                        {deleteId && (
                          <div>
                            <h6 className="text-danger">
                              <b>
                                Are you sure you want to delete this authorized
                                pickups record?
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
                          onClick={() => showModalDialog(guardian.authorizedId)}
                          data-toggle="modal"
                          data-target="#editAuthorizedPickupsModal"
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
      <EditAuthorizedPickups
        authorizedPickupId={authorizedPickupId}
        handleShowAuthorizedPickupCounter={handleShowAuthorizedPickupCounter}
      />
    </div>
  );
}
