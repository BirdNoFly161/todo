import User from '../database/models/userSchema.js';

export default async function update_user(req, res){
    try{

        let users = req.body.users;

        for(let i= 0 ; i<users.length;i++){
            let user = await User.findOneAndUpdate({_id: users[i]._id}, users[i])
            console.log('updated user: ', user);
        }

        res.status(200);
    }catch (err){
        console.log('error querying database');
        res.status(500);
    }
}