const Company = require('../model/company');

exports.register = async(req, res, next) => {
    const {
        S_No,
        name,
        currentMarketPrice,
        marketCap,
        stock,
        dividendYield,
        ROCE,
        ROEPreviousAnnum,
        debtToequity,
        eps,
        reserves,
        debt,
    } = req.body;
    if (!S_No ||
        !name ||
        !currentMarketPrice ||
        !marketCap ||
        !stock ||
        !dividendYield ||
        !ROCE ||
        !ROEPreviousAnnum ||
        !debtToequity ||
        !eps ||
        !reserves ||
        !debt
    ) {
        return res.status(400).json({
            sucess: false,
            message: 'All fields are mandatory',
        });
    }
    try {
        const newcompany = new Company({
            S_No,
            name,
            currentMarketPrice,
            marketCap,
            stock,
            dividendYield,
            ROCE,
            ROEPreviousAnnum,
            debtToequity,
            eps,
            reserves,
            debt
        });

        await newcompany.save();
        return res.status(201).json({
            sucess: true,
            message: "Company NSE added",
            data: newcompany
        });

    } catch (error) {
        console.log("error :", error);
        return res.status(400).json({
            sucess: false,
            message: "Error registering details"
        })
    }
};

exports.searchCompany = async(req, res, next) => {

    const key = req.query.k.toString().trim()
    let company
    try {
        company = await Company.find({
            name: { $regex: key, $options: "si" }
        })
    } catch (error) {
        console.log("search error: ", error);
        return res.status(400).json({
            success: false,
            message: 'Search error',
        })
    }

    if (company.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'No user details'
        })
    }

    return res.status(200).json({
        success: true,
        message: 'Search results',
        data: {
            count: company.length,
            company: company
        }
    })
}