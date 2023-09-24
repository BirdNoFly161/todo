import Movie from '../../database/models/movieSchema.js';

export default async function get_movies(req, res){
    try{
        let movies = await Movie.find({}).limit(20).exec();
        res.status(200).json({movies});
    }catch (err){
        console.log('error querying database');
        res.status(500);
    }
}