const products = [
    {name:'Samsung S6', price: 2000, imageUrl: '1.jpg', description: 'İyi telefon'},
    {name:'Samsung S7', price: 2000, imageUrl: '1.jpg', description: 'İyi telefon'},
    {name:'Samsung S8', price: 2000, imageUrl: '1.jpg', description: 'İyi telefon'},
    {name:'Samsung S9', price: 2000, imageUrl: '1.jpg', description: 'İyi telefon'}
];

module.exports = class Product{

    constructor(name, price, imageUrl, description){
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    saveProduct(){
        products.push(this);
    }

    static getAll(){
        return products;
    }
}