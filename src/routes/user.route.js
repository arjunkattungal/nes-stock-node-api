const express = require('express');
const router = express.Router();

const userController = require('../Controller/user.controller');

router.route('/login').post(userController.login);
router.route('/register').post(userController.register);

module.exports = router;