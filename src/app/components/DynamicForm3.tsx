'use client';

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DynamicForm3 = () => {
    const [formData, setFormData] = useState({});
    const [formTypes, setFormTypes] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchFormConfig = async () => {
            try {
                const response = await fetch('/allFormsConfig.json');
                if (!response.ok) throw new Error('Failed to fetch form config');
                const data = await response.json();
                setFormTypes(data);
            } catch (error) {
                toast.error('Error loading form config');
                console.error('Error loading form config:', error);
            }
        };

        fetchFormConfig();
    }, []);

    const handleFormChange = (e) => {
        const formType = e.target.value;
        const selected = formTypes.find((form) => form.form_type === formType);
        setSelectedForm(selected);

        const initialData = selected?.fields.reduce((acc, field) => {
            acc[field.name] = field.type === 'checkbox' ? false : '';
            return acc;
        }, {}) || {};
        setFormData(initialData);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validate = () => {
        if (!selectedForm) return false;

        for (const field of selectedForm.fields) {
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
                    feature_name: selectedForm.feature_name,
                    data: formData,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                toast.success('Form submitted successfully!');
                setFormData(
                    selectedForm.fields.reduce((acc, field) => {
                        acc[field.name] = field.type === 'checkbox' ? false : '';
                        return acc;
                    }, {})
                );
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

    if (!formTypes.length) return <p>Loading form types...</p>;

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-8 border border-2 rounded p-5">
                    <h2>Select a Form Type</h2>
                    <select className="form-select mb-4" onChange={handleFormChange}>
                        <option value="">Choose a form type...</option>
                        {formTypes.map((form) => (
                            <option key={form.form_type} value={form.form_type}>
                                {form.formName}
                            </option>
                        ))}
                    </select>

                    {selectedForm && (
                        <>
                            <h3>{selectedForm.formName}</h3>
                            <form onSubmit={handleSubmit}>
                                {selectedForm.fields.map((field) => (
                                    <div key={field.name} className="mb-3">
                                        <label className="form-label">{field.label}</label>
                                        {field.type === 'select' ? (
                                            <select
                                                name={field.name}
                                                className="form-select"
                                                value={formData[field.name]}
                                                onChange={handleChange}
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
                                                    type="checkbox"
                                                    name={field.name}
                                                    className="form-check-input"
                                                    checked={formData[field.name]}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">{field.label}</label>
                                            </div>
                                        ) : (
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                className="form-control"
                                                placeholder={field.placeholder}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                            />
                                        )}
                                    </div>
                                ))}
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DynamicForm3;
