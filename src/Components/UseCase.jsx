import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function AddUseCaseForm() {
    const [formData, setFormData] = useState({
        tags: [''],
        image: null,
        category: '',
        title: '',
        subtitle: '',
        problemStatement: {
            intro: '',
            points: ['']
        },
        solutions: [''],
        impact: [{ value: '', description: '' }]
    });

    const [categories] = useState([
        'IT & Operations',
        'Financial Services & Procurement',
        'Legal & Contract Management',
        'Human Resources & Talent',
        'Sales & Marketing',
        'Data & Research & Analytics'
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleArrayChange = (arrayName, index, value) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) => i === index ? value : item)
        }));
    };

    const handleImpactChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            impact: prev.impact.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            image: file
        }));
    };

    const removeFile = () => {
        setFormData(prev => ({
            ...prev,
            image: null
        }));
        // Reset file input
        const fileInput = document.getElementById('image');
        if (fileInput) fileInput.value = '';
    };

    const addArrayItem = (arrayName) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], '']
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        if (formData[arrayName].length > 1) {
            setFormData(prev => ({
                ...prev,
                [arrayName]: prev[arrayName].filter((_, i) => i !== index)
            }));
        }
    };

    const addImpactItem = () => {
        setFormData(prev => ({
            ...prev,
            impact: [...prev.impact, { value: '', description: '' }]
        }));
    };

    const removeImpactItem = (index) => {
        if (formData.impact.length > 1) {
            setFormData(prev => ({
                ...prev,
                impact: prev.impact.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add API call here
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({
            tags: [''],
            image: null,
            category: '',
            title: '',
            subtitle: '',
            problemStatement: {
                intro: '',
                points: ['']
            },
            solutions: [''],
            impact: [{ value: '', description: '' }]
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Add New Use Case</h2>
                    <p className="mt-1 text-sm text-gray-600">Fill in the details to create a new use case</p>
                </div>

                {/* Form */}
                <div className="px-6 py-4 space-y-8">
                    {/* Tags and Image */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Tags</h3>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                            </label>
                            {formData.tags.map((tag, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder={`Tag ${index + 1}`}
                                    />
                                    {formData.tags.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('tags', index)}
                                            className="px-2 py-2 text-red-600 hover:text-red-800 focus:outline-none"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('tags')}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                            >
                                <Plus size={16} /> Add Tag
                            </button>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                Image
                            </label>
                            {!formData.image ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="image"
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                            <Plus size={24} className="text-gray-400" />
                                        </div>
                                        <span className="text-sm text-gray-600">Click to upload an image</span>
                                        <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</span>
                                    </label>
                                </div>
                            ) : (
                                <div className="border border-gray-300 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                                                <span className="text-blue-600 text-xs font-medium">IMG</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{formData.image.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {(formData.image.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="text-red-600 hover:text-red-800 focus:outline-none"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h3>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter use case title"
                            />
                        </div>

                        {/* Subtitle */}
                        <div>
                            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                id="subtitle"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter subtitle (optional)"
                            />
                        </div>
                    </div>

                    {/* Problem Statement */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Problem Statement</h3>

                        {/* Intro */}
                        <div>
                            <label htmlFor="problemStatement.intro" className="block text-sm font-medium text-gray-700 mb-2">
                                Introduction <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="problemStatement.intro"
                                name="problemStatement.intro"
                                value={formData.problemStatement.intro}
                                onChange={handleInputChange}
                                required
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                                placeholder="Describe the problem introduction"
                            />
                        </div>

                        {/* Points */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Problem Points <span className="text-red-500">*</span>
                            </label>
                            {formData.problemStatement.points.map((point, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={point}
                                        onChange={(e) => handleArrayChange('problemStatement.points', index, e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder={`Problem point ${index + 1}`}
                                        required
                                    />
                                    {formData.problemStatement.points.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    problemStatement: {
                                                        ...prev.problemStatement,
                                                        points: prev.problemStatement.points.filter((_, i) => i !== index)
                                                    }
                                                }));
                                            }}
                                            className="px-2 py-2 text-red-600 hover:text-red-800 focus:outline-none"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        problemStatement: {
                                            ...prev.problemStatement,
                                            points: [...prev.problemStatement.points, '']
                                        }
                                    }));
                                }}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                            >
                                <Plus size={16} /> Add Problem Point
                            </button>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Solutions</h3>
                        {formData.solutions.map((solution, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                <textarea
                    value={solution}
                    onChange={(e) => handleArrayChange('solutions', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                    placeholder={`Solution ${index + 1}`}
                    rows={2}
                    required
                />
                                {formData.solutions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('solutions', index)}
                                        className="px-2 py-2 text-red-600 hover:text-red-800 focus:outline-none"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('solutions')}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                            <Plus size={16} /> Add Solution
                        </button>
                    </div>

                    {/* Impact */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Impact</h3>
                        {formData.impact.map((impactItem, index) => (
                            <div key={index} className="border border-gray-200 rounded-md p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-md font-medium text-gray-800">Impact Item {index + 1}</h4>
                                    {formData.impact.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeImpactItem(index)}
                                            className="text-red-600 hover:text-red-800 focus:outline-none"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Value <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={impactItem.value}
                                        onChange={(e) => handleImpactChange(index, 'value', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Impact value (e.g., 50%, $10M, 2x faster)"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={impactItem.description}
                                        onChange={(e) => handleImpactChange(index, 'description', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                                        placeholder="Describe the impact"
                                        rows={2}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addImpactItem}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                            <Plus size={16} /> Add Impact Item
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                        >
                            Create Use Case
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}