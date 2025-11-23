import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 dark:bg-gray-900 text-center">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <h2 className="text-4xl font-bold mt-4">Page Not Found</h2>
            <p className="py-6 text-lg">The page you are looking for might have been removed or is temporarily unavailable.</p>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
    );
};

export default ErrorPage;
