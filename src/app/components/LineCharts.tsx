"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const LineCharts = () => {
  const [chartConfig, setChartConfig] = useState(null);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    const fetchChartConfig = async () => {
      try {
        const res = await fetch("/lineChartData.json");
        if (!res.ok) throw new Error("Failed to fetch chart config");
        const [config] = await res.json();
        console.log("Chart Config:", config);

        const updatedLines = config.lines.map((line) => ({
          ...line,
          dataKey: line.dataKey || config.y_value // default to y_value if dataKey is empty
        }));

        setChartConfig({ ...config, lines: updatedLines });
        fetchChartData(config);
      } catch (err) {
        console.error("Error fetching chart config:", err);
      }
    };

    const aggregateData = (data, config) => {
      const aggregated = data.reduce((acc, item) => {
        const key = item[config.X_value];
        const existing = acc.find((i) => i[config.X_value] === key);

        if (existing) {
          config.lines.forEach((line) => {
            existing[line.dataKey] = (existing[line.dataKey] || 0) + (item[line.dataKey] || 0);
          });
        } else {
          acc.push({
            [config.X_value]: key,
            ...config.lines.reduce((lineAcc, line) => {
              lineAcc[line.dataKey] = item[line.dataKey] || 0;
              return lineAcc;
            }, {})
          });
        }
        return acc;
      }, []);

      return aggregated;
    };

    const fetchChartData = async (config) => {
      try {
        const res = await fetch(`/api/linechart?feature_name=${config.feature_name}`);
        if (!res.ok) throw new Error("Failed to fetch chart data");
        const data = await res.json();
        console.log("API Data:", data);

        const filteredData = aggregateData(data, config);

        setFormattedData(filteredData);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchChartConfig();
  }, []);

  if (!chartConfig) return <p>Loading chart...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="h5 text-center">{chartConfig.title}</h2>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={chartConfig.X_value}
                label={{
                  value: chartConfig.xAxisLabel,
                  position: "insideBottom",
                  offset: -15,
                  style: { fontWeight: "bold" }
                }}
              />
              <YAxis
                label={{
                  value: chartConfig.yAxisLabel,
                  angle: -90,
                  position: "insideLeft",
                  offset: -0,
                  style: { fontWeight: "bold" }
                }}
              />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              {chartConfig.lines.map((line, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke={line.color}
                  strokeWidth={2}
                  name={line.name || line.dataKey}
                  dot={formattedData.length === 1} // Show dot if only 1 data point
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LineCharts;
