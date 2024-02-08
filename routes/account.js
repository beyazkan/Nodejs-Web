const express = require('express');
const router = express.Router();
const csrf = require('../middleware/csrf.js');

const accountController = require('../controllers/account.js');

router.get('/login', csrf, accountController.getLogin);
router.post('/login', csrf, accountController.postLogin);

router.get('/register', csrf, accountController.getRegister);
router.post('/register', csrf, accountController.postRegister);

router.get('/reset-password', csrf, accountController.getReset);
router.post('/reset-password', csrf, accountController.postReset);

router.get('/logout', accountController.getLogout);
router.post('/logout', accountController.postLogout);

router.get('/reset-password/:token', csrf, accountController.getNewPassword);
router.post('/new-password', csrf, accountController.postNewPassword);

module.exports = router;