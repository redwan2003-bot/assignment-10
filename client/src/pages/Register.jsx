import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        // Password validation
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter");
            return;
        }

        setError("");

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                updateUserProfile(name, photo)
                    .then(() => {
                        toast.success('Registration Successful');
                        navigate('/');
                    })
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                toast.error(err.message);
            });
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                toast.success('Registration Successful');
                navigate('/');
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
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Join MovieMaster Pro to start building your ultimate movie collection.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-gray-800">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                        </div>
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
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <div className="px-8 pb-8">
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex items-center gap-2">
                            <FaGoogle /> Register with Google
                        </button>
                        <p className="text-center mt-4 text-sm">
                            Already have an account? <Link to="/login" className="link link-primary">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
