

export default async function register_user(req, res){
    console.log('working on register logic... ');
    res.status(200).json({msg: "user created successfully"});
}