import React, { useState } from "react";
import { useContext } from "react";
import { data } from "../../App";
import axios from "axios";

export default function Profile() {
  const { parentData } = useContext(data);
  const [parent, setParent] = useState(parentData);

  const handleUpdate = () => {
    axios.put(`http://localhost:8091`);
  };

  return parent ? (
    <div className="container mt-4 mb-5">
      <div className="row mt-2">
        <div className="col-sm-12 text-center">
          <h3 className="text-dark">Parent Profile</h3>
        </div>
      </div>
      <div className="card p-4 pt-3 mt-3 mb-5">
        <div className="row mt-2 mb-2">
          <div className="col-sm-12 text-center">
            <img
              className="img-fluid rounded-circle"
              src={`http://localhost:8091/images/guardians/${parent.pic}`}
              style={{ width: "100px", height: "100px" }}
              alt="Parent Picture"
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-6">
            <label className="small">First Name:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={parent.firstName}
              onChange={(e) =>
                setParent({ ...parent, firstName: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label className="small">Last Name:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={parent.lastName}
              onChange={(e) =>
                setParent({ ...parent, lastName: e.target.value })
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
              value={parent.relationship}
              onChange={(e) =>
                setParent({ ...parent, relationship: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label className="small">Gender</label>
            <select
              className="form-control form-control-sm"
              value={parent.gender}
              onChange={(e) => setParent({ ...parent, gender: e.target.value })}
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
              value={parent.primaryPhone}
              onChange={(e) =>
                setParent({ ...parent, primaryPhone: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label className="small">Alternate Phone:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={parent.alternatePhone}
              onChange={(e) =>
                setParent({ ...parent, alternatePhone: e.target.value })
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
              value={parent.email}
              onChange={(e) => setParent({ ...parent, email: e.target.value })}
            />
          </div>
          <div className="col-sm-6">
            <label className="small">Home Address:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={parent.homeAddress}
              onChange={(e) =>
                setParent({ ...parent, homeAddress: e.target.value })
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
              value={parent.city}
              onChange={(e) => setParent({ ...parent, city: e.target.value })}
            />
          </div>
          <div className="col-sm-6">
            <label className="small">State:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={parent.state}
              onChange={(e) => setParent({ ...parent, state: e.target.value })}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-6">
            <label className="small">Zip:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={parent.zip}
              onChange={(e) => setParent({ ...parent, zip: e.target.value })}
            />
          </div>
          <div className="col-sm-6">
            <label className="small">Employer:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={parent.employer}
              onChange={(e) =>
                setParent({ ...parent, employer: e.target.value })
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
              value={parent.clearances}
              onChange={(e) =>
                setParent({ ...parent, clearances: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label className="small">DL:</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={parent.dl}
              onChange={(e) => setParent({ ...parent, dl: e.target.value })}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-6">
            <label className="small">Password:</label>
            <input
              type="password"
              className="form-control form-control-sm"
              value={parent.password}
              onChange={(e) =>
                setParent({ ...parent, password: e.target.value })
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
      <div className="row mt-5 mb-5 p-5"></div>
    </div>
  ) : (
    <h3 className="text-danger">Something went wrong...</h3>
  );
}
