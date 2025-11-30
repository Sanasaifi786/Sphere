import React, { useState } from 'react';

const categories = [
    "All", "Gaming", "Music", "Live", "Mixes", "React Routers",
    "Computer programming", "Gadgets", "Podcasts", "Sketch comedy",
    "Recent", "Watched", "New to you"
];

const CategoryPills = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <div className="flex overflow-x-auto pb-4 pt-2 px-4 gap-3 scrollbar-hide w-full sticky top-0 bg-black z-10">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === category
                        ? "bg-white text-black"
                        : "bg-[#272727] text-white hover:bg-[#3f3f3f]"
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryPills;
