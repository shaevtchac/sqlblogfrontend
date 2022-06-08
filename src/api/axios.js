import axios from "axios";

const BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://mysqlblog.shaevtchac.cal24.pl/api/"
        : "http://localhost:3500/api/";

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
