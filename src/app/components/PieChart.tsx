"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PieCharts = () => {
    const [chartConfig, setChartConfig] = useState(null);
    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {
        const fetchChartConfig = async () => {
            try {
                const res = await fetch("/pieChartData.json");
                if (!res.ok) throw new Error("Failed to fetch chart config");
                const config = await res.json();

                const pieChartConfig = config.find((c) => c.chart_type === "piechart");
                if (!pieChartConfig) throw new Error("Pie chart config not found");

                setChartConfig(pieChartConfig);
                fetchChartData(pieChartConfig);
            } catch (err) {
                console.error("Error fetching chart config:", err.message);
            }
        };

        const fetchChartData = async (config) => {
            try {
                const res = await fetch(`/api/piecharts?feature_name=${config.feature_name}`);
                if (!res.ok) throw new Error("Failed to fetch chart data");
                const data = await res.json();

                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error("Invalid or empty chart data");
                }

                console.log("Fetched chart data:", data); // Debug fetched data
                console.log("Using name_key:", config.name_key);
                console.log("Using value_key:", config.value_key);

                const aggregatedData = data.reduce((acc, item) => {
                    const name = item[config.name_key];
                    const value = item[config.value_key];

                    if (name === undefined || value === undefined) {
                        console.warn("Missing key in item:", item); // Highlight missing keys
                        return acc;
                    }

                    const existingItem = acc.find((i) => i.name === name);
                    if (existingItem) {
                        existingItem.value += value; // Sum values if category repeats
                    } else {
                        acc.push({ name, value }); // Add new item if category is unique
                    }
                    return acc;
                }, []);

                console.log("Formatted chart data:", aggregatedData); // Debug final output
                setFormattedData(aggregatedData);
            } catch (err) {
                console.error("Error fetching chart data:", err.message);
            }
        };


        fetchChartConfig();
    }, []);

    if (!chartConfig) return <p>Loading chart configuration...</p>;
    if (formattedData.length === 0) return <p>No data available for the chart.</p>;
    console.log("formattedData", formattedData);

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h2 className="h5 text-center">{chartConfig.title}</h2>
                </div>
                <div className="card-body">
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={formattedData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {formattedData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={chartConfig.colors?.[index % chartConfig.colors.length] || "#ccc"}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PieCharts;
