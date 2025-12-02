import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVideoById, getAllVideos } from '../api/video.api';
import { toggleVideoLike } from '../api/like.api';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VideoPlayer = () => {
    const { videoId } = useParams();
    const { user } = useAuth();
    const [video, setVideo] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [videoResponse, recommendationsResponse] = await Promise.all([
                    getVideoById(videoId),
                    getAllVideos()
                ]);
                setVideo(videoResponse.data);
                setIsLiked(videoResponse.data.isLiked);
                setLikesCount(videoResponse.data.likesCount);

                // Filter out current video from recommendations
                const allVideos = recommendationsResponse.data.docs;
                setRecommendations(allVideos.filter(v => v._id !== videoId));
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load video");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        // Scroll to top when videoId changes
        window.scrollTo(0, 0);
    }, [videoId]);

    const handleLike = async () => {
        if (!user) {
            alert("Please login to like videos");
            return;
        }
        try {
            const response = await toggleVideoLike(videoId);
            if (response.success) {
                setIsLiked(!isLiked);
                setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
            }
        } catch (error) {
            console.error("Error liking video:", error);
        }
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

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    if (loading) return <div className="text-white text-center mt-10">Loading video...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
    if (!video) return <div className="text-white text-center mt-10">Video not found</div>;

    return (
        <div className="max-w-[1800px] mx-auto p-4 lg:px-6 pt-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Content - Video Player & Info */}
                <div className="flex-1 min-w-0">
                    {/* Video Player Container */}
                    <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-lg relative group">
                        <video
                            src={video.videoFile}
                            poster={video.thumbnail}
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Video Title */}
                    <h1 className="text-xl md:text-2xl font-bold text-white mt-4 line-clamp-2">
                        {video.title}
                    </h1>

                    {/* Channel Info & Actions Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 gap-4">
                        {/* Channel Info */}
                        <div className="flex items-center gap-4">
                            <Link to={`/c/${video.owner?.username}`} className="flex-shrink-0">
                                <img
                                    src={video.owner?.avatar || "https://via.placeholder.com/40"}
                                    alt={video.owner?.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </Link>
                            <div className="flex flex-col">
                                <Link to={`/c/${video.owner?.username}`} className="font-semibold text-white hover:text-gray-300">
                                    {video.owner?.username || "Unknown User"}
                                </Link>
                                <span className="text-xs text-gray-400">
                                    {video.owner?.subscribersCount || 0} subscribers
                                </span>
                            </div>
                            <button className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors ml-2">
                                Subscribe
                            </button>
                        </div>

                        {/* Actions Buttons */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                            <div className="flex items-center bg-[#272727] rounded-full overflow-hidden">
                                <button
                                    onClick={handleLike}
                                    className={`flex items-center gap-2 px-4 py-2 hover:bg-[#3f3f3f] transition-colors border-r border-[#3f3f3f] text-sm font-medium ${isLiked ? 'text-blue-500' : 'text-white'}`}
                                >
                                    <ThumbsUp size={20} className={isLiked ? 'fill-current' : ''} />
                                    <span>{likesCount}</span>
                                </button>
                                <button className="px-4 py-2 hover:bg-[#3f3f3f] transition-colors text-white">
                                    <ThumbsDown size={20} />
                                </button>
                            </div>

                            <button className="flex items-center gap-2 bg-[#272727] hover:bg-[#3f3f3f] px-4 py-2 rounded-full transition-colors text-white text-sm font-medium">
                                <Share2 size={20} />
                                <span>Share</span>
                            </button>

                            <button className="bg-[#272727] hover:bg-[#3f3f3f] p-2 rounded-full transition-colors text-white">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Description Box */}
                    <div className="mt-4 bg-[#272727] p-4 rounded-xl text-white text-sm hover:bg-[#3f3f3f] transition-colors cursor-pointer">
                        <div className="flex gap-2 font-semibold mb-2">
                            <span>{video.views} views</span>
                            <span>{formatTimeAgo(video.createdAt)}</span>
                        </div>
                        <p className="whitespace-pre-wrap text-white">
                            {video.description}
                        </p>
                    </div>

                    {/* Comments Section Placeholder */}
                    <div className="mt-6 text-white">
                        <h3 className="text-xl font-bold mb-4">Comments</h3>
                        <div className="flex gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                                {user ? (user.fullName ? user.fullName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()) : 'U'}
                            </div>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="flex-1 bg-transparent border-b border-gray-700 focus:border-white outline-none pb-1 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar - Recommendations */}
                <div className="lg:w-[350px] xl:w-[400px] flex-shrink-0 flex flex-col gap-3">
                    {recommendations.map((recVideo) => (
                        <Link to={`/video/${recVideo._id}`} key={recVideo._id} className="flex gap-2 group cursor-pointer">
                            <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                <img
                                    src={recVideo.thumbnail}
                                    alt={recVideo.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                                    {formatDuration(recVideo.duration)}
                                </span>
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <h4 className="text-white font-semibold text-sm line-clamp-2 leading-tight mb-1" title={recVideo.title}>
                                    {recVideo.title}
                                </h4>
                                <p className="text-gray-400 text-xs hover:text-white transition-colors">
                                    {recVideo.ownerDetails?.username || "Unknown Channel"}
                                </p>
                                <p className="text-gray-400 text-xs">
                                    {recVideo.views} views • {formatTimeAgo(recVideo.createdAt)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
