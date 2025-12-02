import React, { useEffect, useState } from 'react';
import { getAllVideos, deleteVideo } from '../api/video.api';
import { Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const response = await getAllVideos();
            // response.data is the pagination object, docs array contains the videos
            setVideos(response.data.docs);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleDelete = async (e, videoId) => {
        e.stopPropagation(); // Prevent card click
        if (window.confirm("Are you sure you want to delete this video?")) {
            try {
                await deleteVideo(videoId);
                // Refresh the list
                fetchVideos();
            } catch (error) {
                console.error("Error deleting video:", error);
                alert("Failed to delete video");
            }
        }
    };

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

    if (loading) {
        return <div className="text-white text-center mt-10">Loading videos...</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
                <div key={video._id} className="flex flex-col gap-2 cursor-pointer group relative">
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
                            src={video.ownerDetails?.avatar || "https://via.placeholder.com/40"}
                            alt={video.ownerDetails?.username}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                        <div className="flex flex-col flex-1">
                            <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2" title={video.title}>
                                {video.title}
                            </h3>
                            <p className="text-gray-400 text-xs mt-1 hover:text-white">
                                {video.ownerDetails?.username || "Unknown User"}
                            </p>
                            <p className="text-gray-400 text-xs">
                                {video.views} views • {formatTimeAgo(video.createdAt)}
                            </p>
                        </div>
                        <div className="flex items-start gap-1">
                            <Link
                                to={`/edit/${video._id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-gray-400 hover:text-blue-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Edit Video"
                            >
                                <Edit size={16} />
                            </Link>
                            <button
                                onClick={(e) => handleDelete(e, video._id)}
                                className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete Video"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
