const Product = require('../models/product.js');

exports.getIndex = (req, res, next) => {

    const products = Product.getAll();
    
    res.render('shop/index', {
        title: 'Shopping', 
        products: products,
        path: '/'
    });
};

exports.getProducts = (req, res, next) => {

    const products = Product.getAll();
    
    res.render('shop/products', {
        title: 'Products', 
        products: products,
        path: '/'
    });
};

exports.getProduct = (req, res, next) => {

    const productId = req.params.productid;
    console.log(Product.getById(productId));
    res.redirect('/');
};

exports.getProductDetails = (req, res, next) => {

    const products = Product.getAll();
    
    res.render('shop/details', {
        title: 'Details', 
        path: '/details'
    });
};

exports.getCart = (req, res, next) => {

    const products = Product.getAll();
    
    res.render('shop/cart', {
        title: 'Cart', 
        path: '/cart'
    });
};

exports.getOrders = (req, res, next) => {

    const products = Product.getAll();
    
    res.render('shop/orders', {
        title: 'Orders', 
        path: '/orders'
    });
};
