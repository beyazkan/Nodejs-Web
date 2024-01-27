const Product = require('../models/product.js');
const Category = require('../models/category.js');
// const User = require('../models/user.js');

exports.getProducts = (req, res, next) => {
    Product.findAll()
            .then(products => {
                res.render('./admin/products.pug',{
                    title: 'Admin Product List',
                    products: products,
                    path: '/admin/products',
                    action: req.query.action
                });
            })
            .catch((error) => {
                console.log(error);
            });
};

exports.getAddProduct = (req, res, next) => {
    res.render('./admin/add-product.pug', {
        title: 'Ürün Ekle',
        path: '/admin/add-product'
        //categories: categories
    });        
};

exports.postAddProduct = (req, res, next) => {
    // Database Kayıt

    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    
    const product = new Product(name, price, description, imageUrl, null, req.user._id);
    product.save()
    .then(result => {
        res.redirect('/admin/products?action=create');
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.getEditProduct = (req, res, next) => {
    Product.findById(req.params.productid)
    .then(product => {
        
        Category.findAll()
        .then(categories => {
            res.render('./admin/edit-product.pug', {
                title: 'Ürün Düzenle',
                product: product,
                path: '/admin/edit-product',
                categories: categories
            });    
        })
        .catch(error => {
            console.log(error);
        })
    })
    .catch(error => {
        console.log(error);
    });    
};

exports.postEditProduct = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categories = req.body.categoryids;

    const product = new Product(name, price, description, imageUrl, categories, id, req.user._id);

    product.save()
    .then(result => {
        res.redirect('/admin/products?action=edit')
    })
    .catch(error => console.log(error));
};

exports.adminIndex = (req, res, next) => {
    res.render('./admin/index.pug', {
        title: 'Admin Anasayfa',
        path: '/admin'
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productid;
    Product.deleteById(productId)
    .then(() => {
        console.log('Product has been deleted.');
        res.redirect('/admin/products?action=delete');
    })
    .catch((error)=> {
        console.log(error);
    });
    
};

// Category
exports.getAddCategory = (req, res, next) => {
    res.render('./admin/add-category.pug', {
        title: 'Kategori Ekle',
        path: '/admin/add-category'
        //categories: categories
    });      
};

exports.postAddCategory = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;

    const category = new Category(name, description);

    category.save()
    .then(result => {
        //console.log(result);
        res.redirect('/admin/categories?action=create');
    })
    .catch(error => {
        console.log(error);
    })
};

exports.getCategories = (req, res, next) => {
    Category.findAll()
    .then(categories => {
        res.render('./admin/categories.pug', {
            title: 'Kategoriler',
            path: '/admin/categories',
            categories: categories,
            action: req.query.action
        });      
    })
    .catch(error => { console.log(error) })
};

exports.getEditCategory = (req, res, next) => {
    Category.findById(req.params.categoryid)
    .then(category => {
        res.render('./admin/edit-category.pug', {
            title: 'Kategori Düzenle',
            path: '/admin/add-category',
            category: category
        });      
    })
    .catch(error => {
        console.log(error);
    })
};

exports.postEditCategory = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    

    const category = new Category(name, description, id);

    category.save()
    .then(result => {
        //console.log(result);
        res.redirect('/admin/categories?action=edit');
    })
    .catch(error => {
        console.log(error);
    })
};