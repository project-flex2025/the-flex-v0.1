"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AddChart = () => {
  const router = useRouter();
  const [dataType, setDataType] = useState('products');
  const [dataOptions, setDataOptions] = useState([]);
  const [titleOptions, setTitleOptions] = useState([]);
  const [valueOptions] = useState(['price', 'rating.count']);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [formData, setFormData] = useState({
    title: "",
    type_of_piechart: "simple",
    data: [],
  });

  useEffect(() => {
    fetch(`/api/piecharts?type=${dataType}`)
      .then((res) => res.json())
      .then((data) => {
        setDataOptions(data);
        if (data.length > 0) {
          const firstItem = data[0];
          setTitleOptions(Object.keys(firstItem).filter((key) => typeof firstItem[key] === "string"));
        }
      })
      .catch((err) => console.error("Error fetching data options:", err));
  }, [dataType]);

  const handleDataTypeChange = (e:any) => {
    setDataType(e.target.value);
  };

  const handleTitleChange = (e:any) => {
    setSelectedTitle(e.target.value);
  };

  const handleValueChange = (e:any) => {
    setSelectedValue(e.target.value);
  };

  const calculateAggregatedData = (data:any) => {
    return data.reduce((acc:any, item:any) => {
      const title = item[selectedTitle];
      let value = selectedValue === 'rating.count' ? item.rating?.count || 0 : item[selectedValue] || 0;

      if (!acc[title]) {
        acc[title] = 0;
      }
      acc[title] += value;
      return acc;
    }, {});
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const aggregatedData = calculateAggregatedData(dataOptions);
    const chartData = Object.entries(aggregatedData).map(([name, value]) => ({ name, value }));

    setFormData((prev:any) => ({ ...prev, data: chartData }));

    try {
      const response = await fetch("/api/piecharts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formData.title, type_of_piechart: formData.type_of_piechart, data: chartData }),
      });
      if (response.ok) {
        alert("Data added succefully...!!")
      } else {
        console.error("Failed to add chart");
      }
    } catch (error) {
      console.error("Error adding chart:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Pie Chart</h2>

      <select value={dataType} onChange={handleDataTypeChange} className="border p-2 w-full mb-4">
        <option value="products">Products</option>
        <option value="users">Users</option>
      </select>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="chartTitle" className="block font-medium">Chart Title:</label>
        <input
          id="chartTitle"
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter Chart Title"
          required
          className="border p-2 w-full"
        />

        <label htmlFor="chartType" className="block font-medium">Select Pie Chart Type:</label>
        <select
          id="chartType"
          value={formData.type_of_piechart}
          onChange={(e) => setFormData({ ...formData, type_of_piechart: e.target.value })}
          className="border p-2 w-full"
        >
          <option value="simple">Simple</option>
          <option value="donut">Donut</option>
        </select>

        <label htmlFor="titleField" className="block font-medium">Select Title Field:</label>
        <select id="titleField" value={selectedTitle} onChange={handleTitleChange} className="border p-2 w-full">
          <option value="">Select Title</option>
          {titleOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label htmlFor="valueField" className="block font-medium">Select Value Field:</label>
        <select id="valueField" value={selectedValue} onChange={handleValueChange} className="border p-2 w-full">
          <option value="">Select Value</option>
          {valueOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="text-center text-red-600 text-sm">
          {(!selectedTitle || !selectedValue) && "Please select both a title and value field before submitting."}
        </div>

        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700" disabled={!selectedTitle || !selectedValue}>
          Submit Chart
        </button>
      </form>
    </div>
  );
};

export default AddChart;
