const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// Import Routes Modules
const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/user.js');

app.use(bodyParser.urlencoded({extended:false}));

// Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);

// 404 Hatası
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page not found</h1>');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});