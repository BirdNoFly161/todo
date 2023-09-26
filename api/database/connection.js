
const { MongoClient } = require("mongodb");


const mongodb_user_name = "PracticeUser"
const mongodb_user_password = "FPnRT1UJlh1UbTZs"

const connectionString = `mongodb+srv://${mongodb_user_name}:${mongodb_user_password}@clusterpractice.6fuyuje.mongodb.net/?retryWrites=true&w=majority`
const {uri} = require('./config');
const client = new MongoClient(uri);

let database;

const connect = async () => {
        const conn = await client.connect();
        console.log('Successfull connection to database');
        //console.log('connection : ', conn)
        const database = conn.db('todo_app');
        return database
}


module.exports = connect();