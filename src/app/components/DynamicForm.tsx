'use client';

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DynamicForm = () => {
    const [form, setForm] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchFormConfig = async () => {
            try {
                const response = await fetch('/formConfigTodo.json');
                if (!response.ok) throw new Error('Failed to fetch form config');
                const data = await response.json();
                setForm(data[0]);
            } catch (error) {
                toast.error('Error loading form config');
                console.error('Error loading form config:', error);
            }
        };

        fetchFormConfig();
    }, []);

    const addUser = () => {
        const newUser = form.fields.reduce((acc, field) => {
            acc[field.name] = field.type === 'checkbox' ? false : '';
            return acc;
        }, {});
        setUsers([...users, newUser]);
    };

    const deleteUser = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
    };

    const handleChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedUsers = [...users];
        updatedUsers[index][name] = type === 'checkbox' ? checked : value;
        setUsers(updatedUsers);
    };

    if (!form) return <p>Loading form...</p>;

    return (
        <div className="container mt-5">
            <ToastContainer />
            <h2>{form.formName}</h2>
            <p><strong>Feature:</strong> {form.feature_name}</p>
            <p><strong>Form Type:</strong> {form.form_type}</p>

            {users.map((user, index) => (
                <div key={index} className="d-flex align-items-center gap-2 mb-2">
                    {form.fields.map((field) => (
                        <input
                            key={field.name}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            className="form-control"
                            value={user[field.name]}
                            onChange={(e) => handleChange(index, e)}
                            style={{ maxWidth: '250px' }}
                        />
                    ))}
                    <button type="button" className="btn btn-primary" onClick={addUser}>
                        Add
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => deleteUser(index)}>
                        Delete
                    </button>
                </div>
            ))}

            {users.length === 0 && (
                <button type="button" className="btn btn-primary" onClick={addUser}>
                    Add User
                </button>
            )}
        </div>
    );
};

export default DynamicForm;
