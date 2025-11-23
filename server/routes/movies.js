const router = require('express').Router();
const Movie = require('../models/Movie');

// GET /movies - Get all movies with search, filter, and sort
router.get('/', async (req, res) => {
    try {
        const { search, genre, minRating, maxRating, sort } = req.query;
        let query = {};

        // Search (Title)
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        // Filter by Genre ($in operator)
        if (genre) {
            const genres = genre.split(',');
            query.genre = { $in: genres };
        }

        // Filter by Rating ($gte, $lte)
        if (minRating || maxRating) {
            query.rating = {};
            if (minRating) query.rating.$gte = Number(minRating);
            if (maxRating) query.rating.$lte = Number(maxRating);
        }

        let moviesQuery = Movie.find(query);

        // Sort
        if (sort) {
            moviesQuery = moviesQuery.sort(sort);
        } else {
            moviesQuery = moviesQuery.sort({ createdAt: -1 }); // Default new to old
        }

        // Limit
        if (req.query.limit) {
            moviesQuery = moviesQuery.limit(Number(req.query.limit));
        }

        const movies = await moviesQuery.exec();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /movies/:id - Get single movie
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /movies - Add a new movie (Protected - TODO: Add Auth Middleware)
router.post('/', async (req, res) => {
    const movie = new Movie(req.body);
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /movies/:id - Update movie (Protected - TODO: Add Auth Middleware & Owner Check)
router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        // TODO: Check if req.user.email === movie.addedBy

        Object.assign(movie, req.body);
        const updatedMovie = await movie.save();
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /movies/:id - Delete movie (Protected - TODO: Add Auth Middleware & Owner Check)
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        // TODO: Check if req.user.email === movie.addedBy

        await movie.deleteOne();
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
