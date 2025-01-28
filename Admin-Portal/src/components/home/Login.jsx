import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(1001);
  const [password, setPassword] = useState("admin1001");

  const handleLogin = () => {
    if (schoolId == 1001 && password == "admin1001") {
      navigate("/dashboard");
    } else {
      alert("Invalid school id or password");
    }
  };

  return (
    <div>
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
          <div class="container">
            <a class="navbar-brand" href="#">
              <strong>SCHOOL</strong>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent-7"
              aria-controls="navbarSupportedContent-7"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent-7">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    About
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Contact
                  </a>
                </li>
              </ul>
              <form class="form-inline">
                <div class="md-form my-0">
                  <input
                    class="form-control mr-sm-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
              </form>
            </div>
          </div>
        </nav>

        <section class="view intro-2">
          <div class="mask rgba-stylish-strong h-100 d-flex justify-content-center align-items-center">
            <div class="container">
              <div class="row text-center">
                <div class="col-sm-12">
                  <div class=" card modal-dialog cascading-modal modal-avatar">
                    <div
                      class="modal-content"
                      style={{ backgroundColor: "rgba(255, 255, 255, .4)" }}
                    >
                      <div class="modal-header">
                        <img
                          src="/images/school_logo.jpg"
                          alt="logo"
                          class="rounded-circle img-fluid"
                        />
                      </div>
                      <div class="modal-body text-center mb-1">
                        <h5 class="mt-1 mb-2 text-white">School Login</h5>

                        <div class="md-form text-white ">
                          <input
                            type="number"
                            value={schoolId}
                            onChange={(e) => setSchoolId(e.target.value)}
                            name="schoolId"
                            id="schoolId"
                            class="form-control form-control-lg text-white"
                          />
                          <label for="orangeForm-pass">School Id</label>
                        </div>

                        <div class="md-form text-white ">
                          <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id=""
                            class="form-control form-control-lg text-white"
                            required
                          />
                          <label for="orangeForm-pass">Password</label>

                          <div class="text-center pt-4">
                            <button
                              type="button"
                              class="btn btn-dark btn-rounded"
                              onClick={handleLogin}
                            >
                              Login <i class="fas fa-sign-in-alt ml-1"></i>
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
      </header>
    </div>
  );
}
