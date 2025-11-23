const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: [String], // Array of strings for multiple genres
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    plotSummary: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    addedBy: {
        type: String, // Store user email or UID
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
