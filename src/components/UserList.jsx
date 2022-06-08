import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import UserListItem from "./UserListItem";

const UserList = () => {
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);

    const handleDeleteUser = async (id) => {
        try {
            const result = await axiosPrivate.delete("users", { data: { id } });
            setUsers(users.filter((user) => user.id !== result?.data?.id));
        } catch (error) {
            alert(error?.response?.data + " " + error?.name);
        }
    };
    const handleSaveUserData = async (data) => {
        console.log(data);
        try {
            const result = await axiosPrivate.put("users", data);
            console.log(result);
        } catch (error) {
            alert(
                error?.response?.data?.message +
                    " | " +
                    error?.name +
                    " : " +
                    error?.message
            );
            console.log(error);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosPrivate.get("users");
                setUsers(result.data);
                console.log(result.data);
            } catch (error) {
                alert(
                    error?.response?.data +
                        " " +
                        error?.name +
                        " " +
                        error?.message
                );
                console.log(error);
            }
        };
        getData();
    }, []);
    return (
        <div className="user-list">
            {users.map((user) => (
                <UserListItem
                    user={user}
                    handleDelete={handleDeleteUser}
                    handleEditSubmit={handleSaveUserData}
                    key={user.id}
                />
            ))}
        </div>
    );
};

export default UserList;
