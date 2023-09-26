
const { MongoClient } = require("mongodb");

let database = null 

const connectToDatabase = async () => {
    const URI = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(URI);
    
    try{
        await client.connect();
        const database = client.db('web-app-db');

        console.log('Successful connection to database');
        return database
    } catch (e) {
        console.log(e)
    } finally { 
        client.close()
    }
}

if(!database) { 
    database = connectToDatabase()
}

module.exports = database;