const Category = require('../models/category.js');
const Product = require('../models/product.js');

exports.getIndex = (req, res, next) => {

    Product.find()
    .then(products => {
       Category.find()
       .then(categories => {
            res.render('shop/index', {
                title: 'Shopping', 
                products: products,
                categories: categories,
                path: '/'
            });
       })
       .catch(error => console.log(error))
    })
    .catch(error => {
        console.log();
    })
    
};

exports.getProducts = (req, res, next) => {
    Product
    .find()
    .then(products => {
        Category.find()
        .then(categories => {
            res.render('shop/products', {
                title: 'Products', 
                products: products,
                categories: categories,
                path: '/products'
            });
        })
    })
    .catch(error => {
        console.log();
    })
};

exports.getProductsByCategoryId = (req, res, next) => {
    const categoryId = req.params.categoryid;
    const model = [];
    Category.findAll()
    .then(categories=>{
        model.categories = categories;
        return Product.findByCategoryId(categoryId);
    })
    .then(products => {
        res.render('shop/products', 
            {
                title: 'Products', 
                products: products,
                categories: model.categories,
                selectedCategory: categoryId,
                path: '/categories'
            });
        })
    .catch((error)=>{
        console.log(error);
    });
};

exports.getProduct = (req, res, next) => {

    const productId = req.params.productid;

    Product
    // .findById(req.params.productid)
    .findOne({_id: req.params.productid})
    .then(product => {
        res.render('shop/product-detail', {
            title:product.name,
            product: product,
            path: '/products' 
        });
    })
    .catch(error => {
        console.log(error);
    })

    
};

exports.getCart = (req, res, next) => {

    req.user.getCart()
    .then(products => {
            res.render('shop/cart', {
                title: 'Cart', 
                path: '/cart',
                products: products
        })
    })
    .catch(error => {
        console.log(error);
    });
};

exports.postCart = (req, res, next) => {

    const productId = req.body.productId;
    
    Product.findById(productId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(error => { console.log(error); })
};

exports.postCartItemDelete = (req, res, next) => {
    const productid = req.body.productid;

    req.user.deleteCartItem(productid)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(error => {
        console.log(error);
    })

};

exports.getOrders = (req, res, next) => {   

    req.user.getOrders()
    .then(orders => {
        
        res.render('shop/orders', {
            title: 'Orders', 
            path: '/orders',
            orders: orders
        });
    })
    .catch(error => {
        console.log(error);
    });

    
};

exports.postOrder = (req, res, next) => {
    req.user
        .addOrder()
        .then(() => {
            res.redirect('/orders');
        })
        .catch(error => console.log(error));
};
