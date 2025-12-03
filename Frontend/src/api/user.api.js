import api from './axios.js';

export const getWatchHistory = async () => {
    try {
        const response = await api.get('/users/history');
        return response.data;
    } catch (error) {
        console.error("Error fetching watch history:", error);
        throw error.response?.data || error.message;
    }
};
