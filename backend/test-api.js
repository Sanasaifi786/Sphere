const BASE_URL = 'http://localhost:8000/api/v1';

// Test User Credentials (CHANGE THESE IF NEEDED)
const TEST_USER = {
    email: "sana@gmail.com",
    username: "sana114",
    password: "sana.123",
    fullName: "Sana"
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
    } else {
        console.error("Login failed:", response.data);
        process.exit(1);
    }
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
        console.log("Found video ID:", videoId);
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

    // Delete Playlist
    const deleteResponse = await request(`/playlists/${playlistId}`, 'DELETE');
    console.log(`Delete Playlist (Status: ${deleteResponse.status}):`, deleteResponse.data.message);
}

async function runTests() {
    try {
        await loginOrRegister();
        await testSubscriptions();
        await testLikes();
        await testPlaylists();
        console.log("\n--- Tests Completed ---");
    } catch (error) {
        console.error("Test script error:", error);
    }
}

runTests();
