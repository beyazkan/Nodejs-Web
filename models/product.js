const products = [
    {id:'1231', name:'Samsung S6', price: 2000, imageUrl: '1.jpg', description: 'İyi telefon', categoryId: "1"},
    {id:'4212', name:'Samsung S7', price: 2000, imageUrl: '2.jpg', description: 'Fiyat performans', categoryId: "1"},
    {id:'3421', name:'Samsung S8', price: 2000, imageUrl: '3.jpg', description: 'İyi telefon', categoryId: "1"},
    {id:'2332', name:'Samsung S9', price: 2000, imageUrl: '4.jpg', description: 'İyi telefon', categoryId: "1"},
    {id:'1232', name:'Lenovo Bilgisayar', price: 5000, imageUrl: '1.jpg', description: 'Masaüstü pc', categoryId: "2"},
    {id:'5123', name:'Casper PC', price: 7000, imageUrl: '2.jpg', description: 'Laptop Dizüstü', categoryId: "2"},
    {id:'6712', name:'Arçelik Buzdolabı', price: 3500, imageUrl: '3.jpg', description: '5 zamanlı çamaşır makinesi', categoryId: "3"},
    {id:'6412', name:'Samsung Klima', price: 28000, imageUrl: '4.jpg', description: 'İyi telefon', categoryId: "3"},
    {id:'5122', name:'Asus RX4590', price: 12000, imageUrl: '1.jpg', description: 'Masaüstü Ekran Kartı', categoryId: "2"}
];

module.exports = class Product{

    constructor(name, price, imageUrl, description, categoryid){
        this.id = (Math.floor(Math.random()*99999)+1).toString();
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.categoryId = categoryid;
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

    static getProductsByCategoryId(categoryid){
        return products.filter(i => i.categoryId === categoryid);
    }

    static Update(product){
        const index = products.findIndex(i=>i.id === product.id);

        products[index].name = product.name;
        products[index].price = product.price;
        products[index].imageUrl = product.imageUrl;
        products[index].description = product.description;
        products[index].categoryId = product.categoryId;
    }

    static DeleteById(id){
        const index = products.findIndex(i => i.id === id);
        products.splice(index, 1);
    }
}