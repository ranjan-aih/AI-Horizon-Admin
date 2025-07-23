import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

export default function CaseStudy() {
    const [formData, setFormData] = useState({
        title: '',
        heroImageUrl: '',
        summary: '',
        content: [
            {
                section: {
                    title: '',
                    body: '',
                    image: ''
                }
            }
        ],
        sources: [''],
        duration: ''
    });

    // File handling
    const [heroImageFile, setHeroImageFile] = useState(null);
    const [sectionImageFiles, setSectionImageFiles] = useState({});

    const [errors, setErrors] = useState({});

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

    const handleHeroImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHeroImageFile(file);
            // Store filename in form data
            setFormData(prev => ({
                ...prev,
                heroImageUrl: file.name
            }));

            // Clear error when file is selected
            if (errors.heroImageUrl) {
                setErrors(prev => ({
                    ...prev,
                    heroImageUrl: ''
                }));
            }
        }
    };

    const handleSectionImageUpload = (sectionIndex, e) => {
        const file = e.target.files[0];
        if (file) {
            setSectionImageFiles(prev => ({
                ...prev,
                [sectionIndex]: file
            }));

            // Update the form data with filename
            handleContentChange(sectionIndex, 'image', file.name);
        }
    };

    const handleContentChange = (index, field, value) => {
        const newContent = [...formData.content];
        newContent[index] = {
            ...newContent[index],
            section: {
                ...newContent[index].section,
                [field]: value
            }
        };
        setFormData(prev => ({
            ...prev,
            content: newContent
        }));
    };

    const addContentSection = () => {
        setFormData(prev => ({
            ...prev,
            content: [
                ...prev.content,
                {
                    section: {
                        title: '',
                        body: '',
                        image: ''
                    }
                }
            ]
        }));
    };

    const removeContentSection = (index) => {
        if (formData.content.length > 1) {
            const newContent = formData.content.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                content: newContent
            }));

            // Remove associated image file
            setSectionImageFiles(prev => {
                const newFiles = { ...prev };
                delete newFiles[index];
                // Re-index remaining files
                const reindexedFiles = {};
                Object.keys(newFiles).forEach(key => {
                    const numKey = parseInt(key);
                    if (numKey > index) {
                        reindexedFiles[numKey - 1] = newFiles[key];
                    } else {
                        reindexedFiles[key] = newFiles[key];
                    }
                });
                return reindexedFiles;
            });
        }
    };

    const handleSourceChange = (index, value) => {
        const newSources = [...formData.sources];
        newSources[index] = value;
        setFormData(prev => ({
            ...prev,
            sources: newSources
        }));
    };

    const addSource = () => {
        setFormData(prev => ({
            ...prev,
            sources: [...prev.sources, '']
        }));
    };

    const removeSource = (index) => {
        if (formData.sources.length > 1) {
            const newSources = formData.sources.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                sources: newSources
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.heroImageUrl.trim()) {
            newErrors.heroImageUrl = 'Hero image is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        // Prepare data for backend (remove empty sources and convert duration to number)
        const submitData = {
            ...formData,
            sources: formData.sources.filter(source => source.trim() !== ''),
            duration: formData.duration ? Number(formData.duration) : undefined
        };

        // Remove undefined duration if not provided
        if (!submitData.duration) {
            delete submitData.duration;
        }

        console.log('Submitting case study data:', submitData);
        console.log('Hero image file:', heroImageFile);
        console.log('Section image files:', sectionImageFiles);

        // Here you would typically send the data to your backend
        // Example: await fetch('/api/case-studies', { method: 'POST', body: JSON.stringify(submitData) })

        alert('Case study data ready for submission! Check console for data structure.');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Case Study</h1>
                <p className="text-gray-600">Fill in the details below to create a new case study.</p>
            </div>

            <div className="space-y-8">
                {/* Basic Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter case study title"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hero Image *
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                                <div className="space-y-1 text-center">
                                    {heroImageFile ? (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-gray-900 font-medium">{heroImageFile.name}</p>
                                            <p className="text-xs text-gray-500">{(heroImageFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium text-blue-600 hover:text-blue-500">Upload an image</span>
                                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleHeroImageUpload}
                                        className="sr-only"
                                        id="hero-image-upload"
                                    />
                                    <label
                                        htmlFor="hero-image-upload"
                                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        {heroImageFile ? 'Change Image' : 'Choose File'}
                                    </label>
                                </div>
                            </div>
                            {errors.heroImageUrl && <p className="mt-1 text-sm text-red-600">{errors.heroImageUrl}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Summary
                            </label>
                            <textarea
                                value={formData.summary}
                                onChange={(e) => handleInputChange('summary', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Brief summary of the case study"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration (minutes)
                            </label>
                            <input
                                type="number"
                                value={formData.duration}
                                onChange={(e) => handleInputChange('duration', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Reading time in minutes"
                                min="1"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Content Sections</h2>
                        <button
                            type="button"
                            onClick={addContentSection}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Section
                        </button>
                    </div>

                    {formData.content.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-md border border-gray-200 mb-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-medium text-gray-900">Section {index + 1}</h3>
                                {formData.content.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeContentSection(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Section Title
                                    </label>
                                    <input
                                        type="text"
                                        value={item.section.title}
                                        onChange={(e) => handleContentChange(index, 'title', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Section title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Section Body
                                    </label>
                                    <textarea
                                        value={item.section.body}
                                        onChange={(e) => handleContentChange(index, 'body', e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Section content"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Section Image
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                                        <div className="space-y-1 text-center">
                                            {sectionImageFiles[index] ? (
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-center w-8 h-8 mx-auto bg-green-100 rounded-full">
                                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs text-gray-900 font-medium">{sectionImageFiles[index].name}</p>
                                                    <p className="text-xs text-gray-500">{(sectionImageFiles[index].size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <p className="text-xs text-gray-500">Upload image</p>
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleSectionImageUpload(index, e)}
                                                className="sr-only"
                                                id={`section-image-${index}`}
                                            />
                                            <label
                                                htmlFor={`section-image-${index}`}
                                                className="cursor-pointer inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
                                            >
                                                {sectionImageFiles[index] ? 'Change' : 'Choose'}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sources */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Sources</h2>
                        <button
                            type="button"
                            onClick={addSource}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Source
                        </button>
                    </div>

                    {formData.sources.map((source, index) => (
                        <div key={index} className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={source}
                                onChange={(e) => handleSourceChange(index, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Source ${index + 1}`}
                            />
                            {formData.sources.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeSource(index)}
                                    className="px-3 py-2 text-red-600 hover:text-red-800"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <Save className="w-5 h-5 mr-2" />
                        Create Case Study
                    </button>
                </div>
            </div>
        </div>
    );
}