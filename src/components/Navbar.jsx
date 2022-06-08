import { Link, Outlet } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
const Navbar = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    return (
        <>
            <nav>
                <div className="links">
                    <Link to="/"> Home</Link>
                    {!auth.user && (
                        <>
                            <Link to="/login"> Login</Link>
                            <Link to="/register"> Register</Link>
                        </>
                    )}
                    {auth.user && (
                        <>
                            <Link to="/admin"> Admin Panel</Link>
                            <Link to="/editor"> Editor Panel</Link>
                        </>
                    )}
                </div>

                {auth.user && (
                    <div className="user-info">
                        <Link to={`/profile/${auth?.id}`}>
                            <h6>{auth?.user}</h6>
                        </Link>
                        <button onClick={logout}>Logout</button>
                    </div>
                )}
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;
