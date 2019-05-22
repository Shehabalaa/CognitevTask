const Joi = require("joi")
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: String,
    country: String,
    budget: Number,
    goal: String,
    category: String,
    url: String,
    startdate: Date,
    enddate: Date,
})


const Campaign = mongoose.model('Campaign',campaignSchema);



function validateCampaign(campaign) {

    let startDateMin = new Date();
    startDateMin.setDate(startDateMin.getDate()-1)


    const schema = Joi.object().keys({
      name: Joi.string().min(1).max(50).required(),
      country: Joi.string().min(3).max(50).required(),
      goal: Joi.string().min(2).max(50).required(),
      budget: Joi.number().positive().integer(),
      category: Joi.string().min(1).max(50).allow(""),
      url: Joi.when("category",{
          is:"",
          then:Joi.string().uri().required().error(() => '\"url\" is not allowed to be empty when category is empty'),
          otherwise:Joi.string().uri().allow("")
      }),
      startdate: Joi.date().min(startDateMin).required().error((e) => {return (e[0].context.limit)? e : "start date format is YYYY-MM-DD";}),
      enddate: Joi.date().min(Joi.ref('startdate')).required().error((e) => {return (e[0].context.limit)? e : "end date format is YYYY-MM-DD";})
    }).or('url','category');

    return Joi.validate(campaign, schema);
}


exports.Campaign = Campaign; 
exports.validate = validateCampaign;