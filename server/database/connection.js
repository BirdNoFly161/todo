
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let database;

const connect = async () => {
        const conn = await client.connect();
        console.log('Successfull connection to database');
        //console.log('connection : ', conn)
        const database = conn.db('web-app-db');
        return database
}


module.exports = connect();