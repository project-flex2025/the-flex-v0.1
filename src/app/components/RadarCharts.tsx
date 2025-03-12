"use client";

import React, { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const RadarCharts = () => {
  const [chartConfig, setChartConfig] = useState(null);
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    const fetchChartConfig = async () => {
      try {
        const res = await fetch("/radarChartData.json");
        if (!res.ok) throw new Error("Failed to fetch chart config");
        const [config] = await res.json();
        console.log("Chart Config:", config);

        setChartConfig(config);
        fetchChartData(config);
      } catch (err) {
        console.error("Error fetching chart config:", err);
      }
    };

    const aggregateData = (data:any, config:any) => {
      const aggregated = data.reduce((acc:any, item:any) => {
        const key = item[config.polarAngleAxisKey];
        const existing = acc.find((i:any) => i[config.polarAngleAxisKey] === key);

        if (existing) {
          config.radarKeys.forEach((radar:any) => {
            existing[radar.dataKey] = (existing[radar.dataKey] || 0) + (item[radar.dataKey] || 0);
          });
        } else {
          acc.push({
            [config.polarAngleAxisKey]: key,
            ...config.radarKeys.reduce((radarAcc:any, radar:any) => {
              radarAcc[radar.dataKey] = item[radar.dataKey] || 0;
              return radarAcc;
            }, {})
          });
        }
        return acc;
      }, []);

      return aggregated;
    };

    const fetchChartData = async (config:any) => {
      try {
        const res = await fetch(`/api/radarchart?feature_name=${config.feature_name}`);
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
          <h2 className="h5 text-center">{chartConfig?.title}</h2>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius={chartConfig.outerRadius || 150}
              data={formattedData}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey={chartConfig.polarAngleAxisKey} />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
              <Tooltip />
              <Legend />
              {chartConfig.radarKeys.map((radar:any, index:any) => (
                <Radar
                  key={index}
                  name={radar.name || radar.dataKey}
                  dataKey={radar.dataKey}
                  stroke={radar.color}
                  fill={radar.color}
                  fillOpacity={0.6}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RadarCharts;
