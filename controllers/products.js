const product = require("../models/product")

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, select, numericFilters } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) { queryObject.company = company }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        };

        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        const options = ['price', 'rating']

        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);

        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: +value }
            }
        });


    }

    let result = product.find(queryObject)

    if (sort) {
        const sortedItems = sort.split(',').join(' ');
        result = result.sort(sortedItems);
    } else {
        result = result.sort("createdAt");
    }
    if (select) {
        const selectedFields = select.split(',').join(' ');
        result = result.select(selectedFields);
    }

    const page = +(req.query.page) || 1;
    const limit = +(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const products = await result

    res.json({ products, nbHits: products.length })
}

const getProductsStatic = (req, res) => {
    res.json({ msg: "All Static Products" })
}

module.exports = {
    getAllProducts, getProductsStatic
}