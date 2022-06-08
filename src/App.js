import { Route, Routes } from "react-router-dom";
import "./App.css";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import AdminPage from "./pages/AdminPage";
import EditorPage from "./pages/EditorPage";

const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
};

function App() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            <Route element={<PersistLogin />}>
                <Route path="/" element={<Navbar />}>
                    <Route path="/" element={<Home />} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.User]} />}
                    >
                        <Route path="post/:id" element={<Post />} />
                    </Route>
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                    >
                        <Route path="admin" element={<AdminPage />} />
                    </Route>
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.Editor]} />}
                    >
                        <Route path="editor" element={<EditorPage />} />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default App;
