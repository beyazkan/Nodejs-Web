const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
     MongoClient.connect('mongodb://127.0.0.1')
        .then(client => {
            console.log('connected');
            callback(client);
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
}

module.exports = mongoConnect;