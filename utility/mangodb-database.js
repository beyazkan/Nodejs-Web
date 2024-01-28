const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
     MongoClient.connect('mongodb://127.0.0.1/node-app')
        .then(client => {
            console.log('connected');
            _db = client.db();
            callback(client);
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
}

const getDB = () => {
    if(_db){
        return _db;
    }
    throw 'No database';
}

exports.mongoConnect = mongoConnect;
exports.getDatabase = getDB;