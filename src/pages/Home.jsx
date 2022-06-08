import { useEffect, useReducer, useState } from "react";
import axios from "../api/axios";
import EditPostModal from "../components/EditPostModal";
import PostList from "../components/PostList";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import postsReducer, { ACTION } from "../reducers/postsReducer";

const Home = () => {
    const [state, dispatch] = useReducer(postsReducer, { posts: [] });
    const { auth } = useAuth();
    const [editPostModalVisible, setEditPostModalVisible] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const handleCloseEditPostModal = () => {
        setEditPostModalVisible(false);
    };

    const handleCreatePost = () => {
        if (auth.user) {
            setEditPostModalVisible(true);
        } else {
            alert("Please login to add new posts.");
        }
    };

    const handleSubmitEditPostModal = async ({ title, body }) => {
        try {
            const result = await axiosPrivate.post(`/posts`, {
                title,
                body,
            });
            dispatch({
                type: ACTION.ADD_POST,
                payload: { ...result.data, user: auth.user },
            });
            handleCloseEditPostModal();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getPosts = async () => {
            try {
                const result = await axios.get("/posts");
                dispatch({ type: "getList", payload: result.data });
            } catch (error) {
                console.error(error);
            }
        };
        getPosts();
    }, [auth.id]);
    return (
        <>
            {editPostModalVisible && (
                <EditPostModal
                    handleClose={handleCloseEditPostModal}
                    handleSubmit={handleSubmitEditPostModal}
                    modalTitle="Create Post"
                />
            )}
            <div className="margin1">
                <button
                    onClick={handleCreatePost}
                    style={{ margin: "2rem auto", display: "block" }}
                >
                    New Post
                </button>
                <PostList
                    listOfPosts={state.posts}
                    auth={auth}
                    dispatch={dispatch}
                />
            </div>
        </>
    );
};

export default Home;
