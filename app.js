const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');

// App Set
app.set('view engine', 'pug');
app.set('views', './views');

// Import Routes Modules
const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/user.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);

// 404 Hatası
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});