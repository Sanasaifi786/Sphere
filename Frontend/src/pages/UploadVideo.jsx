import React, { useState } from 'react';
import { publishVideo } from '../api/video.api';
import { useNavigate } from 'react-router-dom';

const UploadVideo = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        videoFile: null,
        thumbnail: null
    });

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
        data.append('videoFile', formData.videoFile);
        data.append('thumbnail', formData.thumbnail);

        try {
            await publishVideo(data);
            alert('Video uploaded successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Failed to upload video');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 text-white">
            <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
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
                    <label className="block mb-1">Video File</label>
                    <input
                        type="file"
                        name="videoFile"
                        accept="video/*"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    />
                </div>
                <div>
                    <label className="block mb-1">Thumbnail</label>
                    <input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mt-4"
                >
                    {loading ? 'Uploading...' : 'Upload Video'}
                </button>
            </form>
        </div>
    );
};

export default UploadVideo;
