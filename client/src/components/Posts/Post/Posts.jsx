import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { likePost, deletePost } from '../../../actions/posts';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';


const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <>
            <ThumbUpAltIcon className="inline-block align-middle mr-1" />
            {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
          </>
        ) : (
          <>
            <ThumbUpAltOutlined className="inline-block align-middle mr-1" />
            {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
          </>
        );
    }

    return (
      <>
        <ThumbUpAltOutlined className="inline-block align-middle mr-1" />
        Like
      </>
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <button className="w-full" onClick={openPost}>
        <img className="w-full" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{post.title}</div>
          <p className="text-gray-700 text-base">
            {post.message.split(' ').splice(0, 20).join(' ')}...
          </p>
        </div>
      </button>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {moment(post.createdAt).fromNow()}
        </span>
        {post.tags.map((tag, index) => (
          <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #{tag}
          </span>
        ))}
      </div>
      <div className="px-6 py-4">
        <button className="mr-2" onClick={handleLike}>
          <Likes />
        </button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <button onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon className="inline-block align-middle mr-1" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
