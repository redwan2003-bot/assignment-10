import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import { FaStar, FaCalendarAlt, FaClock, FaGlobe, FaLanguage, FaTrash, FaEdit } from "react-icons/fa";

const MovieDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/movies/${id}`)
            .then(res => {
                setMovie(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            axios.delete(`http://localhost:5000/movies/${id}`)
                .then(() => {
                    toast.success("Movie Deleted Successfully");
                    navigate('/all-movies');
                })
                .catch(err => {
                    console.error(err);
                    toast.error("Failed to delete movie");
                });
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!movie) return <div className="text-center text-2xl mt-10">Movie not found</div>;

    const isOwner = user && user.email === movie.addedBy;

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl dark:bg-gray-800 overflow-hidden">
            <figure className="lg:w-1/3">
                <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body lg:w-2/3">
                <h2 className="card-title text-4xl font-bold mb-2">{movie.title}</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genre.map((g, idx) => (
                        <span key={idx} className="badge badge-primary">{g}</span>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2"><FaStar className="text-yellow-400" /> <span className="font-bold">{movie.rating}/10</span></div>
                    <div className="flex items-center gap-2"><FaCalendarAlt /> {movie.releaseYear}</div>
                    <div className="flex items-center gap-2"><FaClock /> {movie.duration} min</div>
                    <div className="flex items-center gap-2"><FaLanguage /> {movie.language}</div>
                </div>

                <p className="text-lg mb-6 leading-relaxed">{movie.plotSummary}</p>

                <div className="divider">Details</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
                    <p><span className="font-bold">Director:</span> {movie.director}</p>
                    <p><span className="font-bold">Cast:</span> {movie.cast.join(', ')}</p>
                    <p><span className="font-bold">Country:</span> {movie.country}</p>
                    <p><span className="font-bold">Added By:</span> {movie.addedBy}</p>
                </div>

                <div className="card-actions justify-end mt-8">
                    {isOwner && (
                        <>
                            <Link to={`/update-movie/${id}`} className="btn btn-warning gap-2"><FaEdit /> Update Movie</Link>
                            <button onClick={handleDelete} className="btn btn-error gap-2"><FaTrash /> Delete Movie</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
