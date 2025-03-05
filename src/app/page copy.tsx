"use client";
import { useState, useEffect } from "react";
import TableComponent from "./components/TableComponent";
import SalesChart from "./components/SalesChart";

const componentMap = {
  TableComponent: TableComponent,
  SalesChart: SalesChart,
};

export default function Home() {
  const [components, setComponents] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [groupedRows, setGroupedRows] = useState({});

  useEffect(() => {
    fetch("/data/dashboard.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        const allItems = [
          ...data.dashboardInfo?.components.map((item) => ({
            ...item,
            type: "component",
          })),
          ...data.dashboardInfo?.cards_analytics.map((item) => ({
            ...item,
            type: "card",
          })),
        ];

        const grouped = groupItemsByRow(allItems);
        setGroupedRows(grouped);
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const getWidthClass = (width) => {
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

  const groupItemsByRow = (items) => {
    return items.reduce((acc, item) => {
      acc[item.row] = acc[item.row] ? [...acc[item.row], item] : [item];
      return acc;
    }, {});
  };

  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <h3 className="fw-bold mb-3 dashboard-head">Good Morning, Krishty</h3>
      </div>

      {Object.entries(groupedRows).map(([row, items]) => (
        <div key={row} className={`row row-${row} mb-4`}>
          {items.map((item) => {
            if (item.type === "component") {
              const ComponentToRender = componentMap[item.name];
              return (
                <div key={item.name} className={getWidthClass(item.width)}>
                  {ComponentToRender ? (
                    <ComponentToRender />
                  ) : (
                    <p>Component not found: {item.name}</p>
                  )}
                </div>
              );
            } else if (item.type === "card") {
              return (
                <div key={item.id} className={`col-sm-6 ${getWidthClass(item.width)}`}>
                  <div className="card card-stats card-round">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-stats ms-3 ms-sm-0">
                          <p className="card-category">{item.category}</p>
                          <h4 className="card-title">{item.value}</h4>
                        </div>
                        <div className="col-icon">
                          <div className={`icon-big text-center ${item.color} bubble-shadow-small`}>
                            <i className={item.icon}></i>
                          </div>
                        </div>
                      </div>
                      <div className="sale-info">
                        <i className={`${item.trendIcon} ${item.trendColor}`}></i>
                        <span className={`${item.trendColor} ms-1`}>{item.trend}</span>
                        <span className="ms-1">{item.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ))}
    </>
  );
}
