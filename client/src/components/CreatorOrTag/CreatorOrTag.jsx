import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Typography, Grid  } from "@mui/material";
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

import { useDispatch, useSelector } from "react-redux";

import Post from "../Posts/Post/Posts";
import { getPostsByCreator, getPostsBySearch } from "../../actions/posts";

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/tags")) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }, []);

  if (!posts.length && !isLoading) return "No posts";

  return (
    <div className="mt-8">
      <Typography variant="h2" className="text-4xl font-bold mb-4">
        {name}
      </Typography>
      <Divider className="mb-8" />
      {isLoading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatorOrTag;
