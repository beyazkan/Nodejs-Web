const express = require('express');
const router = express.Router();
const locals = require('../middleware/locals.js');

const accountController = require('../controllers/account.js');

router.get('/login', locals, accountController.getLogin);
router.post('/login', locals, accountController.postLogin);

router.get('/register', locals, accountController.getRegister);
router.post('/register', locals, accountController.postRegister);

router.get('/reset-password', locals, accountController.getReset);
router.post('/reset-password', locals, accountController.postReset);

router.get('/logout', accountController.getLogout);
router.post('/logout', accountController.postLogout);

router.get('/reset-password/:token', locals, accountController.getNewPassword);
router.post('/new-password', locals, accountController.postNewPassword);

module.exports = router;