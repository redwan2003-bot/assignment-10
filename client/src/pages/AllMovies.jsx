import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaSearch } from "react-icons/fa";

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let url = `https://assignment-10-v5fr.vercel.app/movies?`;
                if (search) url += `search=${search}&`;
                if (genre) url += `genre=${genre}&`;

                const res = await axios.get(url);
                setMovies(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchMovies();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [search, genre]);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-center">All Movies</h2>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
                <div className="join w-full md:w-auto">
                    <div className="join-item flex items-center bg-base-200 px-3"><FaSearch /></div>
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="input input-bordered join-item w-full md:w-80"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="select select-bordered w-full md:w-auto"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                >
                    <option value="">All Genres</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Horror">Horror</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Romance">Romance</option>
                    <option value="Animation">Animation</option>
                </select>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {movies.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {movies.map(movie => (
                                <MovieCard key={movie._id} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-xl text-gray-500">No movies found matching your criteria.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllMovies;
