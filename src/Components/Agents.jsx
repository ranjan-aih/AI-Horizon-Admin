import { useState } from 'react';

export default function Agents() {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: ''
    });

    const [categories, setCategories] = useState([
        'Education & Research',
        'Business Tools',
        'Creative & Content',
        'Health & Wellness',
        'Tech & Development',
        'Lifestyle & Assistance'
    ]);

    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'category' && value === 'ADD_NEW') {
            setShowAddCategory(true);
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddCategory = () => {
        if (newCategory.trim() && !categories.includes(newCategory.trim())) {
            const updatedCategories = [...categories, newCategory.trim()];
            setCategories(updatedCategories);
            setFormData(prev => ({
                ...prev,
                category: newCategory.trim()
            }));
            setNewCategory('');
            setShowAddCategory(false);
        }
    };

    const handleCancelAddCategory = () => {
        setNewCategory('');
        setShowAddCategory(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add API call here
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({
            title: '',
            category: '',
            description: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Add New Agent</h2>
                    <p className="mt-1 text-sm text-gray-600">Fill in the details to create a new agent</p>
                </div>

                {/* Form */}
                <div className="px-6 py-4 space-y-6">
                    {/* Title Field */}
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
                            placeholder="Enter agent title"
                        />
                    </div>

                    {/* Category Field */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>

                        {!showAddCategory ? (
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                                <option value="ADD_NEW" className="font-medium text-blue-600">+ Add New Category</option>
                            </select>
                        ) : (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    placeholder="Enter new category name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                                />
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={handleAddCategory}
                                        disabled={!newCategory.trim() || categories.includes(newCategory.trim())}
                                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancelAddCategory}
                                        className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description Field */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                            placeholder="Enter agent description"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                        >
                            Add Agent
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}