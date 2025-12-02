import React, { useState, useEffect, useRef } from 'react';
import { getAllVideos } from '../api/video.api';
import { Heart, MessageCircle, Share2, MoreVertical, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';

const Trending = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getAllVideos();
                // Shuffle videos to simulate "trending" or random feed
                const shuffled = response.data.docs.sort(() => 0.5 - Math.random());
                setVideos(shuffled);
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    if (loading) return <div className="text-white text-center mt-10">Loading trending videos...</div>;

    return (
        <div
            className="h-[calc(100vh-4rem)] w-full overflow-y-scroll snap-y snap-mandatory bg-black no-scrollbar"
            ref={containerRef}
        >
            {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
            ))}
        </div>
    );
};

const VideoCard = ({ video }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current.play();
                    setIsPlaying(true);
                } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.6 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    return (
        <div className="h-full w-full snap-start relative flex justify-center bg-black">
            <div className="relative h-full w-full max-w-[450px] bg-gray-900">
                {/* Video Player */}
                <video
                    ref={videoRef}
                    src={video.videoFile}
                    className="h-full w-full object-cover cursor-pointer"
                    loop
                    onClick={togglePlay}
                    playsInline
                />

                {/* Controls Overlay */}
                <div className="absolute top-4 right-4 z-10">
                    <button onClick={toggleMute} className="p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                </div>

                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Play size={64} className="text-white/50 fill-white/50" />
                    </div>
                )}

                {/* Right Side Actions */}
                <div className="absolute bottom-20 right-2 flex flex-col gap-6 items-center z-10">
                    <div className="flex flex-col items-center gap-1">
                        <button className="p-3 bg-gray-800/60 rounded-full text-white hover:bg-gray-700 transition">
                            <Heart size={28} />
                        </button>
                        <span className="text-white text-xs font-medium">Like</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <button className="p-3 bg-gray-800/60 rounded-full text-white hover:bg-gray-700 transition">
                            <MessageCircle size={28} />
                        </button>
                        <span className="text-white text-xs font-medium">Comment</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <button className="p-3 bg-gray-800/60 rounded-full text-white hover:bg-gray-700 transition">
                            <Share2 size={28} />
                        </button>
                        <span className="text-white text-xs font-medium">Share</span>
                    </div>
                    <button className="p-3 bg-gray-800/60 rounded-full text-white hover:bg-gray-700 transition">
                        <MoreVertical size={24} />
                    </button>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-4 right-16 z-10 text-white">
                    <div className="flex items-center gap-3 mb-3">
                        <img
                            src={video.ownerDetails?.avatar || "https://via.placeholder.com/40"}
                            alt={video.ownerDetails?.username}
                            className="w-10 h-10 rounded-full border border-white/50 object-cover"
                        />
                        <Link to={`/c/${video.ownerDetails?.username}`} className="font-semibold hover:underline">
                            @{video.ownerDetails?.username || "unknown"}
                        </Link>
                        <button className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gray-200 transition">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-sm line-clamp-2 mb-2">{video.title}</p>
                    <p className="text-xs text-gray-300 line-clamp-1">{video.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Trending;
