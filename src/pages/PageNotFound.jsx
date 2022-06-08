import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <h1>Page Not Found :/</h1>
            <p>
                Go to the Home Page: <Link to="/"> Home Page</Link>
            </p>
        </div>
    );
};

export default PageNotFound;
