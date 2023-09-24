import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const {Schema} = mongoose;

const MovieSchema = new Schema({
    title: String,
    year: Number,
    type: String,
    poster: String,
    plot: String,
    fullplot: String,
    genres: [String],
    directors: [String],
    cast: [String],
    description: String,
    imdb: {
        rating: Number,
        votes: Number,
        id: Number
    },
    rated: String,
    num_mflix_comments: Number,
});

const Movie = mongoose.model("Movie", MovieSchema)
export default Movie;