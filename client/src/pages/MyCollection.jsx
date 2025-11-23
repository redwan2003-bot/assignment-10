import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";

const MyCollection = () => {
    const { user } = useContext(AuthContext);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            // In a real app, we'd filter by the user's ID or email on the backend
            // For now, we'll fetch all and filter client-side or use a query param if supported
            // The backend route we built supports ?search, etc. but we didn't explicitly add ?addedBy
            // Let's assume we update the backend to support filtering by any field or we just filter here for MVP

            // BETTER APPROACH: Update backend to support generic filtering or specific addedBy
            // For this step, let's try to use a query param assuming we might add it, 
            // or just fetch all and filter. Let's fetch all and filter for safety since we didn't add generic filter in backend yet.

            axios.get('http://localhost:5000/movies')
                .then(res => {
                    const myMovies = res.data.filter(m => m.addedBy === user.email);
                    setMovies(myMovies);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-center">My Collection</h2>

            {movies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-500">You haven't added any movies yet.</p>
                </div>
            )}
        </div>
    );
};

export default MyCollection;
