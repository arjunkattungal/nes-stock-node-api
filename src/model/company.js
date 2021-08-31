const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CompanySchema = new Schema({

    S_No: {
        type: Number,
    },
    name: {
        type: String,
    },
    currentMarketPrice: {
        type: Number,
    },
    marketCap: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    dividendYield: {
        type: Number,
    },
    ROCE: {
        type: Number,
    },
    ROEPreviousAnnum: {
        type: Number,
    },
    debtToequity: {
        type: Number,
    },
    eps: {
        type: Number,
    },
    reserves: {
        type: Number,
    },
    debt: {
        type: Number,
    },
});
const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;