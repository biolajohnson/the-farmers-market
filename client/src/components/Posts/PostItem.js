import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, deletePost } from "../../actions/post";
import Moment from "react-moment";
import Spinner from "../Layout/Spinner";

const PostItem = ({
  showActions,
  post: { user, avatar, text, likes, comments, _id, name, postImage },
}) => {
  const { loading } = useSelector((state) => state.postsList);
  const { userInfo, loading: loadingAuth } = useSelector(
    (state) => state.userLogin
  );
  const dispatch = useDispatch();
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${user}`}>
                <img className="round-img" src={avatar} alt="avatar" />
                <h4>{name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{text}</p>
              <div className="upload-photo">
                <img src={`/public/uploads/${postImage}`} alt="" />
              </div>
              <p className="post-date">
                Posted on <Moment format="MM/DD/YYYY"></Moment>
              </p>
              {showActions && (
                <Fragment>
                  <button
                    onClick={() => dispatch(addLike(_id))}
                    type="button"
                    className="btn btn-light"
                  >
                    <span>
                      {likes.length > 0 && <span> {likes.length}</span>}
                    </span>
                  </button>
                  <button
                    onClick={() => console.log("done")}
                    type="button"
                    className="btn btn-light"
                  >
                    <ion-icon name="thumbs-down"></ion-icon>
                  </button>
                  <Link to={`/post/${_id}`} className="btn btn-primary">
                    Discussion{" "}
                    {comments.length > 0 && <span> {comments.length}</span>}
                  </Link>
                  {!loadingAuth && user === userInfo._id && (
                    <button
                      type="button"
                      onClick={() => deletePost(_id)}
                      className="btn btn-danger"
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </button>
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
PostItem.defaultProps = {
  showActions: true,
};
export default PostItem;
