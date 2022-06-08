import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../api/axios";
const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
};

const postEditAllowedRoles = [1984, 5150]; //except for owner
const postDeleteAllowedRoles = [5150]; //except for owner

const Post = () => {
    let { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const navigate = useNavigate();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const getComments = useCallback(() => {
        axios.get(`/comments/bypost/${id}`).then((response) => {
            setComments(response.data);
        });
    }, [id]);

    const handleAddComment = () => {
        axiosPrivate
            .post(`/comments`, {
                body: commentInput,
                PostId: id,
            })
            .then((response) => {
                setComments((prev) => [...prev, response.data]);
                setCommentInput("");
            })
            .catch((err) =>
                alert(err.response.data.name + " " + err.response.data.message)
            );
    };

    useEffect(() => {
        axios.get(`/posts/${id}`).then((response) => {
            setPost(response.data);
        });
        getComments();
    }, [getComments, id]);

    const handleDeleteComment = (id) => {
        axiosPrivate
            .delete(`/comments`, {
                data: { id },
            })
            .then(() => {
                setComments((prev) =>
                    prev.filter((comment) => comment.id !== id)
                );
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {});
    };

    const handleDeletePost = (id) => {
        axiosPrivate
            .delete(`/posts`, {
                data: { id },
            })
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="post-page margin1">
            <div className="post">
                <div className="title">{post.title}</div>
                <div className="body">{post.body}</div>
                <div className="footer">
                    {post?.User?.username}
                    {(auth?.user === post?.User?.username ||
                        auth.roles
                            .map((role) =>
                                postDeleteAllowedRoles.includes(role)
                            )
                            .find((val) => val === true)) && (
                        <button onClick={() => handleDeletePost(post.id)}>
                            Delete Post
                        </button>
                    )}{" "}
                </div>
            </div>
            <div className="comments">
                <h4>Comments Section</h4>
                {comments.length > 0 &&
                    comments.map((comment, key) => (
                        <div className="comment" key={key}>
                            {comment.username && (
                                <h6>
                                    {comment.username} says:{" "}
                                    {auth.user === comment.username && (
                                        <button
                                            title="Delete comment"
                                            onClick={() =>
                                                handleDeleteComment(comment.id)
                                            }
                                        >
                                            X
                                        </button>
                                    )}
                                </h6>
                            )}

                            {comment.body}
                        </div>
                    ))}

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
            </div>
        </div>
    );
};

export default Post;
