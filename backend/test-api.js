const BASE_URL = 'http://localhost:8000/api/v1';

// Test User Credentials (CHANGE THESE IF NEEDED)
const TEST_USER = {
    email: "sana@gmail.com",
    username: "testuser",
    password: "sana.123",
    fullName: "Test User"
};

let accessToken = "";
let userId = "";

async function request(endpoint, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.error(`Error requesting ${endpoint}:`, error.message);
        return { status: 500, error: error.message };
    }
}

async function loginOrRegister() {
    console.log("--- Authenticating ---");
    // Try login
    let response = await request('/users/login', 'POST', {
        email: TEST_USER.email,
        password: TEST_USER.password
    });

    if (response.status === 404 || response.status === 401) {
        console.log("User not found or invalid credentials. Please ensure the test user exists.");
        console.log("You can register a user via Postman or the UI.");
        process.exit(1);
    }

    if (response.status === 200) {
        console.log("Login successful!");
        accessToken = response.data.data.accessToken;
        userId = response.data.data.user._id;
        TEST_USER.username = response.data.data.user.username; // Update username from response
    } else {
        console.error("Login failed:", response.data);
        process.exit(1);
    }
}

async function testUserRoutes() {
    console.log("\n--- Testing User Routes ---");

    // Get Current User
    const currentUser = await request('/users/user');
    console.log(`Get Current User (Status: ${currentUser.status}): ${currentUser.data.data.username}`);

    // Get Channel Profile
    const channelProfile = await request(`/users/c/${TEST_USER.username}`);
    console.log(`Get Channel Profile (Status: ${channelProfile.status}): ${channelProfile.data.data.fullName}`);

    // Get Watch History
    const history = await request('/users/history');
    console.log(`Get Watch History (Status: ${history.status}): Found ${history.data.data.length} videos`);

    // Update Account Details
    const updateDetails = await request('/users/updateAccountDetails', 'PATCH', {
        fullName: "Updated Test User",
        email: TEST_USER.email // Keep email same
    });
    console.log(`Update Account Details (Status: ${updateDetails.status}): ${updateDetails.data.message}`);

    // Change Password (Optional - be careful not to lock out)
    // const changePass = await request('/users/changePassword', 'POST', {
    //     oldPassword: TEST_USER.password,
    //     newPassword: TEST_USER.password
    // });
    // console.log(`Change Password (Status: ${changePass.status}): ${changePass.data.message}`);
}

async function testVideoRoutes() {
    console.log("\n--- Testing Video Routes ---");

    // Get All Videos
    const allVideos = await request('/videos');
    console.log(`Get All Videos (Status: ${allVideos.status}): Found ${allVideos.data.data.docs.length} videos`);

    let videoId = null;
    if (allVideos.data.data.docs.length > 0) {
        videoId = allVideos.data.data.docs[0]._id;
    } else {
        console.log("No videos found to test video specific routes.");
        return;
    }

    // Get Video By ID
    const video = await request(`/videos/${videoId}`);
    console.log(`Get Video By ID (Status: ${video.status}): ${video.data.data.title}`);

    // Toggle Publish Status
    const togglePublish = await request(`/videos/toggle/publish/${videoId}`, 'PATCH');
    console.log(`Toggle Publish Status (Status: ${togglePublish.status}): ${togglePublish.data.message}`);

    // Update Video (requires FormData usually, but let's try JSON for text fields if allowed)
    // Note: The controller expects req.file for thumbnail, so this might fail or just update text.
    // Skipping update/publish as they heavily rely on file uploads which fetch/JSON doesn't handle easily.

    // Delete Video (Only if owner)
    // const deleteVideo = await request(`/videos/${videoId}`, 'DELETE');
    // console.log(`Delete Video (Status: ${deleteVideo.status}): ${deleteVideo.data.message}`);
}

async function testTweetRoutes() {
    console.log("\n--- Testing Tweet Routes ---");

    // Create Tweet
    const createTweet = await request('/tweets', 'POST', {
        content: "This is a test tweet"
    });
    console.log(`Create Tweet (Status: ${createTweet.status}): ${createTweet.data.message}`);

    if (createTweet.status !== 201) return;
    const tweetId = createTweet.data.data._id;

    // Get User Tweets
    const userTweets = await request(`/tweets/user/${userId}`);
    console.log(`Get User Tweets (Status: ${userTweets.status}): Found ${userTweets.data.data.length} tweets`);

    // Update Tweet
    const updateTweet = await request(`/tweets/${tweetId}`, 'PATCH', {
        content: "Updated test tweet"
    });
    console.log(`Update Tweet (Status: ${updateTweet.status}): ${updateTweet.data.message}`);

    // Toggle Tweet Like
    const toggleLike = await request(`/likes/toggle/t/${tweetId}`, 'POST');
    console.log(`Toggle Tweet Like (Status: ${toggleLike.status}): ${toggleLike.data.message}`);

    // Delete Tweet
    const deleteTweet = await request(`/tweets/${tweetId}`, 'DELETE');
    console.log(`Delete Tweet (Status: ${deleteTweet.status}): ${deleteTweet.data.message}`);
}

