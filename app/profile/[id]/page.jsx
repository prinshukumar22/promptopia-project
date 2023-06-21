"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParam = useSearchParams();
  const username = searchParam.get("name");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);

      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <Profile
      name={username[0].toUpperCase() + username.slice(1)}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    ></Profile>
  );
};

export default UserProfile;
