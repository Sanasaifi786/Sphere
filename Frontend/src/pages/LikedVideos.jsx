import React, { useEffect, useState } from 'react';
import { getLikedVideos } from '../api/like.api';
import { Link } from 'react-router-dom';

const LikedVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLikedVideos = async () => {
            try {
                setLoading(true);
                const response = await getLikedVideos();
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching liked videos:', error);
                setError("Failed to load liked videos. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchLikedVideos();
    }, []);

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        return date.toLocaleDateString();
    };

    if (loading) return <div className="text-white text-center mt-10">Loading liked videos...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-white mb-6">Liked Videos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map((item) => {
                    const video = item.video;
                    if (!video) return null;
                    return (
                        <div key={item._id} className="flex flex-col gap-2 cursor-pointer group relative">
                            <Link to={`/video/${video._id}`} className="relative rounded-xl overflow-hidden aspect-video block">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                                    {formatDuration(video.duration)}
                                </span>
                            </Link>
                            <div className="flex gap-3 mt-2">
                                <img
                                    src={video.owner?.avatar || "https://via.placeholder.com/40"}
                                    alt={video.owner?.username}
                                    className="w-9 h-9 rounded-full object-cover"
                                />
                                <div className="flex flex-col flex-1">
                                    <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2" title={video.title}>
                                        {video.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs mt-1 hover:text-white">
                                        {video.owner?.username || "Unknown User"}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        {video.views} views • {formatTimeAgo(video.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {videos.length === 0 && (
                <div className="text-gray-400 text-center mt-10">
                    You haven't liked any videos yet.
                </div>
            )}
        </div>
    );
};

export default LikedVideos;
