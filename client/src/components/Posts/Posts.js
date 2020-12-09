import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, addPost } from "../../actions/post";
import { CREATE_POST_RESET } from "../../actions/types";
import Spinner from "../Layout/Spinner";
import PostItem from "./PostItem";

const Posts = ({ history }) => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.postsList);
  const { success, post } = useSelector((state) => state.createPost);
  useEffect(() => {
    dispatch({
      type: CREATE_POST_RESET,
    });
    if (success) {
      history.push(`/post/${post._id}/edit`);
    } else {
      dispatch(getPosts());
    }
  }, [dispatch, history, post, success]);

  const addPostHandler = () => {
    dispatch(addPost());
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">Welcome to the community</p>
          <button onClick={addPostHandler}>Add Post</button>
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Posts;
