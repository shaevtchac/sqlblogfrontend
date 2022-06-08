const EmptyModal = ({ modalTitle, handleClose, children }) => {
    return (
        <div className="modal-background">
            <div className="modal-post-container">
                <i
                    onClick={handleClose}
                    className="fa-solid fa-xmark"
                    style={{
                        color: "var(--text-dark)",
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        cursor: "pointer",
                    }}
                ></i>
                <h2>{modalTitle}</h2>
                {children}
            </div>
        </div>
    );
};

export default EmptyModal;
