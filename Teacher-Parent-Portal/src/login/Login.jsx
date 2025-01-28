import "./Login.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { data } from "../App";
import { useContext } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("Parent");
  const userData = useContext(data);

  const handleLogin = () => {
    if (loginType === "Teacher") {
      axios
        .post(`http://localhost:8091/api/employees/login`, {
          email,
          password,
        })
        .then((response) => {
          if (response.data) {
            userData.setEmployeeData(response.data);
            navigate("/teacher/welcome");
          } else {
            alert("Invalid Credentials");
          }
        })
        .catch((error) => console.error(error));
    } else {
      axios
        .post(`http://localhost:8091/api/families/login`, {
          email,
          password,
        })
        .then((response) => {
          if (response.data) {
            userData.setParentData(response.data);
            navigate("/parent/welcome");
          } else {
            alert("Invalid Credentials");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top scrolling-navbar">
        <div className="container">
          <Link className="navbar-brand" to="#">
            <strong>SCHOOL</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-7"
            aria-controls="navbarSupportedContent-7"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-7"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="#">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Contact
                </Link>
              </li>
            </ul>
            <form className="form-inline">
              <div className="md-form my-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </nav>
      <section className="view intro-2">
        <div className="mask rgba-stylish-strong h-100 d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row text-center">
              <div className="col-sm-12">
                <div className="card modal-dialog cascading-modal modal-avatar">
                  <div
                    className="modal-content"
                    style={{ backgroundColor: "rgba(255, 255, 255, .4)" }}
                  >
                    <div className="modal-header">
                      <img
                        src="../images/school_logo.jpg"
                        alt="logo"
                        className="rounded-circle img-fluid"
                      />
                    </div>
                    <div className="modal-body text-center mb-1">
                      <h5 className="mt-1 mb-2 text-white">School Login</h5>
                      <div className="md-form text-white">
                        <select
                          className="form-control form-control-sm text-white border-0 mb-0 pb-0"
                          value={loginType}
                          onChange={(e) => setLoginType(e.target.value)}
                        >
                          <option value="Parent" className="text-dark">
                            Family
                          </option>
                          <option value="Teacher" className="text-dark">
                            Teacher
                          </option>
                        </select>
                        <hr className="bg-white" />
                      </div>

                      <div className="md-form text-white">
                        <input
                          type="email"
                          className="form-control form-control-sm text-white"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email Address</label>
                      </div>

                      <div className="md-form text-white">
                        <input
                          type="password"
                          className="form-control form-control-sm text-white"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>

                        <div className="text-center pt-4">
                          <a
                            href="/register"
                            className="btn btn-orange btn-rounded"
                          >
                            Register
                          </a>
                          <button
                            type="submit"
                            className="btn btn-blue btn-rounded"
                            onClick={handleLogin}
                          >
                            Login <i className="fas fa-sign-in-alt ml-1"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
