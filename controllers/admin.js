const Product = require('../models/product.js');
const Category = require('../models/category.js');

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
    });    
};

exports.postAddProduct = (req, res, next) => {
    // Database Kayıt

    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    //const categoryId = req.body.categoryid;

    // Product.create({
    //     name: name,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description
    // })
    // .then(result => {
    //     console.log(result);
    //     res.redirect('/');
    // })
    // .catch((error) => {
    //     console.log(error);
    // });

    const prd = Product.build({
        name: name,
        price: price,
        imageUrl: imageUrl,
        description: description
    });

    prd.save()
    .then(result => {
        console.log(result);
        res.redirect('/');
    })
    .catch(error => {
        console.log(error);
    });

};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productid
    Product.findByPk(productId)
    .then((product) => {
        Category.findAll()
        .then((categories)=>{
            res.render('./admin/edit-product.pug', {
                title: 'Ürün Düzenle',
                product: product,
                path: '/admin/edit-product',
                categories: categories
            });
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    });
    
};

exports.postEditProduct = (req, res, next) => {
    // Database Kayıt
    const product = new Product();

    product.id = req.body.id;
    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    product.categoryId = req.body.categoryid;

    Product.Update(product)
    .then(()=>{
        //res.redirect(prefix_url);
        res.redirect('/admin/products?action=edit')
    })
    .catch((error)=> {
        console.log(error);
    });
};

exports.adminIndex = (req, res, next) => {
    res.render('./admin/index.pug', {
        title: 'Admin Anasayfa',
        path: '/admin'
    });
};

exports.postDeleteProduct = (req, res, next) => {
    Product.DeleteById(req.body.productid)
    .then(()=> {
        res.redirect('/admin/products?action=delete');
    })
    .catch((error)=> {
        console.log(error);
    });
    
};