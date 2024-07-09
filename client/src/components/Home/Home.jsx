import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Forms/Form";
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const page = query.get("page") || 1;

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchPost = () => {
    if (search.trim() || tags.length > 0) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <Posts setCurrentId={setCurrentId} />
          {!search && tags.length === 0 && (
            <div className="mt-4">
              <Pagination page={page} />
            </div>
          )}
        </div>
        <div>
          <div className="bg-white shadow-md p-4 rounded-lg mb-4">
            <input
              onKeyDown={handleKeyPress}
              name="search"
              type="text"
              placeholder="Search Memories"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ChipInput
              className="mb-4"
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
              label="Search Tags"
              variant="outlined"
            />
            <button
              onClick={searchPost}
              className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2"
            >
              Search
            </button>
          </div>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  );
};

export default Home;
