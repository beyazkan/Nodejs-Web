const getDB = require('../utility/database').getDatabase;
const mongodb = require('mongodb');

class User{
    constructor(name, email, id){
        this.name = name;
        this.email = email;
        this._id = id;
    }

    save(){
        const db = getDB();
        return db.collection('users').insertOne(this);
    }

    static findById(userid){
        const db = getDB();
        return db.collection('users').findOne({_id: new mongodb.ObjectId(userid)})
        .then(user => {
            return user;
        })
        .catch(error => {
            console.log(error);
        })
    }

    static findByUserName(username){
        const db = getDB();
        return db.collection('users').findOne({name: username})
        .then(user => {
            return user;
        })
        .catch(error => {
            console.log(error);
        })
    }
}

module.exports = User;