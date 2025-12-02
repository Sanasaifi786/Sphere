import api from './axios.js';

export const toggleSubscription = async (channelId) => {
    try {
        const response = await api.post(`/subscriptions/c/${channelId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getUserChannelSubscribers = async (channelId) => {
    try {
        const response = await api.get(`/subscriptions/c/${channelId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getSubscribedChannels = async (subscriberId) => {
    try {
        const response = await api.get(`/subscriptions/u/${subscriberId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
