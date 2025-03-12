"use client";

import { useEffect, useState } from "react";

const EmployeesTab = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("/data/employees.json")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  return (
    <div>
      {employees.length > 0 ? (
        <ul className="list-disc pl-5">
          {employees.map((emp:any) => (
            <li key={emp.id} className="p-2">
              {emp.name} - {emp.role}
            </li>
          ))}
        </ul>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeesTab;
