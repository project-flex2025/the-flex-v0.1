"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const BarCharts = () => {
  const [chartConfig, setChartConfig] = useState(null);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    const fetchChartConfig = async () => {
      try {
        const res = await fetch("/barChartData.json");
        if (!res.ok) throw new Error("Failed to fetch chart config");
        const [config] = await res.json();
        console.log("Chart Config:", config);

        const updatedBars = config.bars.map((bar:any) => ({
          ...bar,
          dataKey: bar.dataKey || config.y_value // default to y_value if dataKey is empty
        }));

        setChartConfig({ ...config, bars: updatedBars });
        fetchChartData(config);
      } catch (err) {
        console.error("Error fetching chart config:", err);
      }
    };

    const aggregateData = (data:any, config:any) => {
      const aggregated = data.reduce((acc:any, item:any) => {
        const key = item[config.X_value];
        const existing = acc.find((i:any) => i[config.X_value] === key);

        if (existing) {
          config.bars.forEach((bar:any) => {
            existing[bar.dataKey] = (existing[bar.dataKey] || 0) + (item[bar.dataKey] || 0);
          });
        } else {
          acc.push({
            [config.X_value]: key,
            ...config.bars.reduce((barAcc:any, bar:any) => {
              barAcc[bar.dataKey] = item[bar.dataKey] || 0;
              return barAcc;
            }, {})
          });
        }
        return acc;
      }, []);

      return aggregated;
    };

    const fetchChartData = async (config:any) => {
      try {
        const res = await fetch(`/api/barchart?feature_name=${config.feature_name}`);
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
            <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: formattedData.length > 10 ? 100 : 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={chartConfig.X_value}
                interval={(index) => (formattedData.length > 10 ? (index % 2 === 0 ? 0 : "preserveStartEnd") : 0)}
                angle={formattedData.length > 10 ? -45 : 0} // Apply angle only if more than 10 items
                textAnchor={formattedData.length > 10 ? "end" : "middle"} // Adjust text alignment
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
                  offset: -0, // Adjust this value to control spacing from the Y-axis
                  style: { fontWeight: "bold", textAnchor: "middle" }
                }}
              />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              {chartConfig.bars.map((bar, index) => (
                <Bar
                  key={index}
                  dataKey={bar.dataKey}
                  fill={bar.color}
                  name={bar.name || bar.dataKey}
                  barSize={40}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarCharts;
