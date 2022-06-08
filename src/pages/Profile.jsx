import { formatRelative } from "date-fns";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import ChangePasswordModal from "../components/ChangePasswordModal";
import PostList from "../components/PostList";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import postsReducer from "../reducers/postsReducer";
// import { pl } from "date-fns/locale";

const Profile = () => {
    const { id } = useParams();
    const [basicInfo, setBasicInfo] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const [state, dispatch] = useReducer(postsReducer, { posts: [] });
    const { auth } = useAuth();
    const [changePasswordmodalVisible, setChangePasswordmodalVisible] =
        useState(false);

    const handleCloseChangePasswordModal = () => {
        setChangePasswordmodalVisible(false);
    };

    const handleSubmitChangePasswordModal = async (data) => {
        try {
            const result = await axiosPrivate.post("/changepassword", data);
            alert(result.data);
            handleCloseChangePasswordModal();
        } catch (error) {
            alert(error.response.data);
        }
    };

    useEffect(() => {
        axiosPrivate
            .get(`/users/${id}`)
            .then((response) => {
                setBasicInfo(response.data);
            })
            .catch((error) => {
                console.error(error.response.data);
            });

        axios
            .get(`/posts/byuser/${id}`)
            .then((response) => {
                dispatch({ type: "getList", payload: response.data });
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    }, []);
    return (
        <div className="profile-page margin1">
            {changePasswordmodalVisible && (
                <ChangePasswordModal
                    handleClose={handleCloseChangePasswordModal}
                    handleSubmit={handleSubmitChangePasswordModal}
                />
            )}
            <div>
                <h1>
                    <span>{basicInfo?.username}</span> – profile <br />
                    {auth.id === Number.parseInt(id) && (
                        <button
                            onClick={() => setChangePasswordmodalVisible(true)}
                        >
                            Change Password
                        </button>
                    )}
                </h1>
                <p>
                    Created:{" "}
                    {formatRelative(
                        new Date(basicInfo.createdAt || Date.now()),
                        Date.now()
                    )}
                </p>
            </div>
            <div className="list-of-posts">
                <PostList
                    auth={auth}
                    dispatch={dispatch}
                    listOfPosts={state.posts}
                />
            </div>
        </div>
    );
};

export default Profile;
