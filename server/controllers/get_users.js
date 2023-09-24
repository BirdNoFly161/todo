
import User from '../database/models/userSchema.js';

export default async function get_users(req, res){
    try{
        let users = await User.find({});
        console.log(users);
        res.status(200).json({users});
    }catch (err){
        console.log('error querying database');
        res.status(500);
    }
}