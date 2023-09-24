import Movie from '../../database/models/movieSchema.js';

export default async function get_movie(req, res){
    try{
        let movie = await Movie.findOne({_id: req.params.movieId});
        res.status(200).json({movie});
    }catch (err){
        console.log('error querying database');
        res.status(500);
    }
}