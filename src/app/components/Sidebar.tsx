"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState([]);
  const [cardItems, setCardItems] = useState([]);

  useEffect(() => {
    fetch("/data/sidebar.json")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));

    fetch("/data/cards.json")
      .then((res) => res.json())
      .then((data) => setCardItems(data));


  }, []);

  return (
    <div className="sidebar" data-background-color="white">
      <div className="sidebar-logo">
        <div className="logo-header" data-background-color="white">
          <Link href="/" className="logo">
            <img src="null" alt="logo" className="navbar-brand" height="20" />
          </Link>
          <div className="mini-logo">
            <img src="null" alt="logo" className="navbar-brand" height="50" />
          </div>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          {/* <ul className="nav nav-secondary">
            <li className={`nav-item ${pathname === "/" ? "active" : ""}`}>
              <Link href="/">
                <i className="fas fa-cog"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className={`nav-item ${pathname === "/settings" ? "active" : ""}`}>
              <Link href="/settings">
                <i className="fas fa-cog"></i>
                <p>Settings</p>
              </Link>
            </li>
            <li className={`nav-item ${pathname === "/users" ? "active" : ""}`}>
              <Link href="/users">
                <i className="fas fa-cog"></i>
                <p>Users</p>
              </Link>
            </li>


            <li className={`nav-item ${pathname === "/profile" ? "active" : ""}`}>
              <Link href="/login">
                <i className="fas fa-user"></i>
                <p>Login</p>
              </Link>
            </li>

          </ul> */}
          <ul className="nav nav-secondary">
            {menuItems.map((item: any) => (
              <li key={item.id} className={`nav-item ${pathname === item.route ? "active" : ""}`}>
                <Link href={item.route}>
                  <i className={item.icon}></i>
                  <p>{item.name}</p>
                </Link>
              </li>
            ))}
          </ul>


        </div>
      </div>
    </div>
  );
}
