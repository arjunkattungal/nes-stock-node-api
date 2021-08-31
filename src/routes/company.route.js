const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth')
const companyController = require('../Controller/company.controller');

router.route('/register').post(companyController.register);

router.route('/search').get(authenticate, companyController.searchCompany);

module.exports = router;