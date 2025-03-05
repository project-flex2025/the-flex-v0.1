"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap 5 CSS
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css"; // DataTables Bootstrap 5 styling
import "flatpickr/dist/flatpickr.min.css"; // Flatpickr CSS
import flatpickr from "flatpickr";

const TableComponent = () => {
    const [selectedDate, setSelectedDate] = useState(""); // State for selected date
    const [tableData, setTableData] = useState([]); // State for table data
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);

        // Import jQuery inside useEffect to prevent SSR errors
        const $ = require("jquery");
        require("datatables.net-bs5"); // DataTables Bootstrap 5 integration

        // Initialize DataTables (Example)
        $(document).ready(function () {
            $("#myTable").DataTable();
        });

    }, []);


    useEffect(() => {
        // Fetch Data from data.json
        fetch("/data.json") // Assuming `data.json` is in `public/`
            .then((response) => response.json())
            .then((data) => {
                setTableData(data);
                initializeDataTable();
            })
            .catch((error) => console.error("Error fetching data:", error));

        // Initialize Flatpickr (Date Picker)
        flatpickr("#datepicker", {
            dateFormat: "d-m-Y",
            defaultDate: new Date(),
            onChange: function (selectedDates, dateStr) {
                setSelectedDate(dateStr);
            },
        });
    }, []);

    // Initialize DataTables
    const initializeDataTable = () => {
        setTimeout(() => {
            const $table = $("#basic-datatables") as any;

            if (!$table.DataTable().settings()[0]) {
                $table.DataTable({
                    paging: true,
                    searching: true,
                    ordering: true,
                    info: true,
                    lengthMenu: [10, 25, 50],
                    pageLength: 10,
                    language: {
                        search: "Search:",
                        lengthMenu: "Show _MENU_ entries",
                        info: "Showing _START_ to _END_ of _TOTAL_ entries",
                    },
                });
            }
        }, 100);
    };



    // Function to apply background color based on status
    const getStatusClass = (status: any) => {
        switch (status.toLowerCase()) {
            case "work from office":
                return "bg-blue1 text-blue"; // Blue background
            case "absent":
                return "bg-warning1 text-danger"; // Red background
            case "late arrival":
                return "bg-yellow1 text-yellow"; // Yellow background
            default:
                return "bg-light text-dark"; // Default grey background
        }
    };

    return (
        <div className="row" >
            <div className="col-md-12" >
                <div className="card" >
                    <div className="card-header d-flex justify-content-between align-items-center" >
                        <h4 className="card-title" > Attendance Overview </h4>
                        < div className="form-group" >
                            <div className="input-group" id="datepicker" style={{ maxWidth: "180px" }
                            }>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedDate}
                                    readOnly
                                />
                                <span className="input-group-text" >
                                    <i className="fa-regular fa-calendar" > </i>
                                </span>
                            </div>
                        </div>
                    </div>
                    < div className="card-body" >
                        <div className="table-responsive" >
                            <table id="basic-datatables" className="table table-bordered-bottom test-table" >
                                <thead>
                                    <tr>
                                        <th>ID </th>
                                        < th > Name </th>
                                        < th > Role </th>
                                        < th > Department </th>
                                        < th > Status </th>
                                        < th > Check in </th>
                                        < th > Check out </th>
                                        < th > Work hours </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tableData.length > 0 ? (
                                            tableData.map((row: any, index) => (
                                                <tr key={index} >
                                                    <td>{row.id} </td>
                                                    < td > {row.name} </td>
                                                    < td > {row.role} </td>
                                                    < td > {row.department} </td>
                                                    < td >
                                                        <span className={`text-center ps-1 pe-1 p-1 rounded-2 ${getStatusClass(row.status)}`}>
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                    < td > {row.checkIn} </td>
                                                    < td > {row.checkOut} </td>
                                                    < td > {row.workHours} </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="text-center" >
                                                    Loading data...
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableComponent;
