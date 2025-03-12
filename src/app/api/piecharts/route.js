// src/app/api/chartdata/route.js

import { NextResponse } from 'next/server';

// const apiData = [
//     {
//         emp_id: "E001",
//         emp_name: "John Doe",
//         department: "Engineering",
//         designation: "Software Engineer",
//         email: "john.doe@example.com",
//         phone: "123-456-7890",
//         salary: 80000
//       },
//       {
//         emp_id: "E002",
//         emp_name: "Jane Smith",
//         department: "Marketing",
//         designation: "Marketing Manager",
//         email: "jane.smith@example.com",
//         phone: "987-654-3210",
//         salary: 75000
//       },
//       {
//         emp_id: "E003",
//         emp_name: "Michael Johnson",
//         department: "Finance",
//         designation: "Financial Analyst",
//         email: "michael.johnson@example.com",
//         phone: "456-789-1230",
//         salary: 72000
//       },
//       {
//         emp_id: "E004",
//         emp_name: "Emily Davis",
//         department: "Human Resources",
//         designation: "HR Coordinator",
//         email: "emily.davis@example.com",
//         phone: "321-654-0987",
//         salary: 68000
//       },
//       {
//         emp_id: "E005",
//         emp_name: "Robert Brown",
//         department: "Sales",
//         designation: "Sales Executive",
//         email: "robert.brown@example.com",
//         phone: "159-753-4862",
//         salary: 70000
//       }
// ];

// const apiData = [
//     { month: "January", 2023: 15000, 2024: 17000 },
//     { month: "February", 2023: 18000, 2024: 19000 },
//     { month: "March", 2023: 20000, 2024: 22000 },
//     { month: "April", 2023: 21000, 2024: 23000 },
//     { month: "May", 2023: 25000, 2024: 27000 },
//     { month: "June", 2023: 30000, 2024: 32000 }
// ];


const apiData = [
    { "id": 1, "name": "Product A", "category": "Electronics", "sales": 1200 },
    { "id": 2, "name": "Product B", "category": "Electronics", "sales": 1500 },
    { "id": 3, "name": "Product C", "category": "Electronics", "sales": 1100 },
    { "id": 4, "name": "Product D", "category": "Clothing", "sales": 900 },
    { "id": 5, "name": "Product E", "category": "Clothing", "sales": 850 },
    { "id": 6, "name": "Product F", "category": "Clothing", "sales": 970 },
    { "id": 7, "name": "Product G", "category": "Clothing", "sales": 1050 },
    { "id": 8, "name": "Product H", "category": "Furniture", "sales": 1300 },
    { "id": 9, "name": "Product I", "category": "Furniture", "sales": 1400 },
    { "id": 10, "name": "Product J", "category": "Furniture", "sales": 1250 },
    { "id": 11, "name": "Product K", "category": "Furniture", "sales": 1350 },
    { "id": 12, "name": "Product L", "category": "Accessories", "sales": 700 },
    { "id": 13, "name": "Product M", "category": "Accessories", "sales": 650 },
    { "id": 14, "name": "Product N", "category": "Accessories", "sales": 800 },
    { "id": 15, "name": "Product O", "category": "Accessories", "sales": 780 },
    { "id": 16, "name": "Product P", "category": "Accessories", "sales": 720 },
    { "id": 17, "name": "Product Q", "category": "Accessories", "sales": 690 },
    { "id": 18, "name": "Product R", "category": "Books", "sales": 560 },
    { "id": 19, "name": "Product S", "category": "Books", "sales": 600 },
    { "id": 20, "name": "Product T", "category": "Books", "sales": 630 },
    { "id": 21, "name": "Product U", "category": "Books", "sales": 580 },
    { "id": 22, "name": "Product V", "category": "Books", "sales": 590 },
    { "id": 23, "name": "Product W", "category": "Books", "sales": 620 },
    { "id": 24, "name": "Product X", "category": "Toys", "sales": 900 },
    { "id": 25, "name": "Product Y", "category": "Toys", "sales": 950 },
    { "id": 26, "name": "Product Z", "category": "Toys", "sales": 880 },
    { "id": 27, "name": "Product AA", "category": "Toys", "sales": 930 },
    { "id": 28, "name": "Product AB", "category": "Toys", "sales": 920 },
    { "id": 29, "name": "Product AC", "category": "Toys", "sales": 890 },
    { "id": 30, "name": "Product AD", "category": "Beauty", "sales": 770 },
    { "id": 31, "name": "Product AE", "category": "Beauty", "sales": 810 },
    { "id": 32, "name": "Product AF", "category": "Beauty", "sales": 860 },
    { "id": 33, "name": "Product AG", "category": "Beauty", "sales": 780 },
    { "id": 34, "name": "Product AH", "category": "Beauty", "sales": 740 },
    { "id": 35, "name": "Product AI", "category": "Beauty", "sales": 720 },
    { "id": 36, "name": "Product AJ", "category": "Sports", "sales": 1500 },
    { "id": 37, "name": "Product AK", "category": "Sports", "sales": 1600 },
    { "id": 38, "name": "Product AL", "category": "Sports", "sales": 1450 },
    { "id": 39, "name": "Product AM", "category": "Sports", "sales": 1550 },
    { "id": 40, "name": "Product AN", "category": "Sports", "sales": 1480 },
    { "id": 41, "name": "Product AO", "category": "Sports", "sales": 1570 },
    { "id": 42, "name": "Product AP", "category": "Home Appliances", "sales": 1100 },
    { "id": 43, "name": "Product AQ", "category": "Home Appliances", "sales": 1050 },
    { "id": 44, "name": "Product AR", "category": "Home Appliances", "sales": 1080 },
    { "id": 45, "name": "Product AS", "category": "Home Appliances", "sales": 1120 },
    { "id": 46, "name": "Product AT", "category": "Home Appliances", "sales": 1150 },
    { "id": 47, "name": "Product AU", "category": "Home Appliances", "sales": 1070 },
    { "id": 48, "name": "Product AV", "category": "Grocery", "sales": 1300 },
    { "id": 49, "name": "Product AW", "category": "Grocery", "sales": 1250 },
    { "id": 50, "name": "Product AX", "category": "Grocery", "sales": 1280 }

  
]

// const apiData=[
//   { "player": "Alice", "score": 2500 },
//   { "player": "Bob", "score": 3000 },
//   { "player": "Alice", "score": 1500 },
//   { "player": "Charlie", "score": 2000 }
// ]


// const apiData=[
//   { "employee": "John ", "salary": 75000 },
//   { "employee": "Jane Smith", "salary": 82000 },
//   { "employee": "John Doe", "salary": 50000 }
// ]


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const featureName = searchParams.get('feature_name');

    if (!featureName) {
        return NextResponse.json({ error: "Feature name is required" }, { status: 400 });
    }

    // Filter data or fetch from DB based on feature_name
    const filteredData = apiData; // Simulate filtered results based on feature_name
    return NextResponse.json(filteredData, { status: 200 });
}
