const products = [
    {id:'1231', name:'Samsung S6', price: 2000, imageUrl: '1.jpg', description: 'İyi telefon'},
    {id:'4212', name:'Samsung S7', price: 2000, imageUrl: '2.jpg', description: 'Fiyat performans'},
    {id:'3421', name:'Samsung S8', price: 2000, imageUrl: '3.jpg', description: 'İyi telefon'},
    {id:'2332', name:'Samsung S9', price: 2000, imageUrl: '4.jpg', description: 'İyi telefon'}
];

module.exports = class Product{

    constructor(name, price, imageUrl, description){
        this.id = Math.floor(Math.random()*99999)+1;
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

    static getById(id){
        const product = products.find(i => i.id === id);
        return product;
    }
}