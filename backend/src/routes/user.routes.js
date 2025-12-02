import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateUserDetails, userAvatarUpdate, userCoverImageUpdate } from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT, verifyJWTOptional } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refreshToken").post(refreshAccessToken)

router.route("/changePassword").post(verifyJWT, changeCurrentPassword)
router.route("/user").get(verifyJWT, getCurrentUser)
router.route("/updateAccountDetails").patch(verifyJWT, updateUserDetails)
router.route("/updateAvatar").patch(verifyJWT, upload.single("avatar"), userAvatarUpdate)
router.route("/updateCoverImage").patch(verifyJWT, upload.single("coverImage"), userCoverImageUpdate)
router.route("/c/:username").get(verifyJWTOptional, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router;