import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ setEmployeeData, setParentData }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setEmployeeData(null);
    setParentData(null);
    navigate("/login");
  };

  return (
    <div
      className="container-fluid p-1 pr-3 pl-3"
      style={{ backgroundColor: "#3e4444" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h5 style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
          <i className="fas fa-caret-left text-white mr-2"></i>
          <b className="text-white">School Portal</b>
        </h5>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
