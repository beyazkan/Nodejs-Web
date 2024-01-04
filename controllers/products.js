const products =[
    {name: 'Samsung S8', price: 3000, image: '1.jpg', description: 'Kaydırmalı, böyle dokunmatik telefon...'},
    {name: 'Samsung S7', price: 2000, image: '2.jpg', description: 'Çok iyi...'},
    {name: 'Samsung S9', price: 4000, image: '3.jpg', description: 'İdare Eder...'},
    {name: 'Iphone 7S', price: 4500, image: '4.jpg', description: '5G destekli telefon...'}
];

exports.getProducts = (req, res, next) => {

    res.render('index', {
        title: 'Anasayfa', 
        products: products,
        path: '/'
    });
};

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        title: 'Ürün Ekle',
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    // Database Kayıt
    console.log(req.body);
    products.push({name: req.body.name, price: req.body.price, image: req.body.Image, description: req.body.description});
    //res.redirect(prefix_url);
    res.redirect('/');
};

exports.adminIndex = (req, res, next) => {
    res.render('admin-index', {
        title: 'Admin Anasayfa',
        path: '/admin'
    });
};