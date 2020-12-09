import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePost, getPost } from "../../actions/post";
import axios from "axios";

const PostForm = ({ match, history }) => {
  const postId = match.params.id;
  const { success } = useSelector((state) => state.updatePost);
  const { post } = useSelector((state) => state.postDetails);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [postImage, setImage] = useState("");

  useEffect(() => {
    if (success) {
      history.push("/posts");
    } else if (post._id !== postId) {
      dispatch(getPost(postId));
    } else {
      setText(post.text);
      setImage(post.postImage);
    }
  }, [post, dispatch, success, history, postId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(updatePost({ _id: postId, text, postImage }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (e) {
      console.error(e);
      setUploading(false);
    }
  };

  return (
    <Fragment>
      <div className="post-form">
        <form className="form-my-1" onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                placeholder="Whats going on"
                ccols="30"
                rows="5"
                onChange={(e) => setText(e.target.value)}
                value={text}
                name="text"
              ></textarea>
              <input
                type="file"
                label="Choose File"
                text={postImage}
                name="image"
                onChange={uploadFileHandler}
              ></input>
              {uploading && <p>You're all set!</p>}
            </div>
          </div>
          <input type="submit" className="btn btn-dark my-1" value="submit" />
        </form>
      </div>
    </Fragment>
  );
};

export default PostForm;
