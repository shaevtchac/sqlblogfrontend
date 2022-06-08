import UserList from "../components/UserList";

const AdminPage = () => {
    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <p>Be careful - you have the power to delete people here.</p>
            <UserList />
        </div>
    );
};

export default AdminPage;
