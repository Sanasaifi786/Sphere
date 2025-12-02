import api from './axios.js';

const BASE_URL = '/likes';

export const toggleVideoLike = async (videoId) => {
    try {
        const response = await api.post(`${BASE_URL}/toggle/v/${videoId}`);
        return response.data;
    } catch (error) {
        console.error("Error toggling like:", error);
        throw error.response?.data || error.message;
    }
};

export const toggleVideoDislike = async (videoId) => {
    try {
        const response = await api.post(`${BASE_URL}/toggle/v/${videoId}/dislike`);
        return response.data;
    } catch (error) {
        console.error("Error toggling dislike:", error);
        throw error.response?.data || error.message;
    }
};

export const getLikedVideos = async () => {
    try {
        const response = await api.get(`${BASE_URL}/videos`);
        return response.data;
    } catch (error) {
        console.error("Error fetching liked videos:", error);
        throw error.response?.data || error.message;
    }
};
