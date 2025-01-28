import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { data } from "../../App";

export default function ViewEmergencyContacts() {
  const [allEmergencyContacts, setAllEmergencyContacts] = useState([]);
  const [emergencyContact, setEmergencyContact] = useState(null);
  const { parentData } = useContext(data);

  const getAllEmergencyContacts = () => {
    axios
      .get(
        `http://localhost:8091/api/emergency-contacts/getEmergencyContactByCheckInCode/${parentData.checkInCode}`
      )
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          setAllEmergencyContacts(response.data);
          if (response.data.length) {
            setEmergencyContact(response.data[0]);
          } else {
            setEmergencyContact(null);
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
        `http://localhost:8091/api/emergency-contact/updateEmergencyContact/${emergencyContact.emergencyId}`,
        emergencyContact
      )
      .then((response) => {
        if (response.data) {
          getAllEmergencyContacts();
          setEmergencyContact(response.data);
          alert("Profile updated...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getAllEmergencyContacts(), [parentData]);

  return (
    <div className="container mt-4 mb-5">
      <div className="row mt-2">
        <div className="col-sm-12 text-center">
          <h3 className="text-dark">Emergency Contact Profile</h3>
        </div>
      </div>
      {emergencyContact ? (
        <div className="card p-4 pt-3 mt-3 mb-5">
          <div className="row mt-2 mb-2">
            <div className="col-sm-12 text-center">
              <img
                className="img-fluid rounded-circle"
                src={`http://localhost:8091/images/econtacts/${emergencyContact.pic}`}
                style={{ width: "100px", height: "100px" }}
                alt="Emergency Contact Picture"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6">
              <label className="small">Emergency contact:</label>
              <select
                className="form-control form-control-sm"
                value={
                  emergencyContact
                    ? `${emergencyContact.firstName} ${emergencyContact.lastName}`
                    : ""
                }
                onChange={(e) =>
                  setEmergencyContact(
                    allEmergencyContacts.find(
                      (item) =>
                        `${item.firstName} ${item.lastName}` === e.target.value
                    )
                  )
                }
              >
                {allEmergencyContacts.map((item, index) => (
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
                value={emergencyContact.relationShip}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    relationShip: e.target.value,
                  })
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
                value={emergencyContact.firstName}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-sm-6">
              <label className="small">Last Name:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={emergencyContact.lastName}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6">
              <label className="small">Primary Phone:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={emergencyContact.primaryPhone}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    primaryPhone: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-sm-6">
              <label className="small">Alternate Phone:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={emergencyContact.alternatePhone}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    alternatePhone: e.target.value,
                  })
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
                value={emergencyContact.email}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-sm-6">
              <label className="small">Home Address:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={emergencyContact.homeAddress}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    homeAddress: e.target.value,
                  })
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
                value={emergencyContact.city}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    city: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-sm-6">
              <label className="small">State:</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={emergencyContact.state}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    state: e.target.value,
                  })
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
                value={emergencyContact.zip}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    zip: e.target.value,
                  })
                }
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
        <h3 className="text-danger">No emergency contact found...</h3>
      )}
      <div className="row mt-5 mb-5 p-5"></div>
    </div>
  );
}
