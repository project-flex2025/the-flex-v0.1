"use client";
import { useState, useEffect } from "react";
import TableComponent from "./components/TableComponent";
import SalesChart from "./components/SalesChart";

const componentMap = {
  TableComponent: TableComponent,
  SalesChart: SalesChart,
};

export default function Home() {
  const [groupedRows, setGroupedRows] = useState({});

  useEffect(() => {
    fetch("/data/dashboard.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        const grouped = groupItemsByRow(data.dashboardItems);
        setGroupedRows(grouped);
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);


  const getWidthClass = (width: number) => {
    if (width <= 0 || width > 100) return "col-12"; // Fallback for invalid values

    const columns = Math.round((12 * width) / 100); // Convert percentage to Bootstrap columns
    return `col-md-${Math.min(columns, 12)}`; // Ensure it doesn’t exceed 12 columns
  };

  const getHeightClass = (height: any) => {
    return height === 50 ? "col-12" : "col-12";
  };

  const groupItemsByRow = (items: any) => {
    return items.reduce((acc: any, item: any) => {
      if (!acc[item.row]) {
        acc[item.row] = [];
      }
      acc[item.row].push(item);
      return acc;
    }, {});
  };

  return (
    <div className="container">
      <h3 className="fw-bold mb-3 dashboard-head">Good Morning, Krishty</h3>

      {Object.entries(groupedRows).map(([row, items]: any) => {
        const mainItems = items.filter((item: any) => item.height !== 50);
        const nestedItems = items.filter((item: any) => item.height === 50);

        return (
          <div key={row} className="row mb-4">
            {mainItems.map((item: any, index: any) => {
              if (item.type === "component") {
                const ComponentToRender = componentMap[item.name];
                return (
                  <div key={`comp-${index}`} className={getWidthClass(item.width)}>
                    {ComponentToRender ? <ComponentToRender /> : <p>Component not found: {item.name}</p>}
                  </div>
                );
              } else if (item.type === "card") {
                const cardData = item.data;
                return (
                  <div key={`card-${cardData.id}`} className={getWidthClass(item.width)}>
                    <div className="card card-stats card-round">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col col-stats ms-3 ms-sm-0">
                            <div className="numbers">
                              <p className="card-category">{cardData.category}</p>
                              <h4 className="card-title">{cardData.value}</h4>
                            </div>
                          </div>
                          <div className="col-icon">
                            <div className="icon-big text-center icon-blue bubble-shadow-small">
                              <i className={`${cardData.icon} ${cardData.color}`}></i>
                            </div>
                          </div>
                        </div>
                        <div className="sale-info">
                          <i className={`${cardData.trendIcon} ${cardData.trendColor}`}></i>
                          <span className={`${cardData.trendColor} ms-1`}>{cardData.trend}</span>
                          <span className="ms-1">{cardData.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}

            {nestedItems.length > 0 && (
              <div className="col-md-6">
                <div className="row">
                  {nestedItems.map((item: any, index: any) => {
                    if (item.type === "component") {
                      const ComponentToRender = componentMap[item.name];
                      return (
                        <div key={`nested-comp-${index}`} className={getHeightClass(item.height)}>
                          {ComponentToRender ? <ComponentToRender /> : <p>Component not found: {item.name}</p>}
                        </div>
                      );
                    } else if (item.type === "card") {
                      const cardData = item.data;
                      return (
                        <div key={`nested-card-${cardData.id}`} className={getHeightClass(item.height)}>
                          <div className="card card-stats card-round">
                            <div className="card-body">
                              <div className="row align-items-center">
                                <div className="col col-stats ms-3 ms-sm-0">
                                  <div className="numbers">
                                    <p className="card-category">{cardData.category}</p>
                                    <h4 className="card-title">{cardData.value}</h4>
                                  </div>
                                </div>
                                <div className="col-icon">
                                  <div className="icon-big text-center icon-blue bubble-shadow-small">
                                    <i className={`${cardData.icon} ${cardData.color}`}></i>
                                  </div>
                                </div>
                              </div>
                              <div className="sale-info">
                                <i className={`${cardData.trendIcon} ${cardData.trendColor}`}></i>
                                <span className={`${cardData.trendColor} ms-1`}>{cardData.trend}</span>
                                <span className="ms-1">{cardData.status}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
