import { useAuth } from "../context/AuthContext";

const BASE_URL = 'http://localhost:8000/api/v1/likes';

const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const toggleVideoLike = async (videoId) => {
    try {
        const response = await fetch(`${BASE_URL}/toggle/v/${videoId}`, {
            method: 'POST',
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error toggling like:", error);
        throw error;
    }
};

export const getLikedVideos = async () => {
    try {
        const response = await fetch(`${BASE_URL}/videos`, {
            method: 'GET',
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching liked videos:", error);
        throw error;
    }
};
