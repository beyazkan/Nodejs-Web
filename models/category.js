const getDB = require('../utility/database').getDatabase;
const mongodb = require('mongodb');

class Category{
    constructor(name, description, id){
        this.name = name;
        this.description = description;
        this._id = id;
    }

    save(){
        const db = getDB();
        return db.collection('categories').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
    }

    static findAll(){
        const db = getDB();
        return db.collection('categories').find().toArray()
        .then(categories => {
            return categories;
        })
        .catch(error => {
            console.log(error);
        })
    }
}

module.exports = Category;