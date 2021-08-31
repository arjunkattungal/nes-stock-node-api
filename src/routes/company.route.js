const express = require('express');
const router = express.Router();

const companyController = require('../Controller/company.controller');

router.route('/register').post(companyController.register);
router.route('/search').get(companyController.searchCompany);

module.exports = router;