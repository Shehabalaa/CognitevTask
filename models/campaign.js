const Joi = require("joi")
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: String,
    country: String,
    budget: Number,
    goal: String,
    category: String
})


const Campaign = mongoose.model('Campaign',campaignSchema);


function validateCampaign(campaign) {
    const schema = {
      name: Joi.string().min(1).max(50).required(),
      country: Joi.string().min(3).max(50).required(),
      goal: Joi.string().min(2).max(50).required(),
      budget: Joi.number().min(1).required(),
      category: Joi.string().min(3).max(50)
    };
    return Joi.validate(campaign, schema);
}


exports.Campaign = Campaign; 
exports.validate = validateCampaign;