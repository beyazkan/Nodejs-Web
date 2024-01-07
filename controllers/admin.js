const Product = require('../models/product.js');

exports.getProducts = (req, res, next) => {
    const products = Product.getAll();

    res.render('./admin/products.pug',{
            title: 'Admin Product List',
            products: products,
            path: '/admin/products'
        }
    );
};

exports.getAddProduct = (req, res, next) => {
    res.render('./admin/add-product.pug', {
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
    const product = Product.getById(req.params.productid);

    res.render('./admin/edit-product.pug', {
        title: 'Ürün Düzenle',
        product: product,
        path: '/admin/edit-product'
    });
};

exports.postEditProduct = (req, res, next) => {
    // Database Kayıt
    const product = Product.getById(req.body.id);

    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;

    Product.Update(product);
    
    //res.redirect(prefix_url);
    res.redirect('/admin/products');
};

exports.adminIndex = (req, res, next) => {
    res.render('./admin/index.pug', {
        title: 'Admin Anasayfa',
        path: '/admin'
    });
};