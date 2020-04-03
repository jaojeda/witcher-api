const express = require('express');
const app = express();
const cors = require('cors');
const { client } = require('./utils/connect');

app.use(express.json());
app.use(cors());

client.connect();

app.get('/hello', (req, res) => res.send('world'));
// app.use('/api/v1/RESOURCE', require('./routes/resource'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
