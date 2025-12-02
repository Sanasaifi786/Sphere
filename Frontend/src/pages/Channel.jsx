import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toggleSubscription } from '../api/subscription.api';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function Channel() {
    const { username } = useParams();
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const response = await api.get(`/users/c/${username}`);
                const result = response.data;
                setChannel(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchChannel();
        }
    }, [username]);

    const handleSubscribe = async () => {
        if (!user) {
            alert("Please login to subscribe");
            return;
        }
        try {
            const response = await toggleSubscription(channel._id);
            if (response.success) {
                setChannel((prev) => ({
                    ...prev,
                    isSubscribed: response.data.subscribed,
                    subscriberCount: response.data.subscribed ? prev.subscriberCount + 1 : prev.subscriberCount - 1
                }));
            }
        } catch (error) {
            console.error("Error toggling subscription:", error);
            alert("Error subscribing: " + (error.message || "Unknown error"));
        }
    };

    if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
    if (!channel) return <div className="text-white text-center mt-10">Channel not found</div>;

    return (
        <div className="text-white">
            {/* Cover Image */}
            <div className="h-48 w-full bg-gray-800 relative">
                {channel.coverImage ? (
                    <img src={channel.coverImage} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">No Cover Image</div>
                )}
            </div>

            {/* Channel Info */}
            <div className="px-10 py-6 flex items-start gap-6">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#121212] -mt-16">
                    {channel.avatar ? (
                        <img src={channel.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-purple-600 flex items-center justify-center text-4xl font-bold">
                            {channel.fullName?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">{channel.fullName}</h1>
                    <div className="text-gray-400 flex items-center gap-2 mt-1">
                        <span>@{channel.username}</span>
                        <span>•</span>
                        <span>{channel.subscriberCount} subscribers</span>
                        <span>•</span>
                        <span>{channel.subscribedToChannel} subscribed</span>
                    </div>
                </div>

                <button
                    onClick={handleSubscribe}
                    className={`px-4 py-2 rounded-full font-medium ${channel.isSubscribed ? 'bg-gray-200 text-black' : 'bg-white text-black hover:bg-gray-200'}`}
                >
                    {channel.isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>

            <div className="px-10 border-b border-gray-800">
                <div className="flex gap-6 text-gray-400 font-medium">
                    <button className="py-3 border-b-2 border-white text-white">Home</button>
                    <button className="py-3 hover:text-white">Videos</button>
                    <button className="py-3 hover:text-white">Playlists</button>
                    <button className="py-3 hover:text-white">Community</button>
                </div>
            </div>
        </div>
    );
}

export default Channel;
