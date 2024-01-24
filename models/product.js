const getDB = require('../utility/database').getDatabase;

class Product{
    constructor(name, price, description, imageUrl){
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDB();

        return db.collection('products').insertOne(this)
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error);
        })
    }

    static findAll(){
        const db = getDB();
        return db.collection('products').find({}).toArray()
        .then(products => {
            return products;
        })
        .catch(error => { console.log(error) });
    }
}

module.exports = Product;