const mongoose = require('mongoose');
const validatorJS = require('validator');

const loginSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [validatorJS.isEmail, 'Lütfen geçerli bir email adresi giriniz.']
    },
    password: {
        type: String,
        required: [true, 'Parola boş bırakılamaz']
    },
});

module.exports = mongoose.model('Login', loginSchema);