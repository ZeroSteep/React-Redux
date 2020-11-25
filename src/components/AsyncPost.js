import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPosts } from "../redux/actions";
import { Loader } from "./Loader";
import { Post } from "./Post";

export function AsyncPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.asyncPosts);
  const loading = useSelector((state) => state.app.loading);

  if (loading) {
    return <Loader />;
  }

  if (!posts.length) {
    return (
      <button
        onClick={() => dispatch(asyncPosts())}
        className="btn btn-primary"
      >
        Загрузить
      </button>
    );
  }

  return posts.map((post) => <Post post={post} key={post.id} />);
}
