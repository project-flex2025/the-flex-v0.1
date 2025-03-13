// src/app/api/chartdata/route.js

import { NextResponse } from 'next/server';

const salesData = [
    {
        emp_id: "E001",
        emp_name: "John Doe",
        department: "Engineering",
        designation: "Software Engineer",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        salary: 80000
      },
      {
        emp_id: "E002",
        emp_name: "Jane Smith",
        department: "Marketing",
        designation: "Marketing Manager",
        email: "jane.smith@example.com",
        phone: "987-654-3210",
        salary: 75000
      },
      {
        emp_id: "E003",
        emp_name: "Michael Johnson",
        department: "Finance",
        designation: "Financial Analyst",
        email: "michael.johnson@example.com",
        phone: "456-789-1230",
        salary: 72000
      },
      {
        emp_id: "E004",
        emp_name: "Emily Davis",
        department: "Human Resources",
        designation: "HR Coordinator",
        email: "emily.davis@example.com",
        phone: "321-654-0987",
        salary: 68000
      },
      {
        emp_id: "E005",
        emp_name: "Robert Brown",
        department: "Sales",
        designation: "Sales Executive",
        email: "robert.brown@example.com",
        phone: "159-753-4862",
        salary: 70000
      }
];

// const salesData = [
//     { month: "January", year: 2023, sales: 15000 },
//     { month: "January", year: 2024, sales: 17000 },
//     { month: "February", year: 2023, sales: 18000 },
//     { month: "February", year: 2024, sales: 19000 },
//     { month: "March", year: 2023, sales: 20000 },   
//     { month: "March", year: 2024, sales: 22000 },
//     { month: "April", year: 2023, sales: 21000 },
//     { month: "April", year: 2024, sales: 23000 },
//     { month: "May", year: 2023, sales: 25000 },
//     { month: "May", year: 2024, sales: 27000 },
//     { month: "June", year: 2023, sales: 30000 },
//     { month: "June", year: 2024, sales: 32000 }
//   ];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const featureName = searchParams.get('feature_name');

  if (!featureName) {
    return NextResponse.json({ error: "Feature name is required" }, { status: 400 });
  }

  // Filter data or fetch from DB based on feature_name
  const filteredData = salesData; // Simulate filtered results based on feature_name
  return NextResponse.json(filteredData, { status: 200 });
}
