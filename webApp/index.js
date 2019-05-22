const express = require('express');
//const error = require('../middleware/error');

const app = express();
app.use(express.json());


const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));