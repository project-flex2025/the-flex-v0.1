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


// const apiData = [
//     {
//         "order_id": 1001,
//         "customer_name": "John Doe",
//         "product_name": "Wireless Mouse",
//         "quantity": 2,
//         "price_per_unit": 20.00,
//         "total_price": 40.00,
//         "order_date": "2025-03-05",
//         "status": "Completed"
//     },
//     {
//         "order_id": 1002,
//         "customer_name": "Jane Smith",
//         "product_name": "Mechanical Keyboard",
//         "quantity": 1,
//         "price_per_unit": 80.00,
//         "total_price": 80.00,
//         "order_date": "2025-03-05",
//         "status": "Processing"
//     },
//     {
//         "order_id": 1003,
//         "customer_name": "Bob Johnson",
//         "product_name": "Laptop Stand",
//         "quantity": 3,
//         "price_per_unit": 25.00,
//         "total_price": 75.00,
//         "order_date": "2025-03-04",
//         "status": "Shipped"
//     },
//     {
//         "order_id": 1004,
//         "customer_name": "Alice Brown",
//         "product_name": "USB-C Charger",
//         "quantity": 1,
//         "price_per_unit": 30.00,
//         "total_price": 30.00,
//         "order_date": "2025-03-03",
//         "status": "Completed"
//     },
//     {
//         "order_id": 1005,
//         "customer_name": "Charlie White",
//         "product_name": "Bluetooth Speaker",
//         "quantity": 2,
//         "price_per_unit": 50.00,
//         "total_price": 100.00,
//         "order_date": "2025-03-02",
//         "status": "Pending"
//     }
// ]


const apiData = [
    { "order_id": 1001, "customer_name": "John Doe", "product_name": "Wireless Mouse", "category": "Electronics", "quantity": 2, "price_per_unit": 20.00, "total_price": 40.00, "order_date": "2025-03-05", "status": "Completed" },
    { "order_id": 1002, "customer_name": "Jane Smith", "product_name": "Mechanical Keyboard", "category": "Electronics", "quantity": 1, "price_per_unit": 80.00, "total_price": 80.00, "order_date": "2025-03-05", "status": "Processing" },
    { "order_id": 1003, "customer_name": "Bob Johnson", "product_name": "Laptop Stand", "category": "Accessories", "quantity": 3, "price_per_unit": 25.00, "total_price": 75.00, "order_date": "2025-03-04", "status": "Shipped" },
    { "order_id": 1004, "customer_name": "Alice Brown", "product_name": "USB-C Charger", "category": "Accessories", "quantity": 1, "price_per_unit": 30.00, "total_price": 30.00, "order_date": "2025-03-03", "status": "Completed" },
    { "order_id": 1005, "customer_name": "Charlie White", "product_name": "Bluetooth Speaker", "category": "Audio", "quantity": 2, "price_per_unit": 50.00, "total_price": 100.00, "order_date": "2025-03-02", "status": "Pending" },
    { "order_id": 1006, "customer_name": "Emily Clark", "product_name": "Smartphone Case", "category": "Accessories", "quantity": 4, "price_per_unit": 15.00, "total_price": 60.00, "order_date": "2025-03-01", "status": "Shipped" },
    { "order_id": 1007, "customer_name": "David Lee", "product_name": "Noise Cancelling Headphones", "category": "Audio", "quantity": 1, "price_per_unit": 120.00, "total_price": 120.00, "order_date": "2025-03-05", "status": "Completed" },
    { "order_id": 1008, "customer_name": "Sophia Martinez", "product_name": "External SSD", "category": "Electronics", "quantity": 2, "price_per_unit": 100.00, "total_price": 200.00, "order_date": "2025-03-04", "status": "Processing" },
    { "order_id": 1009, "customer_name": "Michael Johnson", "product_name": "Wireless Earbuds", "category": "Audio", "quantity": 3, "price_per_unit": 70.00, "total_price": 210.00, "order_date": "2025-03-03", "status": "Pending" },
    { "order_id": 1010, "customer_name": "Olivia Taylor", "product_name": "Tablet Stand", "category": "Accessories", "quantity": 2, "price_per_unit": 35.00, "total_price": 70.00, "order_date": "2025-03-02", "status": "Completed" },
    { "order_id": 1011, "customer_name": "Liam Wilson", "product_name": "Gaming Mouse", "category": "Electronics", "quantity": 1, "price_per_unit": 45.00, "total_price": 45.00, "order_date": "2025-03-01", "status": "Shipped" },
    { "order_id": 1012, "customer_name": "Emma Moore", "product_name": "Laptop Backpack", "category": "Accessories", "quantity": 2, "price_per_unit": 55.00, "total_price": 110.00, "order_date": "2025-03-05", "status": "Processing" },
    { "order_id": 1013, "customer_name": "Noah Garcia", "product_name": "Portable Power Bank", "category": "Electronics", "quantity": 3, "price_per_unit": 40.00, "total_price": 120.00, "order_date": "2025-03-04", "status": "Completed" },
    { "order_id": 1014, "customer_name": "Ava Martinez", "product_name": "Smartwatch", "category": "Electronics", "quantity": 1, "price_per_unit": 150.00, "total_price": 150.00, "order_date": "2025-03-03", "status": "Pending" },
    { "order_id": 1015, "customer_name": "James Brown", "product_name": "Mechanical Pencil", "category": "Office Supplies", "quantity": 5, "price_per_unit": 5.00, "total_price": 25.00, "order_date": "2025-03-02", "status": "Shipped" },
    { "order_id": 1016, "customer_name": "Isabella Lee", "product_name": "Monitor Stand", "category": "Accessories", "quantity": 1, "price_per_unit": 75.00, "total_price": 75.00, "order_date": "2025-03-01", "status": "Processing" },
    { "order_id": 1017, "customer_name": "William Taylor", "product_name": "Desk Lamp", "category": "Office Supplies", "quantity": 2, "price_per_unit": 30.00, "total_price": 60.00, "order_date": "2025-03-05", "status": "Completed" },
    { "order_id": 1018, "customer_name": "Mia Wilson", "product_name": "Wireless Charger", "category": "Electronics", "quantity": 1, "price_per_unit": 45.00, "total_price": 45.00, "order_date": "2025-03-04", "status": "Processing" },
    { "order_id": 1019, "customer_name": "Alexander Moore", "product_name": "USB Hub", "category": "Accessories", "quantity": 3, "price_per_unit": 25.00, "total_price": 75.00, "order_date": "2025-03-03", "status": "Pending" },
    { "order_id": 1020, "customer_name": "Charlotte Garcia", "product_name": "Bluetooth Keyboard", "category": "Electronics", "quantity": 2, "price_per_unit": 60.00, "total_price": 120.00, "order_date": "2025-03-02", "status": "Shipped" }
];


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
