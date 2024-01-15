const Product = require('../models/product.js');
const Category = require('../models/category.js');

exports.getIndex = (req, res, next) => {

    const products = Product.getAll();
    const categories = Category.getAll();
    
    res.render('shop/index', {
        title: 'Shopping', 
        products: products,
        categories: categories,
        path: '/'
    });
};

exports.getProducts = (req, res, next) => {

    const products = Product.getAll();
    const categories = Category.getAll();
    
    res.render('shop/products', {
        title: 'Products', 
        products: products,
        categories: categories,
        path: '/products'
    });
};

exports.getProductsByCategoryId = (req, res, next) => {
    const categoryId = req.params.categoryid;
    const products = Product.getProductsByCategoryId(categoryId);
    const categories = Category.getAll();
    
    res.render('shop/products', {
        title: 'Products', 
        products: products,
        categories: categories,
        selectedCategory: categoryId,
        path: '/categories'
    });
};

exports.getProduct = (req, res, next) => {

    const productId = req.params.productid;
    const product = Product.getById(productId);
    const categories = Category.getAll();

    res.render('shop/product-detail', {
        title:product.name,
        product: product,
        categories: categories,
        path: '/products' 
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
