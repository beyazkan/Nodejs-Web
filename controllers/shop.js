const Category = require('../models/category.js');
const Product = require('../models/product.js');

exports.getIndex = (req, res, next) => {

    Product.findAll()
    .then(products => {
        Category.findAll()
        .then(categories => {
            res.render('shop/index', {
                title: 'Shopping', 
                products: products,
                path: '/',
                categories: categories
                });
        })
        .catch(error => { console.log(error); })
    })
    .catch(error => {
        console.log();
    })
    
};

exports.getProducts = (req, res, next) => {

    Product.findAll()
    .then(products => {
        Category.findAll()
        .then(categories => {
            res.render('shop/products', {
                title: 'Products', 
                products: products,
                path: '/products',
                categories: categories
                });
        })
        .catch(error => { console.log(error); })  
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

    Product.findById(req.params.productid)
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

    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id: productid}});
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    });

};

exports.getOrders = (req, res, next) => {   

    req.user.getOrders({ include: ['products'] })
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
    let userCart;
    req.user.getCart()
    .then(cart => {
        userCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            order.addProducts(products.map(product=>{
                product.orderItem = {
                    quantity: product.cartItem.quantity,
                    price: product.price
                }
                return product;
            }));
        })
        .catch(error => { console.log(error)});
    })
    .then(() => {
        userCart.setProducts(null);
    })
    .then(() => {
        res.redirect('/orders');
    })
    .catch(error => { console.log(error)});
};
