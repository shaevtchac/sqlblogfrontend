import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/refresh", {
            withCredentials: true,
        });
        setAuth((prev) => {
            return {
                user: response.data.user,
                id: response.data.id,
                roles: response.data.roles,
                accessToken: response.data.accessToken,
            };
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
