import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
import ChipInput from "material-ui-chip-input";

import { createPost, updatePost } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <div className="w-full flex justify-center">
        <div className="max-w-sm p-4 rounded-lg shadow-lg bg-white">
          <h2 className="text-lg font-semibold mb-2">Please Sign In</h2>
          <p className="text-gray-600 text-center">
            to create your own memories and like other's memories.
          </p>
        </div>
      </div>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full p-4 rounded-lg shadow-lg bg-white"
      >
        <h2 className="text-lg font-semibold mb-4">
          {currentId ? `Editing "${post?.title}"` : "Creating a Memory"}
        </h2>
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <textarea
          name="message"
          placeholder="Message"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 resize-none"
          rows="4"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div className="w-full mb-4">
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className="w-full mb-4">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2"
          type="submit"
        >
          Submit
        </button>
        <button
          className="w-full bg-red-500 text-white py-2 rounded-lg"
          onClick={clear}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default Form;
