import React, { useEffect, useState } from 'react';
import { Heart, HeartOff, MapPin } from 'lucide-react';
import axiosInstance from '../../helper/axiosinstance';
import { useLocation } from 'react-router-dom';

const PostCard = ({ post, updatePostStatus }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [currentImg, setCurrentImg] = useState(0);

  const location = useLocation();
  const isNgoDashboard = location.pathname === '/ngo-dashboard';
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    getLikesCount();
    if (userType !== "ngo") {
      checkIfLiked();
    }
  }, [post._id]);

  const getLikesCount = async () => {
    try {
      const res = await axiosInstance.get(`/like/getlikescount/${post._id}`);
      setLikesCount(res.data.data);
    } catch (err) {
      console.error('Error fetching likes count:', err);
    }
  };

  const checkIfLiked = async () => {
    try {
      const res = await axiosInstance.get(`/like/isliked/${post._id}`);
      setLiked(res.data.data === true);
    } catch (err) {
      console.error('Error checking like:', err);
    }
  };

  const toggleLike = async () => {
    try {
      const res = await axiosInstance.post('/like/togglelike', {
        post_id: post._id,
      });

      if (res.data.success) {
        const isNowLiked = !liked;
        setLiked(isNowLiked);
        setLikesCount((prev) => (isNowLiked ? prev + 1 : prev - 1));
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleStatusChange = async (postId, newStatus) => {
    try {
      await axiosInstance.patch("/post/toggleStatus", {
        post_id: postId,
        status: newStatus,
      });

      // ✅ update parent state
      updatePostStatus(postId, newStatus);

    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleNext = () => {
    setCurrentImg((prev) => (prev + 1) % post.media.length);
  };

  const handlePrev = () => {
    setCurrentImg((prev) => (prev - 1 + post.media.length) % post.media.length);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 max-w-md w-full">
      
      {/* Title + Like */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>

        {userType !== "ngo" && (
          <button onClick={toggleLike} className="flex items-center gap-1">
            {liked ? <Heart className="text-red-500" /> : <HeartOff className="text-gray-400" />}
            <span className="text-sm text-gray-500">{likesCount}</span>
          </button>
        )}
      </div>

      {/* Location */}
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <MapPin className="w-4 h-4 mr-1" />
        {post.location?.address || "Location not provided"}
      </div>

      {/* Image */}
      {post.media?.length > 0 && (
        <div className="relative mb-3 aspect-square w-full">
          <img
            src={post.media[currentImg]}
            alt="post media"
            className="w-full h-full object-cover rounded-xl"
          />

          {post.media.length > 1 && (
            <>
              <button onClick={handlePrev} className="absolute left-2 top-1/2 bg-black text-white px-2 py-1 rounded-full">
                ‹
              </button>
              <button onClick={handleNext} className="absolute right-2 top-1/2 bg-black text-white px-2 py-1 rounded-full">
                ›
              </button>
            </>
          )}
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-gray-700 mb-2">{post.description}</p>

      {/* Status Dropdown */}
      {isNgoDashboard && (
        <select
          value={post.status}
          onChange={(e) => handleStatusChange(post._id, e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="unsolved">Unsolved</option>
          <option value="inconsideration">In Consideration</option>
          <option value="solved">Resolved</option>
        </select>
      )}
    </div>
  );
};

export default PostCard;