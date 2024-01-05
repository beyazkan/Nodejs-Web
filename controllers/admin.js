const Product = require('../models/product.js');

exports.getProducts = (req, res, next) => {
    const products = Product.getAll();
    res.render(
        './admin/products',
        {
            title: 'Admin Product List',
            products: products,
            path: '/admin/products'
        }
    )
};

exports.getAddProduct = (req, res, next) => {
    res.render('./admin/add-product', {
        title: 'Ürün Ekle',
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    // Database Kayıt
    console.log(req.body);
    const product = new Product(
        req.body.name, 
        req.body.price, 
        req.body.imageUrl, 
        req.body.description
        );
    product.saveProduct();
    //res.redirect(prefix_url);
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    res.render('./admin/edit-product', {
        title: 'Ürün Düzenle',
        path: '/admin/edit-product'
    });
};

exports.postEditProduct = (req, res, next) => {
    // Database Kayıt
    
    //res.redirect(prefix_url);
    res.redirect('/');
};

exports.adminIndex = (req, res, next) => {
    res.render('./admin/index.pug', {
        title: 'Admin Anasayfa',
        path: '/admin'
    });
};