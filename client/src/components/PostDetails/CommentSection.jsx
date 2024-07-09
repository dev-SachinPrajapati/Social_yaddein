import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user?.result?.name}: ${comment}`, post._id)
    );

    setComment("");
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl p-4 my-4 bg-gray-100 rounded-lg">
        <div className="text-lg font-semibold">Comments</div>
        {comments?.map((c, i) => (
          <div key={i} className="mt-2">
            <strong>{c.split(": ")[0]}</strong>
            {c.split(":")[1]}
          </div>
        ))}
        <div ref={commentsRef} />
      </div>
      <div className="w-full max-w-4xl p-4 my-4 bg-gray-100 rounded-lg">
        <div className="text-lg font-semibold">Write a comment</div>
        <textarea
          className="w-full p-2 mt-2 border border-gray-300 rounded-md resize-none"
          rows="4"
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md focus:outline-none hover:bg-blue-600 disabled:opacity-50"
          disabled={!comment.length}
          onClick={handleComment}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
