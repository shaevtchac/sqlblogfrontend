import { formatRelative } from "date-fns";

const Comment = ({ comment, auth, handleDeleteComment }) => {
    return (
        <div className="comment">
            {comment.username && (
                <h6>
                    {formatRelative(
                        new Date(comment.createdAt || Date.now()),
                        Date.now()
                    )}{" "}
                    {comment.username} wrote:{" "}
                    {auth?.user === comment.username && (
                        <button
                            title="Delete comment"
                            onClick={() => handleDeleteComment(comment.id)}
                        >
                            X
                        </button>
                    )}
                </h6>
            )}

            {comment.body}
        </div>
    );
};

export default Comment;
