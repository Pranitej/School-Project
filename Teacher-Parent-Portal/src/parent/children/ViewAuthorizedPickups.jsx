import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { data } from "../../App";

export default function ViewAuthorizedPickups() {
  const [allPickups, setAllPickups] = useState([]);
  const [pickup, setPickup] = useState();
  const { parentData } = useContext(data);

  const getPickups = () => {
    axios
      .get(
        `http://localhost:8091/api/authorized-pickups/getAuthorizedPickupsByCheckInCode/${parentData.checkInCode}`
      )
      .then((response) => {
        if (response.data) {
          setAllPickups(response.data);
          if (response.data.length) {
            setPickup(response.data[0]);
          } else {
            setPickup(null);
          }
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8091/api/authorized-pickups/updateAuthorizedPickups/${pickup.authorizedId}`,
        pickup
      )
      .then((response) => {
        if (response.data) {
          getPickups();
          setPickup(response.data);
          alert("Profile updated...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getPickups(), [parentData]);

  return (
    <div className="container mt-4 mb-5">
      <div className="row mt-2">
        <div className="col-sm-12 text-center">
          <h3 className="text-dark">Authorized Pickup Profile</h3>
        </div>
      </div>
      {pickup ? (
        <div className="card p-4 pt-3 mt-3 mb-5">
          <div className="row mt-2 mb-2">
            <div className="col-sm-12 text-center">
              <img
                className="img-fluid rounded-circle"
                src={`http://localhost:8091/images/authpickups/${pickup.pic}`}
                style={{ width: "100px", height: "100px" }}
                alt="Pickup Picture"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6">
              <label className="small">Authorized Pickup:</label>
              <select
                className="form-control form-control-sm"
                value={pickup ? `${pickup.firstName} ${pickup.lastName}` : ""}
                onChange={(e) =>
                  setPickup(
                    allPickups.find(
                      (item) =>
                        `${item.firstName} ${item.lastName}` === e.target.value
                    )
                  )
                }
              >
                {allPickups.map((item, index) => (
                  <option
                    value={`${item.firstName} ${item.lastName}`}
                    key={index}
                  >
                    {`${item.firstName} ${item.lastName}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-6">
              <label className="small">Relationship:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.relationship}
                onChange={(e) =>
                  setPickup({ ...pickup, relationship: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6">
              <label className="small">First Name:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.firstName}
                onChange={(e) =>
                  setPickup({ ...pickup, firstName: e.target.value })
                }
              />
            </div>
            <div className="col-sm-6">
              <label className="small">Last Name:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.lastName}
                onChange={(e) =>
                  setPickup({ ...pickup, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6">
              <label className="small">Relationship:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.relationship}
                onChange={(e) =>
                  setPickup({ ...pickup, relationship: e.target.value })
                }
              />
            </div>
            <div className="col-sm-6">
              <label className="small">Gender</label>
              <select
                className="form-control form-control-sm"
                value={pickup.gender}
                onChange={(e) =>
                  setPickup({ ...pickup, gender: e.target.value })
                }
              >
                <option value="select">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6">
              <label className="small">Primary Phone:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.primaryPhone}
                onChange={(e) =>
                  setPickup({ ...pickup, primaryPhone: e.target.value })
                }
              />
            </div>
            <div className="col-sm-6">
              <label className="small">Alternate Phone:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.alternatePhone}
                onChange={(e) =>
                  setPickup({ ...pickup, alternatePhone: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6">
              <label className="small">Email:</label>
              <input
                type="email"
                className="form-control form-control-sm"
                value={pickup.email}
                onChange={(e) =>
                  setPickup({ ...pickup, email: e.target.value })
                }
              />
            </div>
            <div className="col-sm-6">
              <label className="small">Home Address:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.homeAddress}
                onChange={(e) =>
                  setPickup({ ...pickup, homeAddress: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6">
              <label className="small">City:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.city}
                onChange={(e) => setPickup({ ...pickup, city: e.target.value })}
              />
            </div>
            <div className="col-sm-6">
              <label className="small">State:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.state}
                onChange={(e) =>
                  setPickup({ ...pickup, state: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6">
              <label className="small">Zip:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.zip}
                onChange={(e) => setPickup({ ...pickup, zip: e.target.value })}
              />
            </div>
            <div className="col-sm-6">
              <label className="small">Employer:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.employer}
                onChange={(e) =>
                  setPickup({ ...pickup, employer: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6">
              <label className="small">Clearances:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.clearances}
                onChange={(e) =>
                  setPickup({ ...pickup, clearances: e.target.value })
                }
              />
            </div>
            <div className="col-sm-6">
              <label className="small">DL:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={pickup.dl}
                onChange={(e) => setPickup({ ...pickup, dl: e.target.value })}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-6">
              <button className="btn btn-sm btn-primary" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-danger">No authorized pickups found...</h3>
      )}
      <div className="row mt-5 mb-5 p-5"></div>
    </div>
  );
}
