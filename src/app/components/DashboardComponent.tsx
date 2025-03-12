"use client"

import { useState, useEffect } from "react";
// import TableComponent from "./TableComponent";
// import SalesChart from "./SalesChart";
import dynamic from "next/dynamic";


// const componentMap = {
//     TableComponent: TableComponent,
//     SalesChart: SalesChart,
// };

const DashboardComponent = () => {
    const [groupedRows, setGroupedRows] = useState({});

    useEffect(() => {
        fetch("/main.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then((data) => {
                const dashboardPage = data.pages.find((page: any) => page.name === "Dashboard");
                if (dashboardPage && dashboardPage.content && dashboardPage.content.dashboardItems) {
                    const grouped = groupItemsByRow(dashboardPage.content.dashboardItems);
                    setGroupedRows(grouped);
                }
            })
            .catch((err) => console.error("Failed to fetch data:", err));
    }, []);

    const getWidthClass = (width:any) => {
        if (width <= 0 || width > 100) return "col-12";
        const columns = Math.round((12 * width) / 100);
        return `col-md-${Math.min(columns, 12)}`;
    };

    const getHeightClass = (height:any) => {
        if (height <= 0 || height > 100) return "row-12";
        const rows = Math.round((12 * height) / 100);
        return `row-md-${Math.min(rows, 12)}`;
    };

    const groupItemsByRow = (items:any) => {
        return items.reduce((acc:any, item:any) => {
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
            {Object.entries(groupedRows).map(([row, items]) => {
                const mainItems = items.filter((item:any) => item.height !== 50);
                const nestedItems = items.filter((item:any) => item.height === 50);

                return (
                    <div key={row} className="row mb-4">
                        {mainItems.map((item:any, index:any) => {
                            if (item.type === "component") {
                                // const ComponentToRender = componentMap[item.name];
                                console.log("item",item.name);
                                const pagetest = dynamic(
                                    () => import(`./${item.name}`),
                                    {
                                        ssr: false, // Disable SSR if needed
                                    }
                                );
                                const ComponentToRender = pagetest;
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
                                    {nestedItems.map((item:any, index:any) => {
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
};

export default DashboardComponent;