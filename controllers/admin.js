const Product = require('../models/product.js');
const Category = require('../models/category.js');

exports.getProducts = (req, res, next) => {
    const products = Product.getAll();

    res.render('./admin/products.pug',{
            title: 'Admin Product List',
            products: products,
            path: '/admin/products',
            action: req.query.action
        }
    );
};

exports.getAddProduct = (req, res, next) => {
    const categories = Category.getAll();
    res.render('./admin/add-product.pug', {
        title: 'Ürün Ekle',
        path: '/admin/add-product',
        categories: categories
    });
};

exports.postAddProduct = (req, res, next) => {
    // Database Kayıt
    console.log(req.body);
    const product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    product.categoryId = req.body.categoryid;
    product.saveProduct();
    //res.redirect(prefix_url);
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const product = Product.getById(req.params.productid);
    const categories = Category.getAll();

    res.render('./admin/edit-product.pug', {
        title: 'Ürün Düzenle',
        product: product,
        path: '/admin/edit-product',
        categories: categories
    });
};

exports.postEditProduct = (req, res, next) => {
    // Database Kayıt
    const product = Product.getById(req.body.id);

    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    product.categoryId = req.body.categoryid;

    Product.Update(product);
    
    //res.redirect(prefix_url);
    res.redirect('/admin/products?action=edit');
};

exports.adminIndex = (req, res, next) => {
    res.render('./admin/index.pug', {
        title: 'Admin Anasayfa',
        path: '/admin'
    });
};

exports.postDeleteProduct = (req, res, next) => {
    Product.DeleteById(req.body.id);
    res.redirect('/admin/products?action=delete');
};