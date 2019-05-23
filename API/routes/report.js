const Campaign = require('../models/campaign').Campaign;
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
mongoose.set('useFindAndModify', false);

router.post('/', async (req, res) => {
    let { dimensions, fields, duration } = req.body;
    let group = dimensions.concat(fields);
    let groupObj = {};

    const { error } = Joi.validate(duration, Joi.object().keys({
        startdate: Joi.date().required().error((e) => { return (e[0].context.limit) ? e : "start date format is YYYY MM DD"; }),
        enddate: Joi.date().min(Joi.ref('startdate')).required().error((e) => { return (e[0].context.limit) ? e : "end date format is YYYY MM DD"; })
    }));

    if (error) return res.status(400).send(error.details[0].message);


    group.forEach(element => {
        groupObj[element] = '$' + element;
    });

    Campaign.aggregate(
        [
            {
                $match: { 
                    $and: [{ startdate : { $lte: new Date(duration.enddate) } }, { enddate: { $gte: new Date(duration.startdate) } } ] 
                
                }
            
            },
            {
                $group: {
                    _id: groupObj,
                    count: { $sum: 1 },
                }
                
            }
            
        ],
        function (err, result) {
            if (err) {
                res.send("nothing")
            } else {
                res.send(result);
            }
        }
    );
});

module.exports = router;