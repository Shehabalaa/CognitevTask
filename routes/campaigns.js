const { Campaign , validate } = require('../models/campaign');
const validateObjectId = require('../middlewares/validateObjectId')
const acquireCampaign = require('../middlewares/acquireCampaign')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
mongoose.set('useFindAndModify', false);

router.get('/', async (req, res) => {
    const campaigns = await Campaign.find();
    res.send(campaigns);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) return res.status(404).send('The campaign with the given ID was not found.');

    res.send(campaign);
});


router.post('/', acquireCampaign ,async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let campaign = new Campaign(req.body);
    campaign = await campaign.save();

    res.send(campaign);
});

router.put('/:id', [validateObjectId , acquireCampaign], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body,useFindAndModify=false);

    if (!campaign) return res.status(404).send('The campaign with the given ID was not found.');

    res.send(campaign);
});

router.delete('/:id', validateObjectId, async (req, res) => {
    const campaign = await Campaign.findByIdAndRemove(req.params.id,useFindAndModify=false);

    if (!campaign) return res.status(404).send('The campaign with the given ID was not found.');

    res.send(campaign);
});


module.exports = router;