import api from './axios';

export const getAllVideos = async () => {
    try {
        const response = await api.get('/videos');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const publishVideo = async (videoData) => {
    try {
        const response = await api.post('/videos', videoData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateVideo = async (videoId, videoData) => {
    try {
        const response = await api.patch(`/videos/${videoId}`, videoData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteVideo = async (videoId) => {
    try {
        const response = await api.delete(`/videos/${videoId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getVideoById = async (videoId) => {
    try {
        const response = await api.get(`/videos/${videoId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
