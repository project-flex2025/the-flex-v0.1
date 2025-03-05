"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function ClientLayout({ children }:any) {
  const pathname = usePathname();

  // Define routes where Sidebar and Header should not be displayed
  const hideLayoutRoutes = ["/login", "/register", "/forgot-password"];
  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  return shouldHideLayout ? (
    <>{children}</> // Only render children (login page content)
  ) : (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Header />
        <div className="container">
          <div className="page-inner">{children}</div>
        </div>
      </div>
    </div>
  );
}
