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
        if(!product){
            return res.redirect('/');
        }
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

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categoryId = req.body.categoryid;

    Product.findByPk(id)
    .then(product => {
        product.name = name;
        product.price = price;
        product.imageUrl = imageUrl;
        product.description = description;
        return product.save();
    })
    .then(result => {
        console.log('updated');
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
    Product.destroy({
        where: {id:productId}
    })
    .then(result => {
        console.log(result);
        res.redirect('/admin/products?action=delete');
    })
    .catch((error)=> {
        console.log(error);
    });
    
};