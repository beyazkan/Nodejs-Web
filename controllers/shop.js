const Product = require('../models/product.js');
const Category = require('../models/category.js');

exports.getIndex = (req, res, next) => {

    Product.findAll(
        {
            attributes: ['id','name','price','imageUrl']
        }
    )
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
    const model = [];
    Category.findAll()
    .then(categories=>{
        model.categories = categories;
        const category = categories.find(i => i.id == categoryId);
        return category.getProducts();
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

    /*Product.findByPk(productId)
    .then((product) => {
        Category.findAll()
        .then(categories => {
            res.render('shop/product-detail', {
                title:product.name,
                product: product,
                categories: categories,
                path: '/products' 
            });
        })
        .catch(error => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });*/

    // Filtreleme yöntemi ile select yöntemi (liste gelir)
    Product.findAll(
        {
            //attributes: ['id','name','price','imageUrl', 'description', 'categoryId'],
            where: {id:productId}
        }
    )
    .then(products => {
        Category.findAll()
        .then(categories => {
            res.render('shop/product-detail', {
                title:products[0].name,
                product: products[0],
                categories: categories,
                path: '/products' 
            });
        })
        .catch(error => {
            console.log(error);
        });
        
    })
    .catch(error => {
        console.log(error);
    });
};

exports.getCart = (req, res, next) => {

    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
        .then(products => {
            console.log(products);
            res.render('shop/cart', {
                title: 'Cart', 
                path: '/cart',
                products: products
            });
        })
        .catch(error => { console.log(error); });
    })
    .catch(error => {
        console.log(error);
    });
};

exports.postCart = (req, res, next) => {

    const productId = req.body.productId;
    let quantity = 1;
    let userCart;

    req.user.getCart()
    .then(cart => {
        userCart = cart;
        return cart.getProducts({where: {id: productId}});
    })
    .then(products => {
        let product;

        if(products.length > 0){
            product = products[0];
        }

        if(product){
            quantity += product.cartItem.quantity;
            return product;
        }
        return Product.findByPk(productId);
    })
    .then(product=>{
        userCart.addProduct(product, { through: { quantity: quantity}});
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(error => {
        console.log(error);
    });
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
    res.render('shop/orders', {
        title: 'Orders', 
        path: '/orders'
    });
};
