const validate = require('../models/campaign').validate;

module.exports = function (req, res, next) {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
}