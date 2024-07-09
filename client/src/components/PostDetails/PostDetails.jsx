import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@mui-material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory, Link } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  // const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper className="p-8 rounded-lg shadow-md" elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper className="p-8 rounded-lg shadow-md" elevation={6}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Typography
            variant="h3"
            component="h2"
            className="text-3xl font-bold"
          >
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => (
              <Link
                to={`/tags/${tag}`}
                className="text-blue-500"
                key={tag}
              >{`#${tag} `}</Link>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6" className="font-bold">
            Created by:
            <Link
              to={`/creators/${post.name}`}
              className="text-blue-500"
            >{` ${post.name}`}</Link>
          </Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider className="my-8" />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider className="my-8" />
          <CommentSection post={post} />
          <Divider className="my-8" />
        </div>
        <div>
          <img
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
            className="w-full h-auto"
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className="mt-8">
          <Typography
            gutterBottom
            variant="h5"
            className="text-xl font-bold mb-4"
          >
            You might also like:
          </Typography>
          <Divider className="mb-4" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  key={_id}
                  className="cursor-pointer"
                  onClick={() => openPost(_id)}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    className="text-lg font-bold mb-1"
                  >
                    {title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    className="text-gray-500 mb-1"
                  >
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2" className="mb-1">
                    {message}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    className="text-gray-600"
                  >
                    Likes: {likes.length}
                  </Typography>
                  <img
                    src={selectedFile}
                    alt={title}
                    className="w-full h-auto"
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;
