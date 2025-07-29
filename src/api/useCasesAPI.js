import axiosInstance from './axiosInstance';

export const createUseCase = async (formData) => {
    try {
        const response = await axiosInstance.post('/use-cases/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error?.response?.data ||error;
    }
};