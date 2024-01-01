const express = require('express');
const app = express();

app.use('/', (req,res,next) => {
    console.log("Loglama Yapıldı.");
    next();
});

app.use('/add-product', (req,res,next) => {
    res.send("<h1>Adding product page</h1>");
});

app.use('/product-list', (req,res,next) => {
    res.send("<h1>Product list page</h1>");
});

app.use('/', (req,res,next) => {
    res.send("<h1>Merhaba Dünya</h1>");
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});