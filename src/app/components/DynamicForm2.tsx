'use client';

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DynamicForm = () => {
    const [formData, setFormData] = useState({});
    const [form, setForm] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchFormConfig = async () => {
            try {
                const response = await fetch('/formConfig.json');
                if (!response.ok) throw new Error('Failed to fetch form config');
                const data = await response.json();
                const config = data[0];
                setForm(config);

                const initialData = config.fields.reduce((acc, field) => {
                    acc[field.name] = field.type === 'checkbox' ? false : '';
                    return acc;
                }, {});
                setFormData(initialData);
            } catch (error) {
                toast.error('Error loading form config');
                console.error('Error loading form config:', error);
            }
        };

        fetchFormConfig();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validate = () => {
        for (const field of form.fields) {
            for (const validation of field.validations || []) {
                if (validation.rule === 'required' && !formData[field.name]) {
                    toast.error(validation.message);
                    document.getElementsByName(field.name)[0]?.focus();
                    return false;
                }
                if (validation.rule === 'minLength' && formData[field.name]?.length < validation.value) {
                    toast.error(validation.message);
                    document.getElementsByName(field.name)[0]?.focus();
                    return false;
                }
                if (validation.rule === 'minValue' && Number(formData[field.name]) < validation.value) {
                    toast.error(validation.message);
                    document.getElementsByName(field.name)[0]?.focus();
                    return false;
                }
                if (validation.rule === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name])) {
                    toast.error(validation.message);
                    document.getElementsByName(field.name)[0]?.focus();
                    return false;
                }
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/store', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    feature_name: form.feature_name,
                    data: formData,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                toast.success('Form submitted successfully!');
                const resetData = form.fields.reduce((acc, field) => {
                    acc[field.name] = field.type === 'checkbox' ? false : '';
                    return acc;
                }, {});
                setFormData(resetData);
            } else {
                toast.error(result.error || 'Submission failed');
            }
        } catch (error) {
            toast.error('Error submitting form');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!form) return <p>Loading form...</p>;

    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const rows = chunkArray(form.fields, form.row_fields_count);

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className='row justify-content-center' >
                <div className='col-md-7 border border-2 rounded p-5' >
                    <h2>{form.formName}</h2>
                    <p><strong>Feature:</strong> {form.feature_name}</p>
                    <p><strong>Form Type:</strong> {form.form_type}</p>

                    <form onSubmit={handleSubmit} className="mt-4">
                        {rows.map((row, rowIndex) => (
                            <div key={rowIndex} className="row">
                                {row.map((field) => (
                                    <div key={field.name} className={`col-md-${12 / form.row_fields_count} mb-3`}>
                                        {field.label && (
                                            <label htmlFor={field.name} className="form-label">
                                                {field.label}
                                            </label>
                                        )}

                                        {field.type === 'select' ? (
                                            <select
                                                id={field.name}
                                                name={field.name}
                                                className="form-select"
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                            >
                                                <option value="">Select an option</option>
                                                {field.options.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : field.type === 'checkbox' ? (
                                            <div className="form-check">
                                                <input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={formData[field.name]}
                                                    onChange={handleChange}
                                                    disabled={isSubmitting}
                                                />
                                                {field.label && (
                                                    <label className="form-check-label" htmlFor={field.name}>
                                                        {field.label}
                                                    </label>
                                                )}
                                            </div>
                                        ) : (
                                            <input
                                                id={field.name}
                                                name={field.name}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                className="form-control"
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default DynamicForm;
