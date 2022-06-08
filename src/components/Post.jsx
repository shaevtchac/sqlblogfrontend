import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";
import EditPostModal from "./EditPostModal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ACTION } from "../reducers/postsReducer";
const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
};

const CUT_POST_LENGTH = 255;

const postEditAllowedRoles = [1984, 5150]; //except for owner
const postDeleteAllowedRoles = [5150]; //except for owner

const Post = ({ post, auth, dispatch }) => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [cutIfTooLong, setCutIfTooLong] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [editPostModalVisible, setEditPostModalVisible] = useState(false);

    const handleToggleComments = (e) => {
        e.stopPropagation();
        setCommentsVisible((prev) => !prev);
    };

    const handleCloseEditPostModal = () => {
        setEditPostModalVisible(false);
    };

    const handleEditPost = () => {
        setEditPostModalVisible(true);
    };

    const handleSubmitEditPostModal = async ({ title, body }) => {
        try {
            const result = await axiosPrivate.put(`/posts`, {
                id: post.id,
                title,
                body,
            });
            dispatch({ type: ACTION.EDIT_POST, payload: result.data });
            handleCloseEditPostModal();
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeletePost = () => {
        axiosPrivate
            .delete(`/posts`, {
                data: { id: post?.id },
            })
            .then((response) => {
                dispatch({ type: ACTION.DELETE_POST, payload: post?.id });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLikePost = (e) => {
        e.stopPropagation();
        axiosPrivate.post("/likes", { PostId: post?.id }).then((response) => {
            dispatch({
                type: ACTION.TOGGLE_LIKE_POST,
                payload: {
                    status: response.status,
                    UserId: auth.id,
                    PostId: post.id,
                },
            });
        });
    };
    useEffect(() => {
        if (post?.body?.length > CUT_POST_LENGTH) setCutIfTooLong(true);
    }, [post]);

    return (
        <div>
            {editPostModalVisible && (
                <EditPostModal
                    post={post}
                    modalTitle="Edit Post"
                    handleClose={handleCloseEditPostModal}
                    handleSubmit={handleSubmitEditPostModal}
                />
            )}

            <div className="post" key={post?.id}>
                {/* title--------------------------------------------------------------------------------------------------------------------- */}
                <div className="title">
                    {post?.title}
                    {auth?.user && (
                        <div className="post-actions">
                            {(auth?.user === post?.User?.username ||
                                auth?.roles
                                    .map((role) =>
                                        postEditAllowedRoles.includes(role)
                                    )
                                    .find((val) => val === true)) && (
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditPost();
                                    }}
                                >
                                    {"Edit"}
                                </span>
                            )}

                            {(auth?.user === post?.User?.username ||
                                auth?.roles
                                    .map((role) =>
                                        postDeleteAllowedRoles.includes(role)
                                    )
                                    .find((val) => val === true)) && (
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeletePost();
                                    }}
                                >
                                    {"Delete"}
                                </span>
                            )}
                        </div>
                    )}
                </div>
                {/* body----------------------------------------------------------------------------------------------------------------------------- */}
                <div
                    className={
                        post?.body?.length > CUT_POST_LENGTH
                            ? "body clickable"
                            : "body"
                    }
                    onClick={() => {
                        if (post?.body?.length > CUT_POST_LENGTH)
                            setCutIfTooLong((prev) => !prev);
                    }}
                >
                    {cutIfTooLong ? (
                        <>
                            {post?.body.slice(0, CUT_POST_LENGTH)}
                            {" ... "}
                            <a href="#"> [Click to read more]</a>
                        </>
                    ) : (
                        post?.body
                    )}
                </div>
                {/* footer----------------------------------------------------------------------------------------------------------------------------------- */}
                <div className="footer">
                    <div className="user-section">
                        {post?.User?.username}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/profile/${post?.UserId}`);
                            }}
                        >
                            See profile
                        </button>
                    </div>
                    <div className="icons">
                        <button onClick={handleToggleComments}>
                            <i
                                className="fa-regular fa-comments"
                                style={{
                                    color: "white",
                                }}
                            ></i>
                        </button>
                        <label> {post?.Comments?.length}</label>
                        {auth?.user && (
                            <button onClick={(e) => handleLikePost(e)}>
                                <i
                                    className={
                                        post?.Likes.map(
                                            (arg) => arg.UserId
                                        ).includes(auth.id)
                                            ? "fa-solid fa-thumbs-up"
                                            : "fa-regular fa-thumbs-up"
                                    }
                                    style={{ color: "white" }}
                                ></i>
                            </button>
                        )}
                        {!auth?.user && (
                            <i
                                className={"fa-solid fa-thumbs-up"}
                                style={{
                                    color: "var(--secondary-color)",
                                }}
                            ></i>
                        )}
                        <label> {post?.Likes?.length}</label>
                    </div>
                </div>
            </div>

            <Comments
                comments={post.Comments}
                visible={commentsVisible}
                auth={auth}
                PostId={post.id}
                dispatch={dispatch}
            />
        </div>
    );
};

export default Post;
