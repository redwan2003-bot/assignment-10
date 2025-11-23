import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { ThemeContext } from "../providers/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleLogOut = () => {
        logOut()
            .then(() => console.log('logged out'))
            .catch(error => console.error(error))
    }

    const navLinks = <>
        <li><NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Home</NavLink></li>
        <li><NavLink to="/movies" end className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>All Movies</NavLink></li>
        {user && <>
            <li><NavLink to="/movies/add" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Add Movie</NavLink></li>
            <li><NavLink to="/movies/my-collection" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>My Collection</NavLink></li>
        </>}
    </>

    return (
        <div className="navbar bg-base-100 shadow-lg px-2 md:px-4 py-2 flex justify-between items-center dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <div className="navbar-start">
                <div className="dropdown lg:hidden relative group">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 absolute hidden group-hover:block dark:bg-gray-800">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-base md:text-xl font-bold">
                    <span className="hidden sm:inline">MovieMaster Pro</span>
                    <span className="sm:hidden">MM Pro</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end flex gap-2 md:gap-4 items-center">
                <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-xl">
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>

                {user ? (
                    <div className="dropdown dropdown-end relative group">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="User Avatar" src={user.photoURL || "https://i.ibb.co/tY9j06t/user-placeholder.png"} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 absolute right-0 hidden group-hover:block dark:bg-gray-800">
                            <li className="px-4 py-2 font-semibold">{user.displayName || 'User'}</li>
                            <li><button onClick={handleLogOut}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
                        <Link to="/register" className="btn btn-outline btn-sm hidden sm:inline-flex">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
