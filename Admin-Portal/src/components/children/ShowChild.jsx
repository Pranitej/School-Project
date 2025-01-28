import React, { useEffect, useState } from "react";
import axios from "axios";
import EditChildren from "../admin/EditChildren";
import ChildDocuments from "../admin/ChildDocuments";
import AddChildNotes from "../admin/AddChildNotes";
import ChildReservations from "../admin/ChildReservations";
import ChildVaccines from "../admin/ChildVaccines";
import AdminNotes from "../admin/AdminNotes";
import ChildRestrictions from "../admin/ChildRestrictions";

export default function ShowChild({
  familyObj,
  addChildCounter,
  currentChild,
}) {
  const [data, setData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [childId, setChildId] = useState(0);
  const [currentChildId, setCurrentChildId] = useState();
  let [pic, setPic] = useState("");
  const [currentChildData, setCurrentChildData] = useState(null);

  const [editpicId, setEditPicId] = useState(null);
  //////////////////////////////////////
  const [file, setFile] = useState(null);

  ////////////////////////
  const showModalDialog = (id) => {
    setChildId(id);
  };
  const previewImage = (event) => {
    const input = event.target;
    const output = document.getElementById("editChildImage");
    output.src = URL.createObjectURL(input.files[0]);
  };
  const [showChildCounter, setShowChildCounter] = useState(0); // State variable to trigger re-render
  const handleShowChildCounter = () => {
    // Increment the counter
    setShowChildCounter((prevCounter) => prevCounter + 1);
  };
  const cancelEdit = () => {
    // Reset deleteId if cancellation
    setEditPicId(null);
  };
  ///////////////////
  const handleEditPic = (id) => {
    editpicId ? setEditPicId(null) : setEditPicId(id);
  };

  const uploadImage = async (filename) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      {
        /* Here file is the parameter name in the spring boot end point /upload if you give other than file then it give bad request error   */
      }
      formData.append("n", 2);
      formData.append("filename", filename);

      try {
        const response = await fetch("http://localhost:8091/api/files/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8091/api/children/getChildrenByCheckInCode/" +
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
  }, [addChildCounter, showChildCounter, familyObj]); ///remove [] to execute every time

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    axios
      .delete("http://localhost:8091/api/children/deleteChild/" + deleteId)
      .then((response) => {
        if (response.status === 200) {
          setData(data.filter((record) => record.id !== deleteId));
        } else {
          console.error("Failed to delete record");
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

  const confirmEdit = (obj) => {
    const filename = Date.now() + pic;
    obj.childPic = filename;
    axios
      .post("http://localhost:8091/api/children/addChild", obj)
      .then((response) => {
        if (response.status === 201) {
          uploadImage(filename);
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

  return (
    <div>
      {data &&
        data.map((childData, index) => (
          <div className="" key={index}>
            {childData.id === currentChild.id && (
              <table
                id="dt-material-checkbox"
                className="table-sm"
                cellSpacing="0"
                width="100%"
              >
                <tbody>
                  <tr>
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
                                <tr className="text-center">
                                  <th colSpan={2}>
                                    <img
                                      className="img-fluid rounded-circle"
                                      src={`http://localhost:8091/images/childrens/${childData.childPic}`}
                                      style={{ width: "80px", height: "80px" }}
                                      onClick={() =>
                                        handleEditPic(childData.id)
                                      }
                                      id="editChildImage"
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
                                          onClick={() => confirmEdit(childData)}
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
                                  <th scope="row">Child Name</th>
                                  <td>
                                    <b>{`${childData.firstName} ${childData.lastName} (${childData.nickName})`}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Birthday</th>
                                  <td>
                                    <b>{`${childData.birthDay} `}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Gender</th>
                                  <td>
                                    <b>{`${childData.gender} `}</b>
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
                                  <th scope="row">Student Class</th>
                                  <td>
                                    <b>{childData.studentClass}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Enrollment Date</th>
                                  <td>
                                    <b>{childData.enrollmentDate}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Start Date</th>
                                  <td>
                                    <b>{childData.startDate}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Status</th>
                                  <td>
                                    <b>{childData.status}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Days Attending</th>
                                  <td>
                                    <b>{childData.daysAttending}</b>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="container">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <th scope="row">Schedule</th>
                                  <td>
                                    <b>{childData.schedule}</b>
                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">Withdrawal Date</th>
                                  <td>
                                    <b>{childData.withdrawalDate}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Is DHS</th>
                                  <td>
                                    <b>{childData.isDHS ? "Yes" : "No"}</b>
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
                                  <th scope="row">Parent Notes</th>
                                  <td>
                                    <b>{childData.parentNotes}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Inactive Date</th>
                                  <td>
                                    <b>{childData.inactiveDate}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Voucher Expiry Date</th>
                                  <td>
                                    <b>{childData.voucherExpDate}</b>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <hr />
                          <button
                            onClick={() => handleDelete(childData.id)}
                            className="btn btn-sm btn-danger btn-rounded btn-outline"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => showModalDialog(childData.id)}
                            data-toggle="modal"
                            data-target="#editChildModal"
                            className="btn btn-sm btn-warning btn-rounded btn-outline"
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-info btn-rounded btn-outline"
                            data-toggle="modal"
                            data-target="#childDocuments"
                            onClick={() => setCurrentChildId(childData.id)}
                          >
                            Documents
                          </button>
                          <button
                            className="btn btn-sm btn-dark btn-rounded btn-outline"
                            data-toggle="modal"
                            data-target="#childRestrictions"
                            onClick={() => setCurrentChildId(childData.id)}
                          >
                            Restrictions
                          </button>
                          <button
                            className="btn btn-sm btn-secondary btn-rounded btn-outline"
                            data-toggle="modal"
                            data-target="#addChildNotes"
                            onClick={() => setCurrentChildId(childData.id)}
                          >
                            Notes
                          </button>
                          <button
                            className="btn btn-sm btn-green btn-rounded btn-outline"
                            data-toggle="modal"
                            data-target="#childVaccines"
                            onClick={() => {
                              setCurrentChildId(childData.id);
                              setCurrentChildData(childData);
                            }}
                          >
                            Shot Records
                          </button>
                          <button
                            className="btn btn-sm btn-purple btn-rounded btn-outline"
                            data-toggle="modal"
                            data-target="#adminNotes"
                            onClick={() => {
                              setCurrentChildId(childData.id);
                              setCurrentChildData(childData);
                            }}
                          >
                            Admin Notes
                          </button>
                          <button
                            className="btn btn-sm btn-brown btn-rounded btn-outline"
                            data-toggle="modal"
                            data-target="#childReservations"
                            onClick={() => {
                              setCurrentChildId(childData.id);
                              setCurrentChildData(childData);
                            }}
                          >
                            Reservations
                          </button>
                          <button className="btn btn-sm btn-pink btn-rounded btn-outline">
                            Milestones
                          </button>
                          {deleteId && (
                            <div>
                              <h6 className="text-danger">
                                <b>
                                  Are you sure you want to delete this child
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
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        ))}
      {currentChildId && <ChildDocuments childId={currentChildId} />}
      {currentChildId && <AddChildNotes childId={currentChildId} />}
      {currentChildId && <ChildVaccines childId={currentChildId} />}
      {currentChildId && <AdminNotes childId={currentChildId} />}
      {currentChildId && <ChildRestrictions childId={currentChildId} />}
      {currentChildId && currentChildData && (
        <ChildReservations
          childId={currentChildId}
          childData={currentChildData}
        />
      )}
      <EditChildren
        childId={childId}
        handleShowChildCounter={handleShowChildCounter}
      />
    </div>
  );
}
