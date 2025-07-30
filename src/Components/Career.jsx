import React, { useState } from 'react';
import { Plus, X, Save, FileText } from 'lucide-react';

const ArrayFieldInput = ({ field, label, placeholder, required = false, formData, handleArrayChange, addArrayItem, removeArrayItem, errors }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {formData[field].map((item) => (
            <div key={item.id} className="flex gap-2">
                <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleArrayChange(field, item.id, e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    type="button"
                    onClick={() => removeArrayItem(field, item.id)}
                    disabled={formData[field].length === 1}
                    className="px-3 py-2 text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    <X size={16} />
                </button>
            </div>
        ))}
        <button
            type="button"
            onClick={() => addArrayItem(field)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
        >
            <Plus size={14} /> Add {label.toLowerCase()}
        </button>
        {errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
    </div>
);

const Career = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobType: '',
        experience: '',
        positionAvailable: '',
        whoWeLooking: [{ id: 1, value: '' }],
        whatYouDo: [{ id: 1, value: '' }],
        bonusPoints: [{ id: 1, value: '' }],
        educationalRequirements: [{ id: 1, value: '' }],
        salary: '',
        salaryReview: '',
        perks: [{ id: 1, value: '' }]
    });

    const [errors, setErrors] = useState({});
    const [nextId, setNextId] = useState(2);

    const jobTypes = [
        'Full-time',
        'Part-time',
        'Contract',
        'Freelance',
        'Intern'
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleArrayChange = (field, id, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item) => item.id === id ? { ...item, value } : item)
        }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], { id: nextId, value: '' }]
        }));
        setNextId(prev => prev + 1);
    };

    const removeArrayItem = (field, id) => {
        if (formData[field].length > 1) {
            setFormData(prev => ({
                ...prev,
                [field]: prev[field].filter((item) => item.id !== id)
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
        if (!formData.jobType) newErrors.jobType = 'Job type is required';
        if (!formData.experience) newErrors.experience = 'Experience level is required';
        if (!formData.positionAvailable.trim()) newErrors.positionAvailable = 'Position available is required';

        // Validate array fields
        if (formData.whoWeLooking.every(item => !item.value.trim())) {
            newErrors.whoWeLooking = 'At least one requirement is needed';
        }
        if (formData.whatYouDo.every(item => !item.value.trim())) {
            newErrors.whatYouDo = 'At least one responsibility is needed';
        }
        if (formData.educationalRequirements.every(item => !item.value.trim())) {
            newErrors.educationalRequirements = 'At least one educational requirement is needed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Filter out empty array items and convert back to simple string arrays
            const cleanedData = {
                ...formData,
                whoWeLooking: formData.whoWeLooking.filter(item => item.value.trim()).map(item => item.value),
                whatYouDo: formData.whatYouDo.filter(item => item.value.trim()).map(item => item.value),
                bonusPoints: formData.bonusPoints.filter(item => item.value.trim()).map(item => item.value),
                educationalRequirements: formData.educationalRequirements.filter(item => item.value.trim()).map(item => item.value),
                perks: formData.perks.filter(item => item.value.trim()).map(item => item.value)
            };

            console.log('Job posting data:', cleanedData);
            alert('Job posting saved successfully!');
        }
    };

    const resetForm = () => {
        setFormData({
            jobTitle: '',
            jobType: '',
            experience: '',
            positionAvailable: '',
            whoWeLooking: [{ id: 1, value: '' }],
            whatYouDo: [{ id: 1, value: '' }],
            bonusPoints: [{ id: 1, value: '' }],
            educationalRequirements: [{ id: 1, value: '' }],
            salary: '',
            salaryReview: '',
            perks: [{ id: 1, value: '' }]
        });
        setErrors({});
        setNextId(2);
    };



    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg">
                        <div className="flex items-center gap-3">
                            <FileText className="text-white" size={24} />
                            <h1 className="text-2xl font-bold text-white">Job Posting Admin Panel</h1>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.jobTitle}
                                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Senior Software Engineer"
                                />
                                {errors.jobTitle && <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.jobType}
                                    onChange={(e) => handleInputChange('jobType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select job type</option>
                                    {jobTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.jobType && <p className="mt-1 text-sm text-red-600">{errors.jobType}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Experience Level <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.experience}
                                    onChange={(e) => handleInputChange('experience', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 3-5 years experience required"
                                />
                                {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Positions Available <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.positionAvailable}
                                    onChange={(e) => handleInputChange('positionAvailable', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 3 positions"
                                />
                                {errors.positionAvailable && <p className="mt-1 text-sm text-red-600">{errors.positionAvailable}</p>}
                            </div>
                        </div>

                        {/* Compensation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Salary
                                </label>
                                <input
                                    type="text"
                                    value={formData.salary}
                                    onChange={(e) => handleInputChange('salary', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., $80,000 - $120,000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Salary Review
                                </label>
                                <input
                                    type="text"
                                    value={formData.salaryReview}
                                    onChange={(e) => handleInputChange('salaryReview', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Annual review"
                                />
                            </div>
                        </div>

                        {/* Array Fields */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ArrayFieldInput
                                field="whoWeLooking"
                                label="Who We're Looking For"
                                placeholder="e.g., 5+ years of React experience"
                                required
                                formData={formData}
                                handleArrayChange={handleArrayChange}
                                addArrayItem={addArrayItem}
                                removeArrayItem={removeArrayItem}
                                errors={errors}
                            />

                            <ArrayFieldInput
                                field="whatYouDo"
                                label="What You'll Do"
                                placeholder="e.g., Develop user interfaces"
                                required
                                formData={formData}
                                handleArrayChange={handleArrayChange}
                                addArrayItem={addArrayItem}
                                removeArrayItem={removeArrayItem}
                                errors={errors}
                            />

                            <ArrayFieldInput
                                field="educationalRequirements"
                                label="Educational Requirements"
                                placeholder="e.g., Bachelor's in Computer Science"
                                required
                                formData={formData}
                                handleArrayChange={handleArrayChange}
                                addArrayItem={addArrayItem}
                                removeArrayItem={removeArrayItem}
                                errors={errors}
                            />

                            <ArrayFieldInput
                                field="bonusPoints"
                                label="Bonus Points"
                                placeholder="e.g., Experience with TypeScript"
                                formData={formData}
                                handleArrayChange={handleArrayChange}
                                addArrayItem={addArrayItem}
                                removeArrayItem={removeArrayItem}
                                errors={errors}
                            />
                        </div>

                        <ArrayFieldInput
                            field="perks"
                            label="Perks & Benefits"
                            placeholder="e.g., Health insurance, flexible hours"
                            formData={formData}
                            handleArrayChange={handleArrayChange}
                            addArrayItem={addArrayItem}
                            removeArrayItem={removeArrayItem}
                            errors={errors}
                        />

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Reset Form
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <Save size={16} />
                                Save Job Posting
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Career;