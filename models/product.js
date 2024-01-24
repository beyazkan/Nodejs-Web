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

        db.collection('products').insertOne(this)
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error);
        })
    }
}

module.exports = Product;