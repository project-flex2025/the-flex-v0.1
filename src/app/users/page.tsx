"use client";

import { useEffect, useState } from "react";
import EmployeesTab from "../components/EmployeesTab";
import Spinner from "../components/Spinner"; // A simple loading spinner component

const UsersPage = () => {
    const [tabs, setTabs] = useState([]);
    const [selectedTab, setSelectedTab] = useState("");
    const [hasDataTabs, setHasDataTabs] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        setLoading(true); // Start loading
        fetch("/data/usersTabs.json")
            .then((res) => res.json())
            .then((data) => {
                setTabs(data.tabs);

                // Check if any tab has data
                const availableTabs = data.tabs.filter(tab => tab.hasData);
                if (availableTabs.length > 0) {
                    setSelectedTab(availableTabs[0].id);
                    setHasDataTabs(true);
                } else {
                    setHasDataTabs(false);
                }
            })
            .catch((error) => console.error("Error fetching tabs:", error))
            .finally(() => setLoading(false)); // Stop loading
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Users</h1>

            {/* Show loading spinner while data is being fetched */}
            {loading ? (
                <Spinner />
            ) : !hasDataTabs ? (
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Dummy User Table</h5>
                    </div>
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>Admin</td>
                                    <td>johndoe@example.com</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jane Smith</td>
                                    <td>Manager</td>
                                    <td>janesmith@example.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <>
                    {/* Tabs Navigation */}
                    <ul className="nav nav-tabs mb-3">
                        {tabs.map((tab) => (
                            tab.hasData && (
                                <li className="nav-item" key={tab.id}>
                                    <button
                                        className={`nav-link ${selectedTab === tab.id ? "active" : ""}`}
                                        onClick={() => setSelectedTab(tab.id)}
                                    >
                                        {tab.name}
                                    </button>
                                </li>
                            )
                        ))}
                    </ul>

                    {/* Render Content Based on Selected Tab */}
                    {selectedTab === "employees" ? <EmployeesTab /> : <p>No data available for {selectedTab}.</p>}
                </>
            )}
        </div>
    );
};

export default UsersPage;
