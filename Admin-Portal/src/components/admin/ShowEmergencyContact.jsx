import React, { useEffect, useState } from "react";
import axios from "axios";
import EditEmergencyContact from "./EditEmergencyContact";

export default function ShowEmergencyContact({ familyObj, addContactCounter }) {
  const [data, setData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [contactId, setContactId] = useState(0);
  let [pic, setPic] = useState("");
  const [file, setFile] = useState(null);
  const [editpicId, setEditPicId] = useState(null);
  ////////////////////////
  const showModalDialog = (id) => {
    setContactId(id);
    console.log("contactId: ", contactId);
  };
  const previewImage = (event) => {
    const input = event.target;
    const output = document.getElementById("editEPic");
    output.src = URL.createObjectURL(input.files[0]);
  };
  const [showContactCounter, setShowContactCounter] = useState(0); // State variable to trigger re-render
  const handleShowContactCounter = () => {
    // Increment the counter
    setShowContactCounter((prevCounter) => prevCounter + 1);
  };
  ///////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8091/api/emergency-contacts/getEmergencyContactByCheckInCode/" +
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
  }, [addContactCounter, showContactCounter, familyObj]); // Add familyObj.checkInCode as dependency to re-fetch data when it changes

  const handleDelete = (id) => {
    setDeleteId(id);
  };
  const uploadImage = async (filename) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      {
        /* Here file is the parameter name in the spring boot end point /upload if you give other than file then it give bad request error   */
      }
      formData.append("n", 4);
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
  ///////////////////
  const handleEditPic = (id) => {
    // Store the ID of the record to be deleted
    console.log("id=" + id);
    setEditPicId(id);
  };
  const confirmEdit = (obj) => {
    const filename = Date.now() + pic;
    obj.pic = filename;
    console.log("object");
    console.log(obj);
    axios
      .post(
        "http://localhost:8091/api/emergency-contacts/addEmergencyContact",
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
  const confirmDelete = () => {
    axios
      .delete(
        "http://localhost:8091/api/emergency-contacts/deleteEmergencyContact/" +
          deleteId
      )
      .then((response) => {
        if (response.status === 200) {
          setData(data.filter((record) => record.emergencyId !== deleteId));
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
              data.map((econtact, index) => (
                <tr key={index}>
                  {console.log(econtact)}
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
                                    src={`http://localhost:8091/images/econtacts/${econtact.pic}`}
                                    style={{ width: "80px", height: "80px" }}
                                    onClick={() =>
                                      handleEditPic(econtact.emergencyId)
                                    }
                                    id="editEPic"
                                  />
                                  {editpicId && (
                                    <div>
                                      <h6 className="text-danger">
                                        <b>Upload new pic?</b>
                                      </h6>
                                      <div className="">
                                        <input
                                          type="file"
                                          id="sg_file101"
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
                                        onClick={() => confirmEdit(econtact)}
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
                                    {econtact.firstName} {econtact.lastName}
                                  </b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Relationship</th>
                                <td>
                                  <b>{econtact.relationShip}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Email</th>
                                <td>
                                  <b>{econtact.email}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Primary Phone</th>
                                <td>
                                  <b>{econtact.primaryPhone}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Home Address</th>
                                <td>
                                  <b>{econtact.homeAddress}</b>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        {/* Additional content if needed */}
                        <div className="container">
                          <table className="table">
                            <tbody>
                              <tr>
                                <th scope="row">Billing</th>
                                <td>
                                  <b>{econtact.billing ? "Yes" : "No"}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Activity</th>
                                <td>
                                  <b>{econtact.activity ? "Yes" : "No"}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Messages</th>
                                <td>
                                  <b>{econtact.messages ? "Yes" : "No"}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Documents</th>
                                <td>
                                  <b>{econtact.documents ? "Yes" : "No"}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">City</th>
                                <td>
                                  <b>{econtact.city}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">State</th>
                                <td>
                                  <b>{econtact.state}</b>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Zip</th>
                                <td>
                                  <b>{econtact.zip}</b>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <hr />
                        <button
                          onClick={() => handleDelete(econtact.emergencyId)}
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
                          onClick={() => showModalDialog(econtact.emergencyId)}
                          data-toggle="modal"
                          data-target="#editEmergencyContactModal"
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
      <EditEmergencyContact
        contactId={contactId}
        handleShowContactCounter={handleShowContactCounter}
      />
    </div>
  );
}
