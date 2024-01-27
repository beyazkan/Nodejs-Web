const getDB = require('../utility/database').getDatabase;
const mongodb = require('mongodb');

class Category{
    constructor(name, description, id){
        this.name = name;
        this.description = description;
        this._id = id ? new mongodb.ObjectId(id): null;
    }

    save(){
        const db = getDB();
        if(this._id){
            db = db.collection('categories').updateOne({_id: this._id}, { $set: this });
        }else{
            db = db.collection('categories').insertOne(this);
        }
        return db
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

    static findById(categoryid){
        const db = getDB();

        return db.collection('categories').findOne({_id: new mongodb.ObjectId(categoryid)})
        .then(category => {
            return category;
        })
        .catch(error => {
            console.log(error);
        })
    }
}

module.exports = Category;