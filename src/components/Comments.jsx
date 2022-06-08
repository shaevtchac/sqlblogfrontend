import Comment from "./Comment";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ACTION } from "../reducers/postsReducer";

const Comments = ({ comments, visible, auth, PostId, dispatch }) => {
    const [commentInput, setCommentInput] = useState("");
    const axiosPrivate = useAxiosPrivate();

    const handleAddComment = () => {
        axiosPrivate
            .post(`/comments`, {
                body: commentInput,
                PostId,
            })
            .then((response) => {
                dispatch({
                    type: ACTION.ADD_COMMENT,
                    payload: {
                        PostId,
                        body: commentInput,
                        username: auth.user,
                    },
                });
                setCommentInput("");
            })
            .catch((err) =>
                alert(err.response.data.name + " " + err.response.data.message)
            );
    };

    const handleDeleteComment = (id) => {
        axiosPrivate
            .delete(`/comments`, {
                data: { id },
            })
            .then((response) => {
                dispatch({
                    type: ACTION.DELETE_COMMENT,
                    payload: response.data,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className={visible ? "comments show" : "comments"}>
            <h4>Comments Section</h4>
            {comments?.length > 0 ? (
                comments.map((comment, key) => (
                    <Comment
                        comment={comment}
                        auth={auth}
                        handleDeleteComment={handleDeleteComment}
                        key={comment.id}
                    />
                ))
            ) : (
                <p>No comments to display.</p>
            )}

            {auth.user && (
                <div className="comment-input-wrapper">
                    <input
                        type="text"
                        onChange={(event) => {
                            setCommentInput(event.target.value);
                        }}
                        placeholder="Your comment here..."
                        value={commentInput}
                    />
                    <button onClick={handleAddComment}>Add</button>
                </div>
            )}
        </div>
    );
};

export default Comments;
