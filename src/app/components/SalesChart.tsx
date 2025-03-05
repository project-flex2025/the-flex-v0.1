"use client";

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Dot,
} from "recharts";

const data = [
    { x: 5000, y: 5 },
    { x: 10000, y: 45 },
    { x: 15000, y: 2 },
    { x: 20000, y: 38 },
    { x: 22000, y: 95 },
    { x: 25000, y: 40 },
    { x: 30000, y: 50 },
    { x: 35000, y: 20 },
    { x: 40000, y: 42 },
    { x: 45000, y: 75 },
    { x: 50000, y: 60 },
    { x: 55000, y: 55 },
    { x: 60000, y: 65 },
];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, coordinate }: any) => {
    if (active && payload && payload.length) {
        const { x, y } = payload[0].payload;
        return (
            <div
                className="tooltip text-dark p-2 rounded"
                style={{
                    position: "absolute",
                    top: coordinate?.y - 30, // Position tooltip based on the point
                    left: coordinate?.x,
                    fontSize: "16px", // Slightly smaller font for better visibility
                    borderRadius: "5px",
                    padding: "8px", // Adding more padding for clarity
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                    whiteSpace: "nowrap",
                    backgroundColor: "#333", // Dark background for better visibility
                    color: "white", // White text for contrast
                    transform: "translate(-50%, -100%)", // Center the tooltip on the point
                    zIndex: 1000, // Ensure tooltip is above all other elements
                }}
            >
                <p>Sales: {y}</p> <br />
                <p>Value: {x.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

const SalesChart = () => {
    return (
        <div className="">
            <div className="card shadow">
                <div className="card-body">
                    <h5 className="card-title mb-4">Sales Details</h5>
                    <div className="chart-container w-100" style={{ height: "300px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorDynamic" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--gradient-start)" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="var(--gradient-end)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="x"
                                    tickFormatter={(value) => `${value / 1000}k`}
                                    tick={{ fontSize: 12, fill: "#666" }}
                                />
                                <YAxis tick={{ fontSize: 12, fill: "#666" }} />
                                <Tooltip content={<CustomTooltip />} cursor={false} />
                                <Area
                                    type="monotone"
                                    dataKey="y"
                                    stroke="var(--primary-color)"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorDynamic)"
                                    dot={(props) => {
                                        const { cx, cy, index, ...restProps } = props;
                                        return (
                                            <Dot
                                                key={index}
                                                cx={cx}
                                                cy={cy}
                                                fill="var(--primary-color)"
                                                r={3}
                                            />
                                        );
                                    }}
                                    activeDot={{ r: 5, fill: "var(--primary-color)" }} // Active dot on hover
                                />
                                <Line
                                    type="monotone"
                                    dataKey="y"
                                    stroke="var(--primary-color)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesChart;
