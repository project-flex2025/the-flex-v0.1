"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  // State to track if the dropdown is open or closed
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="main-header">
      <div className="main-header-logo">
        <div className="logo-header" data-background-color="white">
          <Link href="index.html" className="logo">
            <img
              src="null"
              alt="navbar brand"
              className="navbar-brand"
              height="20"
            />
          </Link>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt"></i>
          </button>
        </div>
      </div>
      <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
        <div className="container-fluid">
          <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
            <div className="input-group">
              <div className="input-group-prepend">
                <button type="submit" className="btn btn-search pe-1">
                  <i className="fa fa-search search-icon"></i>
                </button>
              </div>
              <input type="text" placeholder="Search ..." className="form-control" />
            </div>
          </nav>

          <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
            <li className="nav-item topbar-user dropdown hidden-caret">
              <Link
                className="dropdown-toggle profile-pic"
                data-bs-toggle="dropdown"
                href="#"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                onClick={toggleDropdown} // Toggle the dropdown state
              >
                <div className="avatar-sm">
                  <img
                    src="null"
                    alt="..."
                    className="avatar-img rounded-circle"
                  />
                </div>
                <span className="profile-username">
                  <span className="op-7">Hi,</span>
                  <span className="fw-bold">user</span>
                </span>
                <span className="ms-2">
                  <i
                    className={`fa-solid ${isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
                  ></i>
                </span>
              </Link>
              <ul
                className="dropdown-menu dropdown-user animated fadeIn"
                style={{ display: isDropdownOpen ? "block" : "none" }} // Show dropdown if open
              >
                <li>
                  <Link className="dropdown-item" href="#">My Profile</Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" href="#">Logout</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
