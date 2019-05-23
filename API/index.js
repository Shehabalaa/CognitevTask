const mongoose = require('mongoose')
const express = require('express');
const campaigns = require('./routes/campaigns');
const report = require('./routes/report');
mongoose.set('useNewUrlParser', true);
//const error = require('../middleware/error');

mongoose.connect('mongodb://localhost/campaign') // database conncetion
    .then(() => console.log('Database Connected...'))
    .catch((err) => console.error(err))
    

const app = express();
app.use(express.json());

var cors = require('cors')

app.use(cors())
app.use('/api/campaigns', campaigns);
app.use('/api/report', report);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));