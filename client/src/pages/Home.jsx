import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { FaUsers, FaFilm, FaStar, FaPlayCircle } from "react-icons/fa";

const Home = () => {
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [recentMovies, setRecentMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch top rated
                const topRatedRes = await axios.get('http://localhost:5000/movies?sort=-rating&limit=6');
                setFeaturedMovies(topRatedRes.data);

                // Fetch recently added (assuming createdAt sort is default or we add it)
                const recentRes = await axios.get('http://localhost:5000/movies?sort=-createdAt&limit=6');
                setRecentMovies(recentRes.data);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <div className="hero min-h-[500px] rounded-3xl overflow-hidden relative group" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)' }}>
                <div className="hero-overlay bg-gradient-to-r from-black/80 to-transparent"></div>
                <div className="hero-content text-left text-neutral-content absolute left-10 bottom-20">
                    <div className="max-w-xl animate-fade-in-up">
                        <h1 className="mb-5 text-6xl font-extrabold text-white leading-tight">Unlock the <span className="text-primary">Magic</span> of Cinema</h1>
                        <p className="mb-8 text-lg text-gray-200">Dive into a world of storytelling. Discover, track, and curate your personal movie collection with MovieMaster Pro.</p>
                        <Link to="/movies" className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-primary/50 border-none"><FaPlayCircle /> Start Exploring</Link>
                    </div>
                </div>
            </div>

            {/* Featured Movies (Top Rated) */}
            <div>
                <div className="flex justify-between items-end mb-8 border-b border-base-300 pb-4">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-2"><FaStar className="text-yellow-400" /> Top Rated Movies</h2>
                        <p className="text-sm text-gray-500 mt-1">Critically acclaimed masterpieces you can't miss.</p>
                    </div>
                    <Link to="/movies" className="btn btn-outline btn-sm">See All</Link>
                </div>

                {featuredMovies.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredMovies.map(movie => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <p>No movies found.</p>
                )}
            </div>

            {/* Recently Added Section */}
            <div>
                <div className="flex justify-between items-end mb-8 border-b border-base-300 pb-4">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-2"><FaFilm className="text-primary" /> Recently Added</h2>
                        <p className="text-sm text-gray-500 mt-1">Fresh arrivals to our collection.</p>
                    </div>
                    <Link to="/movies" className="btn btn-outline btn-sm">See All</Link>
                </div>

                {recentMovies.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentMovies.map(movie => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <p>No recent movies found.</p>
                )}
            </div>

            {/* Genre Section */}
            <div className="bg-base-200 rounded-3xl p-10 dark:bg-gray-800">
                <h2 className="text-3xl font-bold text-center mb-10">Browse by Genre</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Thriller', 'Romance', 'Animation', 'Adventure', 'Fantasy', 'Documentary', 'Mystery'].map(genre => (
                        <Link key={genre} to={`/movies?genre=${genre}`} className="btn btn-outline hover:btn-primary h-auto py-4 text-lg">
                            {genre}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Statistics Section */}
            <div className="stats shadow w-full bg-primary text-primary-content rounded-3xl overflow-hidden">
                <div className="stat place-items-center">
                    <div className="stat-title text-primary-content/70">Total Movies</div>
                    <div className="stat-value"><FaFilm className="inline mr-2" /> {featuredMovies.length + recentMovies.length}</div> {/* Mock count for now */}
                    <div className="stat-desc text-primary-content/70">And growing daily</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title text-primary-content/70">Active Users</div>
                    <div className="stat-value"><FaUsers className="inline mr-2" /> 1,200+</div>
                    <div className="stat-desc text-primary-content/70">Community members</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title text-primary-content/70">Reviews</div>
                    <div className="stat-value">50k+</div>
                    <div className="stat-desc text-primary-content/70">Trusted ratings</div>
                </div>
            </div>

            {/* About Platform Section */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <img src="https://images.unsplash.com/photo-1517604931442-710c8ef5ad25?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="About Us" className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold mb-6">About MovieMaster Pro</h2>
                    <p className="text-lg mb-6 leading-relaxed text-gray-500 dark:text-gray-400">
                        MovieMaster Pro is more than just a database; it's a celebration of cinema.
                        Born from a passion for storytelling, our platform empowers movie enthusiasts to
                        curate their own digital libraries, discover hidden gems through advanced filtering,
                        and connect with a community of like-minded fans.
                    </p>
                    <p className="text-lg mb-8 leading-relaxed text-gray-500 dark:text-gray-400">
                        Whether you're a casual viewer or a dedicated cinephile, MovieMaster Pro provides
                        the tools you need to organize your watchlist and track your viewing history with style.
                    </p>
                    <Link to="/register" className="btn btn-primary">Join the Community</Link>
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-neutral text-neutral-content p-16 rounded-3xl text-center relative overflow-hidden">
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
                    <p className="mb-8 text-lg">Subscribe to our newsletter for the latest movie additions, curated lists, and exclusive reviews.</p>
                    <div className="join w-full max-w-md">
                        <input className="input input-bordered join-item w-full text-black" placeholder="Email address" />
                        <button className="btn btn-primary join-item">Subscribe</button>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>
        </div>
    );
};

export default Home;
