export const ACTION = {
    GET_LIST: "getList",
    ADD_POST: "addPost",
    EDIT_POST: "editPost",
    DELETE_POST: "deletePost",
    ADD_COMMENT: "addComment",
    DELETE_COMMENT: "deleteComment",
    TOGGLE_LIKE_POST: "toggleLikePost",
};

const postsReducer = (state, action) => {
    switch (action.type) {
        case ACTION.GET_LIST:
            return { posts: action.payload };
        case ACTION.DELETE_POST:
            return {
                posts: state.posts.filter((post) => post.id !== action.payload),
            };
        case ACTION.EDIT_POST:
            return {
                posts: state.posts.map((post) => {
                    if (post.id === action.payload.id) {
                        return {
                            ...post,
                            body: action.payload.body,
                            title: action.payload.title,
                        };
                    } else {
                        return post;
                    }
                }),
            };
        case ACTION.ADD_POST:
            return {
                posts: [
                    ...state.posts,
                    {
                        ...action.payload,
                        Likes: [],
                        Comments: [],
                        User: { username: action.payload.user },
                    },
                ].sort((a, b) => b.id - a.id),
            };
        case ACTION.ADD_COMMENT:
            return {
                posts: state.posts.map((post) => {
                    if (post.id === action.payload.PostId) {
                        return {
                            ...post,
                            Comments: [
                                ...post.Comments,
                                {
                                    body: action.payload.body,
                                    username: action.payload.username,
                                },
                            ],
                        };
                    } else {
                        return post;
                    }
                }),
            };
        case ACTION.DELETE_COMMENT:
            return {
                posts: state.posts.map((post) => {
                    if (post.id === action.payload.PostId) {
                        return {
                            ...post,
                            Comments: [
                                ...post.Comments.filter(
                                    (comment) =>
                                        comment.id !== action.payload.id
                                ),
                            ],
                        };
                    } else {
                        return post;
                    }
                }),
            };
        case ACTION.TOGGLE_LIKE_POST:
            return {
                posts: state.posts.map((post) => {
                    if (post.id === action.payload.PostId) {
                        if (action.payload.status === 201) {
                            return {
                                //add like
                                ...post,
                                Likes: [
                                    ...post.Likes,
                                    {
                                        UserId: action.payload.UserId,
                                    },
                                ],
                            };
                        } else {
                            return {
                                // remove like
                                ...post,

                                Likes: [
                                    ...post.Likes.filter(
                                        (like) =>
                                            like.UserId !==
                                            action.payload.UserId
                                    ),
                                ],
                            };
                        }
                    } else {
                        return post;
                    }
                }),
            };

        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

export default postsReducer;
