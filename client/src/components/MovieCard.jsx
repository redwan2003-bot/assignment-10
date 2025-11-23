import { Link } from "react-router-dom";
import { FaStar, FaCalendarAlt, FaClock } from "react-icons/fa";

const MovieCard = ({ movie }) => {
    const { _id, title, posterUrl, genre, duration, releaseYear, rating } = movie;

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-gray-800 group">
            <figure className="relative overflow-hidden h-96">
                <img src={posterUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-2 right-2 badge badge-secondary font-bold flex items-center gap-1">
                    <FaStar className="text-yellow-400" /> {rating}
                </div>
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-lg font-bold truncate" title={title}>{title}</h2>
                <div className="flex flex-wrap gap-2 my-2">
                    {genre.slice(0, 3).map((g, idx) => (
                        <span key={idx} className="badge badge-outline text-xs">{g}</span>
                    ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1"><FaCalendarAlt /> {releaseYear}</div>
                    <div className="flex items-center gap-1"><FaClock /> {duration} min</div>
                </div>
                <div className="card-actions justify-end mt-auto">
                    <Link to={`/movies/${_id}`} className="btn btn-primary btn-sm w-full">See Details</Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