async function testSubscriptions() {
    console.log("\n--- Testing Subscriptions ---");
    const channelId = userId;

    const response = await request(`/subscriptions/c/${channelId}`, 'POST');
    console.log(`Toggle Subscription (Status: ${response.status}):`, response.data.message);

    const subResponse = await request(`/subscriptions/c/${channelId}`);
    console.log(`Get Channel Subscribers (Status: ${subResponse.status}): Found ${subResponse.data.data?.length || 0} subscribers`);

    const userSubResponse = await request(`/subscriptions/u/${userId}`);
    console.log(`Get User Subscribed Channels (Status: ${userSubResponse.status}): Found ${userSubResponse.data.data?.length || 0} channels`);
}

async function testLikes() {
    console.log("\n--- Testing Likes ---");
    // Fetch videos
    const videosResponse = await request('/videos');
    let videoId = null;

    if (videosResponse.data.data.docs && videosResponse.data.data.docs.length > 0) {
        videoId = videosResponse.data.data.docs[0]._id;
    } else {
        console.log("No videos found to test likes.");
        return;
    }

    const toggleResponse = await request(`/likes/toggle/v/${videoId}`, 'POST');
    console.log(`Toggle Video Like (Status: ${toggleResponse.status}):`, toggleResponse.data.message);

    const likedVideosResponse = await request('/likes/videos');
    console.log(`Get Liked Videos (Status: ${likedVideosResponse.status}): Found ${likedVideosResponse.data.data?.length || 0} liked videos`);
}

async function testPlaylists() {
    console.log("\n--- Testing Playlists ---");

    // Create Playlist
    const createResponse = await request('/playlists', 'POST', {
        name: "Test Playlist",
        description: "This is a test playlist"
    });
    console.log(`Create Playlist (Status: ${createResponse.status}):`, createResponse.data.message);

    if (createResponse.status !== 200) return;

    const playlistId = createResponse.data.data._id;

    // Get User Playlists
    const listResponse = await request(`/playlists/user/${userId}`);
    console.log(`Get User Playlists (Status: ${listResponse.status}): Found ${listResponse.data.data?.length || 0} playlists`);

    // Get Playlist by ID
    const getResponse = await request(`/playlists/${playlistId}`);
    console.log(`Get Playlist By ID (Status: ${getResponse.status}): Name is '${getResponse.data.data.name}'`);

    // Update Playlist
    const updateResponse = await request(`/playlists/${playlistId}`, 'PATCH', {
        name: "Updated Playlist Name",
        description: "Updated Description"
    });
    console.log(`Update Playlist (Status: ${updateResponse.status}): ${updateResponse.data.message}`);

    // Add Video to Playlist
    const videosResponse = await request('/videos');
    if (videosResponse.data.data.docs.length > 0) {
        const videoId = videosResponse.data.data.docs[0]._id;
        const addVideo = await request(`/playlists/add/${videoId}/${playlistId}`, 'PATCH');
        console.log(`Add Video to Playlist (Status: ${addVideo.status}): ${addVideo.data.message}`);

        const removeVideo = await request(`/playlists/remove/${videoId}/${playlistId}`, 'PATCH');
        console.log(`Remove Video from Playlist (Status: ${removeVideo.status}): ${removeVideo.data.message}`);
    }

    // Delete Playlist
    const deleteResponse = await request(`/playlists/${playlistId}`, 'DELETE');
    console.log(`Delete Playlist (Status: ${deleteResponse.status}):`, deleteResponse.data.message);
}

async function testComments() {
    console.log("\n--- Testing Comments ---");
    // Fetch videos to get a video ID
    const videosResponse = await request('/videos');
    let videoId = null;

    if (videosResponse.data.data.docs && videosResponse.data.data.docs.length > 0) {
        videoId = videosResponse.data.data.docs[0]._id;
    } else {
        console.log("No videos found to test comments.");
        return;
    }

    // Add Comment
    const addResponse = await request(`/comments/${videoId}`, 'POST', {
        content: "This is a test comment"
    });
    console.log(`Add Comment (Status: ${addResponse.status}):`, addResponse.data.message);

    if (addResponse.status !== 201) return;
    const commentId = addResponse.data.data._id;

    // Toggle Comment Like
    const toggleLike = await request(`/likes/toggle/c/${commentId}`, 'POST');
    console.log(`Toggle Comment Like (Status: ${toggleLike.status}): ${toggleLike.data.message}`);

    // Get Video Comments
    const getResponse = await request(`/comments/${videoId}`);
    console.log(`Get Video Comments (Status: ${getResponse.status}): Found ${getResponse.data.data?.docs?.length || 0} comments`);

    // Update Comment
    const updateResponse = await request(`/comments/c/${commentId}`, 'PATCH', {
        content: "Updated test comment"
    });
    console.log(`Update Comment (Status: ${updateResponse.status}):`, updateResponse.data.message);

    // Delete Comment
    const deleteResponse = await request(`/comments/c/${commentId}`, 'DELETE');
    console.log(`Delete Comment (Status: ${deleteResponse.status}):`, deleteResponse.data.message);
}

async function runTests() {
    try {
        await loginOrRegister();
        await testUserRoutes();
        await testVideoRoutes();
        await testTweetRoutes();
        await testSubscriptions();
        await testLikes();
        await testPlaylists();
        await testComments();
        console.log("\n--- Tests Completed ---");
    } catch (error) {
        console.error("Test script error:", error);
    }
}

runTests();
