import React, { useState } from "react";
import FamilyDashboard from "./FamilyDashboard";
import SchedulingDashboard from "../scheduling/ShedulingDashBoard";
import EmployeeDashboard from "../employee/EmployeeDashboard";
import ChildrenDashboard from "../children/ChildrenDashboard";
import ReportsDashboard from "../reports/ReportsDashboard";
import AdminDashboard from "../adminDashboard/AdminDashboard";

export default function TopMenu() {
  ////////////
  const [showFamilyDashboard, setShowFamilyDashboard] = useState(false);

  const handleFamilyButtonClick = () => {
    //add code to show <FamilyDashboard /> component
    setShowReportsDashboard(false);
    setShowFamilyDashboard(true);
    setShowSchedulingDashboard(false);
    setShowEmployeeDashboard(false);
    setShowChildrenDashboard(false);
    setShowAdminDashboard(false);
  };
  //////////////////
  const [showSchedulingDashboard, setShowSchedulingDashboard] = useState(false);

  const handleSchedulingButtonClick = () => {
    setShowAdminDashboard(false);
    setShowReportsDashboard(false);
    //add code to show <FamilyDashboard /> component
    setShowSchedulingDashboard(true);
    setShowFamilyDashboard(false);
    setShowEmployeeDashboard(false);
    setShowChildrenDashboard(false);
  };

  //////////////////
  const [showEmployeeDashboard, setShowEmployeeDashboard] = useState(true);

  const handleEmployeeButtonClick = () => {
    setShowReportsDashboard(false);
    //add code to show <FamilyDashboard /> component
    setShowEmployeeDashboard(true);
    setShowAdminDashboard(false);
    setShowSchedulingDashboard(false);
    setShowFamilyDashboard(false);
    setShowChildrenDashboard(false);
  };

  //////////////////
  const [showChildrenDashboard, setShowChildrenDashboard] = useState(false);

  const handleChildrenButtonClick = () => {
    setShowReportsDashboard(false);
    //add code to show <FamilyDashboard /> component
    setShowAdminDashboard(false);
    setShowChildrenDashboard(true);
    setShowEmployeeDashboard(false);
    setShowSchedulingDashboard(false);
    setShowFamilyDashboard(false);
  };

  const [showReportsDashboard, setShowReportsDashboard] = useState(false);

  const handleReportsButtonClick = () => {
    //add code to show <FamilyDashboard /> component
    setShowReportsDashboard(true);
    setShowChildrenDashboard(false);
    setShowEmployeeDashboard(false);
    setShowAdminDashboard(false);
    setShowSchedulingDashboard(false);
    setShowFamilyDashboard(false);
  };

  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const handleAdminButtonClick = () => {
    //add code to show <FamilyDashboard /> component
    setShowReportsDashboard(false);
    setShowChildrenDashboard(false);
    setShowEmployeeDashboard(false);
    setShowSchedulingDashboard(false);
    setShowAdminDashboard(true);
    setShowFamilyDashboard(false);
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg scrolling-navbar double-nav">
        {/* SideNav slide-out button */}
        <div className="float-left">
          <a href="#" data-activates="slide-out" className="button-collapse">
            <i className="fas fa-bars"></i>
          </a>
        </div>

        {/* Breadcrumb */}
        <div className="breadcrumb-dn mr-auto">
          <p>SCHOOL</p>
        </div>

        <div className="d-flex change-mode">
          <div className="ml-auto mb-0 mr-2 change-mode-wrapper">
            <a
              onClick={handleSchedulingButtonClick}
              className="btn btn-outline-primary btn-sm"
            >
              Scheduling
            </a>
          </div>

          <div className="ml-auto mb-0 mr-2 change-mode-wrapper">
            <a
              onClick={handleFamilyButtonClick}
              className="btn btn-outline-green btn-sm"
            >
              Families
            </a>
          </div>

          <div className="ml-auto mb-0 mr-2 change-mode-wrapper">
            <a
              onClick={handleChildrenButtonClick}
              className="btn btn-outline-dark btn-sm"
            >
              Children
            </a>
          </div>

          <div className="ml-auto mb-0 mr-2 change-mode-wrapper">
            <a
              onClick={handleEmployeeButtonClick}
              className="btn btn-outline-secondary btn-sm"
            >
              Employees
            </a>
          </div>

          <div className="ml-auto mb-0 mr-2 change-mode-wrapper">
            <a className="btn btn-outline-success btn-sm">Billing</a>
          </div>

          <div className="ml-auto mb-0 mr-2 change-mode-wrapper">
            <a
              className="btn btn-outline-danger btn-sm"
              onClick={handleReportsButtonClick}
            >
              Reports
            </a>
          </div>

          <div className="ml-auto mb-0 mr-2 change-mode-wrapper">
            <a
              className="btn btn-outline-brown btn-sm"
              onClick={handleAdminButtonClick}
            >
              Admin
            </a>
          </div>

          {/*  <div className="ml-auto mb-0 mr-3 change-mode-wrapper">
          <button className="btn btn-outline-black btn-sm" id="dark-mode">Change Mode</button>
  </div> */}

          {/* Navbar links */}
          <ul className="nav navbar-nav nav-flex-icons ml-auto">
            {/* Dropdown 
          <li className="nav-item dropdown notifications-nav">
            <a className="nav-link dropdown-toggle waves-effect" id="navbarDropdownMenuLink" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <span className="badge red">3</span> <i className="fas fa-bell"></i>
              <span className="d-none d-md-inline-block">Notifications</span>
            </a>
            <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#">
                <i className="far fa-money-bill-alt mr-2" aria-hidden="true"></i>
                <span>New order received</span>
                <span className="float-right"><i className="far fa-clock" aria-hidden="true"></i> 13 min</span>
              </a>
             
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link waves-effect"><i className="fas fa-envelope"></i> <span
              className="clearfix d-none d-sm-inline-block">Contact</span></a>
          </li>*/}
            <li className="nav-item">
              <a className="nav-link waves-effect">
                <i className="far fa-comments"></i>{" "}
                <span className="clearfix d-none d-sm-inline-block"></span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle waves-effect"
                href="#"
                id="userDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-user"></i>{" "}
                <span className="clearfix d-none d-sm-inline-block">
                  Profile
                </span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="userDropdown"
              >
                <a className="dropdown-item" href="#">
                  Log Out
                </a>
                <a className="dropdown-item" href="#">
                  My account
                </a>
              </div>
            </li>
          </ul>
          {/* Navbar links */}
        </div>
      </nav>

      {/* Render the FamilyDashboard component conditionally */}
      {showFamilyDashboard && <FamilyDashboard />}
      {showSchedulingDashboard && <SchedulingDashboard />}
      {showEmployeeDashboard && <EmployeeDashboard />}
      {showChildrenDashboard && <ChildrenDashboard />}
      {showReportsDashboard && <ReportsDashboard />}
      {showAdminDashboard && <AdminDashboard />}
    </div>
  );
}
