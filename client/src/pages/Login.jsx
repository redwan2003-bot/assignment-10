import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                toast.success('Login Successful');
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err);
                setError("Invalid email or password");
                toast.error(err.message);
            });
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                toast.success('Login Successful');
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err);
                toast.error(err.message);
            });
    };

    return (
        <div className="hero min-h-[calc(100vh-200px)]">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left lg:w-1/2">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Access your personal movie collection and manage your favorites.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-gray-800">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="px-8 pb-8">
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex items-center gap-2">
                            <FaGoogle /> Login with Google
                        </button>
                        <p className="text-center mt-4 text-sm">
                            New here? <Link to="/register" className="link link-primary">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
