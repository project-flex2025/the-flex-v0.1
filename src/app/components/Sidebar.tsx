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
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch sidebar data");
        return res.json();
      })
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Error fetching sidebar data:", err));
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
