import { useState } from "react";
import EmptyModal from "./EmptyModal";

const EditPostModal = ({ post, modalTitle, handleClose, handleSubmit }) => {
    const [titleInput, setTitleInput] = useState(post?.title || "");
    const [bodyInput, setBodyInput] = useState(post?.body || "");

    return (
        <EmptyModal modalTitle={modalTitle} handleClose={handleClose}>
            <div>Title:</div>
            <input
                type="text"
                id="title"
                onChange={(e) => setTitleInput(e.target.value)}
                value={titleInput}
            />
            <div>Your post:</div>
            <textarea
                name="body"
                id="body"
                rows="10"
                value={bodyInput}
                onChange={(e) => setBodyInput(e.target.value)}
            ></textarea>
            <div className="button-wrapper">
                <button onClick={handleClose}>Cancel</button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleSubmit({
                            title: titleInput,
                            body: bodyInput,
                        });
                    }}
                >
                    Save
                </button>
            </div>
        </EmptyModal>
    );
};

export default EditPostModal;
