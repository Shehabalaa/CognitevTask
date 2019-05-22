const request = require('request');

module.exports = function (req, res, next) {
    if (req.body.category == "") {
        request.get('https://ngkc0vhbrl.execute-api.eu-west-1.amazonaws.com/api/?url=https://arabic.cnn.com/', { json: true }, async (err, res, body) => {
            if (err) { return console.log(err); }
            req.body.category = body.category.name;
            next();
        });
        setInterval(next,1000); // Wait api or return error that campaing has to be filled
    }else
        next();
    
}