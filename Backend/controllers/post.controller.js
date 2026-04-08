import Post from "../models/post.model.js";
import Media from "../models/media.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Tag from "../models/tag.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendMail from "../utils/sendMail.utills.js";
import generateNgoTagNotificationHTML from "../helper/Mails/ngoTagMessage.js"
import NGO from "../models/ngo.model.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createPost = async (req, res) => {
  const { title, description, tag, anonymous, location } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  // ensure array
  let tags = tag;
  if (tag && !Array.isArray(tag)) {
    tags = [tag];
  }

  // ✅ STEP 1: Upload media
  let mediaLinks = [];
  if (req.files?.post_media) {
    for (let file of req.files.post_media) {
      let uploaded = await uploadOnCloudinary(file.path);
      if (!uploaded) throw new ApiError(500, "Upload failed");
      mediaLinks.push(uploaded);
    }
  }

  // ✅ STEP 2: Validate NGOs first
  let validNgos = [];

  if (tags && tags.length > 0) {
    for (let id of tags) {

      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid ID:", id);
        continue;
      }

      const ngo = await NGO.findById(id);
      if (!ngo) continue;

      validNgos.push(ngo);
    }
  }

  // ✅ STEP 3: Create post (NOW we have everything)
  const post = await Post.create({
    title,
    description,
    user_name: req.user.user_name,
    media: mediaLinks,
    tag: validNgos.map(n => n._id),
    location: {
      latitude: null,
      longitude: null,
      address: location || null,
    },
    anonymous: anonymous || false,
  });

  // ✅ STEP 4: Now create Tag entries (IMPORTANT)
  for (let ngo of validNgos) {

    await Tag.create({
      post_id: post._id,   // ✅ NOW AVAILABLE
      ngo_id: ngo._id,
    });

    // send mail
    try {
      const msg = generateNgoTagNotificationHTML(ngo.name, ngo.email, "");
      await sendMail({
        email: ngo.email,
        subject: "Tagged in a post",
        messageHTML: msg,
      });
    } catch (err) {
      console.log("Mail error:", err);
    }
  }

  res.status(201).json(new ApiResponse(201, post, "Post created successfully"));
}

const getPost = async (req, res) => {
    const { post_id } = req.params;

    if (!post_id) {
        throw new ApiError(400, "Post ID is required");
    }

    const post = await Post.findById(post_id).populate("user_name").sort({ createdAt: -1 });
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    res.json(new ApiResponse(200, post, "Post retrieved successfully"));
}

const getAllPosts = async (req, res) => {
    const posts = await Post.find().populate("user_name").sort({ createdAt: -1 });
    if (!posts) {
        throw new ApiError(404, "Posts not found");
    }

    res.json(new ApiResponse(200, posts, "Posts retrieved successfully"));
}

// const updatePost = async (req, res) => {
//     const { post_id } = req.params;
//     const { title, description, anonymous } = req.body;

//     if (!post_id) {
//         throw new ApiError(400, "Post ID is required");
//     }

//     const post = await Post.findById(post_id);
//     if (!post) {
//         throw new ApiError(404, "Post not found");
//     }

//     post.title = title || post.title;
//     post.description = description || post.description;
//     post.anonymous = anonymous || post.anonymous;
//     post.updatedAt = Date.now();

//     await post.save();

//     res.json(new ApiResponse(200, post, "Post updated successfully"));
// }

const togglePostStatus = asyncHandler(async (req, res) => {
  const { post_id, status } = req.body;

  if (!post_id || !status) {
    throw new ApiError(400, "Post ID and status are required");
  }

  if (!mongoose.Types.ObjectId.isValid(post_id)) {
    throw new ApiError(400, "Invalid Post ID");
  }

  const validStatuses = ["unsolved", "inconsideration", "solved"];

  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  const post = await Post.findById(post_id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  post.status = status;

  await post.save();

  return res.status(200).json(
    new ApiResponse(200, post, `Post status updated to ${status}`)
  );
});
export {createPost,getPost,getAllPosts,togglePostStatus} ;