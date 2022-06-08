import Post from "./Post";

const PostList = ({ listOfPosts, auth, dispatch }) => {
    return (
        <div>
            {listOfPosts?.map((post) => {
                return (
                    <Post
                        post={post}
                        auth={auth}
                        dispatch={dispatch}
                        key={post.id}
                    />
                );
            })}
        </div>
    );
};

export default PostList;
