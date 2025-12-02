import React, { useState, useEffect } from 'react';
import { updateVideo, getVideoById } from '../api/video.api';
import { useNavigate, useParams } from 'react-router-dom';

const EditVideo = () => {
    const { videoId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnail: null
    });
    const [currentThumbnail, setCurrentThumbnail] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await getVideoById(videoId);
                const video = response.data;
                setFormData({
                    title: video.title,
                    description: video.description,
                    thumbnail: null
                });
                setCurrentThumbnail(video.thumbnail);
            } catch (error) {
                console.error("Error fetching video:", error);
                alert("Failed to fetch video details");
                navigate('/');
            } finally {
                setFetching(false);
            }
        };
        fetchVideo();
    }, [videoId, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        if (formData.thumbnail) {
            data.append('thumbnail', formData.thumbnail);
        }

        try {
            await updateVideo(videoId, data);
            alert('Video updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error updating video:', error);
            alert('Failed to update video');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="text-white text-center mt-10">Loading video details...</div>;

    return (
        <div className="max-w-2xl mx-auto p-4 text-white">
            <h1 className="text-2xl font-bold mb-6">Edit Video</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-1">New Thumbnail (Optional)</label>
                    <input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    />
                    {currentThumbnail && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-400 mb-1">Current Thumbnail:</p>
                            <img src={currentThumbnail} alt="Current" className="w-32 h-auto rounded" />
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mt-4"
                >
                    {loading ? 'Updating...' : 'Update Video'}
                </button>
            </form>
        </div>
    );
};

export default EditVideo;
