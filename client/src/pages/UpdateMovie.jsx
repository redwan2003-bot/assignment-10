import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const UpdateMovie = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/movies/${id}`)
            .then(res => {
                setFormData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to load movie data");
                setLoading(false);
            });
    }, [id]);

    const handleUpdateMovie = (e) => {
        e.preventDefault();
        const form = e.target;

        const movieData = {
            posterUrl: form.posterUrl.value,
            title: form.title.value,
            genre: Array.from(form.genre.selectedOptions, option => option.value),
            duration: Number(form.duration.value),
            releaseYear: Number(form.releaseYear.value),
            rating: Number(form.rating.value),
            plotSummary: form.plotSummary.value,
            director: form.director.value,
            cast: form.cast.value.split(',').map(item => item.trim()),
            language: form.language.value,
            country: form.country.value,
            // addedBy remains unchanged
        };

        // Basic validation
        if (movieData.rating < 0 || movieData.rating > 10) {
            toast.error("Rating must be between 0 and 10");
            return;
        }
        if (movieData.genre.length === 0) {
            toast.error("Please select at least one genre");
            return;
        }

        axios.put(`http://localhost:5000/movies/${id}`, movieData)
            .then(res => {
                if (res.data._id) {
                    toast.success('Movie Updated Successfully');
                    navigate(`/movies/${id}`);
                }
            })
            .catch(err => {
                console.error(err);
                toast.error('Failed to update movie');
            });
    };

    if (loading) return <LoadingSpinner />;
    if (!formData) return <div>Movie not found</div>;

    return (
        <div className="max-w-4xl mx-auto bg-base-200 p-8 rounded-xl dark:bg-gray-800">
            <h2 className="text-3xl font-bold text-center mb-8">Update Movie</h2>
            <form onSubmit={handleUpdateMovie} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="form-control">
                    <label className="label"><span className="label-text">Movie Title</span></label>
                    <input type="text" name="title" defaultValue={formData.title} className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Poster URL</span></label>
                    <input type="url" name="posterUrl" defaultValue={formData.posterUrl} className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Genre (Hold Ctrl to select multiple)</span></label>
                    <select name="genre" className="select select-bordered h-32" multiple required defaultValue={formData.genre}>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Horror">Horror</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Romance">Romance</option>
                        <option value="Animation">Animation</option>
                        <option value="Adventure">Adventure</option>
                    </select>
                </div>

                <div className="space-y-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Duration (minutes)</span></label>
                        <input type="number" name="duration" defaultValue={formData.duration} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Release Year</span></label>
                        <input type="number" name="releaseYear" defaultValue={formData.releaseYear} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Rating (0-10)</span></label>
                        <input type="number" name="rating" defaultValue={formData.rating} step="0.1" min="0" max="10" className="input input-bordered" required />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Director</span></label>
                    <input type="text" name="director" defaultValue={formData.director} className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Cast (comma separated)</span></label>
                    <input type="text" name="cast" defaultValue={formData.cast.join(', ')} className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Language</span></label>
                    <input type="text" name="language" defaultValue={formData.language} className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Country</span></label>
                    <input type="text" name="country" defaultValue={formData.country} className="input input-bordered" required />
                </div>

                <div className="form-control md:col-span-2">
                    <label className="label"><span className="label-text">Plot Summary</span></label>
                    <textarea name="plotSummary" defaultValue={formData.plotSummary} className="textarea textarea-bordered h-24" required></textarea>
                </div>

                <div className="form-control md:col-span-2 mt-4">
                    <button className="btn btn-primary w-full">Update Movie</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateMovie;
