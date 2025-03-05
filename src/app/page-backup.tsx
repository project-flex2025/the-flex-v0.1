"use client";
import { useState, useEffect } from "react";
import TableComponent from "./components/TableComponent";
import SalesChart from "./components/SalesChart";

export default function Home() {
  // const [dashboard, setDashboard] = useState({});
  const [components, setComponents] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  // const [employeeDetails, setEmployeeDetails] = useState([]);

  useEffect(() => {
    fetch("/data/dashboard.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data:any) => {
        console.log("Fetched Data:", data);
        setDashboard(data);
        setComponents(data.dashboardInfo?.components || []);
        setCardItems(data.dashboardInfo?.data || []);
        setEmployeeDetails(data.employeeDetails?.data || []);
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const getWidthClass = (width: number) => {
    switch (width) {
      case 100:
        return "col-12";
      case 50:
        return "col-md-6";
      case 25:
        return "col-md-3";
      default:
        return "col-12";
    }
  };

  const groupComponentsByRow = (components: any[]) => {
    const grouped: Record<number, any[]> = {};
    components.forEach((component) => {
      if (!grouped[component.row]) {
        grouped[component.row] = [];
      }
      grouped[component.row].push(component);
    });
    return grouped;
  };

  const groupedComponents = groupComponentsByRow(components);

  const columnClass = cardItems.length === 4 ? "col-md-3" : cardItems.length === 3 ? "col-md-4" : "col-md-6";

  return (
    <>
      {/* Header */}
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <h3 className="fw-bold mb-3 dashboard-head">Good Morning, Krishty</h3>
      </div>

      {/* Dashboard Cards */}
      <div className="row">
        {cardItems.map((card: any) => (
          <div key={card.id} className={`col-sm-6 ${columnClass}`}>
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col col-stats ms-3 ms-sm-0">
                    <p className="card-category">{card.category}</p>
                    <h4 className="card-title">{card.value}</h4>
                  </div>
                  <div className="col-icon">
                    <div className={`icon-big text-center ${card.color} bubble-shadow-small`}>
                      <i className={card.icon}></i>
                    </div>
                  </div>
                </div>
                <div className="sale-info">
                  <i className={`${card.trendIcon} ${card.trendColor}`}></i>
                  <span className={`${card.trendColor} ms-1`}>{card.trend}</span>
                  <span className="ms-1">{card.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Components (SalesChart & TableComponent) */}
      {Object.entries(groupedComponents).map(([row, components]) => (
        <div key={row} className={`row row-${row} mb-4`}>
          {components.map((component: any) => (
            <div key={component.name} className={getWidthClass(component.width)}>
              {component.name === "SalesChart" ? <SalesChart /> : <TableComponent />}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
