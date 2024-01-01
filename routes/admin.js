const express = require('express');
const router = express.Router();

// Ön ek adres '/admin'
const prefix_url = '/admin'

router.get('/add-product', (req, res, next) => {
    res.send(`
        <html>
            <head><title>Add a New Product</title></head>
            <body>
                <form action="${prefix_url}/add-product" method="POST">
                    <input type="text" name="productName">
                    <input type="submit" value="Save Product">
            </body>
        </html>
    `);
});

router.post('/add-product', (req, res, next) => {
    // Database Kayıt
    console.log(req.body);

    res.redirect(prefix_url);
});

router.get('/', (req, res, next) => {
    res.send('Admin Sayfası');
});

module.exports = router;