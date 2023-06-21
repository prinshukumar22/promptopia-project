"use client";
import { useEffect, useState } from "react";
import PromptCar from "./PromptCar";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCar
          post={post}
          key={post._id}
          handleTagClick={handleTagClick}
        ></PromptCar>
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);
    setSearchTimeOut(
      setTimeout(() => {
        const searchedResult = fetchSearchedResults(e.target.value);
        setSearchedPosts(searchedResult);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchedResult = fetchSearchedResults(tag);
    setSearchedPosts(searchedResult);
  };

  const fetchSearchedResults = (text) => {
    const regText = new RegExp(text, "i");
    return posts.filter((post) => {
      return (
        regText.test(post.creator.username) ||
        regText.test(post.prompt) ||
        regText.test(post.tag)
      );
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch("/api/prompt");
      const data = await resp.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        ></input>
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedPosts}
          handleTagClick={handleTagClick}
        ></PromptCardList>
      ) : (
        <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        ></PromptCardList>
      )}
    </section>
  );
};

export default Feed;
