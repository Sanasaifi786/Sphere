import React from 'react';

const videos = [
    {
        id: 1,
        title: "Building a YouTube Clone with React & Tailwind CSS",
        thumbnail: "https://i.ytimg.com/vi/yIaXoop8gl4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD_5Zce8y3_tX-q_8sQ4gqgF9q_qg",
        channel: "Code with Me",
        views: "120K views",
        time: "2 days ago",
        duration: "12:45",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        id: 2,
        title: "Top 10 VS Code Extensions for 2024",
        thumbnail: "https://i.ytimg.com/vi/0pThnRneDjw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD_5Zce8y3_tX-q_8sQ4gqgF9q_qg",
        channel: "Tech Tips",
        views: "54K views",
        time: "5 hours ago",
        duration: "8:20",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
        id: 3,
        title: "Learn TypeScript in 1 Hour",
        thumbnail: "https://i.ytimg.com/vi/d56mG7DezGs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD_5Zce8y3_tX-q_8sQ4gqgF9q_qg",
        channel: "Dev Mastery",
        views: "890K views",
        time: "1 year ago",
        duration: "1:05:30",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
        id: 4,
        title: "Next.js 14 Full Course 2024 | Build and Deploy a Full Stack App",
        thumbnail: "https://i.ytimg.com/vi/wm5gMKuwSYk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD_5Zce8y3_tX-q_8sQ4gqgF9q_qg",
        channel: "Javascript Mastery",
        views: "2.1M views",
        time: "3 months ago",
        duration: "5:12:40",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
        id: 5,
        title: "The Future of AI - Is it Dangerous?",
        thumbnail: "https://i.ytimg.com/vi/U9mJuUkhUzk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD_5Zce8y3_tX-q_8sQ4gqgF9q_qg",
        channel: "Future Tech",
        views: "300K views",
        time: "1 week ago",
        duration: "15:10",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
        id: 6,
        title: "React vs Vue vs Angular - Which one to choose?",
        thumbnail: "https://i.ytimg.com/vi/4a5_xL-RzHk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD_5Zce8y3_tX-q_8sQ4gqgF9q_qg",
        channel: "Frontend Daily",
        views: "45K views",
        time: "1 day ago",
        duration: "10:05",
        avatar: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    {
        id: 7,
        title: "Understanding Redux Toolkit in 2024",
        thumbnail: "https://i.ytimg.com/vi/9zySeP5vH9c/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD_5Zce8y3_tX-q_8sQ4gqgF9q_qg",
        channel: "Redux Wizard",
        views: "15K views",
        time: "4 hours ago",
        duration: "22:15",
        avatar: "https://randomuser.me/api/portraits/women/7.jpg"
    },
    {
        id: 8,
        title: "CSS Grid vs Flexbox - When to use which?",
        thumbnail: "https://i.ytimg.com/vi/3elGSZSWTbM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD_5Zce8y3_tX-q_8sQ4gqgF9q_qg",
        channel: "CSS Tricks",
        views: "1.2M views",
        time: "2 years ago",
        duration: "18:30",
        avatar: "https://randomuser.me/api/portraits/men/8.jpg"
    }
];

const Home = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
                <div key={video.id} className="flex flex-col gap-2 cursor-pointer group">
                    <div className="relative rounded-xl overflow-hidden">
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                            {video.duration}
                        </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                        <img
                            src={video.avatar}
                            alt={video.channel}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
                                {video.title}
                            </h3>
                            <p className="text-gray-400 text-xs mt-1 hover:text-white">
                                {video.channel}
                            </p>
                            <p className="text-gray-400 text-xs">
                                {video.views} • {video.time}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
