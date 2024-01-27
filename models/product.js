const getDB = require('../utility/database').getDatabase;
const mongodb = require('mongodb');

class Product{
    constructor(name, price, description, imageUrl, categories, id, userId){
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.categories = (categories && !Array.isArray(categories)) ? Array.of(categories): categories;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        let db = getDB();

        if(this._id){
            db = db.collection('products').updateOne({_id: this._id}, { $set: this});
        }else{
            db = db.collection('products').insertOne(this);
        }

        return db
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error);
        })
    }

    static findAll(){
        const db = getDB();
        return db.collection('products')
        .find()
        // .project({name:1, price: 1, imageUrl: 1})
        .project({name:1, price: 1, description: 1, imageUrl: 1})
        .toArray()
        .then(products => {
            return products;
        })
        .catch(error => { console.log(error) });
    }

    static findById(productid){
        const db = getDB();
        // return db.collection('products').find({_id: new mongodb.ObjectId(productid)}).toArray()
        // .then(products => {
        //     return products;
        // })
        // .catch(error => {
        //     console.log(error);
        // })
        return db.collection('products').findOne({_id: new mongodb.ObjectId(productid)})
        .then(product => {
            return product;
        })
        .catch(error => {
            console.log(error);
        })
    }

    static deleteById(productid){
        const db = getDB();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(productid) })
        .then(() => {
            console.log('deleted');
        })
        .catch(error => {
            console.log(error);
        })
    }
}

module.exports = Product;