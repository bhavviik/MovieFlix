const mongoose = require("mongoose");

const AddMovieTolistSchema = new mongoose.Schema({
    listID: String,
    movieID : Number
})

const AddMovieTolistModel = mongoose.model("MovieList",AddMovieTolistSchema)
module.exports = AddMovieTolistModel