import dotenv from "dotenv"
import mongoose from "mongoose"
import { DB_NAME } from "./constants.js"
import { Video } from "./models/video.model.js"
import { User } from "./models/user.model.js"

dotenv.config({
    path: './.env'
})

const sampleVideos = [
    {
        videoFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg",
        duration: 596
    },
    {
        videoFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Elephants_Dream_poster.jpg/800px-Elephants_Dream_poster.jpg",
        duration: 653
    },
    {
        videoFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        duration: 15
    },
    {
        videoFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tears_of_Steel_poster.jpg/800px-Tears_of_Steel_poster.jpg",
        duration: 734
    }
]

const seedVideos = async () => {
    try {
        console.log("Connecting to DB...")
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("Connected to DB")

        const users = await User.find().select("_id")
        if (users.length === 0) {
            console.log("No users found. Please create users first.")
            process.exit(1)
        }

        console.log(`Found ${users.length} users. Generating videos...`)

        const videosToInsert = []
        for (let i = 0; i < 20; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)]
            const randomVideo = sampleVideos[Math.floor(Math.random() * sampleVideos.length)]

            videosToInsert.push({
                videoFile: randomVideo.videoFile,
                thumbnail: randomVideo.thumbnail,
                title: `Random Video ${i + 1} - ${Math.random().toString(36).substring(7)}`,
                description: `This is a description for random video ${i + 1}. It is very interesting content created for testing purposes.`,
                duration: randomVideo.duration,
                views: Math.floor(Math.random() * 10000),
                isPublished: true,
                owner: randomUser._id
            })
        }

        await Video.insertMany(videosToInsert)
        console.log("Successfully added 20 random videos!")
        process.exit(0)

    } catch (error) {
        console.error("Error seeding videos:", error)
        process.exit(1)
    }
}

seedVideos()
