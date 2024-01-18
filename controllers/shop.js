const Product = require('../models/product.js');
const Category = require('../models/category.js');

exports.getIndex = (req, res, next) => {

    Product.findAll()
    .then(products => {
        Category.findAll()
        .then(categories => {
            res.render('shop/index', {
                title: 'Shopping', 
                products: products,
                categories: categories,
                path: '/'
                });
        })
        .catch(error => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    });
    
};

exports.getProducts = (req, res, next) => {

    Product.findAll()
    .then(products => {
        Category.findAll()
        .then(categories => {
            res.render('shop/products', {
                title: 'Products', 
                products: products,
                categories: categories,
                path: '/products'
                });
        })
        .catch(error => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.getProductsByCategoryId = (req, res, next) => {
    const categoryId = req.params.categoryid;
    Category.getAll()
    .then((categories)=>{
        Product.getProductsByCategoryId(categoryId)
        .then((products) => {
            res.render('shop/products', {
                title: 'Products', 
                products: products[0],
                categories: categories[0],
                selectedCategory: categoryId,
                path: '/categories'
            });
        })
        .catch((error)=>{
            console.log(error);
        });
        
    })
    .catch((error)=>{
        console.log(error);
    });
    
    
};

exports.getProduct = (req, res, next) => {

    const productId = req.params.productid;
    const categories = Category.getAll();

    Product.getById(productId)
    .then((product) => {
        res.render('shop/product-detail', {
            title:product[0][0].name,
            product: product[0][0],
            categories: categories,
            path: '/products' 
        });
    }).catch((error) => {
        console.log(error);
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
